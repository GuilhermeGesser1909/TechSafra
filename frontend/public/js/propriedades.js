document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById("listaPropriedades");
    const usuarioId = localStorage.getItem("usuarioId");

    if (!lista) return;

    if (!usuarioId) {
        lista.innerHTML = `<p style="color:red;">Usuário não autenticado! Faça login novamente.</p>`;
        setTimeout(() => window.location.href = "/telalogin.html", 1500);
        return;
    }

    const API_URL = "http://localhost:8080/propriedades";

    async function listarPropriedades() {
        try {
            const resp = await fetch(API_URL);
            if (!resp.ok) throw new Error("Erro ao buscar propriedades");

            const propriedades = await resp.json();
            const minhas = propriedades.filter(p =>
                p.usuarioId === parseInt(usuarioId) || p.usuario?.id === parseInt(usuarioId)
            );

            if (minhas.length === 0) {
                lista.innerHTML = "<p style='color:gray;'>Nenhuma propriedade cadastrada ainda.</p>";
                return;
            }

            lista.innerHTML = minhas.map(p => `
                <div class="property-item" data-id="${p.id}">
                    <div class="property-info">
                        <h4>${p.nome}</h4>
                        <p>${p.localizacao} • ${p.areaHectares} hectares</p>
                    </div>
                    <div class="property-actions">
                        <button class="btn edit-btn" data-id="${p.id}">Editar</button>
                        <button class="btn delete-btn" data-id="${p.id}">Excluir</button>
                    </div>
                </div>
            `).join("");

            lista.querySelectorAll(".edit-btn").forEach(btn => {
                btn.addEventListener("click", () => editarPropriedade(btn.dataset.id));
            });
            lista.querySelectorAll(".delete-btn").forEach(btn => {
                btn.addEventListener("click", () => excluirPropriedade(btn.dataset.id));
            });

        } catch (error) {
            console.error(error);
            lista.innerHTML = `<p style="color:red;">Erro ao carregar propriedades.</p>`;
        }
    }

    window.editarPropriedade = async (id) => {
        try {
            const resp = await fetch(`${API_URL}/${id}`);
            if (!resp.ok) throw new Error("Erro ao buscar propriedade");
            const prop = await resp.json();

            document.getElementById("edit-nomePropriedade").value = prop.nome || "";
            document.getElementById("edit-localizacaoPropriedade").value = prop.localizacao || "";
            document.getElementById("edit-estado").value = prop.estado || "";
            document.getElementById("edit-areaHectares").value = prop.areaHectares || 0;
            document.getElementById("edit-areaCultivavel").value = prop.areaCultivavel || 0;
            document.getElementById("edit-areaReserva").value = prop.areaReserva || 0;

            document.getElementById("edit-solo").value = prop.solo || "";
            document.getElementById("edit-topografia").value = prop.topografia || "";
            document.getElementById("edit-irrigacao").value = prop.irrigacao || "";

            document.getElementById("edit-culturaPrincipal").value = prop.culturaPrincipal || "";
            document.getElementById("edit-culturaSecundaria").value = prop.culturaSecundaria || "";

            document.getElementById("edit-numTalhoes").value = prop.numTalhoes || 0;

            document.getElementById("edit-responsavel").value = prop.responsavel || "";
            document.getElementById("edit-telefone").value = prop.telefone || "";
            document.getElementById("edit-emailContato").value = prop.emailContato || "";
            document.getElementById("edit-cnpjCpf").value = prop.cnpjCpf || "";

            document.getElementById("edit-cep").value = prop.cep || "";
            document.getElementById("edit-endereco").value = prop.endereco || "";

            document.getElementById("edit-latitude").value = prop.latitude || "";
            document.getElementById("edit-longitude").value = prop.longitude || "";

            document.getElementById("edit-observacoes").value = prop.observacoes || "";



            document.getElementById("modalEditarPropriedade").dataset.id = id;
            abrirModal("modalEditarPropriedade");
        } catch (error) {
            alert("Erro ao carregar propriedade!");
            console.error(error);
        }
    };

    document.getElementById("salvarEdicaoBtn")?.addEventListener("click", async () => {
        const id = document.getElementById("modalEditarPropriedade").dataset.id;
        const dadosAtualizados = {
            nome: document.getElementById("edit-nomePropriedade").value.trim(),
            localizacao: document.getElementById("edit-localizacaoPropriedade").value.trim(),
            estado: document.getElementById("edit-estado").value,

            areaHectares: parseFloat(document.getElementById("edit-areaHectares").value) || 0,
            areaCultivavel: parseFloat(document.getElementById("edit-areaCultivavel").value) || 0,
            areaReserva: parseFloat(document.getElementById("edit-areaReserva").value) || 0,

            solo: document.getElementById("edit-solo").value,
            topografia: document.getElementById("edit-topografia").value,
            irrigacao: document.getElementById("edit-irrigacao").value,

            culturaPrincipal: document.getElementById("edit-culturaPrincipal").value.trim(),
            culturaSecundaria: document.getElementById("edit-culturaSecundaria").value.trim(),

            numTalhoes: parseInt(document.getElementById("edit-numTalhoes").value) || 0,

            responsavel: document.getElementById("edit-responsavel").value.trim(),
            telefone: document.getElementById("edit-telefone").value.trim(),
            emailContato: document.getElementById("edit-emailContato").value.trim(),
            cnpjCpf: document.getElementById("edit-cnpjCpf").value.trim(),

            cep: document.getElementById("edit-cep").value.trim(),
            endereco: document.getElementById("edit-endereco").value.trim(),

            latitude: document.getElementById("edit-latitude").value.trim(),
            longitude: document.getElementById("edit-longitude").value.trim(),

            observacoes: document.getElementById("edit-observacoes").value.trim(),

            usuarioId: parseInt(usuarioId),
        };

        console.log("Dados atualizados:", dadosAtualizados);

        try {
            const resp = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosAtualizados),
            });
            if (resp.ok) {
                alert("Propriedade atualizada!");
                fecharModal("modalEditarPropriedade");
                listarPropriedades();
            } else {
                alert("Erro ao atualizar!");
            }
        } catch (err) {
            console.error(err);
            alert("Falha ao atualizar.");
        }
    });

    window.excluirPropriedade = (id) => {
        document.getElementById("modalExcluir").dataset.id = id;
        abrirModal("modalExcluir");
    };

    document.getElementById("confirmarExclusaoBtn")?.addEventListener("click", async () => {
        const id = document.getElementById("modalExcluir").dataset.id;
        try {
            const resp = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (resp.ok) {
                alert("Propriedade excluída!");
                fecharModal("modalExcluir");
                listarPropriedades();
            } else {
                alert("Erro ao excluir!");
            }
        } catch (err) {
            console.error(err);
            alert("Falha ao excluir.");
        }
    });

    listarPropriedades();
});

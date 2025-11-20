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

            // Event listeners dinâmicos
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

            // Preencher modal (certifique-se de que todos os campos existem no HTML)
            document.getElementById("edit-nomePropriedade").value = prop.nome || "";
            // ... outros campos

            document.getElementById("modalEditarPropriedade").dataset.id = id;
            abrirModal("modalEditarPropriedade");
        } catch (error) {
            alert("Erro ao carregar propriedade!");
            console.error(error);
        }
    };

    window.excluirPropriedade = (id) => {
        document.getElementById("modalExcluir").dataset.id = id;
        abrirModal("modalExcluir");
    };

    document.getElementById("salvarEdicaoBtn")?.addEventListener("click", async () => {
        const id = document.getElementById("modalEditarPropriedade").dataset.id;
        const dadosAtualizados = {
            nome: document.getElementById("edit-nomePropriedade").value.trim(),
            // ... outros campos
        };
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

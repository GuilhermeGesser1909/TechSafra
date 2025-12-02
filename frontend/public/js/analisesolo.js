const API_URL_ANALISES = "http://localhost:8080/analises-solo";

document.addEventListener("DOMContentLoaded", () => {
    // Só executa se estivermos na dashboard e a section existir
    if (document.getElementById("lista-analises-container")) {
        listarAnalisesCard();
    }
});

// --- LISTAGEM NO FORMATO DE CARDS ---
async function listarAnalisesCard() {
    const container = document.getElementById("lista-analises-container");
    container.innerHTML = "<p>Atualizando...</p>";

    try {
        const resposta = await fetch(API_URL_ANALISES);
        if (!resposta.ok) throw new Error("Erro ao buscar dados");

        const analises = await resposta.json();
        container.innerHTML = ""; // Limpa o loading

        if (analises.length === 0) {
            container.innerHTML = "<p>Nenhuma análise registada.</p>";
            return;
        }

        analises.forEach(analise => {
            const nomePropriedade = analise.propriedade ? analise.propriedade.nome : "Propriedade Desconhecida";

            // Cria o HTML do Card
            const cardHtml = `
                <div class="analysis-item" style="border-bottom: 1px solid #eee; padding: 15px 0; margin-bottom: 10px;">
                    <h4>Análise - ${nomePropriedade}</h4>
                    <p><strong>Área:</strong> ${analise.area} | <strong>Data:</strong> ${formatarData(analise.dataAnalise)}</p>
                    <p>
                        <strong>pH:</strong> ${analise.ph} | 
                        <strong>Matéria Orgânica:</strong> ${analise.materiaOrganica}% |
                        <strong>Solo:</strong> ${analise.tipoSolo}
                    </p>
                    
                    <div style="margin-top: 10px;">
                        <button class="btn edit-btn" style="padding: 5px 10px; font-size: 0.8rem;" 
                                onclick="abrirModalEdicao('${analise.id}')">
                            Editar
                        </button>
                        <button class="btn delete-btn" style="padding: 5px 10px; font-size: 0.8rem; background-color: #ff4d4d; color: white;" 
                                onclick="deletarAnalise('${analise.id}')">
                            Excluir
                        </button>
                    </div>
                </div>
            `;
            container.innerHTML += cardHtml;
        });

    } catch (erro) {
        console.error(erro);
        container.innerHTML = "<p>Erro ao carregar análises.</p>";
    }
}

// --- FUNÇÃO PARA ABRIR O MODAL E PREENCHER DADOS ---
async function abrirModalEdicao(id) {
    try {
        // Busca os dados atuais da análise
        const resposta = await fetch(`${API_URL_ANALISES}/${id}`); // Assumindo que criaste o endpoint GET /{id}
        // Se não tiveres o endpoint GET /{id} no backend, teremos de filtrar da lista, 
        // mas o ideal é ter no controller: @GetMapping("/{id}")

        if (!resposta.ok) {
            alert("Erro ao buscar detalhes da análise.");
            return;
        }

        const analise = await resposta.json();

        // Preenche os inputs do Modal
        document.getElementById("editAnaliseId").value = analise.id;
        document.getElementById("editArea").value = analise.area;
        document.getElementById("editTipoSolo").value = analise.tipoSolo;
        document.getElementById("editPh").value = analise.ph;
        document.getElementById("editMateriaOrganica").value = analise.materiaOrganica;
        document.getElementById("editDataAnalise").value = analise.dataAnalise;

        // Precisamos do ID da propriedade para o PUT funcionar corretamente
        if (analise.propriedade) {
            document.getElementById("editPropriedadeId").value = analise.propriedade.id;
        }

        // Abre o modal (usando a tua função existente ou estilo direto)
        const modal = document.getElementById("modalEditarAnalise");
        modal.style.display = "block";
        modal.setAttribute("aria-hidden", "false");

    } catch (erro) {
        console.error("Erro ao abrir edição:", erro);
    }
}

// --- FUNÇÃO PARA SALVAR A EDIÇÃO (PUT) ---
async function salvarEdicaoAnalise() {
    const id = document.getElementById("editAnaliseId").value;
    const propriedadeId = document.getElementById("editPropriedadeId").value;

    const dadosAtualizados = {
        area: document.getElementById("editArea").value,
        tipoSolo: document.getElementById("editTipoSolo").value,
        ph: parseFloat(document.getElementById("editPh").value),
        materiaOrganica: parseFloat(document.getElementById("editMateriaOrganica").value),
        dataAnalise: document.getElementById("editDataAnalise").value,
        propriedadeId: parseInt(propriedadeId) // Mantém a mesma propriedade
    };

    try {
        const resposta = await fetch(`${API_URL_ANALISES}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosAtualizados)
        });

        if (resposta.ok) {
            alert("Análise atualizada!");
            fecharModal('modalEditarAnalise');
            listarAnalisesCard(); // Atualiza a lista na tela
        } else {
            alert("Erro ao atualizar.");
        }
    } catch (erro) {
        console.error("Erro ao salvar:", erro);
    }
}

// --- FUNÇÃO AUXILIAR PARA FORMATAR DATA ---
function formatarData(dataString) {
    if (!dataString) return "";
    const [ano, mes, dia] = dataString.split("-");
    return `${dia}/${mes}/${ano}`;
}

// Função de deletar (reutilizada da resposta anterior)
async function deletarAnalise(id) {
    if (confirm("Tem certeza que deseja excluir esta análise?")) {
        try {
            const resposta = await fetch(`${API_URL_ANALISES}/${id}`, { method: "DELETE" });
            if (resposta.ok) listarAnalisesCard();
        } catch (erro) { console.error(erro); }
    }
}

// Funções de controle do Modal (caso não existam globalmente)
function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
    }
}
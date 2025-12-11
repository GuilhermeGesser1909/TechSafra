const API_URL_ANALISES = "http://localhost:8080/analises-solo";

document.addEventListener("DOMContentLoaded", () => {
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
        container.innerHTML = "";

        if (analises.length === 0) {
            container.innerHTML = "<p>Nenhuma análise registada.</p>";
            return;
        }

        analises.forEach(analise => {
            const nomePropriedade = analise.propriedade ? analise.propriedade.nome : "Propriedade Desconhecida";

            // HTML Limpo: Classes CSS controlam o visual (definidas no dashboard.css)
            const cardHtml = `
                <div class="analysis-item">
                    <h4>Análise - ${nomePropriedade}</h4>
                    
                    <p><strong>Área:</strong> ${analise.area}</p>
                    <p><strong>Data:</strong> ${formatarData(analise.dataAnalise)}</p>
                    
                    <div style="margin: 8px 0; border-left: 3px solid #63c262; padding-left: 10px;">
                        <p><strong>pH:</strong> ${analise.ph} | <strong>Solo:</strong> ${analise.tipoSolo}</p>
                        <p><strong>Matéria Orgânica:</strong> ${analise.materiaOrganica}%</p>
                    </div>
                    
                    <div class="analysis-actions">
                        <button class="btn edit-btn" onclick="abrirModalEdicao('${analise.id}')">
                            Editar
                        </button>
                        <button class="btn delete-btn" onclick="abrirModalExclusao('${analise.id}')">
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
        const resposta = await fetch(`${API_URL_ANALISES}/${id}`);

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

        if (analise.propriedade) {
            document.getElementById("editPropriedadeId").value = analise.propriedade.id;
        }

        // Abre o modal
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
        propriedadeId: parseInt(propriedadeId)
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
            listarAnalisesCard();
        } else {
            alert("Erro ao atualizar.");
        }
    } catch (erro) {
        console.error("Erro ao salvar:", erro);
    }
}

// ==========================================
//     LÓGICA DO MODAL DE EXCLUSÃO (NOVO)
// ==========================================

// 1. Abre o modal e guarda o ID que queremos apagar
function abrirModalExclusao(id) {
    document.getElementById("idAnaliseParaExcluir").value = id;

    const modal = document.getElementById("modalExcluirAnalise");
    if (modal) {
        modal.style.display = "block";
        modal.setAttribute("aria-hidden", "false");
    }
}

// 2. Executa a exclusão quando o usuário clica em "Sim, Excluir"
async function confirmarExclusaoAnalise() {
    const id = document.getElementById("idAnaliseParaExcluir").value;

    if (!id) return;

    try {
        const resposta = await fetch(`${API_URL_ANALISES}/${id}`, {
            method: "DELETE"
        });

        if (resposta.ok) {
            alert("Análise removida com sucesso!");
            fecharModal('modalExcluirAnalise'); // Fecha o modal
            listarAnalisesCard(); // Atualiza a lista
        } else {
            alert("Erro ao excluir análise. Verifique se existem dependências.");
        }
    } catch (erro) {
        console.error("Erro ao excluir:", erro);
        alert("Erro de conexão ao tentar excluir.");
    }
}

// --- UTILITÁRIOS ---

function formatarData(dataString) {
    if (!dataString) return "";
    const [ano, mes, dia] = dataString.split("-");
    return `${dia}/${mes}/${ano}`;
}

function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
    }
}
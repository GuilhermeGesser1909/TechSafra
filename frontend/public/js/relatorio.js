// Função para buscar e renderizar os relatórios
async function carregarRelatoriosDashboard() {
    const container = document.getElementById("listaRelatoriosContainer");

    if (!container) return; // Se não estiver na tela, para.

    try {
        const response = await fetch("http://localhost:8080/relatorios");
        if (!response.ok) throw new Error("Erro na resposta da API");

        const relatorios = await response.json();

        if (relatorios.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 20px; color: #666;">
                    <i class="fas fa-folder-open" style="font-size: 3rem; margin-bottom: 10px; color: #ccc;"></i>
                    <p>Nenhum relatório gerado ainda.</p>
                </div>`;
            return;
        }

        // Gera os cards HTML
        const cardsHtml = relatorios.map(r => `
            <div class="report-card">
                <div class="report-header">
                    <i class="fas fa-file-alt"></i>
                    <h4>${r.titulo}</h4>
                </div>
                
                <div class="report-body">
                    <p><i class="far fa-calendar-alt"></i> <strong>Data:</strong> ${formatarData(r.dataGeracao)}</p>
                    <p><i class="fas fa-align-left"></i> <strong>Resumo:</strong> ${r.resumo ? r.resumo.substring(0, 60) + '...' : 'Sem resumo'}</p>
                </div>

                <div class="report-footer">
                    <a href="/template/relatorio.html?id=${r.id}" class="btn-link">
                        Ver Detalhes <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `).join("");

        // Envolve tudo na div de grid
        container.innerHTML = `<div class="reports-grid">${cardsHtml}</div>`;

    } catch (error) {
        console.error("Erro ao carregar relatórios:", error);
        container.innerHTML = "<p style='color:red; text-align:center'>Erro ao carregar relatórios. Verifique a conexão.</p>";
    }
}

// Mantém a função auxiliar de data
function formatarData(dataISO) {
    if (!dataISO) return "--/--/----";
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    carregarRelatoriosDashboard();
});
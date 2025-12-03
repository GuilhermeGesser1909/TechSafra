async function carregarAtividadesRecentes() {
    const container = document.querySelector(".dashboard-activities");
    const usuarioId = localStorage.getItem("usuarioId");

    if (!container || !usuarioId) return;

    // Mantém o título, limpa apenas os parágrafos antigos
    container.innerHTML = "<h3>🕒 Atividades Recentes</h3><p>Carregando...</p>";

    try {
        const response = await fetch(`http://localhost:8080/atividades/${usuarioId}`);
        const atividades = await response.json();

        // Remove o "Carregando..."
        const titulo = container.querySelector("h3");
        container.innerHTML = "";
        container.appendChild(titulo);

        if (atividades.length === 0) {
            container.innerHTML += "<p>Nenhuma atividade recente.</p>";
            return;
        }

        // Pega apenas as 5 primeiras para não encher a tela
        atividades.slice(0, 5).forEach(atv => {
            const dataObj = new Date(atv.dataHora);

            // Formata a data de jeito bonito (Ex: 03/12 às 14:30)
            const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
                day: '2-digit', month: '2-digit'
            }) + " às " + dataObj.toLocaleTimeString('pt-BR', {
                hour: '2-digit', minute: '2-digit'
            });

            // Cria o elemento HTML
            const p = document.createElement("p");
            // Usa ícones baseados no texto (opcional, visual extra)
            let icon = "📝";
            if (atv.descricao.includes("maquinário")) icon = "🚜";
            if (atv.descricao.includes("Safra")) icon = "🌱";
            if (atv.descricao.includes("Excluiu")) icon = "🗑️";

            p.innerHTML = `${icon} ${atv.descricao} <small>${dataFormatada}</small>`;
            container.appendChild(p);
        });

    } catch (error) {
        console.error("Erro ao carregar atividades:", error);
        container.innerHTML += "<p>Não foi possível carregar o histórico.</p>";
    }
}

// Inicia quando a página carrega
document.addEventListener("DOMContentLoaded", carregarAtividadesRecentes);
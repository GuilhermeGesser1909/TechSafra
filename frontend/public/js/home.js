// ================================
// HOME.JS — TechSafra
// ================================

// 👋 Saudação personalizada
function saudacaoPersonalizada() {
  const agora = new Date();
  const hora = agora.getHours();
  let saudacao = "Bem-vindo 👋";

  if (hora >= 5 && hora < 12) saudacao = "Bom dia ☀️";
  else if (hora >= 12 && hora < 18) saudacao = "Boa tarde 🌿";
  else saudacao = "Boa noite 🌙";

  const nomeUser = JSON.parse(localStorage.getItem("loggedUser"))?.nome || "";
  const saudacaoEl = document.getElementById("saudacao");
  const mensagemDiaEl = document.getElementById("mensagem-dia");

  if (saudacaoEl)
    saudacaoEl.textContent = `${saudacao}${nomeUser ? ", " + nomeUser : ""}`;
  if (mensagemDiaEl) mensagemDiaEl.textContent = "Sua produção na palma de suas mãos!";
}

// 🌤️ Clima (simulado)
function carregarClima() {
  const el = document.getElementById("weather-info");
  const previsoes = [
    "☀️ Sol com nuvens — Máx: 32°C / Mín: 20°C",
    "🌦️ Pancadas de chuva — Máx: 28°C / Mín: 18°C",
    "🌤️ Céu limpo e seco — Máx: 30°C / Mín: 19°C",
  ];
  el.textContent = previsoes[Math.floor(Math.random() * previsoes.length)];
}

// 💰 Cotações - usando links reais do CEPEA
function carregarCotacoes() {
  const grid = document.getElementById("cotacoes-grid");
  grid.innerHTML = ""; // limpa antes de popular

  const dados = [
    { produto: "Soja", url: "https://www.cepea.esalq.usp.br/br/indicador/soja.aspx" },
    { produto: "Milho", url: "https://www.cepea.esalq.usp.br/br/indicador/milho.aspx" },
    { produto: "Boi Gordo", url: "https://www.cepea.esalq.usp.br/br/indicador/boi-gordo.aspx" },
    { produto: "Café", url: "https://www.cepea.esalq.usp.br/br/indicador/cafe.aspx" },
    { produto: "Algodão", url: "https://www.cepea.esalq.usp.br/br/indicador/algodao.aspx" },
  ];

  dados.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("cotacao-card");
    card.innerHTML = `
      <h4>${item.produto}</h4>
      <a href="${item.url}" target="_blank">🔗 Ver cotação atual</a>
    `;
    grid.appendChild(card);
  });
}

// Chamar assim que a página carregar
document.addEventListener("DOMContentLoaded", carregarCotacoes);

// 🚪 Logout
function logout() {
  localStorage.removeItem("loggedUser");
  sessionStorage.removeItem("usuarioLogado");
  window.location.href = "/PaginaInicial.html";
}

// Inicialização
window.addEventListener("DOMContentLoaded", () => {
  saudacaoPersonalizada();
  carregarClima();
  carregarCotacoes();
  carregarNoticias();
  carregarCuriosidades();
});

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
  if (mensagemDiaEl) mensagemDiaEl.textContent = "Tenha um ótimo dia no campo!";
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

// 💰 Cotações (simuladas)
function carregarCotacoes() {
  const grid = document.getElementById("cotacoes-grid");
  const dados = [
    { produto: "Soja", valor: "R$ 164,00/sc" },
    { produto: "Milho", valor: "R$ 88,50/sc" },
    { produto: "Café", valor: "R$ 1.245,00/saca" },
    { produto: "Boi Gordo", valor: "R$ 235,00/@ arroba" },
  ];

  dados.forEach((dado) => {
    const card = document.createElement("div");
    card.classList.add("cotacao-card");
    card.innerHTML = `<h4>${dado.produto}</h4><p>${dado.valor}</p>`;
    grid.appendChild(card);
  });
}

// 📰 Notícias (simuladas)
function carregarNoticias() {
  const listaNoticias = document.getElementById("lista-noticias");
  if (!listaNoticias) return;

  const noticias = [
    {
      titulo: "🌾 Colheita recorde no interior de SP",
      texto: "Produtores comemoram uma das maiores safras da década.",
      img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=60",
    },
    {
      titulo: "🤖 Nova tecnologia de irrigação com IA",
      texto: "Solução inteligente promete reduzir o consumo de água em 30%.",
      img: "https://images.unsplash.com/photo-1518085250887-2f903c200fee?auto=format&fit=crop&w=900&q=60",
    },
    {
      titulo: "🌱 Agro sustentável cresce 30% em 2025",
      texto: "Uso racional de recursos naturais impulsiona novos modelos de negócios.",
      img: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&w=900&q=60",
    },
  ];

  noticias.forEach((noticia, index) => {
    const item = document.createElement("article");
    item.classList.add("news-card");
    item.style.opacity = "0";
    item.innerHTML = `
      <img src="${noticia.img}" alt="${noticia.titulo}" />
      <h3>${noticia.titulo}</h3>
      <p>${noticia.texto}</p>
    `;
    listaNoticias.appendChild(item);
    setTimeout(() => {
      item.style.transition = "opacity 0.5s ease";
      item.style.opacity = "1";
    }, 200 * index);
  });
}

// 💡 Curiosidades (simuladas)
function carregarCuriosidades() {
  const curiosidades = [
    "O Brasil é o maior exportador mundial de soja 🌎",
    "A tecnologia de drones já cobre mais de 12 milhões de hectares no país 🚁",
    "Sensores de solo reduzem desperdício de fertilizantes em até 40% 🌱",
  ];
  const grid = document.getElementById("curiosidades-grid");
  curiosidades.forEach((c) => {
    const div = document.createElement("div");
    div.classList.add("curiosidade-item");
    div.textContent = c;
    grid.appendChild(div);
  });
}

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

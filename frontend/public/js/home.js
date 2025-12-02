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

function carregarCotacoes() {
  const grid = document.getElementById("cotacoes-grid");
  grid.innerHTML = "";

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

document.addEventListener("DOMContentLoaded", carregarCotacoes);

async function carregarNoticiasAgro() {
  const box = document.getElementById("noticias-box");
  box.innerHTML = "Carregando...";

  try {
    const resposta = await fetch("http://localhost:8080/api/agro-news");
    const dados = await resposta.json();

    box.innerHTML = "";

    const noticias = dados.articles.slice(0, 5);

    noticias.forEach(noticia => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="${noticia.url}" target="_blank">
          ${noticia.title}
        </a>
      `;
      box.appendChild(li);
    });

  } catch (error) {
    console.error("Erro ao carregar notícias:", error);
    box.innerHTML = "<li>Erro ao carregar notícias.</li>";
  }
}

function carregarCuriosidades() {
  const curiosidades = [
    "O Brasil é o maior produtor mundial de soja.",
    "A agricultura de precisão pode aumentar a produtividade em até 20%.",
    "Uso de sensores de umidade reduz o gasto de água em até 40%.",
    "Drones já são usados para mapear pragas com precisão.",
    "Estufas inteligentes conseguem regular clima automaticamente."
  ];

  const box = document.getElementById("curiosidades-box");
  box.innerHTML = "";

  curiosidades.slice(0, 4).forEach(c => {
    const li = document.createElement("li");
    li.textContent = c;
    box.appendChild(li);
  });
}

function logout() {
  localStorage.removeItem("loggedUser");
  sessionStorage.removeItem("usuarioLogado");
  window.location.href = "/PaginaInicial.html";
}

window.addEventListener("DOMContentLoaded", () => {
  saudacaoPersonalizada();
  carregarCotacoes();
  carregarNoticiasAgro();
  carregarCuriosidades();
});

/* --- Funções da Área Interativa --- */

// 1. Quiz do Agro
function verificarQuiz(elemento, correto) {
  const resultado = elemento.parentElement.nextElementSibling; // Pega o <p id="quiz-resultado">

  if (correto) {
    resultado.style.display = "block";
    resultado.style.color = "green";
    resultado.textContent = "✅ Acertou! O MT é gigante!";
  } else {
    resultado.style.display = "block";
    resultado.style.color = "red";
    resultado.textContent = "❌ Tente de novo!";
  }
}

// 2. Calculadora de Churrasco
function calcularChurrasco() {
  const pessoas = document.getElementById("qtd-pessoas").value;
  const resultadoEl = document.getElementById("res-churrasco");

  if (pessoas && pessoas > 0) {
    // Cálculo base: 400g por pessoa
    const totalCarne = (pessoas * 0.4).toFixed(1);
    resultadoEl.textContent = `🥩 Precisa de aprox. ${totalCarne} kg de carne.`;
  } else {
    resultadoEl.textContent = "Informe o nº de pessoas.";
  }
}

// 3. Gerador de Sabedoria
function gerarSabedoria() {
  const frases = [
    "🌱 Quem planta cuidado, colhe fartura.",
    "🚜 O melhor adubo é a pegada do dono.",
    "🌧️ Chuva mansa não quebra telha, mas molha a terra toda.",
    "🌽 Milho que demora a crescer, a espiga vem cheia.",
    "🐂 Boi no pasto é dinheiro no bolso, mas boi gordo é dinheiro no banco.",
    "🌅 Aproveite o sereno da manhã, que o sol do meio-dia não perdoa."
  ];

  const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
  document.getElementById("frase-roca").textContent = `"${fraseAleatoria}"`;
}

// 4. Sugestão de Música
function sugerirMusica() {
  const musicas = [
    "🎵 Rei do Gado - Tião Carreiro",
    "🎵 Fio de Cabelo - Chitãozinho & Xororó",
    "🎵 Evidências - Chitãozinho & Xororó",
    "🎵 O Menino da Porteira - Sérgio Reis",
    "🎵 Ipê Florido - Liu & Léu",
    "🎵 Do Fundo da Grota - Baitaca",
    "🎵 Saudade da Minha Terra - Belmonte & Amaraí"
  ];

  const musicaAleatoria = musicas[Math.floor(Math.random() * musicas.length)];
  document.getElementById("sugestao-musica").textContent = musicaAleatoria;
}
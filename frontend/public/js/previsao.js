const apiKey = "e2c52125e70b3fc87ef41d80f29f37fd";

// Elementos principais
const form = document.getElementById("search");
const cityInput = document.getElementById("city_Name");
const title = document.getElementById("title");
const tempValue = document.getElementById("temp_value");
const tempDesc = document.getElementById("temp_description");
const tempMax = document.getElementById("temp_max");
const tempMin = document.getElementById("temp_min");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const tempImg = document.getElementById("temp_img");
const forecastGrid = document.getElementById("forecast-grid");

// Função principal para buscar e mostrar previsão
async function buscarPrevisao(cidade = "Blumenau") {
  try {
    // 🔹 1️⃣ — Dados do clima atual
    const urlAtual = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${apiKey}`;
    const respAtual = await fetch(urlAtual);
    if (!respAtual.ok) throw new Error("Cidade não encontrada.");
    const dadosAtual = await respAtual.json();

    // Atualiza dados principais
    title.textContent = `${dadosAtual.name}, ${dadosAtual.sys.country}`;
    tempValue.innerHTML = `${Math.round(dadosAtual.main.temp)} <sup>°C</sup>`;
    tempDesc.textContent = dadosAtual.weather[0].description;
    tempMax.textContent = `${Math.round(dadosAtual.main.temp_max)}°C`;
    tempMin.textContent = `${Math.round(dadosAtual.main.temp_min)}°C`;
    humidity.textContent = `${dadosAtual.main.humidity}%`;
    wind.textContent = `${Math.round(dadosAtual.wind.speed * 3.6)} km/h`; // m/s → km/h

    // Define o ícone principal
    const icone = dadosAtual.weather[0].icon; // ex: "10d"
    tempImg.src = `https://openweathermap.org/img/wn/${icone}@2x.png`;

    // 🔹 2️⃣ — Previsão 5 dias
    const urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&units=metric&lang=pt_br&appid=${apiKey}`;
    const respPrev = await fetch(urlPrevisao);
    const dadosPrev = await respPrev.json();

    mostrarPrevisao5Dias(dadosPrev.list);
  } catch (erro) {
    console.error("Erro:", erro);
    alert("Erro ao buscar previsão: " + erro.message);
  }
}

// Exibe previsão resumida para 5 dias (média diária)
function mostrarPrevisao5Dias(lista) {
  forecastGrid.innerHTML = ""; // limpa anterior
  const dias = {};

  // Agrupa por data
  lista.forEach((item) => {
    const data = item.dt_txt.split(" ")[0];
    if (!dias[data]) dias[data] = [];
    dias[data].push(item);
  });

  // Cria cards simples por dia
  Object.keys(dias)
    .slice(0, 5)
    .forEach((data) => {
      const dia = dias[data];
      const mediaTemp =
        dia.reduce((acc, d) => acc + d.main.temp, 0) / dia.length;
      const descricao = dia[0].weather[0].description;
      const icone = dia[0].weather[0].icon;

      const card = document.createElement("div");
      card.classList.add("forecast-day");
      card.innerHTML = `
        <p class="forecast-date">${new Date(data).toLocaleDateString("pt-BR", {
          weekday: "short",
          day: "2-digit",
          month: "2-digit"
        })}</p>
        <img src="https://openweathermap.org/img/wn/${icone}.png" alt="${descricao}">
        <p class="forecast-temp">${Math.round(mediaTemp)}°C</p>
        <p class="forecast-desc">${descricao}</p>
      `;
      forecastGrid.appendChild(card);
    });
}

// Evento do formulário
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const cidade = cityInput.value.trim();
  if (cidade) buscarPrevisao(cidade);
});

// Busca inicial padrão
buscarPrevisao("Blumenau");

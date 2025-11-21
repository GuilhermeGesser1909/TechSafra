//CRUD DE SAFRAS

document.addEventListener("DOMContentLoaded", () => {
  carregarSafras();
});

// ===================== LISTAR =====================

async function carregarSafras() {
  const lista = document.getElementById("listaSafras");
  lista.innerHTML = "<p>Carregando...</p>";

  try {
    const resposta = await fetch("http://localhost:8080/safras");
    const safras = await resposta.json();

    if (safras.length === 0) {
      lista.innerHTML = "<p>Nenhuma safra cadastrada.</p>";
      return;
    }

    lista.innerHTML = safras.map(s => `
  <div class="safra-item">
    <h4>${s.nome}</h4>
    <p><strong>Cultura:</strong> ${s.cultura}</p>
    <p><strong>Período:</strong> ${s.dataInicio} até ${s.dataFim}</p>
    <p><strong>Área:</strong> ${s.areaPlantada} ha</p>
    <p><strong>Produção Esperada:</strong> ${s.producaoEsperada} ton</p>
    <p><strong>Custos:</strong> R$ ${s.custos}</p>
    <p><strong>ID:</strong> ${s.id}</p>

    <button class="btn edit-btn" onclick="carregarDadosParaEdicao(${s.id})">Editar</button>
    <button class="btn delete-btn" onclick="abrirModalExcluirSafra(${s.id})">Excluir</button>

  </div>
`).join("");

  } catch (err) {
    lista.innerHTML = "<p style='color:red'>Erro ao carregar as safras.</p>";
  }
}

// ===================== EDITAR =====================

async function carregarDadosParaEdicao(id) {
  abrirModalEditarSafra();

  const res = await fetch(`http://localhost:8080/safras/${id}`);
  const safra = await res.json();

  const propriedadeId = safra.propriedadeId || safra.propriedade.id;

  document.getElementById("editSafraId").value = safra.id;
  document.getElementById("editPropriedadeId").value = safra.propriedadeId;
  document.getElementById("editNomeSafra").value = safra.nome;
  document.getElementById("editCultura").value = safra.cultura;
  document.getElementById("editDataInicio").value = safra.dataInicio;
  document.getElementById("editDataFim").value = safra.dataFim;
  document.getElementById("editArea").value = safra.areaPlantada;
  document.getElementById("editProducao").value = safra.producaoEsperada;
  document.getElementById("editCustos").value = safra.custos;
  document.getElementById("editObservacoes").value = safra.observacoes ?? "";
}


function abrirModalEditarSafra() {
  document.getElementById("modalEditarSafra").style.display = "flex";
}

function fecharModal(id) {
  document.getElementById(id).style.display = "none";
}

document.getElementById("formEditarSafra").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("editSafraId").value;
  const propriedadeId = document.getElementById("editPropriedadeId").value;

  const safraAtualizada = {
    propriedadeId: parseInt(propriedadeId),
    nome: document.getElementById("editNomeSafra").value,
    cultura: document.getElementById("editCultura").value,
    dataInicio: document.getElementById("editDataInicio").value,
    dataFim: document.getElementById("editDataFim").value,
    areaPlantada: document.getElementById("editArea").value,
    producaoEsperada: document.getElementById("editProducao").value,
    custos: document.getElementById("editCustos").value,
    observacoes: document.getElementById("editObservacoes").value
  };

  await fetch(`http://localhost:8080/safras/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(safraAtualizada)
  });

  fecharModal("modalEditarSafra");
  carregarSafras();
  alert("Safra atualizada com sucesso!");
});

// ===================== EXCLUIR =====================

function abrirModalExcluirSafra() {
  document.getElementById("modalExcluirSafra").style.display = "flex";
}

async function confirmarExcluirSafra() {
  const id = document.getElementById("deleteSafraId").value;

  await fetch(`http://localhost:8080/safras/${id}`, {
    method: "DELETE"
  });

  fecharModal("modalExcluirSafra");
  carregarSafras();
  alert("Safra excluída!");
}

// HIDDEN 

function mostrarSection(id) {
  document.querySelectorAll(".card-section").forEach(secao => {
    secao.classList.add("hidden");
  });

  document.getElementById(id).classList.remove("hidden");
}

document.querySelectorAll(".sidebar nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    // Remove "active" de todos
    document.querySelectorAll(".sidebar nav a").forEach(a => a.classList.remove("active"));

    // Ativa o clicado
    link.classList.add("active");

    // Esconde todas as sections
    document.querySelectorAll(".card-section").forEach(secao => {
      secao.classList.add("hidden");
    });

    // Mostra a section alvo
    const alvo = link.getAttribute("data-target");
    document.getElementById(alvo).classList.remove("hidden");
  });
});

// Abre automaticamente a seção 1 ao carregar a página
window.addEventListener("load", () => {
  document.querySelector('[data-target="section1"]').click();
});
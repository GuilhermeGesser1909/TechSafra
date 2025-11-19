// ==========================
// 🪟 Funções genéricas de modal
// ==========================
function abrirModal(id) {
  const modal = document.getElementById(id);
  if (!modal) {
    console.error(`❌ Modal ${id} não encontrado`);
    return;
  }
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
}

function fecharModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}

// Fecha modal ao clicar fora
window.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
    event.target.setAttribute("aria-hidden", "true");
  }
});


// ==========================
// 🚀 Dashboard principal
// ==========================
document.addEventListener("DOMContentLoaded", async () => {

  // ==========================
  // 🌐 CONTROLE DA SIDEBAR (NAV)
  // ==========================
  const links = document.querySelectorAll(".sidebar nav a");
  const sections = document.querySelectorAll(".card-section");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      // Remove destaque de todos
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      // Esconde todas as seções
      sections.forEach((section) => (section.hidden = true));

      // Mostra a clicada
      const targetId = link.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.hidden = false;

        // 🔹 Se for a seção de propriedades, recarrega a lista
        if (targetId === "section4") {
          listarPropriedades();
        }

        if (targetId === "section5") {
          carregarEstoque();
        }
      }
    });
  });

  // ==========================
  // 🌱 CRUD DE PROPRIEDADES
  // ==========================
  const API_URL = "http://localhost:8080/propriedades";
  const usuarioId = localStorage.getItem("usuarioId");
  const lista = document.getElementById("listaPropriedades");

  if (!lista) return;

  if (!usuarioId) {
    lista.innerHTML = `<p style="color:red;">Usuário não autenticado! Faça login novamente.</p>`;
    setTimeout(() => (window.location.href = "/telalogin.html"), 1500);
    return;
  }

  // 🔹 FUNÇÃO: Listar propriedades do usuário logado
  async function listarPropriedades() {
    console.log("🔍 Carregando propriedades para usuário:", usuarioId);
    try {
      const resp = await fetch(API_URL);
      if (!resp.ok) throw new Error("Erro ao buscar propriedades");

      const propriedades = await resp.json();
      console.log("📦 Todas as propriedades recebidas:", propriedades);

      // Filtra propriedades do usuário logado
      const minhas = propriedades.filter((p) =>
        p.usuarioId === parseInt(usuarioId) || p.usuario?.id === parseInt(usuarioId)
      );

      console.log("✅ Propriedades filtradas:", minhas);

      if (minhas.length === 0) {
        lista.innerHTML = "<p style='color:gray;'>Nenhuma propriedade cadastrada ainda.</p>";
        return;
      }

      lista.innerHTML = minhas.map((p) => `
        <div class="property-item" data-id="${p.id}">
          <div class="property-info">
            <h4>${p.nome}</h4>
            <p>${p.localizacao} • ${p.areaHectares} hectares</p>
          </div>
          <div class="property-actions">
            <button class="btn edit-btn" onclick="editarPropriedade(${p.id})">
              <i class="fas fa-edit"></i> Editar
            </button>
            <button class="btn delete-btn" onclick="excluirPropriedade(${p.id})">
              <i class="fas fa-trash"></i> Excluir
            </button>
          </div>
        </div>
      `).join("");
    } catch (error) {
      console.error("❌ Erro ao carregar propriedades:", error);
      lista.innerHTML = `<p style="color:red;">Erro ao carregar propriedades.</p>`;
    }
  }

  // 🔹 EDITAR (GET + preencher modal completo)
  window.editarPropriedade = async (id) => {
    try {
      const resp = await fetch(`${API_URL}/${id}`);
      if (!resp.ok) throw new Error("Erro ao buscar propriedade");
      const prop = await resp.json();

      // 🔹 Mapeamento de nomes de estados para siglas
      const mapaEstados = {
        "Acre": "AC",
        "Alagoas": "AL",
        "Amapá": "AP",
        "Amazonas": "AM",
        "Bahia": "BA",
        "Ceará": "CE",
        "Distrito Federal": "DF",
        "Espírito Santo": "ES",
        "Goiás": "GO",
        "Maranhão": "MA",
        "Mato Grosso": "MT",
        "Mato Grosso do Sul": "MS",
        "Minas Gerais": "MG",
        "Pará": "PA",
        "Paraíba": "PB",
        "Paraná": "PR",
        "Pernambuco": "PE",
        "Piauí": "PI",
        "Rio de Janeiro": "RJ",
        "Rio Grande do Norte": "RN",
        "Rio Grande do Sul": "RS",
        "Rondônia": "RO",
        "Roraima": "RR",
        "Santa Catarina": "SC",
        "São Paulo": "SP",
        "Sergipe": "SE",
        "Tocantins": "TO"
      };

      // Preenche todos os campos
      document.getElementById("edit-nomePropriedade").value = prop.nome || "";
      document.getElementById("edit-localizacaoPropriedade").value = prop.localizacao || "";
      document.getElementById("edit-estado").value = mapaEstados[prop.estado] || prop.estado || "";
      document.getElementById("edit-areaHectares").value = prop.areaHectares || "";
      document.getElementById("edit-areaCultivavel").value = prop.areaCultivavel || "";
      document.getElementById("edit-areaReserva").value = prop.areaReserva || "";
      document.getElementById("edit-solo").value = prop.solo || "";
      document.getElementById("edit-topografia").value = prop.topografia || "";
      document.getElementById("edit-irrigacao").value = prop.irrigacao || "";
      document.getElementById("edit-culturaPrincipal").value = prop.culturaPrincipal || "";
      document.getElementById("edit-culturaSecundaria").value = prop.culturaSecundaria || "";
      document.getElementById("edit-numTalhoes").value = prop.numTalhoes || "";
      document.getElementById("edit-responsavel").value = prop.responsavel || "";
      document.getElementById("edit-telefone").value = prop.telefone || "";
      document.getElementById("edit-emailContato").value = prop.emailContato || "";
      document.getElementById("edit-cnpjCpf").value = prop.cnpjCpf || "";
      document.getElementById("edit-cep").value = prop.cep || "";
      document.getElementById("edit-endereco").value = prop.endereco || "";
      document.getElementById("edit-latitude").value = prop.latitude || "";
      document.getElementById("edit-longitude").value = prop.longitude || "";
      document.getElementById("edit-observacoes").value = prop.observacoes || "";

      document.getElementById("modalEditarPropriedade").dataset.id = id;
      abrirModal("modalEditarPropriedade");
    } catch (error) {
      alert("Erro ao carregar propriedade para edição!");
      console.error(error);
    }
  };

  // 🔹 SALVAR ALTERAÇÕES (PUT)
  document.getElementById("salvarEdicaoBtn")?.addEventListener("click", async () => {
    const id = document.getElementById("modalEditarPropriedade").dataset.id;

    // 🔹 Mapeamento de siglas para nomes completos
    const mapaSiglaParaNome = {
      "AC": "Acre",
      "AL": "Alagoas",
      "AP": "Amapá",
      "AM": "Amazonas",
      "BA": "Bahia",
      "CE": "Ceará",
      "DF": "Distrito Federal",
      "ES": "Espírito Santo",
      "GO": "Goiás",
      "MA": "Maranhão",
      "MT": "Mato Grosso",
      "MS": "Mato Grosso do Sul",
      "MG": "Minas Gerais",
      "PA": "Pará",
      "PB": "Paraíba",
      "PR": "Paraná",
      "PE": "Pernambuco",
      "PI": "Piauí",
      "RJ": "Rio de Janeiro",
      "RN": "Rio Grande do Norte",
      "RS": "Rio Grande do Sul",
      "RO": "Rondônia",
      "RR": "Roraima",
      "SC": "Santa Catarina",
      "SP": "São Paulo",
      "SE": "Sergipe",
      "TO": "Tocantins"
    };

    const estadoSigla = document.getElementById("edit-estado").value;
    const estadoNome = mapaSiglaParaNome[estadoSigla] || estadoSigla || "";

    const dadosAtualizados = {
      nome: document.getElementById("edit-nomePropriedade").value.trim(),
      localizacao: document.getElementById("edit-localizacaoPropriedade").value.trim(),
      estado: estadoNome, // ✅ envia o nome completo
      areaHectares: parseFloat(document.getElementById("edit-areaHectares").value) || 0,
      areaCultivavel: parseFloat(document.getElementById("edit-areaCultivavel").value) || 0,
      areaReserva: parseFloat(document.getElementById("edit-areaReserva").value) || 0,
      solo: document.getElementById("edit-solo").value,
      topografia: document.getElementById("edit-topografia").value,
      irrigacao: document.getElementById("edit-irrigacao").value,
      culturaPrincipal: document.getElementById("edit-culturaPrincipal").value,
      culturaSecundaria: document.getElementById("edit-culturaSecundaria").value,
      numTalhoes: parseInt(document.getElementById("edit-numTalhoes").value) || 0,
      responsavel: document.getElementById("edit-responsavel").value,
      telefone: document.getElementById("edit-telefone").value,
      emailContato: document.getElementById("edit-emailContato").value,
      cnpjCpf: document.getElementById("edit-cnpjCpf").value,
      cep: document.getElementById("edit-cep").value,
      endereco: document.getElementById("edit-endereco").value,
      latitude: document.getElementById("edit-latitude").value,
      longitude: document.getElementById("edit-longitude").value,
      observacoes: document.getElementById("edit-observacoes").value,
      usuarioId: parseInt(usuarioId),
    };

    try {
      const resp = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosAtualizados),
      });

      if (resp.ok) {
        alert("✅ Propriedade atualizada com sucesso!");
        fecharModal("modalEditarPropriedade");
        listarPropriedades();
      } else {
        alert("Erro ao atualizar propriedade!");
      }
    } catch (error) {
      console.error(error);
      alert("Falha ao atualizar propriedade.");
    }
  });

  // 🔹 EXCLUSÃO (DELETE)
  window.excluirPropriedade = (id) => {
    document.getElementById("modalExcluir").dataset.id = id;
    abrirModal("modalExcluir");
  };

  document.getElementById("confirmarExclusaoBtn")?.addEventListener("click", async () => {
    const id = document.getElementById("modalExcluir").dataset.id;
    try {
      const resp = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (resp.ok) {
        alert("🗑️ Propriedade excluída com sucesso!");
        fecharModal("modalExcluir");
        listarPropriedades();
      } else {
        alert("Erro ao excluir propriedade!");
      }
    } catch (error) {
      console.error(error);
      alert("Falha ao excluir.");
    }
  });

  // 🔹 Carrega automaticamente na abertura do dashboard
  listarPropriedades();
});

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

  document.getElementById("editSafraId").value = safra.id;
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
  document.getElementById("modalEditarSafra").style.display = "block";
}

function fecharModal(id) {
  document.getElementById(id).style.display = "none";
}

document.getElementById("formEditarSafra").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("editSafraId").value;

  const safraAtualizada = {
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
  document.getElementById("modalExcluirSafra").style.display = "block";
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


//  (SEÇÃO MAQUINÁRIO - COMPLETO CRUD)

document.addEventListener("DOMContentLoaded", () => {

  carregarMaquinarios();
  // Você deve chamar aqui também as funções de carregar Propriedades e Safras, se existirem.
});

// Variável para armazenar o ID do maquinário selecionado, se aplicável (mantido do seu original).
let maquinarioSelecionado = null;

// --- FUNÇÃO PRINCIPAL: READ (Listagem) ---
async function carregarMaquinarios() {
  // DOCUMENTAÇÃO: 'listaMaquinarios' é o ID do contêiner da lista que padronizamos no HTML.
  const listaMaquinariosDiv = document.getElementById("listaMaquinarios");
  listaMaquinariosDiv.innerHTML = '<p>Carregando maquinários...</p>';

  try {
    // DOCUMENTAÇÃO: Endpoint para buscar todos os maquinários.
    const response = await fetch("http://localhost:8080/maquinarios");

    if (!response.ok) {
      throw new Error("Falha na comunicação com a API de maquinários.");
    }

    const maquinarios = await response.json();

    if (maquinarios.length === 0) {
      listaMaquinariosDiv.innerHTML = '<p class="info-message">Você não tem nenhum maquinário cadastrado.</p>';
      return;
    }

    listaMaquinariosDiv.innerHTML = ''; // Limpa a mensagem de carregamento

    maquinarios.forEach(maquinario => {
      // DOCUMENTAÇÃO: Cria a estrutura de listagem padronizada (usando 'list-item').
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('list-item');
      // O ID do item é essencial para Editar/Deletar
      itemDiv.dataset.id = maquinario.id;

      // Conteúdo principal do item (HTML)
      itemDiv.innerHTML = `
                <div class="item-details">
                    <span class="item-nome">${maquinario.nome}</span> 
                    <span class="item-tipo">Tipo: ${maquinario.tipo}</span>
                    <span class="item-situacao">Situação: ${maquinario.situacao}</span>
                    <span class="item-horas">Horas p/ Manutenção: ${maquinario.horasManutencaoPrevista}h</span>
                </div>
                <div class="action-buttons">
                    <button class="btn-edit" data-id="${maquinario.id}"><img src="/img/pencil-square.svg" alt="Editar"></button>
                    <button class="btn-delete" data-id="${maquinario.id}"><img src="/img/trash3.svg" alt="Deletar"></button>
                </div>
            `;

      // Lógica de seleção (mantida do seu código)
      itemDiv.onclick = () => {
        document.querySelectorAll(".list-item").forEach(el =>
          el.classList.remove("selected")
        );
        itemDiv.classList.add("selected");
        maquinarioSelecionado = maquinario.id;
      };

      listaMaquinariosDiv.appendChild(itemDiv);
    });

    // DOCUMENTAÇÃO: Chama a função que ativa a lógica de Edição e Deleção
    anexarEventosBotoesMaquinario();

  } catch (error) {
    console.error("Erro ao carregar maquinários:", error);
    listaMaquinariosDiv.innerHTML = `<p class="error-message">Erro ao carregar maquinários. Status: ${error.message}</p>`;
  }
}

function abrirModal(id) {
  const modal = document.getElementById(id);
  if (!modal) {
    console.error(`❌ Modal ${id} não encontrado`);
    return;
  }
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
}

function fecharModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}

window.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
    event.target.setAttribute("aria-hidden", "true");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  carregarProdutos();
});

const API_PRODUTOS = "http://localhost:8080/produtos";

/* ================================
   1. LISTAR PRODUTOS

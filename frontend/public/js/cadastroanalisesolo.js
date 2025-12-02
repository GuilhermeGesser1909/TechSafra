const API_URL_PROPRIEDADES = "http://localhost:8080/propriedades";
const API_URL_ANALISES = "http://localhost:8080/analises-solo";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-analise-solo");
  const msg = document.getElementById("mensagem");

  // 1. Carregar as propriedades no <select> assim que a página abre
  carregarPropriedades();

  // 2. Configurar o envio do formulário
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      mostrarMensagem("Enviando dados...", "info");

      // Captura os dados (IDs atualizados conforme o novo HTML)
      const dados = {
        area: document.getElementById("area").value,
        tipoSolo: document.getElementById("tipoSolo").value,
        ph: parseFloat(document.getElementById("ph").value),
        materiaOrganica: parseFloat(document.getElementById("materiaOrganica").value),
        dataAnalise: document.getElementById("dataAnalise").value,
        propriedadeId: parseInt(document.getElementById("propriedadeId").value)
      };

      try {
        const resposta = await fetch(API_URL_ANALISES, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados)
        });

        if (!resposta.ok) {
          throw new Error("Erro ao salvar no servidor.");
        }

        mostrarMensagem("Amostra salva com sucesso! Redirecionando...", "sucesso");

        form.reset();

        // Redireciona para o dashboard após 2 segundos
        setTimeout(() => {
          window.location.href = "/template/dashboard.html";
        }, 2000);

      } catch (erro) {
        mostrarMensagem("Erro ao enviar: " + erro.message, "erro");
      }
    });
  }

  // --- Função para buscar as propriedades do Backend ---
  async function carregarPropriedades() {
    const selectPropriedade = document.getElementById("propriedadeId");
    if (!selectPropriedade) return;

    try {
      const resposta = await fetch(API_URL_PROPRIEDADES);
      if (resposta.ok) {
        const propriedades = await resposta.json();

        // Limpa o select e adiciona opção padrão
        selectPropriedade.innerHTML = '<option value="">Selecione...</option>';

        // Preenche com as fazendas vindas do banco
        propriedades.forEach(prop => {
          const option = document.createElement("option");
          option.value = prop.id;
          option.textContent = prop.nome;
          selectPropriedade.appendChild(option);
        });
      } else {
        selectPropriedade.innerHTML = '<option value="">Erro ao carregar lista</option>';
      }
    } catch (erro) {
      console.error("Erro ao buscar propriedades:", erro);
      mostrarMensagem("Não foi possível carregar as propriedades.", "erro");
    }
  }

  // --- Tua função original de mensagem (Mantida) ---
  function mostrarMensagem(texto, tipo) {
    if (!msg) return;

    msg.style.display = "block";
    msg.textContent = texto;

    const cores = {
      sucesso: "#28a745",
      erro: "#dc3545",
      info: "#0d6efd"
    };

    msg.style.background = cores[tipo] || "#333";
    msg.style.color = "white";
    msg.style.padding = "12px";
    msg.style.marginBottom = "15px";
    msg.style.borderRadius = "6px";

    setTimeout(() => {
      msg.style.display = "none";
    }, 5000);
  }
});
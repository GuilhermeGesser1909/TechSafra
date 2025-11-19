document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formAnaliseSolo");
  const msg = document.getElementById("mensagem");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    mostrarMensagem("Enviando dados...", "info");

    const dados = {
      nomeAmostra: document.getElementById("nomeAmostra").value,
      analise: document.getElementById("analise").value,
      dataColeta: document.getElementById("dataColeta").value,
      nivelph: document.getElementById("nivelph").value,
      observacoes: document.getElementById("observacoes").value
    };

    try {
      const resposta = await fetch("http://localhost:3000/api/solo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });

      if (!resposta.ok) {
        throw new Error("Erro ao salvar no servidor.");
      }

      mostrarMensagem("Amostra salva com sucesso!", "sucesso");

      form.reset();

    } catch (erro) {
      mostrarMensagem("Erro ao enviar: " + erro.message, "erro");
    }
  });

  function mostrarMensagem(texto, tipo) {
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

    // Remove após 5 segundos
    setTimeout(() => {
      msg.style.display = "none";
    }, 5000);
  }
});

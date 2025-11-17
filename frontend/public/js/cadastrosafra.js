document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formSafra");
  const resultado = document.getElementById("resultado");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const safraData = {
      nomeSafra: document.getElementById("nomeSafra").value,
      cultura: document.getElementById("cultura").value,
      dataInicio: document.getElementById("dataInicio").value,
      dataFim: document.getElementById("dataFim").value,
      area: document.getElementById("area").value,
      producao: document.getElementById("producao").value,
      custos: document.getElementById("custos").value,
      observacoes: document.getElementById("observacoes").value,
    };

    try {
      const response = await fetch("http://localhost:8080/safras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(safraData),
      });

      if (!response.ok) throw new Error("Erro ao salvar Safra");

      const data = await response.json();

      resultado.innerHTML = `
        <p style="color: green; font-weight: bold;">Safra salva com sucesso!</p>
        <p><strong>ID:</strong> ${data.id}</p>
      `;
      window.location.href = "/template/dashboard.html";
      form.reset();


    } catch (err) {
      resultado.innerHTML = `
        <p style="color: red;"><strong>${err.message}</strong></p>
      `;
    }
  });
});

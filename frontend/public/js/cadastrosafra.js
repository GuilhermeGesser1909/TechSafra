document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formSafra");
  const resultado = document.getElementById("resultado");
  const selectPropriedade = document.getElementById("propriedadeId");

  const carregarPropriedades = async () => {
    try {
      const response = await fetch("http://localhost:8080/propriedades");
      if (!response.ok) throw new Error("Erro ao carregar propriedades");

      const propriedades = await response.json();

      selectPropriedade.innerHTML = '<option value="">Selecione a Propriedade...</option>';

      propriedades.forEach(p => {
        const option = document.createElement("option");
        option.value = p.id;
        option.textContent = p.nome;
        selectPropriedade.appendChild(option);
      });

    } catch (err) {
      console.error(err);
      selectPropriedade.innerHTML = '<option value="">Erro ao carregar propriedades</option>';
    }
  };

  carregarPropriedades();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const safraData = {
      propriedadeId: parseInt(document.getElementById("propriedadeId").value),

      nome: document.getElementById("nomeSafra").value,
      cultura: document.getElementById("cultura").value,
      dataInicio: document.getElementById("dataInicio").value,
      dataFim: document.getElementById("dataFim").value,

      areaPlantada: parseFloat(document.getElementById("area").value),
      producaoEsperada: parseFloat(document.getElementById("producao").value),
      custos: parseFloat(document.getElementById("custos").value),

      observacoes: document.getElementById("observacoes").value,
    };

    try {
      const response = await fetch("http://localhost:8080/safras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(safraData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(JSON.stringify(data));

      resultado.innerHTML = `
        <p style="color: green; font-weight: bold;">Safra salva com sucesso!</p>
        <p><strong>ID:</strong> ${data.id}</p>
      `;

      setTimeout(() => {
        window.location.href = "/template/dashboard.html";
      }, 1000);

      form.reset();

    } catch (err) {
      resultado.innerHTML = `<p style="color:red;"><strong>Erro: ${err}</strong></p>`;
      console.error("Erro ao enviar Safra:", err);
    }
  });
});

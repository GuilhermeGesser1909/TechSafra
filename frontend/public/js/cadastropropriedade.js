document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPropriedade");
  const resultado = document.getElementById("resultado");
  const API_URL = "http://localhost:8080/propriedades";

  const usuarioId = localStorage.getItem("usuarioId");

  if (!usuarioId) {
    alert("Usuário não autenticado! Faça login primeiro.");
    window.location.href = "/template/telalogin.html";
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const novaPropriedade = {
      nome: document.getElementById("nomePropriedade").value.trim(),
      localizacao: document.getElementById("nomecidade").value.trim(),
      estado: document.getElementById("Estado").value,
      areaHectares: parseFloat(document.getElementById("tamanhopropriedade").value),
      areaCultivavel: parseFloat(document.getElementById("areaCultivavel").value) || 0,
      areaReserva: parseFloat(document.getElementById("areaReserva").value) || 0,
      solo: document.getElementById("solo").value,
      topografia: document.getElementById("topografia").value,
      irrigacao: document.getElementById("irrigacao").value,
      culturaPrincipal: document.getElementById("culturaPrincipal").value,
      culturaSecundaria: document.getElementById("culturaSecundaria").value,
      numTalhoes: parseInt(document.getElementById("numTalhoes").value) || 0,
      responsavel: document.getElementById("responsavel").value,
      telefone: document.getElementById("telefone").value,
      emailContato: document.getElementById("emailContato").value,
      cnpjCpf: document.getElementById("cnpjCpf").value,
      cep: document.getElementById("cep").value,
      endereco: document.getElementById("endereco").value,
      latitude: document.getElementById("latitude").value,
      longitude: document.getElementById("longitude").value,
      observacoes: document.getElementById("observacoes").value,
      usuarioId: parseInt(usuarioId)
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaPropriedade),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar propriedade.");

      const propriedadeCriada = await response.json();
      resultado.innerHTML = `<p class="success">✅ Propriedade <strong>${propriedadeCriada.nome}</strong> cadastrada com sucesso!</p>`;

      form.reset();

      setTimeout(() => {
        window.location.href = "/template/dashboard.html";
      }, 2000);
    } catch (error) {
      console.error(error);
      resultado.innerHTML = `<p class="error">❌ ${error.message}</p>`;
    }
  });
});

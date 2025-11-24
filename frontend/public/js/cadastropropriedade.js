document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPropriedade");
  const resultado = document.getElementById("resultado");
  const API_URL = "http://localhost:8080/propriedades";
  const usuarioId = localStorage.getItem("usuarioId");

  if (!usuarioId) {
    resultado.innerHTML = "<p style='color:red;'>Usuário não autenticado!</p>";
    setTimeout(() => (window.location.href = "/telalogin.html"), 2000);
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const propriedade = {
      nome: document.getElementById("nomePropriedade").value.trim(),
      responsavel: document.getElementById("responsavel").value.trim(),
      telefone: document.getElementById("telefone").value.trim(),
      emailContato: document.getElementById("emailContato").value.trim(),
      cnpjCpf: document.getElementById("cnpjCpf").value.trim(),
      localizacao: document.getElementById("nomecidade").value.trim(),
      estado: document.getElementById("Estado").value,
      cep: document.getElementById("cep").value.trim(),
      endereco: document.getElementById("endereco").value.trim(),
      latitude: document.getElementById("latitude").value.trim(),
      longitude: document.getElementById("longitude").value.trim(),
      areaHectares: parseFloat(document.getElementById("tamanhopropriedade").value) || 0,
      areaCultivavel: parseFloat(document.getElementById("areaCultivavel").value) || 0,
      areaReserva: parseFloat(document.getElementById("areaReserva").value) || 0,
      solo: document.getElementById("solo").value,
      topografia: document.getElementById("topografia").value,
      irrigacao: document.getElementById("irrigacao").value,
      culturaPrincipal: document.getElementById("culturaPrincipal").value.trim(),
      culturaSecundaria: document.getElementById("culturaSecundaria").value.trim(),
      numTalhoes: parseInt(document.getElementById("numTalhoes").value) || 0,
      observacoes: document.getElementById("observacoes").value.trim(),
      usuarioId: parseInt(usuarioId),
    };

    console.log("📤 Enviando propriedade:", propriedade);

    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propriedade),
      });

      if (resp.ok) {
        resultado.innerHTML = "<p style='color:green;'>✅ Propriedade cadastrada com sucesso!</p>";
        form.reset();
        setTimeout(() => (window.location.href = "/template/dashboard.html"), 1500);
      } else {
        resultado.innerHTML = "<p style='color:red;'>❌ Erro ao cadastrar propriedade.</p>";
      }
    } catch (error) {
      console.error("Erro ao cadastrar propriedade:", error);
      resultado.innerHTML = "<p style='color:red;'>⚠️ Falha de comunicação com o servidor.</p>";
    }
  });
});

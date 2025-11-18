document.getElementById("formMaquinario").addEventListener("submit", async (event) => {
  event.preventDefault();

  const usuarioId = localStorage.getItem("usuarioId"); // já usamos isso antes nas outras telas

  const data = {
    nome: document.getElementById("nomeMaquinario").value,
    tipo: document.getElementById("tipomaquinario").value,
    horasTrabalhadasDia: Number(document.getElementById("horadia").value),
    horasManutencaoPrevista: Number(document.getElementById("horamanu").value),
    situacao: document.getElementById("situacaomaquinario").value,
    observacoes: document.getElementById("observacoesmaquinario").value,
    usuarioId: usuarioId
  };

  const response = await fetch("http://localhost:8080/maquinarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    alert("Maquinário salvo com sucesso!");
    window.location.href = "/template/dashboard.html";
  } else {
    alert("Erro ao salvar o maquinário.");
  }
});

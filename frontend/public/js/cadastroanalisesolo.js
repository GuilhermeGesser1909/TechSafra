document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formAnaliseSolo");
  const resultado = document.getElementById("resultado");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nomeAmostra = document.getElementById("nomeAmostra").value;
    const analise = document.getElementById("analise").value;
    const DataColeta = document.getElementById("DataColeta").value;
    const nivelph = document.getElementById("nivelph").value;
    const observacoes = document.getElementById("observacoes").value;
    resultado.innerHTML = `
<p><strong>Nome da Amostra:</strong> ${nomeAmostra}</p>
<p><strong>Tipo de analise desejada:</strong> ${analise}</p>
<p><strong>Data da Coleta:</strong> ${DataColeta} cm</p>
<p><strong>Nível de PH do solo:</strong> ${nivelph}</p>
<p><strong>OPrincipais Nutrientes:</strong> ${observacoes || "Nenhuma observação"}</p>
       `;
    form.reset();
  });
});

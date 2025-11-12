document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formSafra");
  const resultado = document.getElementById("resultado");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nomeSafra = document.getElementById("nomeSafra").value;
    const cultura = document.getElementById("cultura").value;
    const dataInicio = document.getElementById("dataInicio").value;
    const dataFim = document.getElementById("dataFim").value;
    const area = document.getElementById("area").value;
    const producao = document.getElementById("producao").value;
    const custos = document.getElementById("custos").value;
    const observacoessafra = document.getElementById("observacoes").value;
    resultado.innerHTML = `
<p><strong>Nome da Safra</strong> ${nomeSafra}</p>
<p><strong>Cultura:</strong> ${cultura}</p>
<p><strong>Data de Início:</strong> ${dataInicio} </p>
<p><strong>Data de Fim:</strong> ${dataFim}</p>
<p><strong>Área Cultivada (ha):</strong> ${area}</p>
<p><strong>Produção Esperada (ton):</strong> ${producao}</p>
<p><strong>Custos Estimados (R$):</strong> ${custos}</p>
<p><strong>Observações:</strong> ${observacoessafra || "Nenhuma observação"}</p>

       `;
    form.reset();
  });
});

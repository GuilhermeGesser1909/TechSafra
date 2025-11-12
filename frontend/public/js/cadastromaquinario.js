document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formMaquinario");
  const resultado = document.getElementById("resultado");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nomeMaquinario = document.getElementById("nomeMaquinario").value;
    const tipomaquinario = document.getElementById("tipomaquinario").value;
    const horadia = document.getElementById("horadia").value;
    const horamanu = document.getElementById("horamanu").value;
    const situacaomaquinario = document.getElementById("situacaomaquinario").value;
    const observacoesmaquinario = document.getElementById("observacoesmaquinario").value;
    resultado.innerHTML = `
<p><strong>Nome da Máquinario:</strong> ${nomeMaquinario}</p>
<p><strong>Tipo:</strong> ${tipomaquinario}</p>
<p><strong>Horas trabalhadas por dia:</strong> ${horadia}</p>
<p><strong>Horas previstas para manutenção:</strong> ${horamanu}</p>
<p><strong>Situação:</strong> ${ansituacaomaquinarioo}</p>
<p><strong>Observações:</strong> ${observacoesmaquinario}</p>
       `;
    form.reset();
  });
});

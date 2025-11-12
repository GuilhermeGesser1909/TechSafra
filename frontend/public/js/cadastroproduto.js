document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("forproduto");
  const resultado = document.getElementById("resultado");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nomeProduto = document.getElementById("nomeProduto").value;
    const Quantidade = document.getElementById("Quantidade").value;
    const Tipo = document.getElementById("Tipo").value;
    const custoproduto = document.getElementById("custos").value;
    resultado.innerHTML = `
<p><strong>Nome do Produto:</strong> ${nomeProduto}</p>
<p><strong>Quantidade:</strong> ${Quantidade}</p>
<p><strong>Tipo do Produto:</strong> ${Tipo} </p>
<p><strong>Custo (R$):</strong> ${custoproduto}</p>
       `;
    form.reset();
  });
});

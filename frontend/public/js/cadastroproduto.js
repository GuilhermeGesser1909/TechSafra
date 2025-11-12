document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("forproduto");
  const resultado = document.getElementById("resultado");
  const API_URL = "http://localhost:8080/produtos";

  const propriedadeId = localStorage.getItem("propriedadeId");

  if (!propriedadeId) {
    alert("Propriedade não selecionada! Cadastre ou selecione uma propriedade primeiro.");
    window.location.href = "/template/cadastropropriedade.html";
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const novoProduto = {
      nome: document.getElementById("nomeProduto").value.trim(),
      quantidade: parseFloat(document.getElementById("Quantidade").value),
      tipo: document.getElementById("Tipo").value,
      custo: parseFloat(document.getElementById("custos").value),
      propriedadeId: parseInt(propriedadeId)
    };
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoProduto),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar produto.");

      const produtoCriado = await response.json();
      resultado.innerHTML = `<p class="success">✅ Produto <strong>${produtoCriado.nome}</strong> cadastrado com sucesso!</p>`;

      form.reset();

      setTimeout(() => {
        window.location.href = "/template/dashboard.html";
      }, 2000);
    } catch (error) {
      console.error(error);
      resultado.innerHTML = `<p class="error">❌ Falha ao cadastrar produto. Tente novamente.</p>`; 
    }
  });
});
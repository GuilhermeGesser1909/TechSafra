const form = document.getElementById("formproduto");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    nomeProduto: document.getElementById("nomeProduto").value,
    quantidade: parseFloat(document.getElementById("Quantidade").value),
    tipoProduto: document.getElementById("Tipo").value,
    custo: parseFloat(document.getElementById("custoproduto").value)
  };

  try {
    const resposta = await fetch("http://localhost:8080/produtos/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
      const erro = await resposta.text();
      alert("Erro ao cadastrar: " + erro);
      return;
    }

    alert("Produto cadastrado com sucesso!");

    window.location.href = "/template/dashboard.html";

  } catch (error) {
    alert("Erro ao conectar com o servidor!");
    console.error(error);
  }
});

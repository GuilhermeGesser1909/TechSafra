document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formSafra");
  const resultado = document.getElementById("resultado");
  const selectPropriedade = document.getElementById("propriedadeId"); // Novo elemento

  // Função para buscar e popular as propriedades
  const carregarPropriedades = async () => {
    try {
      // Assumindo que o endpoint para propriedades é /propriedades
      const response = await fetch("http://localhost:8080/propriedades");
      if (!response.ok) throw new Error("Erro ao carregar propriedades");

      const propriedades = await response.json();

      // Limpa o select, mantendo a opção "Selecione..."
      selectPropriedade.innerHTML = '<option value="">Selecione a Propriedade...</option>';

      propriedades.forEach(propriedade => {
        const option = document.createElement("option");
        // O valor (value) é o ID (Integer) que o backend espera
        option.value = propriedade.id;
        // O texto que o usuário vê (geralmente o nome ou uma descrição)
        option.textContent = propriedade.nome;
        selectPropriedade.appendChild(option);
      });
    } catch (err) {
      console.error("Erro no carregamento de propriedades:", err);
      // Mensagem de erro amigável para o usuário
      selectPropriedade.innerHTML = '<option value="">Erro ao carregar propriedades</option>';
    }
  };

  // Chama a função para carregar as propriedades ao carregar a página
  carregarPropriedades();

  // Listener para o envio do formulário
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const safraData = {
      // NOVO CAMPO: Adicionado o valor do select de propriedade
      propriedadeId: parseInt(document.getElementById("propriedadeId").value), // Converte para Integer

      nomeSafra: document.getElementById("nomeSafra").value,
      cultura: document.getElementById("cultura").value,
      dataInicio: document.getElementById("dataInicio").value,
      dataFim: document.getElementById("dataFim").value,
      // Certifique-se de que os valores numéricos sejam convertidos para o tipo correto (Number)
      area: parseFloat(document.getElementById("area").value),
      producao: parseFloat(document.getElementById("producao").value),
      custos: parseFloat(document.getElementById("custos").value),

      observacoes: document.getElementById("observacoes").value,
    };

    try {
      const response = await fetch("http://localhost:8080/safras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(safraData),
      });

      if (!response.ok) throw new Error("Erro ao salvar Safra. Verifique os dados.");

      const data = await response.json();

      resultado.innerHTML = `
                <p style="color: green; font-weight: bold;">Safra salva com sucesso!</p>
                <p><strong>ID:</strong> ${data.id}</p>
            `;

      // Atrasar o redirecionamento para o usuário ver a mensagem de sucesso
      setTimeout(() => {
        window.location.href = "/template/dashboard.html";
      }, 1000);

      form.reset();

    } catch (err) {
      resultado.innerHTML = `
                <p style="color: red;"><strong>Erro: ${err.message}</strong></p>
            `;
      console.error("Erro ao enviar Safra:", err);
    }
  });
});
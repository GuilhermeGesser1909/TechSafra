function obterIdDaUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function carregarDadosEdicao(id) {
  document.querySelector('h1').textContent = "Edição de Maquinário";

  try {
    const response = await fetch(`http://localhost:8080/maquinarios/${id}`);

    if (!response.ok) {
      throw new Error('Maquinário não encontrado.');
    }

    const maquinario = await response.json();

    document.getElementById("nomeMaquinario").value = maquinario.nome;
    document.getElementById("tipomaquinario").value = maquinario.tipo;
    document.getElementById("horadia").value = maquinario.horasTrabalhadasDia;
    document.getElementById("horamanu").value = maquinario.horasManutencaoPrevista;
    document.getElementById("situacaomaquinario").value = maquinario.situacao;
    document.getElementById("observacoesmaquinario").value = maquinario.observacoes;

  } catch (error) {
    alert("Erro ao carregar dados para edição: " + error.message);
    console.error(error);
    window.location.href = '/template/dashboard.html';
  }
}

const maquinarioIdParaEdicao = obterIdDaUrl();
if (maquinarioIdParaEdicao) {
  carregarDadosEdicao(maquinarioIdParaEdicao);
}

document.getElementById("formMaquinario").addEventListener("submit", async (event) => {
  event.preventDefault();

  const usuarioId = localStorage.getItem("usuarioId");

  if (!usuarioId) {
    alert("Sessão expirada. Por favor, faça login novamente.");
    window.location.href = "/template/telalogin.html";
    return;
  }

  const data = {
    nome: document.getElementById("nomeMaquinario").value,
    tipo: document.getElementById("tipomaquinario").value,
    horasTrabalhadasDia: Number(document.getElementById("horadia").value),
    horasManutencaoPrevista: Number(document.getElementById("horamanu").value),
    situacao: document.getElementById("situacaomaquinario").value,
    observacoes: document.getElementById("observacoesmaquinario").value,
    usuarioId: usuarioId
  };

  const maquinarioId = obterIdDaUrl();
  const isEditing = !!maquinarioId;

  const method = isEditing ? 'PUT' : 'POST';
  const url = isEditing
    ? `http://localhost:8080/maquinarios/${maquinarioId}`
    : "http://localhost:8080/maquinarios";


  const response = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    alert("Maquinário " + (isEditing ? "atualizado" : "salvo") + " com sucesso!");
    window.location.href = "/template/dashboard.html";
  } else {
    console.error("Erro ao salvar/atualizar o maquinário. Status:", response.status);
    alert(`Erro ao salvar/atualizar o maquinário. Status: ${response.status}. Verifique o console para mais detalhes.`);
  }
});
/* public/js/cadastromaquinario.js - Adaptado */

// Função para pegar o ID da URL (ex: ?id=1)
function obterIdDaUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Carrega os dados se for edição
async function carregarDadosEdicao(id) {
  const titulo = document.querySelector('h1');
  if (titulo) titulo.textContent = "Edição de Maquinário";

  try {
    const response = await fetch(`http://localhost:8080/maquinarios/${id}`);

    if (!response.ok) {
      throw new Error('Maquinário não encontrado.');
    }

    const maquinario = await response.json();

    // Preenche os campos do formulário com os dados vindos do backend
    // Certifique-se que os IDs no HTML correspondem a estes:
    document.getElementById("nomeMaquinario").value = maquinario.nome;
    document.getElementById("tipomaquinario").value = maquinario.tipo;
    document.getElementById("horadia").value = maquinario.horasTrabalhadasDia;
    document.getElementById("horamanu").value = maquinario.horasManutencaoPrevista;
    document.getElementById("situacaomaquinario").value = maquinario.situacao;
    document.getElementById("observacoesmaquinario").value = maquinario.observacoes || "";

  } catch (error) {
    alert("Erro ao carregar dados: " + error.message);
    console.error(error);
    window.location.href = '/template/dashboard.html';
  }
}

// Verifica se existe ID na URL ao carregar a página
const maquinarioIdParaEdicao = obterIdDaUrl();
if (maquinarioIdParaEdicao) {
  carregarDadosEdicao(maquinarioIdParaEdicao);
}

// Manipulador do envio do formulário
document.getElementById("formMaquinario").addEventListener("submit", async (event) => {
  event.preventDefault();

  const btnSalvar = event.target.querySelector("button[type='submit']");
  btnSalvar.disabled = true; // Evita duplo clique
  btnSalvar.textContent = "Salvando...";

  const usuarioId = localStorage.getItem("usuarioId");

  if (!usuarioId) {
    alert("Sessão expirada. Por favor, faça login novamente.");
    window.location.href = "/template/telalogin.html";
    return;
  }

  // Cria o objeto DTO conforme esperado pelo Backend
  const data = {
    nome: document.getElementById("nomeMaquinario").value,
    tipo: document.getElementById("tipomaquinario").value,
    horasTrabalhadasDia: Number(document.getElementById("horadia").value),
    horasManutencaoPrevista: Number(document.getElementById("horamanu").value),
    situacao: document.getElementById("situacaomaquinario").value,
    observacoes: document.getElementById("observacoesmaquinario").value,
    usuarioId: Number(usuarioId) // Conversão importante para Long
  };

  const maquinarioId = obterIdDaUrl();
  const isEditing = !!maquinarioId;

  const method = isEditing ? 'PUT' : 'POST';
  const url = isEditing
    ? `http://localhost:8080/maquinarios/${maquinarioId}`
    : "http://localhost:8080/maquinarios";

  try {
    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Maquinário " + (isEditing ? "atualizado" : "salvo") + " com sucesso!");
      window.location.href = "/template/dashboard.html";
    } else {
      // Tenta ler a mensagem de erro do backend para mostrar ao usuário
      const erroTexto = await response.text();
      console.error("Erro API:", erroTexto);
      alert(`Erro ao salvar: ${erroTexto || response.status}`);
    }
  } catch (error) {
    console.error("Erro de rede:", error);
    alert("Erro de conexão ao tentar salvar o maquinário.");
  } finally {
    btnSalvar.disabled = false;
    btnSalvar.textContent = "Salvar Maquinário";
  }
});
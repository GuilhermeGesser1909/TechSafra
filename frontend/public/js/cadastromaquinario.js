// TechSafra/frontend/public/js/cadastromaquinario.js (COMPLETO E CORRIGIDO PARA EDIÇÃO/CADASTRO)

// --- FUNÇÕES AUXILIARES ---

// DOCUMENTAÇÃO: Extrai o parâmetro 'id' da URL (necessário para o modo Edição).
function obterIdDaUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id'); // Retorna o ID (UUID em string) ou null
}

// DOCUMENTAÇÃO: Busca os dados do maquinário e preenche o formulário se um ID for encontrado.
async function carregarDadosEdicao(id) {
  document.querySelector('h1').textContent = "Edição de Maquinário";

  try {
    // Busca o maquinário na API (GET /maquinarios/{id})
    const response = await fetch(`http://localhost:8080/maquinarios/${id}`);

    if (!response.ok) {
      throw new Error('Maquinário não encontrado.');
    }

    const maquinario = await response.json();

    // Preenche o formulário com os dados recebidos
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

// --- INICIALIZAÇÃO DO FORMULÁRIO (CHAMADA AGORA ADICIONADA) ---

// DOCUMENTAÇÃO: Verifica se há um ID na URL ao carregar a página e inicia o modo Edição.
const maquinarioIdParaEdicao = obterIdDaUrl();
if (maquinarioIdParaEdicao) {
  carregarDadosEdicao(maquinarioIdParaEdicao);
}


// --- EVENT LISTENER DE SUBMISSÃO (MODIFICADO PARA PUT/POST) ---

document.getElementById("formMaquinario").addEventListener("submit", async (event) => {
  event.preventDefault();

  const usuarioId = localStorage.getItem("usuarioId");

  // Validação de segurança crucial
  if (!usuarioId) {
    alert("Sessão expirada. Por favor, faça login novamente.");
    window.location.href = "/template/telalogin.html";
    return;
  }

  // Coleta os dados do formulário
  const data = {
    nome: document.getElementById("nomeMaquinario").value,
    tipo: document.getElementById("tipomaquinario").value,
    horasTrabalhadasDia: Number(document.getElementById("horadia").value),
    horasManutencaoPrevista: Number(document.getElementById("horamanu").value),
    situacao: document.getElementById("situacaomaquinario").value,
    observacoes: document.getElementById("observacoesmaquinario").value,
    // O ID do usuário é enviado no DTO tanto para cadastro quanto para atualização
    usuarioId: usuarioId
  };

  // DOCUMENTAÇÃO: Lógica para decidir entre POST (cadastro) ou PUT (edição)
  const maquinarioId = obterIdDaUrl(); // Busca o ID novamente
  const isEditing = !!maquinarioId; // true se o ID existe

  const method = isEditing ? 'PUT' : 'POST';
  const url = isEditing
    ? `http://localhost:8080/maquinarios/${maquinarioId}` // PUT para /maquinarios/{id}
    : "http://localhost:8080/maquinarios"; // POST para /maquinarios

  // Executa a requisição
  const response = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    alert("Maquinário " + (isEditing ? "atualizado" : "salvo") + " com sucesso!");
    window.location.href = "/template/dashboard.html";
  } else {
    // Exibe o status do erro para facilitar a depuração no backend
    console.error("Erro ao salvar/atualizar o maquinário. Status:", response.status);
    alert(`Erro ao salvar/atualizar o maquinário. Status: ${response.status}. Verifique o console para mais detalhes.`);
  }
});
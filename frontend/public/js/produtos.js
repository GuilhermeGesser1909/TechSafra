document.addEventListener("DOMContentLoaded", () => {
    carregarProdutos();
});

const API_PRODUTOS = "http://localhost:8080/produtos";

/* ================================
   1. LISTAR PRODUTOS
================================*/
async function carregarProdutos() {
    const lista = document.getElementById("listaEstoque");
    lista.innerHTML = "<p>Carregando...</p>";

    try {
        const resp = await fetch(`${API_PRODUTOS}/listar`);
        if (!resp.ok) throw new Error("Erro ao buscar produtos");

        const produtos = await resp.json();

        if (produtos.length === 0) {
            lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
            return;
        }

        // VISUAL IGUAL PROPRIEDADES
        lista.innerHTML = produtos.map(p => `
  <div class="property-card">
      <h4>${p.nomeProduto}</h4>
      <p><strong>Quantidade:</strong> ${p.quantidade}</p>
      <p><strong>Tipo:</strong> ${p.tipoProduto}</p>
      <p><strong>Custo:</strong> R$ ${p.custo}</p>
      <div class="property-actions">
          <button onclick="editarProduto(${p.id})">✏️ Editar</button>
          <button onclick="abrirModalExcluirProduto(${p.id})">🗑 Excluir</button>
      </div>
  </div>
`).join("");

    } catch (error) {
        lista.innerHTML = "<p style='color:red;'>Erro ao carregar produtos.</p>";
        console.error(error);
    }
}

/* ================================
   2. ABRIR / FECHAR MODAL EXCLUIR
================================*/
function abrirModalExcluirProduto(id) {
    document.getElementById("deleteProdutoId").value = id;
    document.getElementById("modalExcluirProduto").style.display = "flex";
}

function abrirModal(id) {
    document.getElementById(id).style.display = "flex";
}

function fecharModal(id) {
    document.getElementById(id).style.display = "none";
}

/* ================================
   3. EDITAR (GET)
================================*/
async function editarProduto(id) {
    try {
        const resp = await fetch(`${API_PRODUTOS}/${id}`);

        if (!resp.ok) throw new Error("Erro ao buscar produto");

        const p = await resp.json();

        document.getElementById("edit-nomeProduto").value = p.nomeProduto;
        document.getElementById("edit-quantidade").value = p.quantidade;
        document.getElementById("edit-tipoProduto").value = p.tipoProduto;
        document.getElementById("edit-custo").value = p.custo;
        document.getElementById("edit-observacao").value = p.observacao || "";
        document.getElementById("modalEditarEstoque").dataset.id = id;

        abrirModal("modalEditarEstoque");

    } catch (e) {
        alert("Erro ao carregar produto para edição!");
        console.error(e);
    }
}

/* ================================
   4. SALVAR (PUT)
================================*/
document.getElementById("salvarEdicaoEstoqueBtn").addEventListener("click", async () => {

    const id = document.getElementById("modalEditarEstoque").dataset.id;

    const dados = {
        nomeProduto: document.getElementById("edit-nomeProduto").value,
        quantidade: parseFloat(document.getElementById("edit-quantidade").value),
        tipoProduto: document.getElementById("edit-tipoProduto").value,
        custo: parseFloat(document.getElementById("edit-custo").value),
        observacao: document.getElementById("edit-observacao").value
    };

    try {
        const resp = await fetch(`${API_PRODUTOS}/editar/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        if (resp.ok) {
            fecharModal("modalEditarEstoque");
            carregarProdutos();
        } else {
            alert("Erro ao atualizar produto.");
        }

    } catch (e) {
        alert("Erro ao atualizar.");
        console.error(e);
    }
});

async function excluirProduto() {
    const id = document.getElementById("deleteProdutoId").value;

    try {
        const resp = await fetch(`${API_PRODUTOS}/excluir/${id}`, {
            method: "DELETE"
        });

        if (resp.status === 204) {
            fecharModal("modalExcluirProduto");
            carregarProdutos();
        } else {
            alert("Erro ao excluir produto.");
        }

    } catch (e) {
        alert("Erro ao excluir produto.");
        console.error(e);
    }
}


/* Substitua as funções abrirModal e fecharModal no seu dashboard.js por estas versões robustas */

function abrirModal(id) {
  const modal = document.getElementById(id);
  if (!modal) {
    console.error(`❌ Modal ${id} não encontrado`);
    return;
  }

  // 1. Mostra visualmente
  modal.style.display = "flex";

  // 2. CORREÇÃO DO ERRO: Diz aos leitores de tela que o modal agora é visível
  modal.setAttribute("aria-hidden", "false");

  // (Opcional) Focar no primeiro campo para facilitar a digitação imediata
  // Isso evita que o foco fique perdido atrás do modal
  const primeiroInput = modal.querySelector('input, textarea');
  if (primeiroInput) {
    primeiroInput.focus();
  }
}

function fecharModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  // 1. Esconde visualmente
  modal.style.display = "none";

  // 2. CORREÇÃO: Marca como escondido novamente para acessibilidade
  modal.setAttribute("aria-hidden", "true");
}

window.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
    event.target.setAttribute("aria-hidden", "true");
  }
});

document.addEventListener("DOMContentLoaded", async () => {

  const links = document.querySelectorAll(".sidebar nav a");
  const sections = document.querySelectorAll(".card-section");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      sections.forEach((section) => (section.hidden = true));

      const targetId = link.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.hidden = false;

      }
    });
  });
});



// --- Lógica para Salvar Novo Relatório ---
const formRelatorio = document.getElementById("formNovoRelatorio");

if (formRelatorio) {
  formRelatorio.addEventListener("submit", async (e) => {
    e.preventDefault(); // Impede a página de recarregar

    // Monta o objeto JSON igual ao Java espera
    const novoRelatorio = {
      titulo: document.getElementById("relTitulo").value,
      dataGeracao: document.getElementById("relData").value,
      resumo: document.getElementById("relResumo").value,
      areaTotal: parseFloat(document.getElementById("relArea").value) || 0,
      produtividade: parseFloat(document.getElementById("relProdutividade").value) || 0,
      producaoTotal: parseFloat(document.getElementById("relProducao").value) || 0,
      indiceChuva: parseFloat(document.getElementById("relChuva").value) || 0,
      custoPorSaca: parseFloat(document.getElementById("relCusto").value) || 0,
      vendaMedia: parseFloat(document.getElementById("relVenda").value) || 0,
      umidadeMedia: parseFloat(document.getElementById("relUmidade").value) || 0
    };

    try {
      const response = await fetch("http://localhost:8080/relatorios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novoRelatorio)
      });

      if (response.ok) {
        alert("✅ Relatório gerado com sucesso!");
        fecharModal("modalNovoRelatorio");
        formRelatorio.reset(); // Limpa os campos

        // Recarrega a lista se a função existir (verifique se já criou ela no passo anterior)
        if (typeof carregarRelatoriosDashboard === "function") {
          carregarRelatoriosDashboard();
        }
      } else {
        alert("❌ Erro ao salvar relatório.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor.");
    }
  });
}
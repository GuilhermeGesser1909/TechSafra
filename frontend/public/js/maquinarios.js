/* public/js/maquinarios.js - Adaptado para o novo Backend */

document.addEventListener("DOMContentLoaded", () => Maquinarios.init());

const Maquinarios = {
    // URL da API
    api: "http://localhost:8080/maquinarios",

    // Armazena o ID selecionado temporariamente
    selecionado: null,

    init() {
        this.elLista = document.getElementById("listaMaquinarios");

        // Verifica se o elemento da lista existe na página atual antes de rodar
        if (!this.elLista) return;

        this.load();

        // Expõe a função de salvar para ser usada pelo botão "Salvar" do modal no HTML
        window.salvarEdicaoMaquinario = () => this.save();
    },

    async load() {
        this.elLista.innerHTML = "<p>Carregando maquinários...</p>";

        try {
            const resp = await fetch(this.api);
            const data = await resp.json();

            // Verifica se a resposta é válida e se tem itens
            if (!Array.isArray(data) || !data.length) {
                this.elLista.innerHTML = "<p class='info-message'>Nenhum maquinário cadastrado.</p>";
                return;
            }

            // Gera o HTML de cada card
            this.elLista.innerHTML = data.map(m => this.card(m)).join("");

            // Ativa os cliques nos botões de editar e excluir
            this.attachEvents();

        } catch (e) {
            this.elLista.innerHTML = "<p class='error-message'>Erro ao carregar lista de maquinários.</p>";
            console.error("Erro no LOAD:", e);
        }
    },

    card(m) {
        // Tratamento para valores nulos/undefined para evitar erros visuais
        const obs = m.observacoes || 'Nenhuma';
        const situacao = m.situacao || 'Indefinida';
        const horasDia = m.horasTrabalhadasDia || 0;
        const horasManutencao = m.horasManutencaoPrevista || 0;

        return `
      <div class="list-item" data-id="${m.id}">
          <div class="item-details">
              <h4 class="item-title">${m.nome}</h4> 
              <div class="detail-grid">
                  <p><strong>Tipo:</strong> ${m.tipo}</p>
                  <p><strong>Situação:</strong> ${situacao}</p>
                  <p><strong>Horas/Dia:</strong> ${horasDia}h</p>
                  <p><strong>Manutenção:</strong> ${horasManutencao}h</p>
              </div>
              <p class="item-obs"><strong>Observações:</strong> ${obs}</p>
          </div>
          <div class="action-buttons">
              <button class="btn edit-btn" data-edit="${m.id}"><i class="fas fa-edit"></i> Editar</button>
              <button class="btn delete-btn" data-del="${m.id}"><i class="fas fa-trash"></i> Excluir</button>
          </div>
      </div>
    `;
    },

    attachEvents() {
        // Lógica para destacar o item clicado (visual)
        document.querySelectorAll(".list-item").forEach(el => {
            el.onclick = () => {
                document.querySelectorAll(".list-item").forEach(i => i.classList.remove("selected"));
                el.classList.add("selected");
                this.selecionado = el.dataset.id;
            };
        });

        // Configura botões de EDITAR
        document.querySelectorAll("[data-edit]").forEach(btn =>
            btn.onclick = e => {
                e.stopPropagation(); // Impede que o clique selecione o card ao mesmo tempo
                this.loadEdit(btn.dataset.edit);
            }
        );

        // Configura botões de EXCLUIR
        document.querySelectorAll("[data-del]").forEach(btn =>
            btn.onclick = e => {
                e.stopPropagation();
                this.delete(btn.dataset.del);
            }
        );
    },

    async loadEdit(id) {
        try {
            // Busca os dados atuais do maquinário pelo ID
            const resp = await fetch(`${this.api}/${id}`);
            if (!resp.ok) throw new Error("Não foi possível carregar os dados.");

            const m = await resp.json();

            // Preenche os campos do formulário no Modal (baseado nos IDs do dashboard.html)
            document.getElementById("editMaquinarioId").value = m.id;
            document.getElementById("edit-nomeMaquinario").value = m.nome;
            document.getElementById("edit-tipoMaquinario").value = m.tipo;
            document.getElementById("edit-horasTrabalhadasDia").value = m.horasTrabalhadasDia;
            document.getElementById("edit-horasManutencaoPrevista").value = m.horasManutencaoPrevista;
            document.getElementById("edit-situacaoMaquinario").value = m.situacao;
            document.getElementById("edit-obsMaquinario").value = m.observacoes;

            // Preenche o resumo lateral informativo
            document.getElementById("resumo-nomeMaquinario").textContent = m.nome;
            document.getElementById("resumo-tipoMaquinario").textContent = m.tipo;
            document.getElementById("resumo-situacao").textContent = m.situacao;
            document.getElementById("resumo-manutencao").textContent = `${m.horasManutencaoPrevista} h`;

            // Abre o modal
            this.abrirModal("modalEditarMaquinario");

        } catch (e) {
            alert("Erro ao carregar dados para edição.");
            console.error(e);
        }
    },

    async delete(id) {
        if (!confirm("Tem certeza que deseja excluir este maquinário? Esta ação não pode ser desfeita.")) return;

        try {
            const resp = await fetch(`${this.api}/${id}`, { method: "DELETE" });

            if (resp.ok) {
                alert("Maquinário excluído com sucesso!");
                this.load(); // Recarrega a lista para sumir com o item
            } else {
                alert("Erro ao excluir. Tente novamente.");
            }

        } catch (e) {
            alert("Erro de conexão.");
            console.error(e);
        }
    },

    async save() {
        // 1. Recupera o ID do maquinário que está escondido no input hidden
        const id = document.getElementById("editMaquinarioId").value;

        // 2. Recupera o ID do usuário logado (ESSENCIAL para o novo backend)
        const usuarioId = localStorage.getItem("usuarioId");

        if (!usuarioId) {
            alert("Sessão expirada. Faça login novamente.");
            window.location.href = "/template/telalogin.html";
            return;
        }

        // 3. Monta o objeto com os dados do formulário
        const payload = {
            nome: document.getElementById("edit-nomeMaquinario").value,
            tipo: document.getElementById("edit-tipoMaquinario").value,
            // Converte string para número com Number()
            horasTrabalhadasDia: Number(document.getElementById("edit-horasTrabalhadasDia").value),
            horasManutencaoPrevista: Number(document.getElementById("edit-horasManutencaoPrevista").value),
            situacao: document.getElementById("edit-situacaoMaquinario").value,
            observacoes: document.getElementById("edit-obsMaquinario").value,
            usuarioId: usuarioId // Envia o ID do usuário para manter o vínculo
        };

        try {
            const resp = await fetch(`${this.api}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (resp.ok) {
                alert("Maquinário atualizado com sucesso!");
                this.fecharModal("modalEditarMaquinario");
                this.load(); // Atualiza a lista na tela
            } else {
                const erroTexto = await resp.text();
                console.error("Erro API:", erroTexto);
                alert("Erro ao salvar alterações. Verifique os dados.");
            }

        } catch (e) {
            alert("Erro de rede ao tentar salvar.");
            console.error(e);
        }
    },

    // Funções auxiliares para controlar o Modal
    abrirModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.display = "flex";
            modal.setAttribute("aria-hidden", "false");
        }
    },

    fecharModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.display = "none";
            modal.setAttribute("aria-hidden", "true");
        }
    }
};
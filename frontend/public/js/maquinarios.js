document.addEventListener("DOMContentLoaded", () => Maquinarios.init());

const Maquinarios = {
    api: "http://localhost:8080/maquinarios",
    selecionado: null,

    init() {
        this.elLista = document.getElementById("listaMaquinarios");
        this.load();
    },

    async load() {
        this.elLista.innerHTML = "<p>Carregando maquinários...</p>";

        try {
            const resp = await fetch(this.api);
            const data = await resp.json();

            if (!data.length) {
                this.elLista.innerHTML = "<p class='info-message'>Nenhum maquinário cadastrado.</p>";
                return;
            }

            this.elLista.innerHTML = data.map(m => this.card(m)).join("");
            this.attachEvents();

        } catch (e) {
            this.elLista.innerHTML = "<p class='error-message'>Erro ao carregar maquinários.</p>";
            console.error(e);
        }
    },

    card(m) {
        return `
      <div class="list-item" data-id="${m.id}">
          <div class="item-details">
              <h4 class="item-title">${m.nome}</h4> 
              <div class="detail-grid">
                  <p><strong>Tipo de Máquina:</strong> ${m.tipo}</p>
                  <p><strong>Situação:</strong> ${m.situacao}</p>
                  <p><strong>Horas Trabalhadas (dia):</strong> ${m.horasTrabalhadasDia}h</p>
                  <p><strong>Manutenção Prevista:</strong> ${m.horasManutencaoPrevista}h</p>
              </div>
              <p class="item-obs"><strong>Observações:</strong> ${m.observacoes || 'Nenhuma.'}</p>
          </div>
          <div class="action-buttons">
              <button class="btn edit-btn" data-edit="${m.id}"></i> Editar</button>
              <button class="btn delete-btn" data-del="${m.id}"></i> Excluir</button>
          </div>
      </div>
    `;
    },

    attachEvents() {

        document.querySelectorAll(".list-item").forEach(el => {
            el.onclick = () => {
                document.querySelectorAll(".list-item").forEach(i => i.classList.remove("selected"));
                el.classList.add("selected");
                this.selecionado = el.dataset.id;
            };
        });

        document.querySelectorAll("[data-edit]").forEach(btn =>
            btn.onclick = e => {
                e.stopPropagation();
                this.loadEdit(btn.dataset.edit);
            }
        );

        document.querySelectorAll("[data-del]").forEach(btn =>
            btn.onclick = e => {
                e.stopPropagation();
                this.delete(btn.dataset.del);
            }
        );
    },

    async loadEdit(id) {
        try {
            const resp = await fetch(`${this.api}/${id}`);
            const m = await resp.json();

            document.getElementById("editMaquinarioId").value = m.id;
            document.getElementById("edit-nomeMaquinario").value = m.nome;
            document.getElementById("edit-tipoMaquinario").value = m.tipo;
            document.getElementById("edit-horasTrabalhadasDia").value = m.horasTrabalhadasDia;
            document.getElementById("edit-horasManutencaoPrevista").value = m.horasManutencaoPrevista;
            document.getElementById("edit-situacaoMaquinario").value = m.situacao;
            document.getElementById("edit-obsMaquinario").value = m.observacoes;

            document.getElementById("resumo-nomeMaquinario").textContent = m.nome;
            document.getElementById("resumo-tipoMaquinario").textContent = m.tipo;
            document.getElementById("resumo-situacao").textContent = m.situacao;
            document.getElementById("resumo-manutencao").textContent = `${m.horasManutencaoPrevista} horas`;

            abrirModal("modalEditarMaquinario");

        } catch (e) {
            alert("Erro ao carregar dados.");
            console.error(e);
        }
    },

    async delete(id) {
        if (!confirm("Tem certeza que deseja excluir?")) return;

        try {
            const resp = await fetch(`${this.api}/${id}`, { method: "DELETE" });
            if (!resp.ok) return alert("Erro ao excluir.");

            alert("Excluído com sucesso!");
            this.load();

        } catch (e) {
            alert("Erro de rede");
            console.error(e);
        }
    },

    async save() {
        const id = document.getElementById("editMaquinarioId").value;

        const payload = {
            nome: document.getElementById("edit-nomeMaquinario").value,
            tipo: document.getElementById("edit-tipoMaquinario").value,
            horasTrabalhadasDia: +document.getElementById("edit-horasTrabalhadasDia").value,
            horasManutencaoPrevista: +document.getElementById("edit-horasManutencaoPrevista").value,
            situacao: document.getElementById("edit-situacaoMaquinario").value,
            observacoes: document.getElementById("edit-obsMaquinario").value
        };

        try {
            const resp = await fetch(`${this.api}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!resp.ok) return alert("Erro ao salvar");

            alert("Atualizado!");
            fecharModal("modalEditarMaquinario");
            this.load();

        } catch (e) {
            alert("Erro de rede");
            console.error(e);
        }

        document.addEventListener("DOMContentLoaded", () => {
            carregarMaquinarios();
        });

        let maquinarioSelecionado = null;

        async function carregarMaquinarios() {
            const lista = document.getElementById("listaMaquinarios");
            lista.innerHTML = "<p>Carregando...</p>";

            try {
                const response = await fetch("http://localhost:8080/maquinarios");
                const dados = await response.json();

                if (!dados.length) {
                    lista.innerHTML = "<p>Nenhum maquinário cadastrado.</p>";
                    return;
                }

                lista.innerHTML = "";

                dados.forEach(m => {
                    const item = document.createElement("div");
                    item.classList.add("machine-item");

                    item.innerHTML = `
        <h4>${m.nome}</h4>
        <p><strong>Tipo:</strong> ${m.tipo}</p>
        <p><strong>Situação:</strong> ${m.situacao}</p>
        <p><strong>Horas/dia:</strong> ${m.horasTrabalhadasDia}</p>
      `;

                    item.onclick = () => {
                        document.querySelectorAll(".machine-item").forEach(el =>
                            el.classList.remove("selected")
                        );
                        item.classList.add("selected");
                        maquinarioSelecionado = m.id;
                    };

                    lista.appendChild(item);
                });
            } catch (erro) {
                lista.innerHTML = "<p>Erro ao carregar maquinários.</p>";
            }
        };

        window.salvarEdicaoMaquinario = () => Maquinarios.save();
        function abrirModal(id) {
            const modal = document.getElementById(id);
            if (!modal) {
                console.error(`❌ Modal ${id} não encontrado`);
                return;
            }
            modal.style.display = "flex";
            modal.setAttribute("aria-hidden", "false");
        }

        function fecharModal(id) {
            const modal = document.getElementById(id);
            if (!modal) return;
            modal.style.display = "none";
            modal.setAttribute("aria-hidden", "true");
        }

        window.addEventListener("click", (event) => {
            if (event.target.classList.contains("modal")) {
                event.target.style.display = "none";
                event.target.setAttribute("aria-hidden", "true");
            }
        });
    }
}
document.addEventListener("DOMContentLoaded", () => {
    carregarRelatorio();
});

async function carregarRelatorio() {
    // Pega o ID da URL (ex: relatorio.html?id=1)
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.getElementById("relatorioTitulo").innerText = "Relatório não selecionado";
        return;
    }

    try {
        const res = await fetch(`http://localhost:8080/relatorios/${id}`);
        if (!res.ok) throw new Error("Erro na API");

        const dados = await res.json();
        preencherTela(dados);

    } catch (erro) {
        console.error(erro);
        document.getElementById("relatorioTitulo").innerText = "Erro ao carregar dados";
        document.getElementById("relatorioResumo").innerHTML = "<span style='color:red'>Não foi possível conectar ao servidor.</span>";
    }
}

function preencherTela(dados) {
    // Cabeçalho
    document.getElementById("relatorioTitulo").innerText = dados.titulo;
    document.getElementById("relatorioData").innerText = formatarData(dados.dataGeracao);
    document.getElementById("relatorioResumo").innerText = dados.resumo || "Sem resumo disponível.";

    // KPIs Superiores
    document.getElementById("kpiArea").innerText = (dados.areaTotal || 0) + " ha";
    document.getElementById("kpiProdutividade").innerText = (dados.produtividade || 0) + " sc/ha";
    document.getElementById("kpiProducao").innerText = (dados.producaoTotal || 0) + " Ton";
    document.getElementById("kpiChuva").innerText = (dados.indiceChuva || 0) + " mm";

    // Tabela Financeira
    const custo = dados.custoPorSaca || 0;
    const venda = dados.vendaMedia || 0;
    const lucro = venda - custo;

    // Formatação monetária
    document.getElementById("dadoCusto").innerText = `R$ ${custo.toFixed(2)}`;
    document.getElementById("dadoVenda").innerText = `R$ ${venda.toFixed(2)}`;
    document.getElementById("dadoUmidade").innerText = (dados.umidadeMedia || 0) + "%";

    // Cálculo Dinâmico de Lucro
    const elLucro = document.getElementById("dadoLucro");
    const elStatus = document.getElementById("statusLucro");

    elLucro.innerText = `R$ ${lucro.toFixed(2)}`;

    if (lucro > 0) {
        elStatus.innerText = "Positivo 🟢";
        elStatus.style.color = "green";
        elLucro.style.color = "green";
    } else if (lucro < 0) {
        elStatus.innerText = "Prejuízo 🔴";
        elStatus.style.color = "red";
        elLucro.style.color = "red";
    } else {
        elStatus.innerText = "Neutro ⚪";
    }
}

function formatarData(dataISO) {
    if (!dataISO) return "--/--/----";
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
}
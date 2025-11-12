function togglePassword(idCampo) {
  const campo = document.getElementById(idCampo);
  const botao = campo.nextElementSibling;

  if (campo.type === "password") {
    campo.type = "text";
    botao.textContent = "Ocultar";
  } else {
    campo.type = "password";
    botao.textContent = "Mostrar";
  }
}

document.getElementById("year").textContent = new Date().getFullYear();

function exibirMensagem(texto, cor = "red") {
  const msg = document.getElementById("mensagem");
  msg.textContent = texto;
  msg.style.color = cor;
}

async function alterarSenha() {
  const email = document.getElementById("emailRecuperacao").value.trim();
  const senha = document.getElementById("password").value.trim();
  const confirmarSenha = document.getElementById("password2").value.trim();

  if (!email || !senha || !confirmarSenha) {
    exibirMensagem("Todos os campos são obrigatórios!");
    return;
  }

  if (senha !== confirmarSenha) {
    exibirMensagem("As senhas não coincidem!");
    return;
  }

  try {
    const resposta = await fetch("http://localhost:8080/usuarios/alterar-senha", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    const textoResposta = await resposta.text();

    if (resposta.ok) {
      exibirMensagem("Senha alterada com sucesso! Redirecionando...", "green");
      setTimeout(() => {
        window.location.href = "/template/telalogin.html";
      }, 2000);
    } else {
      exibirMensagem(textoResposta || "Erro ao alterar a senha.");
    }
  } catch (erro) {
    console.error("Erro:", erro);
    exibirMensagem("Falha de conexão com o servidor.");
  }
}

document
  .getElementById("btnAlterarSenha")
  .addEventListener("click", alterarSenha);

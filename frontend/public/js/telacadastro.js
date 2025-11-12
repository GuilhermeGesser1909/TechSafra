function togglePassword(id) {
const input = document.getElementById(id);
input.type = input.type === "password" ? "text" : "password";
}

document.getElementById("year").innerText = new Date().getFullYear();

const form = document.getElementById("cadastroForm");
const mensagem = document.getElementById("mensagemCadastro");

const BASE_URL = "http://localhost:8080/usuarios/cadastrar";

form.addEventListener("submit", async (e) => {
e.preventDefault();

const nome = form.nome.value.trim();
const email = form.email.value.trim();
const senha = form.senha.value;
const confirmarSenha = form.confirmarSenha.value;

if (senha !== confirmarSenha) {
mostrarMensagem("As senhas não coincidem!", "erro");
return;
}

try {
const response = await fetch(BASE_URL, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ nome, email, senha, confirmarSenha })
});

if (response.ok) {
  mostrarMensagem("Usuário cadastrado com sucesso!", "sucesso");

  setTimeout(() => {
    window.location.href = "./telalogin.html";
  }, 2000);
} else {
  const erro = await response.text();
  mostrarMensagem("Erro ao cadastrar: " + erro, "erro");
}

} catch (err) {
mostrarMensagem("Falha ao conectar ao servidor.", "erro");
}
});

function mostrarMensagem(texto, tipo) {
mensagem.textContent = texto;
mensagem.className = "mensagem " + tipo;
}
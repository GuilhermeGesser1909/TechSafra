const formLogin = document.getElementById("login-form");
const mensagemLogin = document.getElementById("mensagemLogin");

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("password").value.trim();
  const usuario = { email, senha };

  try {
    const response = await fetch("http://localhost:8080/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("usuarioId", data.id);
      mostrarMensagemLogin("✅ " + data.mensagem, "sucesso");
      setTimeout(() => (window.location.href = "./home.html"), 1000);
    } else {
      mostrarMensagemLogin("❌ " + (data.erro || "Falha no login"), "erro");
    }
  } catch (error) {
    console.error("Erro ao conectar com o servidor:", error);
    mostrarMensagemLogin("🚫 Falha ao conectar ao servidor. Verifique se o backend está rodando.", "erro");
  }
});

function mostrarMensagemLogin(texto, tipo) {
  mensagemLogin.textContent = texto;
  mensagemLogin.className = "mensagem " + tipo;
}

function togglePassword(idCampo) {
  const campo = document.getElementById(idCampo);
  campo.type = campo.type === "password" ? "text" : "password";
}

const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Página inicial (ex: PaginaInicial.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/PaginaInicial.html"));
});

// Outras rotas (caso queira apontar páginas específicas)
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public/template/home.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public/template/dashboard.html"));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

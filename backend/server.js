const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔌 conexão com MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // coloca sua senha aqui
  database: "petshop"
});

db.connect(err => {
  if (err) {
    console.log("Erro ao conectar:", err);
    return;
  }
  console.log("Conectado ao MySQL!");
});

/* =========================
   ROTAS (API)
========================= */

// 🔹 LISTAR
app.get("/api/produtos", (req, res) => {
  db.query("SELECT * FROM produtos ORDER BY nome ASC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// 🔹 CADASTRAR
app.post("/api/produtos", (req, res) => {
  const { nome, preco, quantidade } = req.body;

  db.query(
    "INSERT INTO produtos (nome, preco, quantidade) VALUES (?, ?, ?)",
    [nome, preco, quantidade],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// 🔹 ATUALIZAR (venda)
app.put("/api/produtos/:id", (req, res) => {
  const { id } = req.params;
  const { quantidade } = req.body;

  db.query(
    "UPDATE produtos SET quantidade = ? WHERE id = ?",
    [quantidade, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// 🔹 BUSCAR 1 PRODUTO
app.get("/api/produtos/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM produtos WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
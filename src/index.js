const express = require("express");
const { listagemContas } = require("./controladores/contas");
const { validarSenha } = require("./intermediarios");

const app = express();

app.get("/", (req, res) => {
    res.send("Página inicial do Banco do Desafio");
});

app.use(validarSenha);

app.get("/contas", listagemContas);

app.listen(3000);

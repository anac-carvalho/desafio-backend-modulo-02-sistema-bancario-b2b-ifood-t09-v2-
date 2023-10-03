const express = require("express");

let {
    listarContas,
    obterConta,
    criarConta
} = require("./controladores/contas");

const rotas = express();

const { verificarSenha } = require("./verificarSenha");

rotas.get("/contas", verificarSenha, listarContas);
rotas.get("/contas/:numeroConta", obterConta);

rotas.post("/contas", criarConta);

module.exports = rotas;


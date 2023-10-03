const express = require("express");

const contas = require("./controladores/contas");

const rotas = express();

const { verificarSenha } = require("./verificarSenha");

rotas.get("/contas", verificarSenha, contas.listarContas);
rotas.get("/contas/:numero", contas.obterConta);

module.exports = rotas;

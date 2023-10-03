const express = require("express");

let {
    listarContas,
    obterConta,
    criarConta,
    atualizarConta,
    deletarConta
} = require("./controladores/contas");

let {
    deposito
} = require("./controladores/transacoes");


const rotas = express();

const { verificarSenha } = require("./verificarSenha");

rotas.get("/contas", verificarSenha, listarContas);
rotas.get("/contas/:numeroConta", obterConta);
rotas.post("/contas", criarConta);
rotas.put("/contas/:numeroConta", atualizarConta);
rotas.delete("/contas/:numeroConta", deletarConta);

rotas.post('/transacoes/depositar', deposito);

module.exports = rotas;


const express = require("express");

let {
    listarContas,
    obterConta,
    criarConta,
    atualizarConta,
    deletarConta
} = require("./controladores/contas");

let {
    deposito,
    saque
} = require("./controladores/transacoes");


const rotas = express();

const { verificarSenha } = require("./verificarSenha");

rotas.get("/contas", verificarSenha, listarContas);
rotas.get("/contas/:numeroConta", obterConta);
rotas.post("/contas", criarConta);
rotas.put("/contas/:numeroConta", atualizarConta);
rotas.delete("/contas/:numeroConta", deletarConta);

rotas.post('/transacoes/depositos', deposito);
rotas.post('/transacoes/saques', saque);

module.exports = rotas;


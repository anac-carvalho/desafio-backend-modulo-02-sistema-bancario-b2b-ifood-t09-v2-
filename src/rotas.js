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
    saque,
    transferencia
} = require("./controladores/transacoes");

let {
    mostrarSaldo,
    mostrarExtrato
} = require("./controladores/consultas");

const rotas = express();

const {
    verificarSenhaBanco,
    verificarSenhaConta }
    = require("./verificarSenhas");

rotas.get("/contas", verificarSenhaBanco, listarContas);
rotas.get("/contas/:numeroConta", obterConta);
rotas.post("/contas", criarConta);
rotas.put("/contas/:numeroConta", atualizarConta);
rotas.delete("/contas/:numeroConta", deletarConta);

rotas.post('/transacoes/depositos', deposito);
rotas.post('/transacoes/saques', saque);
rotas.post('/transacoes/transferencias', transferencia);

rotas.get("contas/saldo", verificarSenhaConta, mostrarSaldo);
rotas.get("contas/extrato", verificarSenhaConta, mostrarExtrato);

rotas.get("/contas/saldo")
rotas.get("/contas/extrato")


module.exports = rotas;


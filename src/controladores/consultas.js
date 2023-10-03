const {
    banco,
    contas,
    saques,
    depositos,
    transferencias
} = require("../bancodedados");

const mostrarSaldo = (req, res) => {
    const { numero_conta, senha } = req.params;
    const senha_banco = contas.usuarios.senha

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: "O número da conta e a senha devem ser informaods" });
    }
    if (numero_conta !== numeroConta) {
        return res.status(400).json({ mensagem: "Conta bancária não encontrada" });

    }
    else {
        return res.status(200).json(contas.saldo);

    }

}

const mostrarExtrato = (req, res) => {
    const { numero_conta, senha } = req.params;
    const senha_banco = contas.usuarios.senha

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: "O número da conta e a senha devem ser informaods" });
    }
    if (numero_conta !== numeroConta) {
        return res.status(400).json({ mensagem: "Conta bancária não encontrada" });
    }
    else {
        return res.status(200).json(transferencias, depositos, saques);

    }

}
module.exports = {
    mostrarExtrato,
    mostrarSaldo
}

let banco = require("../bancodedados");

const listarContas = (req, res) => {
    return res.status(200).json(banco.contas);
};

const obterConta = (req, res) => {
    const { numero } = req.params;

    let conta = banco.contas.find((conta) => conta.numero === numero);

    if (!conta) {
        return res.status(400).json({ mensagem: "Conta não encontrado" });
    }
    return res.status(200).json(conta);
}


module.exports = {
    listarContas,
    obterConta
}
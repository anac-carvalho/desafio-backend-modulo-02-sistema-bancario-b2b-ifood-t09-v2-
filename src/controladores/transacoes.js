const {
    banco,
    contas,
    saques,
    depositos,
    transferencias
} = require("../bancodedados");

function deposito(req, res) {
    const numeroConta = contas.numeroConta;

    const { numero_conta, valor } = req.body;

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: " O número da conta e o valor são obrigatórios!" });
    }

    if (numero_conta !== contas.numeroConta) {
        return res.status(400).json({ mensagem: " Número da conta inválido" });
    }
    if (valor <= 0) {
        return res.status(400).json({ mensagem: " Valor deve ser maior ou igual a zero" });
    }
    else {
        contas.saldo += Number(valor);
        const data = new Date();
        const deposito = {
            data: format(data, 'yyyy-MM-dd H:mm:ss'),
            numero_conta,
            valor
        }
        depositos.push(deposito);
        res.status(201).send();
    }
}
module.exports = {
    deposito,
}
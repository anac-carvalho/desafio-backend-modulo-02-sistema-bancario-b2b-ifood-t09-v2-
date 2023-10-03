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

function saque(req, res) {
    const numeroConta = contas.numeroConta;

    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: " Número da conta, valor e senha são obrigatórios!" });
    }

    if (numero_conta !== contas.numeroConta) {
        return res.status(400).json({ mensagem: "Número da conta inválido" });
    }
    if (senha !== conta.usuario.senha) {
        return res.status(401).json({ message: "A senha está incorreta!" })
    }
    if (valor < contas.saldo) {
        return res.status(400).json({ mensagem: "Saldo insuficiente" });
    }
    else {
        contas.saldo -= Number(valor);
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
function transferencia(req, res) {

    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    const contaOrigem = contas.find(conta => conta.numero === numero_conta_origem);
    const contaDestino = contas.find(conta => conta.numero === numero_conta_destino);


    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ mensagem: " Todos os campos são obrigatórios!" });
    }
    if (!contaDestino) {
        return res.status(400).json({ mensagem: "Conta de destino inválida" });
    }
    if (!contaOrigem) {
        return res.status(400).json({ mensagem: "Conta de origem inválida" });
    }
    if (senha !== contaOrigem.usuario.senha) {
        return res.status(401).json({ message: "A senha está incorreta!" })
    }
    if (valor > contaOrigem.saldo) {
        return res.status(400).json({ mensagem: "Saldo indisponível" });
    }
    else {
        contaDestino.saldo += Number(valor);
        const data = new Date();
        const transferenciaCompleta = {
            data: format(data, 'yyyy-MM-dd H:mm:ss'),
            numero_conta_destino,
            numero_conta_origem,
            valor
        }
        depositos.push(transferenciaCompleta);
        res.status(201).send();
    }
}
module.exports = {
    deposito,
    saque,
    transferencia
}
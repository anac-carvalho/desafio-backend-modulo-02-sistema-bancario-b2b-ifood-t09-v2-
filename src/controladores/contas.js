const {
    banco,
    contas,
    saques,
    depositos,
    transferencias
} = require("../bancodedados");

const listarContas = (req, res) => {
    return res
        .status(200)
        .json(contas);
}

const obterConta = (req, res) => {
    const { numeroConta } = req.params;
    let conta = contas.find((conta) => conta.numeroConta === numeroConta);

    if (!conta) {
        return res.status(400).json({ mensagem: "Conta não encontrado" });
    }
    return res.status(200).json(conta);
}

function criarConta(req, res) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res
            .status(400)
            .json({ mensagem: "Todos os campos devem ser preenchido" });
    }

    const emailJaExiste = contas.find((conta) => conta.email === email);

    if (emailJaExiste) {
        return res
            .status(400)
            .json({ mensagem: "Já existe uma conta com o e-mail informado!" });
    }

    const cpfJaExiste = contas.find((conta) => conta.cpf === cpf);

    if (cpfJaExiste) {
        return res
            .status(400)
            .json({ mensagem: "Já existe uma conta com o cpf informado!" });
    }

    const maxId = contas.reduce((acc, conta) =>
        acc > conta.numeroConta ? acc : conta.numeroConta);

    contas.push({
        numeroConta: maxId + 1,
        saldo: 0,
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha,
    });

    return res.status(201).send();

}

function atualizarConta(req, res) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params;

    let contaExiste = contas.find((conta) => contas.numeroConta === Number(numeroConta));
    if (!contaExiste) {
        // devolvendo resposta de erro cliente
        return res.status(400).json({ mensagem: "Conta não encontrada" });
    }

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos devem ser preenchido" });
    }

    const emailJaExiste = contas.find(
        (conta) => conta.email === email && conta.numeroConta !== Number(numeroConta)
    );
    if (emailJaExiste) {
        return res.status(400).json({ mensagem: "Email já existe cadastrado" });
    };

    const cpfJaExiste = contas.find(
        (conta) => conta.cpf === cpf && conta.numeroConta !== Number(numeroConta)
    );
    if (cpf) {
        return res.status(400).json({ mensagem: "CPF já existe cadastrado" });
    };

    contas = contas.map((conta) => {
        if (Number(numeroConta) === aluno.numeroConta) {
            return {
                numeroConta: Number(numeroConta),
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha,
            };
        } else {
            return conta;
        }
    });
    return res.status(204).send();
}

function deletarConta(req, res) {
    const { numeroConta } = req.params;

    const contaIndex = contas.findIndex((conta) => conta.numeroConta === Number(numero));

    if (contaIndex == -1) {

        return res.status(400).json({ mensagem: "Conta não encontrado" });
    }

    if (saldo !== 0) {
        return res.status(400).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
    }

    contas.splice(contaIndex, 1);
    return res.status(204).send();
}

module.exports = {
    listarContas,
    obterConta,
    criarConta,
    atualizarConta,
    deletarConta
}
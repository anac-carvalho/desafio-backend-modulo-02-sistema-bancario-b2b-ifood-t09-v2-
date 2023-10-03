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
};

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


    //  pegando o ultimo id cadastrado
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

module.exports = {
    listarContas,
    obterConta,
    criarConta
}
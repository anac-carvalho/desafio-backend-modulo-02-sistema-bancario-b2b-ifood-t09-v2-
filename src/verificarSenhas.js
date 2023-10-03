const { banco, contas } = require("./bancodedados");

function verificarSenhaBanco(req, res, next) {
    const { senha_banco } = req.query;
    if (!senha_banco) {
        return res.status(400).json({ message: "Senha não informada" })
    }
    if (senha_banco !== banco.senha) {
        return res.status(401).json({ message: "A senha do banco informada é inválida!" });
    }
    next();
}
function verificarSenhaConta(req, res, next) {
    const { senha } = req.query;
    const senha_banco = contas.usuarios.senha
    if (!senha) {
        return res.status(400).json({ message: "Senha não informada" })
    }
    if (senha !== senha_banco) {
        return res.status(401).json({ message: "Senha inválida!" });
    }
    next();
}

module.exports = {
    verificarSenhaBanco,
    verificarSenhaConta
};

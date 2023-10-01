let bancos = require("../bancodedados");

const listagemContas = (req, res) => {
    res.send(bancos.contas);
}
module.exports = {
    listagemContas

};
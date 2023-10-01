const express = require("express");

const app = express();

app.get("/banco", (req, res) => {
    res.send("Página inicial do Banco do Desafio");
});

app.listen(3000);

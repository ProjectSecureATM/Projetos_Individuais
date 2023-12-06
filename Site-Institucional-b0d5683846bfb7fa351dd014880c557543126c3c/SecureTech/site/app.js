// process.env.AMBIENTE_PROCESSO = "desenvolvimento";
process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 3000;

var app = express();

// app.get('/', (req, res) => {
//     const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//     res.send(`Endereço IP: ${ipAddress}`);
// });

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var redeRouter = require("./src/routes/rede");
var pauloRouter = require("./src/routes/Paulo");
var aliceRouter = require("./src/routes/alice");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/rede", redeRouter);
app.use("/Paulo", pauloRouter);
app.use("/alice", aliceRouter);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});
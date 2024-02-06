import  express from 'express';
import winston from 'winston';
import clienteRouter from "./routes/cliente.router.js";
import autorRouter from "./routes/autor.router.js";
import livroRouter from "./routes/livro.router.js";
import vendaRouter from "./routes/venda.router.js";

const app = express();

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(( { level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level} ${message}`;
});
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({ filename: "livraria-api.log"})
    ],
    format: combine(
        label( { label: "livraria-api"}),
        timestamp(),
        myFormat
    )
});


app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send('Bootcamp desenvolvedor back end - Modulo 5 - Atividade Final - Silvio Batista da Silva!');
});


app.use("/cliente", clienteRouter);
app.use("/autor", autorRouter);
app.use("/livro", livroRouter);
app.use("/venda", vendaRouter);


app.use((err, req, res, next) => {

        console.log(err.message) ;
        logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
        res.status(400).send( { error: err.message } );
})


export default app;

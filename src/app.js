import  express from 'express';
import winston from 'winston';
import clienteRouter from "./routes/cliente.router.js";
import autorRouter from "./routes/autor.router.js";
import livroRouter from "./routes/livro.router.js";
import vendaRouter from "./routes/venda.router.js";
import basicAuth from "express-basic-auth"
import clienteService from './services/cliente.service.js';

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

//authorize('admin')

app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send('Bootcamp desenvolvedor back end - Modulo 5 - Atividade Final - Silvio Batista da Silva!');
});

function getRole(username) {

	// Obs: O perfil de usuário está "hard coded", apenas para facilitar 
	// o entendimento. O ideal nesse ponto é buscar as informações do usuário 
	// de um banco de dados, servidor de autorização, etc.
    if (username == 'admin') {
        return 'admin'
    } else {
        return 'role1'
    }
}

function authorize(...allowed) {

    const isAllowed = role => allowed.indexOf(role) > -1;

    return (req, res, next) => {

        if (req.auth.user) {
            const role = getRole(req.auth.user);

            if (isAllowed(role)) {
                next()
            } else {
                res.status(401).send('Role not allowed');
            }
        } else {
            res.status(403).send('User not found');
        }
    }
}

app.use(basicAuth ( { 
    authorizer: async (username, password) => {
        if (username=="admin" && password=="desafio-igti-nodejs") {
		    // Obs: Usuário e senha estão "hard coded", apenas para facilitar 
		    // o entendimento. O ideal nesse ponto é buscar as informações do usuário ,
		    // de um banco de dados, servidor de autorização, etc.
            const userMatches = basicAuth.safeCompare(username, 'admin');
            const pwdMatches = basicAuth.safeCompare(password, 'desafio-igti-nodejs');
            return userMatches && pwdMatches
        } else {    
            const usuario = JSON.stringify(await clienteService.getClienteByEmail(username));
            const objUsuario = JSON.parse(usuario);
            console.log(objUsuario);
            if (objUsuario) {
             
               const nomeUsuario = objUsuario.email;
               const senha = objUsuario.senha;
               const user2Matches = basicAuth.safeCompare(username, nomeUsuario);
               const pwd2Matches = basicAuth.safeCompare(password, senha);

               console.log(nomeUsuario);
               console.log(senha);

             

               return user2Matches && pwd2Matches
            }
            return this.status(401).json({ msg: 'Usuario/Senha inválido!'});
        }
    }
}))


app.use("/cliente", authorize('role1'), clienteRouter);
app.use("/autor", autorRouter);
app.use("/livro", livroRouter);
app.use("/venda", vendaRouter);


app.use((err, req, res, next) => {

        console.log(err.message) ;
        logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
        res.status(400).send( { error: err.message } );
})


export default app;

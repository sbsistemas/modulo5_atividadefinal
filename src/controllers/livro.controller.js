import LivroService from "../services/livro.service.js";

async function createLivro(req, res, next) {

    try {
        let livro = req.body;
        res.status(201).send(await LivroService.createLivro(livro));
        logger.info(`POST /livro - ${JSON.stringify(livro)}`);

    } catch (err) {
        next(err);
    }

}


async function getLivros(req, res, next) {
    try {
        res.status(200).send(await LivroService.getLivros());
        logger.info("GET /livro");

    } catch (err) {
        next(err);
    }

}

async function getLivro(req, res, next) {
    try {
        res.status(200).send(await LivroService.getLivro(req.params.id));
        logger.info("GET /livro/id");

    } catch (err) {
        next(err);
    }

}

async function deleteLivro(req, res, next) {
    try {
        await LivroService.deleteLivro(req.params.id);
        res.end();
        logger.info(`DELETE /livro/id   id=${req.params.id}`);

    } catch (err) {
        next(err);
    }

}

async function updateLivro(req, res, next) {

    try {
        let livro = req.body;
        livro = await LivroService.updateLivro(livro);
        res.send(livro);
        logger.info(`PUT /livro - ${JSON.stringify(livro)}`);

    } catch (err) {
        next(err);
    }

}


export default {
    createLivro,
    getLivros,
    getLivro,
    deleteLivro,
    updateLivro

}
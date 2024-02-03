import AutorService from "../services/autor.service.js";

async function createAutor(req, res, next) {

    try {
        let autor = req.body;
        res.status(201).send(await AutorService.createAutor(autor));
        logger.info(`POST /autor - ${JSON.stringify(autor)}`);

    } catch (err) {
        next(err);
    }

}


async function getAutores(req, res, next) {
    try {
        res.status(200).send(await AutorService.getAutores());
        logger.info("GET /autor");

    } catch (err) {
        next(err);
    }

}

async function getAutor(req, res, next) {
    try {
        res.status(200).send(await AutorService.getAutor(req.params.id));
        logger.info("GET /autor/id");

    } catch (err) {
        next(err);
    }

}

async function deleteAutor(req, res, next) {
    try {
        await AutorService.deleteAutor(req.params.id);
        res.end();
        logger.info("DELETE /autor/id");

    } catch (err) {
        next(err);
    }

}

async function updateAutor(req, res, next) {

    try {
        let autor = req.body;
        autor = await AutorService.updateAutor(autor);
        res.send(autor);
        logger.info(`PUT /autor - ${JSON.stringify(autor)}`);

    } catch (err) {
        next(err);
    }

}


export default {
    createAutor,
    getAutores,
    getAutor,
    deleteAutor,
    updateAutor

}
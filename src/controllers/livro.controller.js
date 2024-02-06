import livroService from "../services/livro.service.js";
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
        if (req.query.autorId) {
            res.status(200).send(await LivroService.getLivrosByAutorId(req.query.autorId));
            logger.info("GET /livro?autorId");            
        } else {


            res.status(200).send(await LivroService.getLivros());
            logger.info("GET /livro");
        }

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

async function createLivroInfo(req, res, next) {
    try {
        let livroInfo = req.body;
        let retorno = await livroService.createLivroInfo(livroInfo);
        res.send(retorno);
        logger.info(`POST /post  - ${JSON.stringify(livroInfo)}`);

    } catch (err) {
        next(err);
    }
}

async function getLivrosInfo(req, res, next) {
    try {
        res.send(await livroService.getLivrosInfo());
        logger.info(`GET /post  `);

    } catch (err) {
        next(err);
    }

}

 async function updateAvaliacao(req, res, next) {
    const livroId = req.params.id;
    const avaliacao = req.body;
    try {
        res.send(await livroService.updateAvaliacao(livroId, avaliacao));
        logger.info(`POST /livro/id/avaliacao  `);

    } catch (err) {
        next(err);
    }
 }


async function updateLivroInfo(req, res, next) {
    try {
        let livroInfo = req.body;
        res.send(await livroService.updateLivroInfo(livroInfo));
        logger.info(`PUT /post/avaliacao  `);

    } catch (err) {
        next(err);
    }

}
async function deleteLivroInfo(req, res, next) {
    try {
        await LivroService.deleteLivroInfo(req.params.id);
        res.end();
        logger.info(`DELETE /livro/info/id   id=${req.params.id}`);

    } catch (err) {
        next(err);
    }

}
async function deleteAvaliacao(req, res, next) {
    const livroId = req.params.id;
    const indice = req.params.indice;
    try {
        res.send(await livroService.deleteAvaliacao(livroId, indice));
        logger.info(`DELETE /livro/id/avaliacao/indice  `);

    } catch (err) {
        next(err);
    }
 }



export default {
    createLivro,
    getLivros,
    getLivro,
    deleteLivro,
    updateLivro,
    updateLivroInfo,
    getLivrosInfo,
    createLivroInfo,
    updateAvaliacao,
    deleteLivroInfo,
    deleteAvaliacao

}
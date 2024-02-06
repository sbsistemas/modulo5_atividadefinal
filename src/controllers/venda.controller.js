import VendaService from "../services/venda.service.js";

async function createVenda(req, res, next) {

    try {
        let venda = req.body;
        res.status(201).send(await VendaService.createVenda(venda));
        logger.info(`POST /venda - ${JSON.stringify(venda)}`);

    } catch (err) {
        next(err);
    }

}


async function getVendas(req, res, next) {
    try {

        if (req.query.clienteId) {
            res.status(200).send(await VendaService.getVendasByClienteId(req.query.clienteId));
            logger.info("GET /venda?clienteId");            
        }  else if (req.query.livroId) {
            res.status(200).send(await VendaService.getVendasByLivroId(req.query.livroId));
            logger.info("GET /venda?livroId");  
        }  else if (req.query.autorId) {
            res.status(200).send(await VendaService.getVendasByAutorId(req.query.autorId));
            logger.info("GET /venda?autorId");                       
        } else {
            res.status(200).send(await VendaService.getVendas());
            logger.info("GET /venda");
        }

    } catch (err) {
        next(err);
    }

}

async function getVenda(req, res, next) {
    try {
        res.status(200).send(await VendaService.getVenda(req.params.id));
        logger.info("GET /venda/id");

    } catch (err) {
        next(err);
    }

}

async function deleteVenda(req, res, next) {
    try {
        await VendaService.deleteVenda(req.params.id);
        res.end();
        logger.info(`DELETE /venda/id   id=${req.params.id}`);

    } catch (err) {
        next(err);
    }

}

async function updateVenda(req, res, next) {

    try {
        let venda = req.body;
        venda = await VendaService.updateVenda(venda);
        res.send(venda);
        logger.info(`PUT /venda - ${JSON.stringify(venda)}`);

    } catch (err) {
        next(err);
    }

}


export default {
    createVenda,
    getVendas,
    getVenda,
    deleteVenda,
    updateVenda

}
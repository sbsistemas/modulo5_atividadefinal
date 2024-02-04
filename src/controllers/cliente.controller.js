import ClienteService from "../services/cliente.service.js";

async function createCliente(req, res, next) {

    try {
        let cliente = req.body;
        res.status(201).send(await ClienteService.createCliente(cliente));
        logger.info(`POST /cliente - ${JSON.stringify(cliente)}`);

    } catch (err) {
        next(err);
    }

}


async function getClientes(req, res, next) {
    try {
        res.status(200).send(await ClienteService.getClientes());
        logger.info("GET /cliente");

    } catch (err) {
        next(err);
    }

}

async function getCliente(req, res, next) {
    try {
        res.status(200).send(await ClienteService.getCliente(req.params.id));
        logger.info("GET /cliente/id");

    } catch (err) {
        next(err);
    }

}

async function deleteCliente(req, res, next) {
    try {
        
        await ClienteService.deleteCliente(req.params.id);
        res.end();
        logger.info("DELETE /cliente/id");

    } catch (err) {
        next(err);
    }

}

async function updateCliente(req, res, next) {

    try {
        let cliente = req.body;
        cliente = await ClienteService.updateCliente(cliente);
        res.send(cliente);
        logger.info(`PUT /cliente - ${JSON.stringify(cliente)}`);

    } catch (err) {
        next(err);
    }

}


export default {
    createCliente,
    getClientes,
    getCliente,
    deleteCliente,
    updateCliente

}
import Venda from "../models/vendas.model.js";


async function insertVenda(venda) {
    try {
        return await Venda.create(venda);

    } catch (err) {
        throw err;
    }
}

async function getVendas() {
    try {
        return await Venda.findAll();

    } catch (err) {
        throw err;
    }

}

async function getVenda(id) {
    try {
        return await Venda.findByPk(id);
    } catch (err) {
        throw err;
    }

}

async function getVendasByCliente(id) {
    try {
        return await Venda.findAll({
            where: {
                clienteId: id
            }
        });

    } catch (err) {
        throw err;
    }

}
async function getVendasByLivro(id) {
    try {
        return await Venda.findAll({
            where: {
                livroId: id
            }
        });

    } catch (err) {
        throw err;
    }

}

async function updateVenda(venda) {

    try {
        await Venda.update(venda, {
            where: {
                vendaId: venda.vendaId
            }
        })
        return await getVenda(venda.vendaId);
    } catch (err) {
        throw err;
    }

}

async function deleteVenda(id) {
    try {
        await Venda.destroy({
            where: {
                vendaId: id
            }
        })
    } catch (err) {
        throw err;
    }

}


export default {
    insertVenda,
    getVendas,
    getVenda,
    updateVenda,
    deleteVenda,
    getVendasByCliente,
    getVendasByLivro


}
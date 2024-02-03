import Cliente from "../models/clientes.model.js";


async function insertCliente(cliente) {
    try {
        return removePassword(await Cliente.create(cliente));
    } catch (err) {
        throw err;
    }
}

async function getClientes() {
    try {
        return removePassword(await Cliente.findAll());

    } catch (err) {
        throw err;
    }

}

async function getCliente(id) {
    try {
        return removePassword(await Cliente.findByPk(id));
    } catch (err) {
        throw err;
    }

}

async function getVendasByClienteId(id) {
    try {
        return removePassword(await Animal.findAll( {
            where: {
                proprietarioId: id
            }
        }));

    } catch (err) {
        throw err;
    }    
    
}

async function updateCliente(cliente) {

    try {
        await Cliente.update(cliente, {
            where: {
                clienteId: cliente.clienteId
            }
        })
        return await removePassword(getCliente(cliente.clienteId));
    } catch (err) {
        throw err;
    }
    
}

async function deleteCliente(id) {
    try {
        await Cliente.destroy({
            where: {
                clienteId: id
            }
        })
    } catch (err) {
        throw err;
    }

}

function removePassword(cliente) {


    return cliente;
    

}

export default {
    insertCliente,
    getClientes,
    getCliente,
    updateCliente,
    deleteCliente
    

}
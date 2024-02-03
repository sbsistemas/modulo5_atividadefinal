import ClienteRepository from "../repositories/cliente.repository.js"

async function createCliente(cliente) {
        return await ClienteRepository.insertCliente(cliente);
    
}

async function getClientes() {
       return await ClienteRepository.getClientes();
}

async function getCliente(id) {
    return await ClienteRepository.getCliente(id);
}

async function deleteCliente(id) {
    //precisa verificar se não tem venda associada
    await ClienteRepository.deleteCliente(id);
}

async function updateCliente(cliente)  {
    if (await ClienteRepository.getCliente(cliente.clienteId)) {    
        return await ClienteRepository.updateCliente(cliente);
    }
    throw new Error("O cliente_id informado não existe");    
}

export default {
    createCliente,
    getClientes,
    getCliente,
    deleteCliente,
    updateCliente
}
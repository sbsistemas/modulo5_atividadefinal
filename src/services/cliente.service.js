import ClienteRepository from "../repositories/cliente.repository.js"
import VendasService from "./venda.service.js";
import bcrypt from 'bcrypt';

async function createCliente(cliente) {
        const hashPassword = await bcrypt.hash(cliente.senha, 10);
        cliente.senha = hashPassword;
        return await ClienteRepository.insertCliente(cliente);
    
}

async function getClientes() {
       return await ClienteRepository.getClientes();
}

async function getCliente(id) {
    return await ClienteRepository.getCliente(id);
}

async function deleteCliente(id) {
    const vendas = await VendasService.getVendasByCliente(id);
    if (vendas.length>0) {
        throw new Error("Há venda relacioanada ao cliente, e não pode ser excluído!");    
    }
    await ClienteRepository.deleteCliente(id);
    

    
}

async function updateCliente(cliente)  {
    if (await ClienteRepository.getCliente(cliente.clienteId)) {    
        const hashPassword = await bcrypt.hash(cliente.senha, 10);
        cliente.senha = hashPassword;        
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
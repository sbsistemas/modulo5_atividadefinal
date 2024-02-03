import VendaRepository from "../repositories/venda.repository.js";

async function createVenda(venda) {
    return await VendaRepository.insertVenda(venda);
    
}

async function getVendas() {
       return await VendaRepository.getVendas();
}

async function getVenda(id) {
    return await VendaRepository.getVenda(id);
}

async function deleteVenda(id) {
    //precisa verificar se tem livro associado na venda
    await VendaRepository.deleteVenda(id);
}

async function updateVenda(venda)  {
    if (await VendaRepository.getVenda(venda.vendaId)) {    
        return await VendaRepository.updateVenda(venda);
    }
    throw new Error("A venda informada informado não existe");    
}

export default {
    createVenda,
    getVendas,
    getVenda,
    deleteVenda,
    updateVenda
}
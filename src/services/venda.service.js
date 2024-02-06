import VendaRepository from "../repositories/venda.repository.js";
import clienteService from "./cliente.service.js";
import livroService from "./livro.service.js";

async function createVenda(venda) {

    //o cliente existe?
    const cliente = await clienteService.getCliente(venda.clienteId);
    if (!cliente) {
        throw new Error("O clienteId informado não está cadastrado"); 
    }

    //O livro existe?
    const livro = await livroService.getLivro(venda.livroId);
    if (!livro) {
        throw new Error("O livroId informado não está cadastrado"); 
    }

    if (livro.estoque>0) {
        livro.estoque--;
        await livroService.updateEstoque(livro);

        venda.valor = livro.valor;
        
        return await VendaRepository.insertVenda(venda);    
    }
    throw new Error("O livroId não tem disponibilidade no estoque"); 
    
    
}

async function getVendas() {
       return await VendaRepository.getVendas();
}

async function getVenda(id) {
    return await VendaRepository.getVenda(id);
}

async function getVendasByClienteId(id) {
    return await VendaRepository.getVendasByClienteId(id);
}

async function getVendasByLivroId(id) {
    return await VendaRepository.getVendasByLivroId(id);
}

async function getVendasByAutorId(id) {
    return await VendaRepository.getVendasByAutorId(id);
}

async function deleteVenda(id) {

    //await VendaRepository.deleteVenda(id);

    let venda = await this.getVenda(id);
    if (venda) {
        const livro = await livroService.getLivro(venda.livroId);
        livro.estoque++;
        await VendaRepository.deleteVenda(id);
        await livroService.updateEstoque(livro);
        
        
    } else {
        throw new Error("A venda informada informado não existe");        
    }
    
        
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
    updateVenda,
    getVendasByClienteId,
    getVendasByLivroId,
    getVendasByAutorId

}
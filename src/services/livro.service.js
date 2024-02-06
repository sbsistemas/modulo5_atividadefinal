import livroRepository from "../repositories/livro.repository.js";
import LivroRepository from "../repositories/livro.repository.js";
import VendasService from "./venda.service.js";
async function createLivro(livro) {
    return await LivroRepository.insertLivro(livro);
    
}

async function getLivros() {
       return await LivroRepository.getLivros();
}

async function getLivro(id) {
    return await LivroRepository.getLivro(id);
}

async function getLivrosByAutorId(id) {
    return await LivroRepository.getLivrosByAutorId(id);
}

async function deleteLivro(id) {
    const vendas = await VendasService.getVendasByLivro(id);
    if (vendas.length>0) {
        throw new Error("Há vendas associado ao livro, e portanto não pode ser excluído!");    
    }
    await LivroRepository.deleteLivro(id);
   
}

async function updateEstoque(livro) {
    return await LivroRepository.updateEstoque(livro);
    
}

async function updateLivro(livro)  {
    if (await LivroRepository.getLivro(livro.livroId)) {    
        return await LivroRepository.updateLivro(livro);
    }
    throw new Error("O livroId informado não existe");    
}

async function createLivroInfo(livroInfo) {

    const livroRelacional = await livroRepository.getLivro(livroInfo.livroId);
    if (!livroRelacional) {
        throw new Error("O livroId não está cadastrado");    
    }

    const livroJaCadastrado = await LivroRepository.getLivroInfo(livroInfo.livroId);
    if (livroJaCadastrado) {
        throw new Error("O livroId já está cadastrado");    
    } else {
        return await LivroRepository.createLivroInfo(livroInfo);
    }
    
}

async function updateLivroInfo(livroInfo) {
    return await LivroRepository.updateLivroInfo(livroInfo);
}

async function getLivroInfo(id) {
    return await LivroRepository.getLivroInfo(id);
}

async function deleteLivroInfo(id) {
    console.log("delete");
    return await LivroRepository.deleteLivroInfo(id);
}

async function getLivrosInfo() {
    return await LivroRepository.getLivrosInfo();
}

async function updateAvaliacao(livroId, avaliacao) {
    return await LivroRepository.updateAvaliacao(livroId, avaliacao);
}

async function deleteAvaliacao(livroId, indice) {
    return await LivroRepository.deleteAvaliacao(livroId, indice);
}


export default {
    createLivro,
    getLivros,
    getLivro,
    deleteLivro,
    updateLivro,
    getLivrosByAutorId,
    updateEstoque,
    createLivroInfo,
    updateLivroInfo,
    getLivrosInfo,
    getLivroInfo,
    updateAvaliacao,
    deleteLivroInfo,
    deleteAvaliacao
}
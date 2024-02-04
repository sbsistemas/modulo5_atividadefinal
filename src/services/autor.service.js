import AutorRepository from "../repositories/autor.repository.js"
import LivroService from "./livro.service.js";

async function createAutor(autor) {
    return await AutorRepository.insertAutor(autor);
    
}

async function getAutores() {
       return await AutorRepository.getAutores();
}

async function getAutor(id) {
    return await AutorRepository.getAutor(id);
}

async function deleteAutor(id) {
    //precisa verificar se tem livro associado ao autor
    const livros = await LivroService.getLivrosByAutor(id);
    if (livros.length>0) {
        throw new Error("Há Livro(s) associado ao autor, e portanto não pode ser excluído!");    
    }
    await AutorRepository.deleteAutor(id);
}

async function updateAutor(autor)  {
    if (await AutorRepository.getAutor(autor.autorId)) {    
        return await AutorRepository.updateAutor(autor);
    }
    throw new Error("O autor_id informado não existe");    
}

export default {
    createAutor,
    getAutores,
    getAutor,
    deleteAutor,
    updateAutor
}
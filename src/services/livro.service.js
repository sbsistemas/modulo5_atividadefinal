import LivroRepository from "../repositories/livro.repository.js";

async function createLivro(livro) {
    return await LivroRepository.insertLivro(livro);
    
}

async function getLivros() {
       return await LivroRepository.getLivros();
}

async function getLivro(id) {
    return await LivroRepository.getLivro(id);
}

async function deleteLivro(id) {
    //precisa verificar se tem livro associado na venda
    await LivroRepository.deleteLivro(id);
}

async function updateLivro(livro)  {
    if (await LivroRepository.getLivro(livro.livroId)) {    
        return await LivroRepository.updateLivro(livro);
    }
    throw new Error("O livroId informado não existe");    
}

export default {
    createLivro,
    getLivros,
    getLivro,
    deleteLivro,
    updateLivro
}
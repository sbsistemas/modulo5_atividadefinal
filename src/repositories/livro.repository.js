import { getClient } from "./mongo.db.js";
import {  ObjectId } from "mongodb";
import Livro from "../models/livros.model.js";


async function insertLivro(livro) {
    try {
        return await Livro.create(livro);
    } catch (err) {
        throw err;
    }
}

async function getLivros() {
    try {
        return await Livro.findAll();

    } catch (err) {
        throw err;
    }

}

async function getLivro(id) {
    try {
        return await Livro.findByPk(id);
    } catch (err) {
        throw err;
    }

}

async function getLivrosByAutorId(id) {
    try {
        return await Livro.findAll( {
            where: {
                autorId: id
            }
        });

    } catch (err) {
        throw err;
    }    
    
}

async function updateLivro(livro) {

    try {
        await Livro.update(livro, {
            where: {
                livroId: livro.livroId
            }
        })
        return await getLivro(livro.livroId);
    } catch (err) {
        throw err;
    }
    
}

async function updateEstoque(livro) {
    try {
        await Livro.update({ 
                  estoque: livro.estoque 
               }, {
            where: {
                livroId: livro.livroId
            }
        })
    } catch (err) {
        throw err;
    }
}

async function deleteLivro(id) {
    try {
        await Livro.destroy({
            where: {
                livroId: id
            }
        })
        await deleteLivroInfo(id);
    } catch (err) {
        throw err;
    }

}

async function getLivroInfo(id) {

    const client = getClient();
    try {
        await client.connect();
        const query = { livroId: parseInt(id)};
        const livroInfo = await client.db("modulo4").collection("livroInfo").findOne( query );
        return livroInfo;
    } catch (err) {
        throw err; 
    } finally {
        await client.close();
    }

}

async function createLivroInfo(livroInfo) {

    const client = getClient();

    try {
        await client.connect();
        let retorno = await client.db("modulo4").collection("livroInfo").insertOne(livroInfo);
        return retorno;

    } catch (err) {
        throw err; 

    } finally {
        await client.close();
    }
};

async function updateLivroInfo(livroInfo) {
    const client = getClient();
    try {
        let objectId =  new ObjectId(livroInfo._$oid);
        objectId = livroInfo._$oid;
        await client.connect();
        delete livroInfo['_id'];
        let retorno = await client.db("modulo4").collection("livroInfo").updateOne( { _$oid: objectId },
            {$set: { ...livroInfo} }
        );        
        return retorno;

    } catch (err) {
        throw err; 

    } finally {
        await client.close();
    }    

}

async function getLivrosInfo() {
    const client = getClient();
    try {
        await client.connect();
        const livros = await client.db("modulo4").collection("livroInfo").find({}).toArray(); 
        return livros;


    } catch (err) {
        throw err; 

    } finally {
        await client.close();
    }    

}

async function deleteLivroInfo(id) {

    const livroInfo =  await getLivroInfo(id);
    if (livroInfo) {
        const client = getClient();
        try {
            let objectId =  new ObjectId(livroInfo._$oid);
            objectId = livroInfo._$oid;        
            await client.connect();
            const retorno = await client.db("modulo4").collection("livroInfo").deleteOne( { _$oid: objectId } ) ;
        } catch (err) {
            throw err; 

        } finally {
            await client.close();
        }    
    }   

}

async function updateAvaliacao(livroId, avaliacao) {
    const client = getClient();

    try {

        await client.connect();

        let livroInfo = await this.getLivroInfo(livroId);
        if (livroInfo) {
           livroInfo.avaliacoes.push(avaliacao);

           let objectId =  new ObjectId(livroInfo._$oid);
           objectId = livroInfo._$oid;
           delete livroInfo['_id'];
           let retorno = await client.db("modulo4").collection("livroInfo").updateOne( { _$oid: objectId },
               {$set: { ...livroInfo} }
           );        
           return retorno;
        }

    } catch (err) {
        throw err; 

    } finally {
        await client.close();
    }    

}

async function deleteAvaliacao(livroId, indice) {
    const client = getClient();

    try {
        await client.connect();
        let livroInfo = await this.getLivroInfo(livroId);
        if (livroInfo) {
           livroInfo.avaliacoes.splice(parseInt(indice),1);
           console.log(livroInfo.avaliacoes);
           let objectId =  new ObjectId(livroInfo._$oid);
           objectId = livroInfo._$oid;
           delete livroInfo['_id'];
           let retorno = await client.db("modulo4").collection("livroInfo").updateOne( { _$oid: objectId },
               {$set: { ...livroInfo} }
           );        
           return retorno;
        }

    } catch (err) {
        throw err; 

    } finally {
        await client.close();
    }    

}

export default {
    insertLivro,
    getLivros,
    getLivro,
    updateLivro,
    deleteLivro,
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
import mongodb from "mongodb";

function getClient() {
     //mongodb+srv://<username>:<password>@orbitXXXX.huykolo.mongodb.net/?retryWrites=true&w=majority
    //const uri = "mongodb+srv://localhost/?retryWrites=true&w=majority";
    const uri = "mongodb://localhost:27019";
    return new mongodb.MongoClient(uri);
}

export { getClient};
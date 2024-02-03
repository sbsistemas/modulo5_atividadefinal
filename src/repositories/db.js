import Sequelize from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  //ip adquirido pelo container... docker network inspedct id_net_brigde
  //host: '172.17.0.2',
  //ajuste do DB no docker-compose.yml dando um nome ao postgres
  //host: 'db',
  //port: 32769,
  port: 5432,
  database: 'api_livraria',
  username: 'postgres',
  //password: 'mysecretpassword',
  password: 'sbroot',
  //storage: "./src/database.sqlite",
  logging: false,
});

/*
const clienteModel = (sequelizeCliente, DataTypes) => {
  const Cliente = sequelizeCliente.define('Clientes', {
    CPF: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    Nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Cliente;
};

const consultaModel = (sequelizeConsulta, DataTypes) => {
  const Consulta = sequelizeConsulta.define('Consultas', {
    Valor: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    NumPrestacoes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Juros: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Montante: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Prestacoes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Consulta;
};


const produtoModel = (sequelizeProduto, DataTypes) => {
  const Produto = sequelizeProduto.define('produtos', {
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false
   },
   preco: {
      type: DataTypes.DOUBLE,
      allowNull: false
   },
  });

  return Produto;
};



const cliente = clienteModel(sequelize, Sequelize.DataTypes);
const consulta = consultaModel(sequelize, Sequelize.DataTypes);
const Produto = produtoModel(sequelize, Sequelize.DataTypes);

cliente.hasMany(consulta, { as: 'Consultas' });
consulta.belongsTo(cliente);

*/

const clienteModel = (sequelizeCliente, DataTypes) => {
  const Cliente = sequelizeCliente.define('Clientes', {
     cliente_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },        
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },{ underscored: true});

  return Cliente;
};

const autorModel = (sequelizeAutor, DataTypes) => {
  const Autor = sequelizeAutor.define('Autores', {
     autor_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },        
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },{ underscored: true});

  return Autor;
};


const livroModel = (sequelizeLivro, DataTypes) => {
  const Livro = sequelizeLivro.define('Livros', {
     livro_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },        
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valor: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    estoque: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },{ underscored: true});

  return Livro;
};


const vendaModel = (sequelizeAutor, DataTypes) => {
  const Venda = sequelizeAutor.define('Vendas', {
     venda_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },        
    valor: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },{ underscored: true});

  return Venda;
};


const cliente = clienteModel(sequelize, Sequelize.DataTypes);
const autor = autorModel(sequelize, Sequelize.DataTypes);

const venda = vendaModel(sequelize, Sequelize.DataTypes);
const livro = livroModel(sequelize, Sequelize.DataTypes);

autor.hasMany(livro, { as: 'livros' },{ underscored: true});
livro.belongsTo(autor);

cliente.hasMany(venda,{ underscored: true});
venda.belongsTo(cliente);

livro.hasMany(venda,{ underscored: true});
venda.belongsTo(livro);


export default  {
  autor,
  cliente,
  livro,
  venda,
  sequelize
}

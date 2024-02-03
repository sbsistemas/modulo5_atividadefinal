import  app from './app.js';

import db from './repositories/db.js';
import cliente from "./models/clientes.model.js";

db.sequelize.sync().then(async () => {
  await console.log('Conectado ao banco de dados!');
});

app.listen(3000, () => {
  console.log('Bootcamp desenvolvedor back end - Módulo 5 - Atividade Final. Aplicação de exemplo ouvindo na porta 3000!');
});

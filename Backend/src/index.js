const express = require('express');
const cors = require('cors');
const routes = require('./routes');

//variável app vai armazenar a aplicação
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

/**
 * Rota/Recurso
 */

/**
 * Métodos HTTP
 * Get: buscar uma informação do backend
 * Post: criar uma informação no backend.
 * Put: alterar uma informação no backend.
 * Delete: deletar uma informação no backend.
 */

 /**
  * Tipos de parâmetros:
  * Query Params: Parâmetros nomeados enviados na rota após "?" (filtros, paginação)
  * Route Params: Parâmetros utilizados para identificar recursos
  * Request Body: Corpo da requisição, usado para criar ou alterar recursos.
  */

  /**
   * Bancos de Dados:
   * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
   * NoSQL: MongoDB, CouchDB...
   */

   /**
    * Driver: SELECT * FROM users
    * Query Builder: table('users').select('*').where()
    */


//a aplicação vai ouvir a porta 3333. Assim, quando acessar localhost:3333 no navegador
//acessarei a aplicação.
app.listen(3333);
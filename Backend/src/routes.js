const express = require('express');
const OngController = require('./controllers/OngController');
const CasosController = require('./controllers/CasosController');
const PerfilOngController = require('./controllers/PerfilOngController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();

routes.post('/sessions', SessionController.create);
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);
routes.post('/casos', CasosController.create);
routes.get('/casos', CasosController.index);
routes.delete('/casos/:id', CasosController.delete);
routes.get('/perfilOng', PerfilOngController.index);

module.exports = routes;
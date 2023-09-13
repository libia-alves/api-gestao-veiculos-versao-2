const { Router, request } = require('express');


const { EscolaController } = require ('./controllers/escola');
const { VeiculoController } = require('./controllers/veiculo');
const { RotaController } = require('./controllers/rota');
const { HorarioController } = require ('./controllers/horario');
const { UserController } = require ('./controllers/user');
const { authMiddleware } = require('./middleware/auth-middleware');

const routes = Router();

const escolaController = new EscolaController();
const veiculoController = new VeiculoController();
const rotaController = new RotaController();
const horarioController = new HorarioController ();
const userController = new UserController ();


routes.post('/escola', authMiddleware, escolaController.create);
routes.get('/escola', authMiddleware, escolaController.getAll);
routes.delete('/escola/:id', authMiddleware, escolaController.delete);
routes.put('/escola/:id', authMiddleware, escolaController.update);


routes.post('/veiculo', authMiddleware, veiculoController.create);
routes.get('/veiculo', authMiddleware, veiculoController.getAll);
routes.delete('/veiculo/:id', authMiddleware, veiculoController.delete);
routes.put('/veiculo/:id', authMiddleware, veiculoController.update);


routes.post ('/horario', authMiddleware, horarioController.create);
routes.get ('/horario', authMiddleware, horarioController.getAll);
routes.delete ('/horario/:id', authMiddleware, horarioController.delete);
routes.put ('/horario/:id', authMiddleware, horarioController.update);


routes.post ('/rota', authMiddleware, rotaController.create);
routes.get ('/rota', authMiddleware, rotaController.getAll);
routes.delete ('/rota/:id', authMiddleware, rotaController.delete);
routes.put ('/rota/:id', authMiddleware, rotaController.update);








routes.post('/register', userController.register);
routes.post('/login', userController.login);


module.exports = { routes };

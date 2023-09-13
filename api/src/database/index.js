const { Sequelize } = require('sequelize');
const configDatabase = require('./config');


const { UserModel } = require('../models/user-model');
const { EscolaModel } = require ('../models/escola-model');
const { RotaModel } = require ('../models/rota-model');
const { HorarioModel } = require ('../models/horario-model');
const { VeiculoModel } = require ('../models/veiculo-model');




const database = new Sequelize(configDatabase);


UserModel.init(database);
EscolaModel.init(database);
RotaModel.init(database);
HorarioModel.init(database);
VeiculoModel.init(database);




module.exports = database;

const { RotaModel } = require('../models/rota-model');
const routes = [
  // Dados iniciais para rotas
  {
    Nome_Rota: 101,
    Descrição_Rota: 'Rota A',
  },
  // Outras rotas...
];

(async () => {
  for (let route of routes) {
    await RotaModel.create(route);
  }
  console.log('Rotas cadastradas!');
})();

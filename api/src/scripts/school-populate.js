const { EscolaModel } = require('../models/escola-model');
const schools = [
  // Dados iniciais para escolas
  {
    Nome: 'Escola A',
    Endereço_Completo: 'Endereço A',
    Contato_Escola: 1234567890,
    Pontos_Embarque_Desembarque: 'Ponto A',
    Informações_Motoristas: 'Informações A',
    id_Gestor: 1,
  },
  // Outras escolas...
];

(async () => {
  for (let school of schools) {
    await EscolaModel.create(school);
  }
  console.log('Escolas cadastradas!');
})();

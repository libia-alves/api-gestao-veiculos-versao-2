const { VeiculoModel } = require('../models/veiculo-model');
const vehicles = [
  // Dados iniciais para veículos
  {
    Tipo_Veículo: 'Carro',
    Numero_Placa: 'ABC123',
    Capacidade_Máxima_Passageiros: 5,
    Contato_Motorista: 9876543210,
    ID_Rotas: 1,
    ID_Horários: 1,
    ID_Escola: 1,
  },
  // Outros veículos...
];

(async () => {
  for (let vehicle of vehicles) {
    await VeiculoModel.create(vehicle);
  }
  console.log('Veículos cadastrados!');
})();

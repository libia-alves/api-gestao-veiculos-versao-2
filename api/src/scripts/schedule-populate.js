const { HorarioModel } = require('../models/horario-model');
const schedules = [
  // Dados iniciais para horários
  {
    Horário_Partida: 800, // Exemplo de horário no formato 0800 (8:00 AM)
    Horário_Chegada: 1700, // Exemplo de horário no formato 1700 (5:00 PM)
  },
  // Outros horários...
];

(async () => {
  for (let schedule of schedules) {
    await HorarioModel.create(schedule);
  }
  console.log('Horários cadastrados!');
})();

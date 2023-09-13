const { Model, DataTypes } = require("sequelize");

class HorarioModel extends Model {
    static init(sequelize) {
        super.init({
            Horario_Partida: DataTypes.INTEGER,
            Horario_Chegada: DataTypes.INTEGER
        }, {
            sequelize,
            tableName: 'Horarios',
            timestamps: false
        });
    }
}

module.exports = { HorarioModel };

const { Model, DataTypes } = require("sequelize");

class VeiculoModel extends Model {
    static init(sequelize) {
        super.init({
            Tipo_Veiculo: DataTypes.STRING,
            Numero_Placa: DataTypes.STRING,
            Capacidade_Máxima_Passageiros: DataTypes.INTEGER,
            Contato_Motorista: DataTypes.INTEGER,
            id_Rotas: DataTypes.INTEGER,
            id_Horario: DataTypes.INTEGER,
            id_Escolas: DataTypes.INTEGER
        }, {
            sequelize,
            tableName: 'Veiculos',
            timestamps: false
        });
    }
}

module.exports = { VeiculoModel };

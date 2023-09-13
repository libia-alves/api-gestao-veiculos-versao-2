const { Model, DataTypes } = require("sequelize");

class EscolaModel extends Model {
    static init(sequelize) {
        super.init({
            Nome: DataTypes.STRING,
            Endereço_Completo: DataTypes.STRING,
            Contato_Escola: DataTypes.INTEGER,
            Pontos_Embarque_Desembarque: DataTypes.STRING,
            Informações_Motoristas: DataTypes.STRING,
            id_Gestor: DataTypes.INTEGER
        }, {
            sequelize,
            tableName: 'Escolas',
            timestamps: false
        });
    }
}

module.exports = { EscolaModel };

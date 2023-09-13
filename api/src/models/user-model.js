
//
const { Model, DataTypes } = require("sequelize");

class UserModel extends Model {
    static init(sequelize) {
        super.init({
            Nome: DataTypes.STRING,
            Email: DataTypes.STRING,
            Senha: DataTypes.STRING,
            Data_Nascimento: DataTypes.DATE,
            Celular: DataTypes.INTEGER,
            CPF: DataTypes.STRING,
            Endereço: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'user',
            timestamps: false
        });
    }
}

module.exports = { UserModel };

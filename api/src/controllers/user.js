
const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user-model');

class UserController {
    async register(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { Nome, Email, Data_nascimento, Celular, CPF, Endereço, Senha } = request.body;
            if (!Nome || !Email || !Data_nascimento || !Celular || !CPF || !Endereço || !Senha) {
                return httpHelper.badRequest('Todos os campos são obrigatórios!');
            }
            const userAlreadyExists = await UserModel.findOne({ where: { Email } });
            if (userAlreadyExists) return httpHelper.badRequest('E-mail de usuário já cadastrado!');
            const SenhaHashed = await bcrypt.hash(
                Senha,
                Number(process.env.SALT)
            );
            const user = await UserModel.create({
                Nome,
                Email,
                Data_Nascimento:Data_nascimento,
                Celular,
                CPF,
                Endereço,
                Senha: SenhaHashed,
            });
            if (!user) return httpHelper.badRequest('Houve um erro ao criar usuário');
            const accessToken = jwt.sign(
                { id: user.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );
            return httpHelper.created({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async login(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { Email, Senha } = request.body;
            if (!Email || !Senha) return httpHelper.badRequest('E-mail e senha são obrigatórios!');
            const userExists = await UserModel.findOne({ where: { Email } });
            if (!userExists) return httpHelper.notFound('Usuário não encontrado!');
            const isSenhaValid = await bcrypt.compare(Senha, userExists.Senha);
            if (!isSenhaValid) return httpHelper.badRequest('Senha incorreta!');
            const accessToken = jwt.sign(
                { id: userExists.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );
            return httpHelper.ok({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { UserController };

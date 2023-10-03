


const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user-model');

class UserController {
    async register(request, response) {
        const httpHelper = new HttpHelper(response);
        console.log(request.body)
        try {
            const { Nome, Email, Data_Nascimento, Celular, CPF, Endereço, Senha } = request.body;
            if (!Nome || !Email || !Data_Nascimento || !Celular || !CPF || !Endereço || !Senha) {
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
                Data_Nascimento,
                Celular: Number(Celular),
                CPF,
                Endereço,
                Senha: SenhaHashed,
            });
            if (!user) return httpHelper.badRequest('Houve um erro ao criar usuário');

            // Inclua o ID do usuário no payload do JWT
            const accessToken = jwt.sign(
                { id: user.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );

            // Retorne o ID do usuário junto com o token
            return httpHelper.created({ accessToken, userId: user.id });
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
            return httpHelper.ok({ accessToken, userId: userExists.id });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }



async update(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
        const { id } = request.params;
        const { Nome, Email, Data_Nascimento, Celular, CPF, Endereço, Senha } = request.body;

        const user = await UserModel.findByPk(id);

        if (!user) return httpHelper.notFound('Usuário não encontrado!');

        // Se algum campo for enviado, atualize-o
        if (Nome) user.Nome = Nome;
        if (Email) user.Email = Email;
        if (Data_Nascimento) user.Data_Nascimento = Data_Nascimento;
        if (Celular) user.Celular = Celular;
        if (CPF) user.CPF = CPF;
        if (Endereço) user.Endereço = Endereço;

        if (Senha) {
            const SenhaHashed = await bcrypt.hash(
                Senha,
                Number(process.env.SALT)
            );
            user.Senha = SenhaHashed;
        }

        await user.save();

        // Remova o campo de senha do usuário antes de retornar os dados
        user.Senha = undefined;

        return httpHelper.ok('Usuário atualizado com sucesso!', user);
    } catch (error) {
        return httpHelper.internalError(error);
    }
}

async getPerfil(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
        const { id } = request.params;

        const users = await UserModel.findByPk(id);


        return httpHelper.ok(users);
    } catch (error) {
        return httpHelper.internalError(error);
    }
}

async delete (request, response) {
    const httpHelper = new HttpHelper(response);
    try {
        const { id } = request.params;

        const user = await UserModel.findByPk(id);

        if (!user) return httpHelper.notFound('Usuário não encontrado!');

        await user.destroy();

        return httpHelper.ok('Usuário excluído com sucesso!');
    } catch (error) {
        return httpHelper.internalError(error);
    }
}
}






module.exports = { UserController };


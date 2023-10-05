import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { ModalComponent } from '../components/Modal';
import { Login } from "../pages/Login";

import { registerUser } from "../services/user-service";

export function Register() {
    const { handleSubmit, register, formState: { errors } } = useForm({ mode: 'all' });
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const user = await registerUser(data);
            setResult(user);
            navigate('/');
        } catch (error) {
            console.log(error)
            setResult({
                title: 'Houve um erro no cadastro!',
                message: error.response.data.error
            });
        }
    }

    return (
        <Container>
            <ModalComponent
                show={result}
                title={result?.title}
                message={result?.message}
                handleClose={() => setResult(null)}
            />
            <Header title="Crie sua conta" />
            <Form
                noValidate
                validated={!errors}
                onSubmit={handleSubmit(onSubmit)}
                className="bg-light rounded p-5 shadow w-50 m-auto"
            >
                <Col>
                    <Input
                        className="mb-4"
                        label="Email"
                        type="text"
                        placeholder="Insira seu Email"
                        error={errors.Email}
                        required={true}
                        name="Email"
                        validations={register('Email', {
                            required: {
                                value: true,
                                message: 'Email é obrigatório'
                            },
                            pattern: {
                                value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                                message: 'Email inválido!'
                            }
                        })}
                    />

                    <Input
                        className="mb-4"
                        label="Nome"
                        type="text"
                        placeholder="Insira seu Nome"
                        error={errors.Nome}
                        required={true}
                        name="Nome"
                        validations={register('Nome', {
                            required: {
                                value: true,
                                message: 'Nome é obrigatório'
                            },

                        })}
                    />





                    <Input
                        className="mb-4"
                        label="Data_nascimento"
                        type="date"
                        placeholder="Insira sua data de nascimento"
                        error={errors.Data_Nascimento}
                        required={true}
                        name="Data_Nascimento"
                        validations={register('Data_Nascimento', {
                            required: {
                                value: true,
                                message: 'Data de nascimento é obrigatória'
                            },

                        })}
                    />

                    <Input
                        className="mb-4"
                        label="Celular"
                        type="text"
                        placeholder="Insira seu telefone"
                        error={errors.Celular}
                        required={true}
                        name="Celular"
                        validations={register('Celular', {
                            required: {
                                value: true,
                                message: 'celular é obrigatório'
                            }
                        })}
                    />

                    <Input
                        className="mb-4"
                        label="CPF"
                        type="text"
                        placeholder="Insira seu CPF"
                        error={errors.CPF}
                        required={true}
                        name="CPF"
                        validations={register('CPF', {
                            required: {
                                value: true,
                                message: 'CPF é obrigatório'
                            },
                            pattern: {
                                value: (/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
                                message: 'CPF inválido!'
                            }
                        })}
                    />

                    <Input
                        className="mb-4"
                        label="Endereço"
                        type="text"
                        placeholder="Insira seu endereço"
                        error={errors.Endereço}
                        required={true}
                        name="Endereço"
                        validations={register('Endereço', {
                            required: {
                                value: true,
                                message: 'endereço é obrigatório'
                            }
                        })}
                    />





                    <Input
                        className="mb-4"
                        label="Senha"
                        type="password"
                        placeholder="Insira sua senha"
                        error={errors.Senha}
                        required={true}
                        name="Senha"
                        validations={register('Senha', {
                            required: {
                                value: true,
                                message: 'Senha é obrigatório'
                            }
                        })}
                    />
                    <div className="d-flex justify-content-between">
                        <Button type="submit">Criar</Button>
                        <Link to="/">Já tenho uma conta</Link>
                    </div>
                </Col>
            </Form>
        </Container>
    );
}


//  Nome, Email, Data_nascimento, Celular, CPF, Endereço, Senha 
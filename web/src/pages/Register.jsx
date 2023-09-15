import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { Modal } from '../components/Modal';

import { registerUser } from "../services/user-service";

export function Register() {
    const { handleSubmit, register, formState: { errors } } = useForm({mode:'all'});
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const user = await registerUser(data);
            setResult(user);
            navigate('/home');
        } catch (error) {
            setResult({
                title: 'Houve um erro no cadastro!',
                message: error.response.data.error
            });
        }
    }

    return (
        <Container>
            <Modal
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
                        label="E-mail"
                        type="text"
                        placeholder="Insira seu e-mail"
                        error={errors.Email}
                        required={true}
                        name="Email"
                        validations={register('Email', {
                            required: {
                                value: true,
                                message: 'E-mail é obrigatório'
                            },
                            pattern: {
                                value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                                message: 'E-mail inválido!'
                            }
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
                        placeholder="Insira seu cpf"
                        error={errors.cpf}
                        required={true}
                        name="cpf"
                        validations={register('cpf', {
                            required: {
                                value: true,
                                message: 'cpf é obrigatório'
                            }
                        })}
                    />

                    <Input
                        className="mb-4"
                        label="Endereço"
                        type="text"
                        placeholder="Insira seu endereço"
                        error={errors.Endereco}
                        required={true}
                        name="Endereco"
                        validations={register('Endereco', {
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
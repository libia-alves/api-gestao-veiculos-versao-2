import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { Modal } from '../components/Modal';
import './login.css';
import { loginUser } from '../services/user-service';
import backgroundImage from "../pages/imagemLogin.jpeg";

const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "50%",
    backgroundPosition: "center",
    minHeight: "100vh", // Defina a altura mínima da tela inteira
    display: "flex",
    justifyContent: "center",
    alignItems: "center", // Centralizar verticalmente
  };

export function Login() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const user = await loginUser(data);
            setResult(user);
            navigate('/dashboard');
        } catch (error) {
            setResult({
                title: 'Houve um erro no login!',
                message: error.response.data.error,
            });
        }
    }

    return (
        <div style={backgroundStyle}>
        <Container>
            <Modal
                show={result}
                title={result?.title}
                message={result?.message}
                handleClose={() => setResult(null)}
            />
          
            <Form
            
                noValidate
                validated={!!errors}
                onSubmit={handleSubmit(onSubmit)}
                className="bg-light rounded p-5 shadow w-50 m-auto"
            >
                <Col>

                <h6 style={{ textAlign: "center" }}>
  Seja bem vindo ao site de gestão de veículos escolares!
</h6>
                <Header title="Login
                
                "className="white-text" /> 
                <Header> </Header>
                
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
                        <Button type="submit">Entrar</Button>
                        <Link to="/register">Criar conta</Link>
                    </div>
                </Col>
            </Form>
        </Container>
        </div>
    );
}
import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

import { Customer } from "../components/Customer";
import { Header } from "../components/Header";
import { Input } from '../components/Input';

import { createCustomer, deleteCustomer, getCustomers, updateCustomer } from "../services/customer-service";

export function Customers() {
    const [customers, setCustomers] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        findCustomers();
        // eslint-disable-next-line
    }, []);

    async function findCustomers() {
        try {
            const result = await getCustomers();
            setCustomers(result.data);
        } catch (error) {
            console.error(error);

        }
    }

    async function removeCustomer(id) {
        try {
            await deleteCustomer(id);
            await findCustomers();
        } catch (error) {
            console.error(error);
        }
    }

    async function addCustomer(data) {
        console.log(data)
        try {
            await createCustomer(data);
            setIsCreated(false);
            await findCustomers();
        } catch (error) {
            console.error(error);
        }
    }

    async function editCustomer(data) {
        try {
            await updateCustomer({
                id: data.id,
                nameCustomer: data.nameCustomer,
                email: data.email
            });
            await findCustomers();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container fluid>
            <Header title="Clientes" />
            <Row className="w-50 m-auto mb-5 mt-5 ">
                <Col md='10'>
                    <Button onClick={() => setIsCreated(true)}>Criar novo cliente</Button>
                </Col>
                <Col>
                    <Button variant="outline-secondary" onClick={() => {
                        sessionStorage.removeItem('token');
                        navigate('/');
                    }}>Sair</Button>
                </Col>
            </Row>
            <Col className="w-50 m-auto">
                {customers && customers.length > 0
                    ? customers.map((customer, index) => (
                        <Customer
                            key={index}
                            customer={customer}
                            removeCustomer={async () => await removeCustomer(customer.id)}
                            editCustomer={editCustomer}
                        />
                    ))
                    : <p className="text-center">Não existe nenhum cliente cadastrado!</p>}
            </Col>
            {/* Formulário dentro do Modal, ideal seria componentizar também, pois é parecido com o Modal de editar */}
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Cadastrar novo cliente</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(addCustomer)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            label='Nome do cliente'
                            placeholder='Insira o nome do cliente'
                            required={true}
                            name='nameCsutomer'
                            error={errors.nameCustomer}
                            validations={register('nameCustomer', {
                                required: {
                                    value: true,
                                    message: 'Nome do cliente é obrigatório.'
                                }
                            })}
                        />

                        <Form.Group>
                            <Input
                                className="mb-3"
                                type='text'
                                label='Email do cliente'
                                placeholder='Insira o email do cliente'
                                required={true}
                                name='email'
                                error={errors.email}
                                validations={register('email', {
                                    required: {
                                        value: true,
                                        message: 'Email do cliente é obrigatório.'
                                    }
                                })}
                            />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Criar
                        </Button>
                        <Button variant="secondary" onClick={() => setIsCreated(false)}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
}

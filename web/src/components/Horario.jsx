import React, { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "./Input";

export function EditHorario(props) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm(); // Corrigi "formsState" para "formState"

    async function editHorario(data) {
        await props.editHorario({ ...data, id: props.horario.id });
        props.setIsUpdated(false);
    }

    return (
        <Modal show={props.isUpdated} onHide={() => props.setIsUpdated(false)}>
            <Card className="mb-3 p-3 bg-light">
                <Card.Text>
                    <strong>Horário de Partida: </strong>
                    {props.horario.Horario_Partida}
                </Card.Text>
                <Card.Text>
                    <strong>Horário de Chegada: </strong>
                    {props.horario.Horario_Chegada}
                </Card.Text>
            </Card>
            <Modal.Header>
                <Modal.Title>
                    Editar Horário: Partida - {props.horario.Horario_Partida},
                    Chegada - {props.horario.Horario_Chegada}
                </Modal.Title>
            </Modal.Header>

            <Form
                noValidate
                onSubmit={handleSubmit(editHorario)}
                validated={!!errors}
            >
                <Modal.Body>
                    <Input
                        className="mb-3"
                        type="number"
                        defaultValue={props.horario.Horario_Partida}
                        label="Horario de partida"
                        placeholder="Insira o horário de partida "
                        required={true}
                        name="Horario_Partida"
                        error={errors.Horario_Partida}
                        validations={register("Horario_Partida", {
                            required: {
                                value: true,
                                message: "Horário de partida é obrigatório.",
                            },
                        })}
                    />
                    <Input
                        className="mb-3"
                        type="number"
                        defaultValue={props.horario.Horario_Chegada}
                        label="Horario de chegada"
                        placeholder="Insira o horário de chegada "
                        required={true}
                        name="Horario_Chegada"
                        error={errors.Horario_Chegada}
                        validations={register("Horario_Chegada", {
                            required: {
                                value: true,
                                message: "Horário de chegada é obrigatório.",
                            },
                        })}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={editHorario}
                    >
                        Editar
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => props.setIsUpdated(false)}
                    >
                        Fechar
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

// import React, { useEffect, useState } from "react";
// import {
//     Container,
//     Button,
//     Modal,
//     Form,
//     Row,
//     Col,
//     Table,
// } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { EditHorario } from "../components/Horario";
// import { Header } from "../components/Header";
// import { Input } from "../components/Input";

// import {
//     createHorario,
//     deleteHorario,
//     getHorarios,
//     updateHorario,
// } from "../services/horario-service";

// export function Horarios() {
//     const [horarios, setHorarios] = useState([]);
//     const [horarioSelecionado, setHorarioSelecionado] = useState({});
//     const [showCreateAlert, setShowCreateAlert] = useState(false);
//     const [showEditAlert, setShowEditAlert] = useState(false);
//     const [showDeleteAlert, setShowDeleteAlert] = useState(false);
//     const [successMessage, setSuccessMessage] = useState("");
//     const [editingHorario, setEditingHorario] = useState(null);

//     const {
//         handleSubmit,
//         register,
//         formState: { errors },
//         reset,
//     } = useForm();

//     const navigate = useNavigate();

//     useEffect(() => {
//         findHorarios();
//     }, []);

//     async function filtrarHorario(horarioString) {
//         if (horarioString.length > 0) {
//             const horarioInteiro = parseInt(horarioString, 10);

//             if (!isNaN(horarioInteiro)) {
//                 const resultadosFiltrados = horarios.filter((objeto) => {
//                     const horarioPartidaString =
//                         objeto.Horario_Partida.toString();
//                     return horarioPartidaString.includes(
//                         horarioInteiro.toString()
//                     );
//                 });

//                 setHorarios(resultadosFiltrados);
//             } else {
//                 console.log(
//                     "A string não pôde ser convertida em um número inteiro."
//                 );
//             }
//         } else {
//             findHorarios();
//         }
//     }

//     async function findHorarios() {
//         try {
//             const result = await getHorarios();
//             setHorarios(result.data);
//         } catch (error) {
//             console.error(error);
//             navigate("/");
//         }
//     }

//     async function removeHorario(id) {
//         const answer = window.confirm(
//             "Tem certeza que deseja excluir este horário?"
//         );

//         if (answer) {
//             try {
//                 await deleteHorario(id);
//                 alert("Cadastro deletado com sucesso!");
//                 await findHorarios();
//                 setShowDeleteAlert(false);
//                 debugger;
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//     }

//     async function addHorario(data) {
//         try {
//             await createHorario(data);
//             setShowCreateAlert(false);
//             alert("Cadastro feito com sucesso!");
//             await findHorarios();
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     async function editHorario(data) {
//         try {
//             await updateHorario({
//                 id: data.id,
//                 Horario_Partida: data.Horario_Partida,
//                 Horario_Chegada: data.Horario_Chegada,
//             });
            
//             setEditingHorario(null); // Resetar o estado de edição
//             setSuccessMessage("Cadastro editado com sucesso!");
//             await findHorarios();
//             setShowEditAlert(false);
//         } catch (error) {
//             console.error(error);
//         }
//     }

    

//     const openEditModal = (horario) => {
//         setHorarioSelecionado(horario);
//         setEditingHorario(horario);
//         setShowEditAlert(true);
//         // Pré-preencha o formulário de edição com os valores do horário selecionado
//         reset({
//             Horario_Partida: horario.Horario_Partida,
//             Horario_Chegada: horario.Horario_Chegada,
//         });
//     };

//     return (
//         <Container fluid>
//             <Header title="Horários" />
//             <Row className="w-50 m-auto mb-5 mt-5">
//                 <Col md="8">
//                     <Form.Control
//                         type="integer"
//                         onChange={(e) => filtrarHorario(e.target.value)}
//                         placeholder="Filtrar pelo Horario"
//                     />
//                 </Col>
//                 <Col md="4">
//                     <Button onClick={() => setShowCreateAlert(true)}>
//                         Adicionar Novo Horário
//                     </Button>
//                 </Col>
//             </Row>

//             <Col className="w-75 m-auto">
//                 <Table striped bordered hover>
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Horário de Partida</th>
//                             <th>Horário de Chegada</th>
//                             <th>Ações</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {horarios && horarios.length > 0 ? (
//                             horarios.map((horario, index) => (
//                                 <tr key={index}>
//                                     <td>{index + 1}</td>
//                                     <td>{horario.Horario_Partida}</td>
//                                     <td>{horario.Horario_Chegada}</td>
//                                     <td>
//                                         <Button
//                                             variant="warning"
//                                             onClick={() => openEditModal(horario)}
//                                         >
//                                             Editar
//                                         </Button>{" "}
//                                         <Button
//                                             variant="danger"
//                                             onClick={() => {
//                                                 setHorarioSelecionado(horario);
//                                                 setShowDeleteAlert(true);
//                                             }}
//                                         >
//                                             Excluir
//                                         </Button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="4" className="text-center">
//                                     Não existe nenhum horário cadastrado!
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </Table>
//             </Col>

//             <Modal show={showCreateAlert} onHide={() => setShowCreateAlert(false)}>
//                 <Modal.Header>
//                     <Modal.Title>Adicionar Novo Horário</Modal.Title>
//                 </Modal.Header>

//                 <Form
//                     noValidate
//                     onSubmit={handleSubmit(addHorario)}
//                     validated={!!errors}
//                 >
//                     <Modal.Body>
//                         <Form.Group controlId="Horario_Partida">
//                             <Form.Label>Horário de Partida</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 placeholder="Insira o horário de partida"
//                                 required
//                                 name="Horario_Partida"
//                                 {...register("Horario_Partida", {
//                                     required:
//                                         "Horário de partida é obrigatório.",
//                                 })}
//                             />
//                             <Form.Control.Feedback type="invalid">
//                                 {errors.Horario_Partida?.message}
//                             </Form.Control.Feedback>
//                         </Form.Group>

//                         <Form.Group controlId="Horario_Chegada">
//                             <Form.Label>Horário de Chegada</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 placeholder="Insira o horário de chegada"
//                                 required
//                                 name="Horario_Chegada"
//                                 {...register("Horario_Chegada", {
//                                     required:
//                                         "Horário de chegada é obrigatório.",
//                                 })}
//                             />
//                             <Form.Control.Feedback type="invalid">
//                                 {errors.Horario_Chegada?.message}
//                             </Form.Control.Feedback>
//                         </Form.Group>
//                     </Modal.Body>

//                     <Modal.Footer>
//                         <Button variant="primary" type="submit">
//                             Adicionar
//                         </Button>
//                         <Button
//                             variant="secondary"
//                             onClick={() => setShowCreateAlert(false)}
//                         >
//                             Fechar
//                         </Button>
//                     </Modal.Footer>
//                 </Form>
//             </Modal>

//             <Modal show={showEditAlert} onHide={() => setShowEditAlert(false)}>
//                 <Modal.Header>
//                     <Modal.Title>Editar Horário</Modal.Title>
//                 </Modal.Header>

//                 <Form
//                     noValidate
//                     onSubmit={handleSubmit(editHorario)}
//                     validated={!!errors}
//                 >
//                     <Modal.Body>
//                         <Form.Group controlId="Horario_Partida">
//                             <Form.Label>Horário de Partida</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 placeholder="Insira o horário de partida"
//                                 required
//                                 name="Horario_Partida"
//                                 {...register("Horario_Partida", {
//                                     required:
//                                         "Horário de partida é obrigatório.",
//                                 })}
//                             />
//                             <Form.Control.Feedback type="invalid">
//                                 {errors.Horario_Partida?.message}
//                             </Form.Control.Feedback>
//                         </Form.Group>

//                         <Form.Group controlId="Horario_Chegada">
//                             <Form.Label>Horário de Chegada</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 placeholder="Insira o horário de chegada"
//                                 required
//                                 name="Horario_Chegada"
//                                 {...register("Horario_Chegada", {
//                                     required:
//                                         "Horário de chegada é obrigatório.",
//                                 })}
//                             />
//                             <Form.Control.Feedback type="invalid">
//                                 {errors.Horario_Chegada?.message}
//                             </Form.Control.Feedback>
//                         </Form.Group>
//                     </Modal.Body>

//                     <Modal.Footer>
//                         <Button variant="warning" type="submit">
//                             Editar
//                         </Button>
//                         <Button
//                             variant="secondary"
//                             onClick={() => setShowEditAlert(false)}
//                         >
//                             Fechar
//                         </Button>
//                     </Modal.Footer>
//                 </Form>
//             </Modal>

//             <Modal show={showDeleteAlert} onHide={() => setShowDeleteAlert(false)}>
//                 <Modal.Header>
//                     <Modal.Title>Excluir Horário</Modal.Title>
//                 </Modal.Header>

//                 <Modal.Body>
//                     Tem certeza que deseja excluir este horário?
//                 </Modal.Body>

//                 <Modal.Footer>
//                     <Button
//                         variant="danger"
//                         onClick={() => removeHorario(horarioSelecionado.id)}
//                     >
//                         Confirmar
//                     </Button>
//                     <Button
//                         variant="secondary"
//                         onClick={() => setShowDeleteAlert(false)}
//                     >
//                         Cancelar
//                     </Button>
//                 </Modal.Footer>
//             </Modal>

//             {successMessage && (
//                 <Modal show={!!successMessage} onHide={() => setSuccessMessage("")}>
//                     <Modal.Header>
//                         <Modal.Title>Sucesso!</Modal.Title>
//                     </Modal.Header>

//                     <Modal.Body>{successMessage}</Modal.Body>

//                     <Modal.Footer>
//                         <Button
//                             variant="secondary"
//                             onClick={() => setSuccessMessage("")}
//                         >
//                             Fechar
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//             )}
//         </Container>
//     );
// }


import React, { useEffect, useState } from "react";
import {
    Container,
    Button,
    Modal,
    Form,
    Row,
    Col,
    Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EditHorario } from "../components/Horario";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

import {
    createHorario,
    deleteHorario,
    getHorarios,
    updateHorario,
} from "../services/horario-service";

export function Horarios() {
    const [horarios, setHorarios] = useState([]);
    const [horarioSelecionado, setHorarioSelecionado] = useState({});
    const [isCreated, setIsCreated] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        findHorarios();
        // eslint-disable-next-line
    }, []);

    async function filtrarHorario(horarioString) {
        if (horarioString.length > 0) {
            const horarioInteiro = parseInt(horarioString, 10);

            console.log(horarioInteiro);

            if (!isNaN(horarioInteiro)) {
                const resultadosFiltrados = horarios.filter((objeto) => {
                    const horarioPartidaString =
                        objeto.Horario_Partida.toString();
                    return horarioPartidaString.includes(
                        horarioInteiro.toString()
                    );
                });

                setHorarios(resultadosFiltrados);
            } else {
                console.log(
                    "A string não pôde ser convertida em um número inteiro."
                );
            }
        } else {
            findHorarios();
        }
    }

    async function findHorarios() {
        try {
            const result = await getHorarios();
            setHorarios(result.data);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    async function removeHorario(id) {
        const answer = window.confirm(
            "Tem certeza que deseja excluir este horário?"
        );

        if (answer) {
            try {
                await deleteHorario(id);
                alert("Cadastro deletado com sucesso!");
                await findHorarios();
                debugger;
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function addHorario(data) {
        try {
            await createHorario(data);
            setIsCreated(false);
            alert("Cadastro feito com sucesso!");
            await findHorarios();
        } catch (error) {
            console.error(error);
        }
    }

    async function editHorario(data) {
        try {
            await updateHorario({
                id: data.id,
                Horario_Partida: data.Horario_Partida,
                Horario_Chegada: data.Horario_Chegada,
                // Adicione mais campos de edição conforme necessário
            });
            await findHorarios();
            alert("Cadastro editado com sucesso!");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container fluid>
            <Header title="Horários" />
            <Row className="w-50 m-auto mb-5 mt-5">
                <Col md="8">
                    <Form.Control
                        type="integer"
                        onChange={(e) => filtrarHorario(e.target.value)}
                        placeholder="Filtrar pelo Horario"
                    />
                </Col>
                <Col md="4">
                    <Button onClick={() => setIsCreated(true)}>
                        Adicionar Novo Horário
                    </Button>
                </Col>
            </Row>

            <Col className="w-75 m-auto">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Horário de Partida</th>
                            <th>Horário de Chegada</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {horarios && horarios.length > 0 ? (
                            horarios.map((horario, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{horario.Horario_Partida}</td>
                                    <td>{horario.Horario_Chegada}</td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            onClick={() => {
                                                setHorarioSelecionado(horario);
                                                setIsUpdated(true);
                                            }}
                                        >
                                            Editar
                                        </Button>{" "}
                                        <Button
                                            variant="danger"
                                            onClick={() =>
                                                removeHorario(horario.id)
                                            }
                                        >
                                            Excluir
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    Não existe nenhum horário cadastrado!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Col>

            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Adicionar Novo Horário</Modal.Title>
                </Modal.Header>

                <Form
                    noValidate
                    onSubmit={handleSubmit(addHorario)}
                    validated={!!errors}
                >
                    <Modal.Body>
                        <Form.Group controlId="Horario_Partida">
                            <Form.Label>Horário de Partida</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Insira o horário de partida"
                                required
                                name="Horario_Partida"
                                {...register("Horario_Partida", {
                                    required:
                                        "Horário de partida é obrigatório.",
                                })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.Horario_Partida?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="Horario_Chegada">
                            <Form.Label>Horário de Chegada</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Insira o horário de chegada"
                                required
                                name="Horario_Chegada"
                                {...register("Horario_Chegada", {
                                    required:
                                        "Horário de chegada é obrigatório.",
                                })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.Horario_Chegada?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Adicionar
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setIsCreated(false)}
                        >
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <EditHorario
                editHorario={editHorario}
                setIsUpdated={setIsUpdated}
                isUpdated={isUpdated}
                horario={horarioSelecionado}
            />
        </Container>
    );
}


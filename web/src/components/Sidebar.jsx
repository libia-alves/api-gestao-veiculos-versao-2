import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import './Sidebar.css'; // Importe o arquivo CSS para sua estilização

export function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <Container fluid>
      <Row>
        {/* Botão de Toggle do Sidebar */}
        <Col md={1} className="sidebar-toggle">
          <button className="toggle-button" onClick={toggleSidebar}>
            ☰
          </button>
        </Col>

        {/* Barra Lateral */}
        <Col md={3} className={`sidebar ${expanded ? 'expanded' : ''}`}>
          <Nav className="flex-column">
            <Nav.Item>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/veiculos" className="nav-link">
                Veículos
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/escolas" className="nav-link">
                Escolas
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/horarios" className="nav-link">
                Horários
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/rotas" className="nav-link">
                Rotas
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/profile" className="nav-link">
                Perfil
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/" className="nav-link">
                Sair
              </Link>
            </Nav.Item>
          </Nav>
        </Col>

        {/* Conteúdo Principal */}
        <Col md={9} className="content">
          {/* Conteúdo da Página */}
          {/* Inclua aqui o conteúdo principal da página */}
        </Col>
      </Row>
    </Container>
  );
}

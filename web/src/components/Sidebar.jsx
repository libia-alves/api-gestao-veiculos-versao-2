import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import './Sidebar.css'; // Importe o arquivo CSS para sua estilização
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,  faCar,
  faSchool,
  faClock,
  faRoute,
  faUser,
  faSignOutAlt, } from '@fortawesome/free-solid-svg-icons';






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
              <FontAwesomeIcon icon={faHome } />
                 Dashboard
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/veiculos" className="nav-link">
              <FontAwesomeIcon icon={faCar} />
                Veículos
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/escolas" className="nav-link">
              <FontAwesomeIcon icon={faSchool} />
                Escolas
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/horarios" className="nav-link">
              <FontAwesomeIcon icon={faClock} />
                Horários
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/rotas" className="nav-link">
              <FontAwesomeIcon icon={faRoute} />
                Rotas
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/profile" className="nav-link">
              <FontAwesomeIcon icon={faUser} />
                Perfil
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/" className="nav-link">
              <FontAwesomeIcon icon={faSignOutAlt} />
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

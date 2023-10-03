import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ReactApexChart from 'react-apexcharts';
import { getEscolas } from "../services/escola-service";
import { getVeiculos } from "../services/veiculo-service";
import { getRotas } from "../services/rota-service";
import { getHorarios } from "../services/horario-service";
import './Dashboard.css';
import { Sidebar } from "../components/Sidebar";



function Dashboard() {
  <div className="dashboard"></div>

  const [escolas, setEscolas] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [rotas, setRotas] = useState([]);
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const escolasData = await getEscolas();
        const veiculosData = await getVeiculos();
        const rotasData = await getRotas();
        const horariosData = await getHorarios();

        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        setEscolas(escolasData.data);
        setVeiculos(veiculosData.data);
        setRotas(rotasData.data);
        setHorarios(horariosData.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  // Função VeiculosChart incorporada
  function VeiculosChart({ veiculos }) {
    // Contagem de veículos únicos
    const uniqueVeiculos = veiculos.reduce((acc, veiculo) => {
      const { Numero_Placa } = veiculo;
      if (!acc[Numero_Placa]) {
        acc[Numero_Placa] = 1;
      } else {
        acc[Numero_Placa] += 1;
      }
      return acc;
    }, {});

    // Preparando os dados para o gráfico
    const veiculosData = {
      labels: Object.keys(uniqueVeiculos),
      series: Object.values(uniqueVeiculos),
    };

    const options = {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: veiculosData.labels,
      },
      yaxis: {
        title: {
          text: 'Quantidade',
        },
      },
      fill: {
        opacity: 1,
      },
    };

    return (
      <div>
       

        <ReactApexChart options={options} series={[{ data: veiculosData.series }]} type="bar" height={250} />
      </div>
    );
  }

  // Função para contar os horários mais frequentes
  function countHorariosFrequentes() {
    const horarioCounts = horarios.reduce((acc, horario) => {
      const { Horario_Partida, Horario_Chegada } = horario;
      const horarioKey = `${Horario_Partida} - ${Horario_Chegada}`;

      if (!acc[horarioKey]) {
        acc[horarioKey] = 1;
      } else {
        acc[horarioKey] += 1;
      }
      return acc;
    }, {});

    // Ordenar os horários em ordem alfabética (pode precisar de uma lógica de ordenação mais complexa dependendo do formato)
    const sortedHorarios = Object.keys(horarioCounts).sort();

    // Criar um objeto com as contagens ordenadas
    const orderedHorarios = {};
    sortedHorarios.forEach((horario) => {
      orderedHorarios[horario] = horarioCounts[horario];
    });

    return orderedHorarios;
  }

  // Preparando os dados para o gráfico de horários
  const horariosData = countHorariosFrequentes();

  const options = {
    chart: {
      type: 'line',
      height: 180,
    },
    xaxis: {
      categories: Object.keys(horariosData),
    },
    yaxis: {
      title: {
        text: 'Quantidade',
      },
      tickAmount: 10, // Define a quantidade de valores no eixo Y
      labels: {
        formatter: function (value) {
          return Math.floor(value); // Formata os rótulos do eixo Y como números inteiros
        },
      },
    },
  };



  function contarTiposVeiculo() {
    const contagem = {};

    veiculos.forEach((veiculo) => {
      const { Tipo_Veiculo } = veiculo;

      if (!contagem[Tipo_Veiculo]) {
        contagem[Tipo_Veiculo] = 1;
      } else {
        contagem[Tipo_Veiculo] += 1;
      }
    });

    // Calcular porcentagem em relação ao total de veículos
    const totalVeiculos = veiculos.length;
    const dadosGrafico = {
      labels: Object.keys(contagem),
      series: Object.values(contagem).map((count) => ((count / totalVeiculos) * 100).toFixed(2)),
    };

    return dadosGrafico;
  }

  const tipoVeiculoData = contarTiposVeiculo();

  const tipoVeiculoOptions = {
    chart: {
      type: 'donut',
      height: 100,
    },
    labels: tipoVeiculoData.labels,
    series: tipoVeiculoData.series,
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    fill: {
      type: 'gradient',
    },
  };



  return (
    
    <div className="dashboard" style={{ overflow: "hidden" }}>
      {/* Tela de fundo escura */}
      <div className="dark-background"></div>
     
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={3}>
            <div className="sidebar">
              <Sidebar /> {/* Renderize o seu Navbar aqui */}
            </div>
          </Col>

          {/* Gráfico de Donut para Escolas */}


          <Col md={8}>
            <h3> Dashboard

            </h3>
            <Row>
              <Col md={6}>
                <Card className="dashboard-veiculo">
                  <Card.Body>
                    <ReactApexChart
                      options={tipoVeiculoOptions}
                      series={[1, 2]}
                      type="donut"
                      height={270}
                    />


                    <h5>Tipo de Veículo</h5>
                    <p>Porcentagem dos tipos de veículos</p>
                  </Card.Body>
                </Card>
              </Col>

              {/* Gráfico de Veículos */}
              <Col md={6}>
                <Card className="dashboard-card">
                  <Card.Body>
                    <VeiculosChart veiculos={veiculos} />

                    <h5>Gráfico 2</h5>
                    <p>Conteúdo do gráfico 2</p>
                  </Card.Body>
                </Card>
                {/* Renderize as informações da tabela Veículo aqui usando o estado "veiculos" */}
              </Col>
            </Row>
          </Col>
        </Row>



        <Row>
          <Col md={20} className="chart-container">
            <Card className="dashboard-card">
              <Card.Body>
                <ReactApexChart options={options} series={[{ data: Object.values(horariosData) }]} type="line" width={1000} height={250} />
                <h5>Horários</h5>
                <p>Conteúdo do gráfico 3</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}




export default Dashboard;

import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';

export default ({ children }) => {
  const history = useHistory();
  const { page } = useParams();
  const buttons = [
    ['Torneos disponibles', 'torneos'],
    ['Ranking', 'ranking'],
    ['Mis envíos', 'mis-envios'],
    ['Mis equipos', 'mis-equipos'],
  ];

  return (
    <Row>
      <Col className="side-panel">
        <Button disabled color="primary" className="side-panel-button">
          Programación competitiva
        </Button>
        {buttons.map((item, idx) => (
          <Button
            key={idx}
            disabled={page === item[1]}
            outline={page !== item[1]}
            className="side-panel-button"
            onClick={() => (window.location = `/programacion/${item[1]}`)}
          >
            {item[0]}
          </Button>
        ))}
        <Button
          outline
          className="side-panel-button-back"
          onClick={() => history.push('/')}
        >
          Volver al menu de selección
        </Button>
      </Col>
      <Col>{children}</Col>
    </Row>
  );
};

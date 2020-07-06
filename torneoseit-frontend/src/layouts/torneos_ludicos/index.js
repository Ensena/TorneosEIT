import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import { ConfigContext } from '../../contexts/config';

export default ({ children }) => {
  const context = useContext(ConfigContext);
  const history = useHistory();
  const { page } = useParams();
  const buttons = [
    ['Torneos disponibles', 'torneos'],
    ['Ranking', 'ranking'],
    ['Inscribir Torneos', 'inscribir-torneos'],
  ];

  return (
    <Row>
      <Col className="side-panel">
        <Button disabled color="primary" className="side-panel-button">
          Torneos lúdicos
        </Button>
        {buttons.map((item, idx) => (
          <Button
            key={idx}
            disabled={page === item[1]}
            outline={page !== item[1]}
            className="side-panel-button"
            onClick={() =>
              (window.location = `/ludico/${item[1]}` + context.token)
            }
          >
            {item[0]}
          </Button>
        ))}
        <Button
          outline
          className="side-panel-button-back"
          onClick={() => history.push('/' + context.token)}
        >
          Volver al menu de selección
        </Button>
      </Col>
      <Col className="right-side-container">{children}</Col>
    </Row>
  );
};

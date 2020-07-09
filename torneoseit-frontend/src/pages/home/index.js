import React, { useContext } from 'react';
import { Row, Col, Button } from 'reactstrap';
import './index.css';
import ensena from 'ensena';
import { ConfigContext } from '../../contexts/config';

export default () => {
  const context = useContext(ConfigContext);
  return (
    <Row>
      <Col className="home-button">
        <Button size="lg" color="info" href={'/ludico' + context.token}>
          Torneos lúdicos
        </Button>
      </Col>
      <Col className="home-button">
        <Button size="lg" color="info" href={'/programacion' + context.token}>
          Torneos de programación competitiva
        </Button>
      </Col>
    </Row>
  );
};

import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import './index.css';
export default () => (
  <Row>
    <Col className="home-button">
      <Button size="lg" color="info" href="/ludico">
        Torneos lúdicos
      </Button>
    </Col>
    <Col className="home-button">
      <Button size="lg" color="info" href="/programacion">
        Torneos de programación competitiva
      </Button>
    </Col>
  </Row>
);

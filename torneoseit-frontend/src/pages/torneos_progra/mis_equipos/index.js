import React from 'react';
import { Container, Button, Table, Input, Row, Col } from 'reactstrap';

export default () => {
  return (
    <Container fluid>
      <Row>
        <Col style={{ textAlign: 'center' }}>
          <h3>Mis equipos</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={2}>
          <Input placeholder="Buscar Equipo" />
          <div className="mis-equipos-list">
            {new Array(15).fill(null).map((item, index) => (
              <Button>Equipo {index + 1}</Button>
            ))}
          </div>
        </Col>
        <Col>
          <div className="equipo-container">
            <h3>Equipo #</h3>
            <Table borderless>
              <tbody>
                {new Array(10).fill(null).map((item, index) => (
                  <>
                    <tr>
                      <th style={{ width: '5%' }}>-</th>
                      <td>Pepito Morales</td>
                      <td>
                        <div className="eliminar-button-mis-equipos">
                          <strong>-</strong>
                        </div>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
            <Button color="success">Invitar miembro</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

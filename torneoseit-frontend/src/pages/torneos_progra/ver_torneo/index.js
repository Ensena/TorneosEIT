import React, { useState } from 'react';

import {
  Container,
  Button,
  Table,
  Input,
  Row,
  Col,
  Form,
  FormGroup,
  CustomInput,
  Label,
} from 'reactstrap';
import DatePicker from 'react-datepicker';

export default () => {
  const id = window.location.href
    .split('/')
    .pop()
    .substr(0, window.location.href.split('/').pop().indexOf('?'));

  return (
    <Container fluid>
      <Row>
        <Col style={{ textAlign: 'center', marginBottom: 20 }}>
          <h3>Torneo {id}</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: '6', offset: 3 }}></Col>
        <Col xs={{ size: '6', offset: 3 }}>
          <div className="mis-envios">
            <Table bordered>
              <tbody>
                {new Array(1).fill(null).map((item, index) => (
                  <>
                    <tr>
                      <th
                        style={{ backgroundColor: 'lightgrey', width: '10%' }}
                      >
                        {index + 2564}
                      </th>
                      <td style={{ borderRight: '0px none white' }}>
                        Pedrito y el lobo
                      </td>
                      <td
                        style={{ borderLeft: '0px none white', width: '10%' }}
                      >
                        <i class="fas fa-file-pdf"></i>
                      </td>
                    </tr>
                    <tr>
                      <th style={{ backgroundColor: 'lightgrey' }}>
                        {index + 4532}
                      </th>
                      <td style={{ borderRight: '0px none white' }}>
                        El gato juancho
                      </td>
                      <td
                        style={{ borderLeft: '0px none white', width: '10%' }}
                      >
                        <i class="fas fa-file-pdf"></i>
                      </td>
                    </tr>
                    <tr>
                      <th style={{ backgroundColor: 'lightgrey' }}>
                        {index + 4526}
                      </th>
                      <td style={{ borderRight: '0px none white' }}>
                        El problema imposible
                      </td>
                      <td
                        style={{ borderLeft: '0px none white', width: '10%' }}
                      >
                        <i class="fas fa-file-pdf"></i>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: '6', offset: 3 }}>
          <div className="ver-torneo-buttons-div">
            <Button color="dark">Ver ranking</Button>
            <Button color="dark">Subir una solución</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

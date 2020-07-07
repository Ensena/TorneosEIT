import React, { useState, useEffect, useContext } from 'react';
import { ConfigContext } from '../../../contexts/config';
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
import { url } from '../../../helpers';

export default () => {
  const context = useContext(ConfigContext);
  const [tournament, setTournament] = useState(null);
  const id = window.location.href
    .split('/')
    .pop()
    .substr(0, window.location.href.split('/').pop().indexOf('?'));

  useEffect(() => {
    fetch(url + `progcomp/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setTournament(res.data);
      });
  }, []);

  return (
    tournament && (
      <Container fluid>
        <Row>
          <Col style={{ textAlign: 'center', marginBottom: 20 }}>
            <h3>
              {tournament.id} - Torneo {tournament.name}
            </h3>
          </Col>
        </Row>
        <Row>
          <Col xs={{ size: '6', offset: 3 }}></Col>
          <Col xs={{ size: '6', offset: 3 }}>
            <div className="mis-envios">
              <Table bordered>
                <thead>
                  <tr>
                    <th style={{ backgroundColor: 'lightgrey', width: '10%' }}>
                      ID
                    </th>
                    <th
                      style={{
                        backgroundColor: 'white',
                        borderRight: '0px solid white',
                      }}
                    >
                      Nombre del problema
                    </th>
                    <th
                      style={{
                        backgroundColor: 'white',
                        width: '10%',
                        borderLeft: '0px solid white',
                      }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {tournament.questions.map((item, index) => (
                    <tr>
                      <th
                        style={{ backgroundColor: 'lightgrey', width: '10%' }}
                      >
                        {item.id}
                      </th>
                      <td style={{ borderRight: '0px none white' }}>
                        {item.name}
                      </td>
                      <td
                        style={{ borderLeft: '0px none white', width: '10%' }}
                      >
                        <a
                          href={url + `uploads/${item.file.split('\/').pop()}`}
                        >
                          <i class="fas fa-file-pdf"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={{ size: '6', offset: 3 }}>
            <div className="ver-torneo-buttons-div">
              <Button
                color="dark"
                onClick={() =>
                  (window.location =
                    '/programacion/ranking' + context.token + `&id=${id}`)
                }
              >
                Ver ranking
              </Button>
              <Button
                color="dark"
                onClick={() =>
                  (window.location =
                    '/programacion/subir-solucion' +
                    context.token +
                    '&id=' +
                    id)
                }
              >
                Subir una solución
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    )
  );
};

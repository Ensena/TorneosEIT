import React, { useState, useContext } from 'react';
import {
  Container,
  Button,
  Table,
  Row,
  Col,
  Input,
  Form,
  FormGroup,
  CustomInput,
  Label,
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import { ConfigContext } from '../../../contexts/config';
import { url } from '../../../helpers';

export default () => {
  const context = useContext(ConfigContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [preguntas, setPreguntas] = useState([0]);
  console.log(process.env.BACKEND_URL);

  const handleSubmit = (e) => {
    var auxUrl = url + 'progcomp/create/tournament';
    var request = new XMLHttpRequest();
    request.open('POST', auxUrl, true);
    request.send(new FormData(e.target));
    window.location = '/programacion/torneos' + context.token;
    e.preventDefault();
  };

  return (
    <Container fluid>
      <Form
        action="http://localhost:5000/progcomp/create/tournament"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <Row>
          <Col style={{ textAlign: 'center' }}>
            <h3>Crear torneo</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={{ size: '6', offset: 3 }}>
            <FormGroup>
              <Label for="exampleCustomSelect">Nombre del torneo</Label>
              <Input
                type="input"
                id="id_torneo_name"
                name="name"
                required
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label style={{ display: 'block' }} for="exampleCustomSelect">
                Fecha de inicio
              </Label>
              <DatePicker
                name="start"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ display: 'block' }} for="exampleCustomSelect">
                Fecha de término
              </Label>
              <DatePicker
                name="end"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                required
              />
            </FormGroup>
            <Input hidden name="type" value="0"></Input>
            <FormGroup>
              <Label>Premios</Label>
              <Input
                type="textarea"
                id="id_torneo_premios"
                name="prices"
                required
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Categoría</Label>
              <CustomInput
                type="select"
                id="id_torneo_categoria"
                name="category"
                required
              >
                <option value="">Seleccionar categoria</option>
                <option value="1">Principiante</option>
                <option value="2">Intermedio</option>
                <option value="3">Avanzado</option>
              </CustomInput>
            </FormGroup>

            <hr style={{ margin: '40px 0px' }} />
            {preguntas.map((item, index) => (
              <div
                key={`${item}-${index}`}
                style={{ marginTop: index === 0 ? 10 : 80 }}
              >
                <div style={{ margin: '20px 0px' }}>
                  <h3 style={{ display: 'inline' }}>Pregunta {index + 1}</h3>
                  {preguntas.length > 1 && (
                    <Button
                      style={{ float: 'right' }}
                      color="danger"
                      type="button"
                      onClick={() =>
                        setPreguntas(preguntas.filter((aux) => aux !== item))
                      }
                    >
                      Eliminar pregunta
                    </Button>
                  )}
                </div>
                <FormGroup>
                  <Label>Nombre</Label>
                  <Input
                    type="input"
                    id={`id_pregunta_${index + 1}_nombre`}
                    name={`questions[${index}][name]`}
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label>ID</Label>
                  <Input
                    type="input"
                    id={`id_pregunta_${index + 1}_id`}
                    name={`questions[${index}][id]`}
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label>Judge</Label>
                  <CustomInput
                    type="select"
                    id={`id_pregunta_${index + 1}_judge`}
                    name={`questions[${index}][judge]`}
                    required
                  >
                    <option value="">Seleccionar un Judge</option>
                    <option value="https://onlinejudge.org/">UVA Judge</option>
                  </CustomInput>
                </FormGroup>
                <FormGroup>
                  <Label>PDF de la pregunta</Label>
                  <CustomInput
                    type="file"
                    id={`id_pregunta_${index + 1}_pdf`}
                    name={`files`}
                    accept=".pdf"
                    required
                  ></CustomInput>
                </FormGroup>
                <Button
                  style={{ float: 'right', marginBottom: 15 }}
                  type="button"
                  color="primary"
                  onClick={() => setPreguntas([...preguntas, preguntas.length])}
                >
                  Agregar otra pregunta
                </Button>
              </div>
            ))}
          </Col>
          <Col xs={{ size: '6', offset: 3 }}>
            <Button style={{ float: 'right' }} type="submit" color="success">
              Enviar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

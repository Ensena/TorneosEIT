import React, { useState } from 'react';
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

export default () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [preguntas, setPreguntas] = useState([0]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <Container fluid>
      <Row>
        <Col style={{ textAlign: 'center' }}>
          <h3>Crear torneo</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: '6', offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="exampleCustomSelect">Nombre del torneo</Label>
              <Input
                type="input"
                id="exampleCustomSelect"
                name="name"
                required
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label style={{ display: 'block' }} for="exampleCustomSelect">
                Fecha de inicio
              </Label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ display: 'block' }} for="exampleCustomSelect">
                Fecha de término
              </Label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleCustomSelect">Premios</Label>
              <Input
                type="textarea"
                id="exampleCustomSelect"
                name="premios"
                required
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleCustomMutlipleSelect">Categoría</Label>
              <CustomInput
                type="select"
                id="exampleCustomMutlipleSelect"
                name="categoria"
                required
              >
                <option value="">Select</option>
                <option>Value 1</option>
                <option>Value 2</option>
                <option>Value 3</option>
                <option>Value 4</option>
                <option>Value 5</option>
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
                  <Label for="exampleCustomSelect">Nombre</Label>
                  <Input
                    type="input"
                    id="exampleCustomSelect"
                    name={`pregunta_${index + 1}_nombre`}
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleCustomSelect">ID</Label>
                  <Input
                    type="input"
                    id="exampleCustomSelect"
                    name={`pregunta_${index + 1}_id`}
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleCustomMutlipleSelect">Judge</Label>
                  <CustomInput
                    type="select"
                    id="exampleCustomMutlipleSelect"
                    name={`pregunta_${index + 1}_judge`}
                    required
                  >
                    <option value="">Select</option>
                    <option>Value 1</option>
                    <option>Value 2</option>
                    <option>Value 3</option>
                    <option>Value 4</option>
                    <option>Value 5</option>
                  </CustomInput>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleCustomMutlipleSelect">
                    PDF de la pregunta
                  </Label>
                  <CustomInput
                    type="file"
                    name={`pregunta_${index + 1}_pdf`}
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
          </Form>
        </Col>
        <Col xs={{ size: '6', offset: 3 }}>
          <Button style={{ float: 'right' }} type="submit" color="success">
            Enviar
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import Select from 'react-select';

export default () => {
  const [equipos, setEquipos] = useState(
    new Array(5).fill(null).map((item, index) => ({
      name: `Equipo-${index}`,
      integrantes: ['Pepito', 'Pablito', 'Fulanito'],
    }))
  );
  const [selectedEquipo, setSelectedEquipo] = useState(null);
  const [crear, setCrear] = useState(false);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const MyComponent = () => <Select options={options} />;

  const toggle = () => setCrear(!crear);
  return (
    <Container fluid>
      <Form>
        <Modal isOpen={crear} toggle={toggle}>
          <ModalHeader toggle={toggle}>Crear equipo</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="exampleCustomSelect">Nombre del equipo</Label>
              <Input
                type="input"
                id="exampleCustomSelect"
                name="name"
                required
              ></Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Crear
            </Button>{' '}
            <Button color="secondary" type="button" onClick={toggle}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </Form>
      <Row>
        <Col style={{ textAlign: 'center' }}>
          <h3>Mis equipos</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={2}>
          <div className="mis-equipos-list">
            <Button color="success" onClick={() => setCrear(true)}>
              Crear equipo
            </Button>
          </div>
          <Select
            placeholder="Buscar equipo"
            onChange={(value) => setSelectedEquipo(value.value)}
            options={equipos.map((item, index) => ({
              value: index,
              label: item.name,
            }))}
          />
        </Col>
        <Col>
          {selectedEquipo !== null ? (
            <div className="equipo-container">
              <h3>{equipos[selectedEquipo].name}</h3>
              <Table borderless>
                <tbody>
                  {equipos[selectedEquipo].integrantes.map((item, index) => (
                    <>
                      <tr>
                        <th style={{ width: '5%' }}>-</th>
                        <td>{item}</td>
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
          ) : (
            <div className="equipo-container">
              <h3>Seleccione un equipo</h3>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

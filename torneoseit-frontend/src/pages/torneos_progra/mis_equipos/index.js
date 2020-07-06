import React, { useState, useEffect, useContext, useRef } from 'react';
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
import { ConfigContext } from '../../../contexts/config';
import { url } from '../../../helpers';
import ensena from 'ensena';

export default () => {
  const context = useContext(ConfigContext);
  const [equipos, setEquipos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [selectedEquipo, setSelectedEquipo] = useState(null);
  const [crear, setCrear] = useState(false);
  const selectedEquipoRef = useRef();

  useEffect(() => {
    fetchEquipos();
  }, []);

  const toggle = () => setCrear(!crear);

  const fetchEquipos = () => {
    setCargando(true);
    fetch(url + `team/${ensena.User().ID}`)
      .then((res) => res.json())
      .then((res) => {
        setCargando(false);
        console.log(res.data);
        setEquipos(res.data.teams);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    var auxUrl = url + 'team';
    fetch(auxUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name.value.trim(),
        member: form.member.value,
      }),
    }).then(() => {
      setCargando(true);
      setTimeout(() => fetchEquipos(), 2000);
    });
    toggle();
  };

  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    var auxUrl = url + 'team/add';
    fetch(auxUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rut: form.rut.value.trim(),
        team_id: form.team_id.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCargando(true);
        setTimeout(() => fetchEquipos(), 2000);
      });
  };

  const deleteTeam = async (id) => {
    selectedEquipoRef.current.select.clearValue();
    var auxUrl = url + 'team/delete';
    const members = equipos[selectedEquipo].members;
    setSelectedEquipo(null);
    for (let member of members) {
      await fetch(auxUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rut_usuario: member.rut,
          team_id: id,
        }),
      });
    }
    setCargando(true);
    setTimeout(() => fetchEquipos(), 2000);
  };

  const deleteFromTeam = async (id, memberId) => {
    var auxUrl = url + 'team/delete';
    setCargando(true);
    fetch(auxUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rut_usuario: memberId,
        team_id: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTimeout(() => fetchEquipos(), 2000);
      });
  };

  const exitTeam = (id) => {
    selectedEquipoRef.current.select.clearValue();
    var auxUrl = url + 'team/delete';
    setSelectedEquipo(null);
    fetch(auxUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rut_usuario: ensena.User().ID,
        team_id: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCargando(true);
        setTimeout(() => fetchEquipos(), 2000);
      });
  };

  return (
    <Container fluid>
      <Modal isOpen={crear} toggle={toggle}>
        <Form
          onSubmit={handleSubmit}
          method="post"
          encType="multipart/form-data"
          action={url + 'team/'}
        >
          <Input
            id="equipo_member"
            type="input"
            value={ensena.User().ID}
            name="member"
            hidden
          />
          <ModalHeader toggle={toggle}>Crear equipo</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Nombre del equipo</Label>
              <Input id="equipo_name" type="input" name="name" required></Input>
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
        </Form>
      </Modal>
      <Row>
        <Col style={{ textAlign: 'center' }}>
          <h3>Mis equipos</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <div className="mis-equipos-list">
            <Button color="success" onClick={() => setCrear(true)}>
              Crear equipo
            </Button>
          </div>
          <Select
            placeholder="Buscar equipo"
            ref={selectedEquipoRef}
            isLoading={cargando}
            isDisabled={cargando}
            onChange={(value) => value && setSelectedEquipo(value.value)}
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
                  {equipos[selectedEquipo].members.map((item, index) => (
                    <>
                      <tr>
                        <th style={{ width: '5%' }}>-</th>
                        <td>{item.name}</td>
                        {!(equipos[selectedEquipo].ownerid === item.rut) &&
                          parseInt(equipos[selectedEquipo].ownerid) ===
                            ensena.User().ID && (
                            <td>
                              {parseInt(equipos[selectedEquipo].ownerid) ===
                                ensena.User().ID && (
                                <div
                                  className="eliminar-button-mis-equipos"
                                  onClick={() =>
                                    deleteFromTeam(
                                      equipos[selectedEquipo].id,
                                      item.rut
                                    )
                                  }
                                >
                                  <strong>-</strong>
                                </div>
                              )}
                            </td>
                          )}
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
              <div className="mis-equipos-buttons">
                {parseInt(equipos[selectedEquipo].ownerid) ===
                ensena.User().ID ? (
                  <>
                    <Form
                      onSubmit={handleAddMemberSubmit}
                      method="post"
                      encType="multipart/form-data"
                      action={url + 'add'}
                    >
                      <FormGroup>
                        <Input
                          name="team_id"
                          value={equipos[selectedEquipo].id}
                          hidden
                        />
                        <Input
                          name="rut"
                          placeholder="Ingresar rut"
                          type="number"
                          required
                        />
                        <Button color="success" type="submit">
                          Invitar miembro
                        </Button>
                      </FormGroup>
                    </Form>
                    <Button
                      color="danger"
                      onClick={() => deleteTeam(equipos[selectedEquipo].id)}
                    >
                      Eliminar Equipo
                    </Button>
                  </>
                ) : (
                  <Button
                    color="danger"
                    onClick={() => exitTeam(equipos[selectedEquipo].id)}
                  >
                    Salir de equipo
                  </Button>
                )}
              </div>
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

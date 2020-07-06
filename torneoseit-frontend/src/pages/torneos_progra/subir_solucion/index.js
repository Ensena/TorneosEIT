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
import { url } from '../../../helpers';
import ensena from 'ensena';

export default () => {
  const [equipos, setEquipos] = useState([]);
  const [require, setRequire] = useState({
    code: true,
    file: true,
  });
  const [sendAsTeam, setSendAsTeam] = useState(false);

  useEffect(() => {
    fetch(url + `team/${ensena.User().ID}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data.teams);
        setEquipos(res.data.teams);
      });
  }, []);

  const context = useContext(ConfigContext);

  const handleSubmit = (e) => {
    if (!sendAsTeam) {
      let element = document.getElementById('id_solucion_team');
      element.value = '';
    }
    var auxUrl = url + 'progcomp/submit';
    var request = new XMLHttpRequest();
    request.open('POST', auxUrl, true);
    request.send(new FormData(e.target));
    window.location = '/programacion/mis-envios' + context.token;
    e.preventDefault();
  };

  return (
    <Container fluid>
      <Form
        action="http://localhost:5000/progcomp/submit"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <Input name="contestant_rut" value={ensena.User().ID} hidden />
        <Row>
          <Col style={{ textAlign: 'center', marginBottom: 20 }}>
            <h3>Subir solución</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={{ size: '6', offset: 3 }}>
            <FormGroup>
              <Label>ID del problema</Label>
              <Input
                type="input"
                id="id_torneo_name"
                name="question_id"
                type="number"
                required
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Lenguaje</Label>
              <CustomInput
                type="select"
                id="id_torneo_categoria"
                name="lang"
                required
              >
                <option value="">Seleccionar lenguaje</option>
                <option value="1">C</option>
                <option value="2">JAVA</option>
                <option value="3">C++</option>
                <option value="4">PASCAL</option>
                <option value="5">C++11</option>
                <option value="6">Python</option>
              </CustomInput>
            </FormGroup>
            <FormGroup>
              <Label>Pega tu código</Label>
              <Input
                onChange={(v) =>
                  setRequire({
                    ...require,
                    code: v.target.value === '',
                  })
                }
                type="textarea"
                name="code"
                required={
                  !(require.code || require.file) ||
                  (require.code && require.file)
                }
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>O sube to código</Label>
              <CustomInput
                onChange={(v) =>
                  setRequire({
                    ...require,
                    file: v.target.value === '',
                  })
                }
                type="file"
                name="file"
                required={
                  !(require.code || require.file) ||
                  (require.code && require.file)
                }
              ></CustomInput>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" style={{ marginTop: 20 }}>
            <Row>
              <Col
                xs={{ size: 1, offset: 3 }}
                style={{ borderRight: '1px solid black' }}
              >
                <Button
                  color="dark"
                  type="submit"
                  onClick={() => setSendAsTeam(false)}
                >
                  Enviar
                </Button>
              </Col>
              <Col xs="3" className="team-pick-submissions">
                <CustomInput
                  type="select"
                  id="id_solucion_team"
                  name="team_id"
                  required={sendAsTeam}
                >
                  <option value="">Seleccionar equipo</option>
                  {equipos.map((team) => (
                    <option key={`${team.id} - ${team.name}`} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </CustomInput>
              </Col>
              <Col>
                <Button
                  color="dark"
                  type="submit"
                  onClick={() => setSendAsTeam(true)}
                >
                  Enviar como equipo
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

import React, { useState, useEffect } from 'react';
import {
  Container,
  Button,
  CustomInput,
  Input,
  Row,
  Table,
  Form,
} from 'reactstrap';
import { url } from '../../../helpers';
import ensena from 'ensena';

export default () => {
  const [equipo, setEquipo] = useState(true);
  const [individual, setIndividual] = useState(false);
  const [teamId, setTeamId] = useState(null);
  const [lista, setLista] = useState([]);

  useEffect(() => {
    let id = null;
    if (window.location.search.split('&id=').length === 2) {
      id = window.location.search.split('&id=')[1];
      setTeamId(id);
      fetchRanking(id);
    }
  }, []);

  const fetchRanking = async (id) => {
    const individualAux = (
      await fetch(url + `progcomp/ranking/personal/${id ?? '1%20or%20true'}`)
        .then((res) => res.json())
        .then((res) => res.data)
    ).map((item) => ({
      ...item,
      equipo: false,
    }));

    const equipoAux = (
      await fetch(url + `progcomp/ranking/team/${id ?? '1%20or%20true'}`)
        .then((res) => res.json())
        .then((res) => res.data)
    ).map((item) => ({
      ...item,
      equipo: true,
    }));
    let aux = [];

    if ((equipo && individual) || (!equipo && !individual))
      aux = individualAux.concat(equipoAux);
    else if (individual) aux = individualAux;
    else if (equipo) aux = equipoAux;

    setLista(sort(aux));
  };

  useEffect(() => {
    if (teamId) fetchRanking(teamId);
  }, [equipo, individual]);

  const sort = (list) => {
    return list;
  };

  return (
    <Container>
      <div className="ranking-top-navbar">
        {/* <Button color="dark" onClick={() => setTeamId(null)}>
          Ranking global
        </Button> */}
        <CustomInput
          type="checkbox"
          id="teamRanking"
          label="Ranking por equipo"
          checked={equipo}
          onChange={() => setEquipo(!equipo)}
        />
        <CustomInput
          type="checkbox"
          id="soloRanking"
          label="Ranking individual"
          checked={individual}
          onChange={() => setIndividual(!individual)}
        />
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            fetchRanking(teamId);
          }}
        >
          <div className="torneo-search">
            <Input
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              id="torneoId"
              placeholder="ID del torneo a buscar"
              required
            />
            <Button color="dark" type="submit">
              Buscar
            </Button>
          </div>
        </Form>
      </div>
      <div className="ranking-table">
        <Table>
          <thead>
            <tr>
              <th></th>
              <th style={{ width: '80%', textAlign: 'center' }}>Nombre</th>
              <th>#</th>
              <th>Puntaje</th>
            </tr>
          </thead>
          <tbody>
            {lista.length === 0 && (
              <tr>
                <th></th>
                <td style={{ textAlign: 'center' }}>
                  Ingrese el id de un torneo
                </td>
                <td></td>
                <td></td>
              </tr>
            )}
            {lista.map((item, index) => (
              <tr>
                <th>{index + 1}</th>
                <td style={{ textAlign: 'center' }}>
                  {equipo && individual && item.equipo
                    ? `${item.name} [Equipo]`
                    : item.name}
                </td>
                <td>{item.accepted}</td>
                <td>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

import React from 'react';
import { Container, Button, CustomInput, Input, Row, Table } from 'reactstrap';

export default () => {
  return (
    <Container>
      <div className="ranking-top-navbar">
        <Button color="dark">Ranking global</Button>
        <CustomInput
          type="checkbox"
          id="teamRanking"
          label="Ranking por equipo"
        />
        <CustomInput
          type="checkbox"
          id="soloRanking"
          label="Ranking individual"
        />
        <Input id="torneoId" placeholder="ID del torneo a buscar" />
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
            {new Array(10).fill(null).map((item, index) => (
              <tr>
                <th>{index + 1}</th>
                <td style={{ textAlign: 'center' }}>Fulano Detal</td>
                <td>{16532 + index}</td>
                <td>{16532 - index ** index}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

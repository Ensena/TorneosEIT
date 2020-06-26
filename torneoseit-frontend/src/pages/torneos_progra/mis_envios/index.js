import React from 'react';
import { Container, Button, CustomInput, Card, Row, Table } from 'reactstrap';

export default () => {
  return (
    <Container>
      <div className="mis-envios">
        <Table bordered>
          <thead>
            <tr>
              <th style={{ backgroundColor: 'lightgrey' }}>ID</th>
              <th style={{ width: '60%' }}>Estado</th>
              <th style={{ textAlign: 'center', backgroundColor: 'lightgrey' }}>
                Fecha de envío
              </th>
            </tr>
          </thead>
          <tbody>
            {new Array(10).fill(null).map((item, index) => (
              <>
                <tr>
                  <th style={{ backgroundColor: 'lightgrey' }}>
                    {index + 2564}
                  </th>
                  <td style={{ color: 'green' }}>Aceptado</td>
                  <td
                    style={{
                      textAlign: 'center',
                      backgroundColor: 'lightgrey',
                    }}
                  >
                    23-04-2019
                  </td>
                </tr>
                <tr>
                  <th style={{ backgroundColor: 'lightgrey' }}>
                    {index + 4532}
                  </th>
                  <td style={{ color: 'red' }}>Respuesta incorrecta</td>
                  <td
                    style={{
                      textAlign: 'center',
                      backgroundColor: 'lightgrey',
                    }}
                  >
                    23-04-2019
                  </td>
                </tr>
                <tr>
                  <th style={{ backgroundColor: 'lightgrey' }}>
                    {index + 4526}
                  </th>
                  <td style={{ color: 'red' }}>Tiempo límite excedido</td>
                  <td
                    style={{
                      textAlign: 'center',
                      backgroundColor: 'lightgrey',
                    }}
                  >
                    23-04-2019
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

import React, { useState, useEffect } from 'react';
import { Container, Button, CustomInput, Card, Row, Table } from 'reactstrap';
import { url } from '../../../helpers';
import ensena from 'ensena';
import useIsMounted from 'ismounted';
// 0: running, 1: Accepted, 2: WA, 3: TLE, 4: Compilation Error

export default () => {
  const isMounted = useIsMounted();
  const [submissions, setSubmissions] = useState([]);
  const status = {
    '0': {
      text: 'En revisión',
      color: 'grey',
    },
    '1': {
      text: 'Aceptado',
      color: 'green',
    },
    '2': {
      text: 'Respuesta incorrecta',
      color: 'red',
    },
    '3': {
      text: 'Tiempo limite excedido',
      color: 'red',
    },
    '4': {
      text: 'Error de compilación',
      color: 'red',
    },
  };

  useEffect(() => {
    fetch(url + `progcomp/submissions/${ensena.User().ID}`)
      .then((res) => res.json())
      .then((res) => {
        setSubmissions(res.data.submissions);
        for (let aux of res.data.submissions) {
          if (parseInt(aux.status) === 0) {
            checkStatus(aux.id);
          }
        }
      });
  }, []);

  const checkStatus = (id) => {
    fetch(url + `progcomp/submissions/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        submission_id: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 0 && isMounted.current) {
          setTimeout(() => checkStatus(id), 5000);
        }
      });
  };

  const formatDate = (d) => {
    const ye = new Intl.DateTimeFormat('es-cl', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('es-cl', {
      month: '2-digit',
    }).format(d);
    const da = new Intl.DateTimeFormat('es-cl', { day: '2-digit' }).format(d);
    return `${da}-${mo}-${ye}`;
  };

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
            {submissions.map((item, index) => (
              <tr>
                <th style={{ backgroundColor: 'lightgrey' }}>{item.id}</th>
                <td style={{ color: status[`${item.status}`].color }}>
                  {status[`${item.status}`].text}
                </td>
                <td
                  style={{
                    textAlign: 'center',
                    backgroundColor: 'lightgrey',
                  }}
                >
                  {formatDate(new Date(item.createdAt))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

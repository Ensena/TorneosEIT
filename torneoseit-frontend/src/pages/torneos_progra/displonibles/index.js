import React, { useContext } from 'react';
import { Card } from 'reactstrap';
import { ConfigContext } from '../../../contexts/config';
import ensena from 'ensena';
const lorem = `Non sit aute pariatur cillum et duis culpa magna anim culpa. Amet eu eiusmod Lorem nostrud. Laboris ea ut amet in consectetur deserunt. Culpa magna id labore dolor qui. Aute veniam ipsum ipsum culpa. Veniam deserunt esse nostrud elit aute ea consectetur commodo esse laborum consectetur enim minim ipsum. Est nostrud minim velit ullamco enim qui ipsum ipsum.

Id aliqua elit Lorem nostrud qui ut dolore ipsum consectetur mollit excepteur veniam. Nostrud excepteur do laboris est aliquip ad est pariatur. Exercitation eu consequat excepteur duis mollit ad deserunt incididunt ipsum qui nostrud magna proident. Ex aliqua ea incididunt officia cupidatat nulla tempor occaecat quis. Adipisicing aliqua cillum nulla eiusmod consectetur anim sunt consectetur id nulla eiusmod sint excepteur ex.`;

export default () => {
  const data = new Array(5).fill(null).map((item, index) => ({
    id: index,
    name: `Torneo ${index + 1}`,
    descripcion: lorem,
  }));

  const context = useContext(ConfigContext);
  const user = ensena.User();
  return (
    <div>
      <h3>
        Bienvenido {user.Name} {user.LastName}
      </h3>
      {data.map((item) => (
        <div
          className="torneo-list-div"
          onClick={() =>
            (window.location =
              `/programacion/ver-torneo/${item.id}` + context.token)
          }
        >
          <h3>{item.name}</h3>
          <p>{item.descripcion}</p>
        </div>
      ))}
    </div>
  );
};

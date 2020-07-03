import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import { LoadingFallback } from './helpers';

const DisponiblesProgra = React.lazy(() =>
  import('./pages/torneos_progra/displonibles')
);

const RankingProgra = React.lazy(() =>
  import('./pages/torneos_progra/ranking')
);

const MisEnviosProgra = React.lazy(() =>
  import('./pages/torneos_progra/mis_envios')
);

const MisEquiposProgra = React.lazy(() =>
  import('./pages/torneos_progra/mis_equipos')
);

const CrearTorneoProgra = React.lazy(() =>
  import('./pages/torneos_progra/crear_torneo')
);

const VerTorneoProgra = React.lazy(() =>
  import('./pages/torneos_progra/ver_torneo')
);

export const TorneosPrograRoutes = () => {
  const path = '/programacion';
  return (
    <Router>
      <Switch>
        <Suspense fallback={<LoadingFallback />}>
          <Route exact path={`${path}/torneos`}>
            <DisponiblesProgra />
          </Route>

          <Route exact path={`${path}/ranking`}>
            <RankingProgra />
          </Route>

          <Route exact path={`${path}/mis-envios`}>
            <MisEnviosProgra />
          </Route>

          <Route exact path={`${path}/mis-equipos`}>
            <MisEquiposProgra />
          </Route>

          <Route exact path={`${path}/crear-torneo`}>
            <CrearTorneoProgra />
          </Route>

          <Route exact path={`${path}/ver-torneo/:id`}>
            <VerTorneoProgra />
          </Route>
        </Suspense>
      </Switch>
    </Router>
  );
};

const DisponiblesLudico = React.lazy(() =>
  import('./pages/torneos_ludicos/displonibles')
);

const RankingLudico = React.lazy(() =>
  import('./pages/torneos_ludicos/ranking')
);

export const TorneosLudicosRoutes = () => {
  const path = '/ludico';
  return (
    <Router>
      <Switch>
        <Suspense fallback={<LoadingFallback />}>
          <Route exact path={`${path}/torneos`}>
            <DisponiblesLudico />
          </Route>

          <Route exact path={`${path}/ranking`}>
            <RankingLudico />
          </Route>
        </Suspense>
      </Switch>
    </Router>
  );
};

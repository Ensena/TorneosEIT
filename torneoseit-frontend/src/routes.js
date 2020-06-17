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

export default () => {
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
        </Suspense>
      </Switch>
    </Router>
  );
};

// export const TorneosLudicosRoutes = () => (
//   <Router>
//     <Switch>
//       <Suspense fallback={<LoadingFallback />}>
//         <Route exact path="/">
//           <div>Hola</div>
//         </Route>
//       </Suspense>
//     </Switch>
//   </Router>
// );

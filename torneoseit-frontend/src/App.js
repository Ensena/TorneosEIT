import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';
import { LoadingFallback } from './helpers';

const HomeLayout = React.lazy(() => import('./layouts/home'));
const TorneosLudicos = React.lazy(() => import('./layouts/torneos_ludicos'));
const TorneosProgra = React.lazy(() => import('./layouts/torneos_progra'));

const Home = React.lazy(() => import('./pages/home'));

const TorneosPrograRoutes = React.lazy(() =>
  import('./routes').then((module) => ({ default: module.TorneosPrograRoutes }))
);

const TorneosLudicosRoutes = React.lazy(() =>
  import('./routes').then((module) => ({
    default: module.TorneosLudicosRoutes,
  }))
);

export default () => (
  <div className="main-container">
    <Router>
      <Switch>
        <Suspense fallback={<LoadingFallback />}>
          <Route exact path="/">
            <HomeLayout>
              <Home />
            </HomeLayout>
          </Route>

          <Route exact path="/programacion">
            <Redirect to="/programacion/torneos" />
          </Route>

          <Route path="/programacion/:page">
            <TorneosProgra>
              <TorneosPrograRoutes />
            </TorneosProgra>
          </Route>

          <Route exact path="/ludico">
            <Redirect to="/ludico/torneos" />
          </Route>

          <Route path="/ludico/:page">
            <TorneosLudicos>
              <TorneosLudicosRoutes />
            </TorneosLudicos>
          </Route>
        </Suspense>
      </Switch>
    </Router>
  </div>
);

import React, { Suspense, useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';
import { LoadingFallback, url } from './helpers';
import { ConfigContext } from './contexts/config';
import ensena from 'ensena';
import 'react-datepicker/dist/react-datepicker.css';
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

export default () => {
  const context = useContext(ConfigContext);
  const user = ensena.User();
  if (!context.user) {
    context.setUser(true);
    fetch(url + 'user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${user.Name} ${user.LastName}`,
        rut: user.ID,
        power: true,
      }),
    });
  }
  if (window.location.search) {
    const search = window.location.search.substring(1);
    const json = JSON.parse(
      '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
      function (key, value) {
        return key === '' ? value : decodeURIComponent(value);
      }
    );
    context.setToken(`?TOKEN=${json.TOKEN}`);
  }
  return (
    <div className="main-container">
      <Router>
        <Switch>
          <Suspense fallback={<LoadingFallback />}>
            <Route exact path="/">
              <Redirect to="/programacion/torneos" />
              {/* <HomeLayout>
                <Home />
              </HomeLayout> */}
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
};

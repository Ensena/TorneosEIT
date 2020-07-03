import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ConfigProvider from './contexts/config';
import ensena from 'ensena';
import 'bootstrap/dist/css/bootstrap.min.css';

ensena.SetApp('bymSQsg2Gm');
ensena.SetWebUser().then(async () => {
  console.log(ensena);
  console.log(ensena.Ctx());
  console.log(ensena.Ctx().User);
  console.log(ensena.User());

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
});
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
serviceWorker.unregister();

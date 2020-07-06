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
  ReactDOM.render(
    <React.StrictMode>
      <ConfigProvider>
        <App />
      </ConfigProvider>
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

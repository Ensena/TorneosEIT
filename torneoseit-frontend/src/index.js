import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ensena from 'ensena'
import 'bootstrap/dist/css/bootstrap.min.css';

// ensena.SetApp("bymSQsg2Gm")
// ensena.SetWebUser().then(() => {
//   ReactDOM.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>,
//     document.getElementById('root')
//   );
//   serviceWorker.unregister();
// })

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
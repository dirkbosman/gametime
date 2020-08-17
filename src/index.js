import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ContextProvider from "./context"

ReactDOM.render(
  <React.StrictMode>
    <StateContextProvider>
      <App />
    </StateContextProvider> 
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

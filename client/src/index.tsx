import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalPayments } from './components/PayPalPayments';

ReactDOM.render(
  <React.StrictMode>  
       <App /> 
  </React.StrictMode>,
  (document.getElementById('root'))
);


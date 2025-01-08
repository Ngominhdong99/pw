import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import CreditCardForm from './CreditCardForm.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CreditCardForm />
  </React.StrictMode>
);


import React from 'react';
import ReactDOM from 'react-dom/client'; // Dhyaan rahe, yahan 'react-dom/client' se import ho raha hai
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // createRoot() ka use karo
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

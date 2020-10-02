
// Importaciones requeridas de React
import React from 'react';
import ReactDOM from 'react-dom';

// Aplicación DriveApp
import { DriveApp } from './DriveApp';

// Estilos globales
import './index.css';

// Renderiza la aplicación en el tag con id 'root' del HTML
ReactDOM.render(
  <DriveApp />, // Componente que representa el App
  document.getElementById('root') // Referencia a un tag con id 'root'
);
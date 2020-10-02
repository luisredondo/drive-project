
// Importación de React
import React from 'react';

// Importación de la interfaz de gráfica del App de Drive
import UiDrive from './UiDrive';

// Componente DriveApp, representa a la aplicación y es el primero que renderiza
// Es decir, el punto de entrada. 
export const DriveApp = () => {
  // El componente DriveApp retorna el component UiDrive
  return (
    <UiDrive/> // Componente para renderizar la UI del app
  )
}

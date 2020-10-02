// Importamos React y los hooks para utilizar el estado y las referencias
import React, { useState, useRef } from 'react';

// Importación de Swal
// Swal: librería para lanzar alertas flotantes (ex: de carga, de error, etc)
import Swal from 'sweetalert2';

// Importamos la función 'fileUpload'
// fileUpload sirve para subir un archivo al STORAGE de Firebase
import { fileUpload } from '../../helpers/fileUpload';

// Declaramos el componente UploadButton
export const UploadButton = () => {

  // Creamos un estado para el componente encargado de 
  // mantener el archivo seleccionado por el usuario.
  const [
    file, // 'file' se encarga de mantener la ref al archivo seleccionado por el usuario. Es inmutable.
    setFile // 'setFile' se encarga de establecer un valor a 'file' debido a que modificar el estado directamente está prohibido por React.
  ] = useState(''); // Los '' dentro de useState son el estado inicial de 'file'

  // Creamos una referencia para poder utilzar el boton de seleccionar archivo
  // a lo largo de nuestro código javascript dentro de este componente (UploadButton)
  const fileSelector = useRef(null);
  
  // Función encargada de manejara la subida del archivo
  const handleFileUpload = async() => {
    // Llama a la función para subir el archivo al STORAGE de Firebase
    await fileUpload(file);
    // Luego de subirse, reseteamos el estado local
    setFile('');
    fileSelector.current.value = '';
  };

  // Función encargada de manejar la selección del archivo por el usuario
  const handleFileSelection = async(e) => {//metodo asincrono
    // Evitamos que la página recargue al presionar 'subir'
    e.preventDefault();

    // Verificamos si el estado 'file' NO ESTA (!==) vacío ('')
    if (file !== '') {
      // Ya que 'file' no está vació; es decir, tiene el archivo entonces...
      // ...llamamos a la función para subir dicho archivo (referenciado en 'file')
      await handleFileUpload()
    } else {
      // Si el archivo está vación entonces lanza una alerta
      // indicándole al usuario que no selecciono nada
      Swal.fire({
        title: 'No has seleccionado un archivo', // Título / mensaje
        icon: 'error', // Tipo de alerca
      });
    }
  };

  // Función encargada de establecer el archivo (único) seleccionado por el usuario
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Obtemeos el archivo seleccionado por el usuario (el primero, por eso el [0])
    if (file !== null) { // Si el arhivo no es nulo, es decir, existe
      setFile(file); // Entonces establecemos ese archivo en 'file'
    }
  };
  
  // Retorna lo que renderizará este componente (UploadButton)
  return (
    // Formulario para capturar el evento al presionar 'Subir'
    // Al presionar 'subir' se ejecuta onSubmit, misma que ejecuta 'handleFileSelection'
    <form onSubmit={ handleFileSelection } className="red" >
      <input // Este es el input para 'Subir archivo'
        ref={fileSelector} // Asignamos la referencia para utilizar este input a lo largo del componente
        id="fileSelector"
        type="file" // Input de tipo archivo
        name="file"
        onChange={ handleFileChange } // Cada vez que el usuario selecciona algo, se ejecuta la función 'handleFileChange' para establecer el archivo en 'file'
      />
      {/* Botón de subir que al presionarlo se ejecuta onSubmit en el form. Y claro, de existir el archivo, lo sube. */}
      <button>Subir</button> 
    </form>
  )
}

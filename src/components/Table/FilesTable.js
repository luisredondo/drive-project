// Importamos React y los hooks de estado y efecto
import React, { useState, useEffect } from 'react';

// Importamos la base de datos NoSQL Firestore
import { firestore } from '../../firebase/FirebaseConfig';
// Importamos la función para convertis bytes a unidades de medida mayores
import { bytesToSize } from '../../helpers/bytesToSize';

// Declaramos y exportamos el componente para crear la tabla de archivos subidos
export const FilesTable = () => {
  // Creamos el estado para manejar los archivos
  const [files, setFiles] = useState([]); // Iniciálizamos con un arreglo vació 

  // Usamos el useEffect como didMountComponent.
  // No le mandamos dependencias para que sólo se ejecute una vez
  // Esto sería entonces lo primero que se ejecutaría antes de renderizar el componente en pantalla
  useEffect(() => {
    firestore // Llámamos a la base de datos
      .collection("files")// Llámamos a la colección 'files' (tabla)
      .onSnapshot((documents) => { // Nos 'suscribimos' a la colección para escuchar sus cambios (CRUD) en tiempo real. (Nos da los documentos)
        var data = []; // Declaramos un arreglo vació que contendrá los archivos
        documents.forEach((doc) => {  // Recorremos cada documentos y lo agregamos al arreglo 'data'
          data.push({
            id: doc.id, // Id del documento
            ...doc.data(), // Contenido del documento (como columnas de la fila)
          });
        });
        setFiles(data); // Establecemos nuestros archivos de la base de datos a 'files' (el estado), es decir, de manera local
      });  
  }, []);

  // Función asíncrona (esperará respuestas) para eliminar documentos
  const deleteFile = async(file) => {
    // Lanzamos un Pop-Up pregúntando al usuario si está seguro que desea eliminar el archivo
    // Retorna un valor bool
    const confirm = window.confirm('¿Seguro que deseas eliminar este archivo?');

    if (confirm) { // Si confirmo === true
      await firestore // Llámamos a base de datos
        .collection('files') // Colección 'files' (tabla)
        .doc(file.id) // Al documento (fila) con el id que deseamos eliminar
        .delete(); // Y lo eliminamos con el método 'delete'
    }
  };

  // Función para mostrar el archivo
  const seeFile = (file) => {
    window.open(file.url); // Abrimos en una nueva ventala la url del archivo a mostrar
  };

  // Retornamos el HTML que representa la estructura del componente (FilesTable) a renderizar
  return (
    <table>
      {/* Table Head representa semánticamente el encabezado de la tabla */}
      <thead> 
        {/* Creamos una fila */}
        <tr>
          {/* Creamos los table headers, primera fila, columnas del encabezado de la tabla */}
          <th>Nombre</th>
          <th>Subida</th>
          <th>Tamaño</th>
          <th>Eliminar</th>
          <th>Visualizar</th>
        </tr>
      </thead>
      {/* Table Body representa semánticamente el cuerpo de la tabla */}
      <tbody>
        {/* Utilizamos {} para decirle a JSX que utilizaremos código JS dentro de HTML */}
        {
          // Mapeamos o 'recorremos' cada elementos dentro del arreglo 'files'.
          // Es decir, los archivos. Recorremos uno por uno cada archivo
          files.map((file) => {
            // Por cada archivo regresaremos el siguiente HTML
            return (
              // Creamos un tr (Table Row); una fila que contendrá los datos del archivo
              // La prop key es requerida por React para indetificar cambios en la lista
              <tr key={file.file_name}>
                {/* Columna con el nombre del archivo */}
                <td>{file.file_name}</td>
                {/* Columna con la fecha */}
                <td>{new Date().toDateString()}</td>
                {/* Columna con el tamaño (en unidades mejor interpretable) del archivo */}
                <td>{bytesToSize(file.file_size)}</td>
                {/* Columna con botón para eliminar el archivo */}
                <td>
                  <button
                    onClick={ () => deleteFile(file) } // Al hacer click (onClick) ejecuta la función para eliminar el archivo
                  >
                    Eliminar
                  </button>
                </td>
                {/* Columna con botón para ver el archivo */}
                <td>
                  <button
                    onClick={ () => seeFile(file) } // Al hacer click (onClick) ejecuta la función para ver el archivo en una nueva ventana
                  >
                    Ver
                  </button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

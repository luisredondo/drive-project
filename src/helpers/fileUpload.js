// Importamos el STORAGE y FIRESTORE desde FirebaseConfig.js para utilizarlos aquí
import { storage, firestore } from "../firebase/FirebaseConfig";

// Importamos el paquete para lanzar alertas
import Swal from 'sweetalert2';

// Declaramos la función 'fileUpload' que recibe como parámetro un archivo 'file'
export const fileUpload = async(file) => {

  // Utilizamos try {} catch {} para capturar cualquier error que ocurra en el proceso de subida.
  try {
    // Guárdamos la referencia que el STORAGE nos da de donde se guardará el archivo que el usuario seleccionó
    const storageRef = await storage.ref(`${file.type}/${file.name}`);
    
    // Lanzamos una alerta para indicar al usario que el archivo se está subiendo.
    Swal.fire({
      title: 'Subiendo archivo...', // Mensaje
      timerProgressBar: true, // Le decimos que nos muestre una barra de progreso
      onBeforeOpen: () => { // Ejecutamos el loading
        Swal.showLoading()
      },
    })
    
    // Utilizamos nuestra referencia y ahora si, la subimos al STORAGE
    // Y como una subida a internet no es síncrona (directa) entonces utilizamos el 'await'
    // para esperar que el proceso termine y seguir ejecutando el código
    await storageRef.put(file);
    // Una vez subido, le decimos a la referencia que nos de el URL para descargar el archivo
    // que acabamos de subir
    const url = await storageRef.getDownloadURL();

    // Llegados a este punto, todo ocurrió con éxito, entonces lánzamos una alerta para hacerle
    // saber al usuario que su archivo fue subido con éxito
    Swal.fire({
      title: 'Tu archivo ha sido subido', // Mensaje
      icon: 'success', // Tipo de alerta
    });

    // El archivo ya está en el STORAGE pero ahora debemos guardar
    // una referencia al mismo en la base de datos para poder mostrarlo en la tabla al usuario
    // Ejecutamos para ello la función saveInDb (guardar en la base de datos)
    // y ple mandamos el archivo y la URL a donde se puede descargar
    saveInDb({file, url});

  } catch (err) {
    // Si ocurre un error, el 'catch' lo capturará 'err' y lo podremos manejar

    // Ya que sucedió un error en algún proceso dentro del 'try' entonces
    // le hacemos saber al usuario sobre ello con una alerta
    Swal.fire({
      title: 'Sucedió un error mientras se subía el archivo', // Mensaje
      icon: 'error', // Tipo de alerta
    });
    throw err;
  }

}

// Función para guardar el archivo y su url de descargar en la base de datos
const saveInDb = ({file, url}) => {
  // Declaramos el objeto (llave-valor) que se guardará en la base de datos
  const data = { 
    url: url, // URL de descargar
    upload_date: new Date(), // Fecha exacta de cuándo se subió
    file_name: file.name, // Nombre del archivo
    file_size: file.size, // Tamaño en bytes del archivo
    file_type: file.type, // Tipo de dato del archivo subido (txt, img, png, html, etc)
    last_modified: file.lastModifiedDate, // Fecha en que se modifico el archivo por última vez
  };

  firestore // Llámamos a la base de datos
    .collection('files') // Llámamos a la colección (como una tabla en SQL) en donde guárdaremos el archivo
    .add(data); // Añadimos el archivo a la colección (como quien dice una fila a la table en SQL)
};
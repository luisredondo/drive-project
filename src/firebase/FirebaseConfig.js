// Importamos firebase y los servicios del mismo que utilizaremos
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// Creamos el objeto de configuración requerido por el backend de Firebase para 
// autorizanos a interacutar con ellos.
// Está información está guardar en variables de entorno (archivo .env) ya que es delicada
// ¿De dónde la sacamos? Firebase mismo nos la otorga al crear un proyecto.
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
};

// Mándamos la confiración a Firebase para inicializar la conexión
firebase.initializeApp(firebaseConfig);

// Creamos una variable con los servicios que utilizaremos (firestore y storage)

// Firebase Firestore es una base de datos NoSQL en tiempo real para guardar colecciones y documentos
// Para hacerse una idea, las colecciones son como una tabla y los documentos como sus filas
const firestore = new firebase.firestore();

// Firebase Storage es un 'almacen' para, valga la redundancia, almacenar archivos
// Algo así como lo que deja hacer Google Drive, Mega, Dropbox, etc.
const storage = new firebase.storage();

// Exportamos lo que necesitaremos en otros modulos
export {
  firebase,
  firestore,
  storage
}
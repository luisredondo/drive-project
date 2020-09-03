import React, { useState, useEffect } from 'react';

import { firestore } from '../../firebase/FirebaseConfig';
import { bytesToSize } from '../../helpers/bytesToSize';

export const FilesTable = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    firestore
      .collection("files")
      .onSnapshot((documents) => {
        var data = [];
        documents.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setFiles(data);
      });  
  }, []);

  console.log(files);

  const deleteFile = async(file) => {
    const confirm = window.confirm('¿Seguro que deseas eliminar este archivo?');

    if (confirm) {
      await firestore
        .collection('files')
        .doc(file.id)
        .delete();
    }
  };

  const saveFile = async(file) => {
    window.open(file.url);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Subida</th>
          <th>Tamaño</th>
          <th>Eliminar</th>
          <th>Descargar</th>
        </tr>
      </thead>
      <tbody>
        {
          files.map((file) => {
            return (
              <tr key={file.file_name}>
                <td>{file.file_name}</td>
                <td>{new Date().toDateString()}</td>
                <td>{bytesToSize(file.file_size)}</td>
                <td>
                  <button
                    onClick={ () => deleteFile(file) }
                  >
                    Eliminar
                  </button>
                </td>
                <td>
                  <button
                    onClick={ () => saveFile(file) }
                  >
                    Descargar
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

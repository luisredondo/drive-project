import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';

import { fileUpload } from '../../helpers/fileUpload';

export const UploadButton = () => {
  const [file, setFile] = useState('');
  const fileSelector = useRef(null);
  
  const handleFileUpload = async() => {
    await fileUpload(file);
    setFile('');
    fileSelector.current.value = '';
  };

  const handleUpload = async(e) => {
    e.preventDefault();

    if (file !== '') {
      await handleFileUpload()
    } else {
      Swal.fire({
        title: 'No has seleccionado un archivo',
        icon: 'error',
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file !== null) {
      setFile(file);
    }
  };

  return (
    <form onSubmit={ handleUpload }>
      <input
        ref={fileSelector}
        id="fileSelector"
        type="file"
        name="file"
        onChange={ handleFileChange }
      />
      <button>Subir</button>
    </form>
  )
}

import { storage, firestore } from "../firebase/FirebaseConfig";
import Swal from 'sweetalert2';

export const fileUpload = async(file) => {

  const saveInDb = ({file, url}) => {
    const data = {
      url,
      upload_date: new Date(),
      file_name: file.name,
      file_size: file.size,
      file_type: file.type,
      last_modified: file.lastModifiedDate,
    };

    firestore
      .collection('files')
      .add(data);
  };

  try {    
    const storageRef = await storage.ref(`${file.type}/${file.name}`);
    
    console.log('FROM fileUpload');
    console.log(file);
    
    Swal.fire({
      title: 'Subiendo archivo...',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    })
    
    await storageRef.put(file);
    const url = await storageRef.getDownloadURL();

    Swal.fire({
      title: 'Tu archivo ha sido subido',
      icon: 'success',
    });

    saveInDb({file, url});

  } catch (err) {
      Swal.fire({
        title: 'Sucedió un error mientras se subía el archivo',
        icon: 'error',
      });
      throw err;
  }

}
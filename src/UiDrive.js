// Importación de React
import React from 'react'

// Importación del componente que renderiza el input 'Seleccionar archivo'
// y el botón de 'Subir'
import { UploadButton } from './components/UploadButton/UploadButton';

// Componente que renderiza los archivos que han sido subidos con su metadata
import { FilesTable } from './components/Table/FilesTable';

// Declaración del componente UiDrive, encargado de renderizar la interfaz gráfica general
const UiDrive = () => {
    // Retormanos la estructura (HTML) del contenido a renderizar
    
    return (
        <div>
            {/* Todas las clases utilizadas dentro de 'className' son de la librería 
            skeleton.css y sirven para estructurar la UI */}

            {/* Inicio de la barra de navegación */}
            <nav className="navbar bg-dark nav d-flex justify-content-center text-center  navbar-expand-sm p-2">
                {/* Logo de la aplicación */}
                <a className="navbar-brand text-white  ml-5 ml-0 name-person " href="#">
                    {/* // La prop src renderiza el la imagen que representará al logo */}
                    <img src="https://cdn2.iconfinder.com/data/icons/cloud-computing-44/64/4-512.png" width="50" height="50" alt="" loading="lazy" />
                </a>
                {/* Título de la aplicación */}
                <h4 className="text-white">LMH</h4>
            </nav>
            {/* Fin de la barra de navegación */}
            
            {/* Inicio del contenido principal */}
            <div className="container p-5">
                <div>
                    {/* Componente para renderizar los botones de carga 
                    y subida de archivos */}
                    <UploadButton />
                    <br />
                    <br />
                    {/* Componente que renderiza una tabla con los archivos subidos 
                    y su metadata */}
                    <FilesTable />
                </div>
            </div>
            {/* Fin del contenido principal */}

            {/* Inicio del footer */}
            <div className="footer-copyright bg-dark text-white text-center py-3">© 2020 Copyright
                <a className="text-white" href="https://mdbootstrap.com/"> Liceo Militar de Honduras</a>
            </div>
            {/* Fin del Footer */}

        </div>
    )
}

// Exportamos el componente UiDrive para poder ser utiliza por otros módulos
export default UiDrive

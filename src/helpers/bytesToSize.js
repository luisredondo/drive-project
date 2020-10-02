
// Función para convertir los bytes a unidades de medida y más interpretables
// para el humano como los KB, MB, GB, TB...

// Declaración y exportación de la función (recibe los bytes como parámetro)
export const bytesToSize = (bytes) => {
  // Arreglo con las unidades de medida que manejáremos
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  // Si no hay bytes, retorna eso, que no hay.
  if (bytes === 0) return '0 Byte';

  // Lógica -no tan fácil de explicar- para convertir los bytes a unidades mayores
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  var size = Math.round(bytes / Math.pow(1024, i), 2);
  
  // Retornamos el tamaño en un String (texto) legible para el humano
  return `${size} ${sizes[i]}`;
}
//Importamos el componente de la base de datos
import {db} from '../../../db/firebase'
const add = {};

//Creamos funcion flecha nombrada addOrEditLink
add.addOrEditLink = async (linkObject) =>{
    //Ejecutamos de manera asincrona el crear una coleccion el .doc sirve para crear un id unico u el set() crea la coleccion segun el json
    await db.collection('links').doc().set(linkObject);
    console.log('Add new task');
};

export default add;
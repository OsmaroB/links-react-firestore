//Importamos el componente de la base de datos
import {db} from '../../../db/firebase'
const read =  {};

//Este se utiliza cuando necesitas recolectar la información una sola vez
read.getLinks_veta = async() =>{
    //La ponemos en una constante dado que es asyncrono
    const querySnapshot = await db.collection('links').get();
    //recorremos la respuesta en un forEach
    querySnapshot.forEach(doc =>{
        console.log(doc.data());
    });
};

//Este se utiliza cuando necesitas recargar en tiempo real el cambio
read.getLinks = () =>{
    //nombramos una constante doc tipo vacia
     const docs = [];
    db.collection('links').onSnapshot(querySnapshot =>{
        querySnapshot.forEach(doc =>{
            //Usamos destructuracion EM6 para poder colocarle los datos antiguos mas ina variable llamada id en el json
            docs.push({...doc.data(), id:doc.id});
        });
        //setLinks(docs);
        console.log(docs);
    })
    
};

export default read;
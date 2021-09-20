//Importamos el componente de la base de datos
import {db} from '../../../db/firebase'
const delete_ = {};

delete_.onDeleteLink = async (id) =>{
    if(window.confirm('Are you sure you want to delete this link ?')){
        await db.collection('links').doc(id).delete();
        console.log('Task delete');
    }
    
};

export default delete_;
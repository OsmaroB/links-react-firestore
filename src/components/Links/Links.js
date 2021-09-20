import React, {useEffect, useState} from 'react'
//Importamos el componente LiknForm para que pueda ser utilizado en app.js
import LinkForm from '../LinkForm/LinkForm';
//Importamos las funciones
//Importamos el componente de la base de datos
import {db} from '../../db/firebase'
// import add from './functions/create';
import delete_ from './functions/delete';

const Links = () => {

    //Se declaran elementos globales para poderlos pintar
    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const addOrEditLink = async (linkObject) =>{
        if(currentId === ''){
             //Ejecutamos de manera asincrona el crear una coleccion el .doc sirve para crear un id unico u el set() crea la coleccion segun el json
            await db.collection('links').doc().set(linkObject);
            console.log('Add new task');
        }else{
            await db.collection('links').doc(currentId).set(linkObject);
            console.log('Link update successfully');
            setCurrentId('')
        }
       
    };
    const getLinks = () =>{
        db.collection('links').onSnapshot(querySnapshot =>{
            //nombramos una constante doc tipo vacia
            const docs = [];
            querySnapshot.forEach(doc =>{
                //Usamos destructuracion EM6 para poder colocarle los datos antiguos mas ina variable llamada id en el json
                docs.push({...doc.data(), id:doc.id});
            });
            setLinks(docs)
     })
    };

    //Este eveto sirve para que cuando cambie una porcion de estado se actualice
    useEffect(() => {
        getLinks();
    }, [])

    return (
        <div>
            <h1>Links</h1>
            <div className="col-md-4 p-2">
                <LinkForm  {...{addOrEditLink, currentId, links}}/>
            </div>
            <div className="col-m-8 p-2">
                {
                    links.map(link =>{
                        return (
                            <div className="card mb-1" key={link.id}>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <h4>{link.name}</h4>
                                        <div>
                                            <i className="material-icons text-danger" onClick={() => delete_.onDeleteLink(link.id)}>close</i>
                                            <i className="material-icons" onClick={() => setCurrentId(link.id)}>create</i>
                                        </div>
                                    </div>
                                    <p>{link.description}</p>
                                    <a href={link.url} target="_blank" rel="noreferrer">Go to website</a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Links;
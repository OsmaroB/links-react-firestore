import React, { useState, useEffect } from 'react'
//Importamos el componente de la base de datos
import {db} from '../../db/firebase'

const LinkForm = (props) => {

    const getLinkById = async (id) =>{
        const doc = await db.collection('links').doc(id).get();
        setValues({...doc.data()})
    }; 

    //Iniciamos los values de los input segun su name
    const initialStateValues = {
        url: '',
        name:'',
        description:''
    };

    const [values, setValues] = useState(initialStateValues);//Esta es la forma de usar el initialStateValues

    //Aca creamos eventos para que se ejecuten
    const handleSubmit = e =>{
        e.preventDefault();//Aca evitamos que recargue la pagina
        //Aca se recibe la propiedad que contiene la funcion llamada desde el componente padre
        props.addOrEditLink(values);
        //En el set values le decimos que copie los estados iniciales
        setValues({...initialStateValues});
    };

    //Creamos una funcion flecha que se encargue de recolectar el input segun en name
    const handleInputChange = (e) =>{
        //Hacemos una destructuracion con las propiedades name u value del e
        const {name, value} = e.target;
        //La propiedad setValue que esta en useState con los ... se copia lo existente con en name se reconoce el input y el value injecta la nueva info
        setValues({...values, [name]:value});
    };

    useEffect(() => {
        if(props.currentId ===''){
            setValues({...initialStateValues})
        }else{
            getLinkById(props.currentId)
        }
    }, [props.currentId])

    //Aca retornamos el elemento como queremos que se mire solamente visualmente con html y css
    return (

        <form className="card card-body" onSubmit={handleSubmit}>{/*Aca agregamos que cuando se envie ejecute la funcion flecha handleSubmit*/}
            <div className="form-group input-group m-2">
                <div className="input-group-text ">
                    <div className="material-icons ">insert_link</div>
                </div>
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="https://disenodepaginaswebcreativas.com"
                    name="url"
                    onChange={handleInputChange}
                    value={values.url}
                />
            </div>
            <div className="form-group input-group m-2">
                <div className="input-group-text ">
                    <div className="material-icons ">create</div>
                </div>
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="Website name"
                    name="name"
                    onChange={handleInputChange}
                    value={values.name}
                />
            </div>
            <div className="form-group m-2">
                <textarea 
                    name="description" 
                    id="txtdescription" 
                    rows="3"
                    cols="12"
                    className="form-control"
                    placeholder="Write a description"
                    onChange={handleInputChange}
                    value={values.description}

                ></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-block m-2">
               {props.currentId === '' ? 'Save':'Update'}
            </button>
        </form>
    )
}

export default LinkForm;
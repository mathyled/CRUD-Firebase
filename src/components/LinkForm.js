import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const LinkForm = (props) => {
    const initialStateValues = {
        url: "",
        name: "",
        description: ""
        
    }
    const [values, setValues] = useState(initialStateValues)

    const handlerInputChange = (e) => {
        const {name,value} = e.target
        // console.log(name,value)
        setValues({...values,[name] : value })
    }
    const handlerSubmit = (e) => {
        e.preventDefault()
        // console.log(values)
        props.addOrEditLink(values)
        setValues({...initialStateValues})
    }


    const getLinkById = async(id)=>{
      let docs = await getDoc(doc(db,"links",id))
      //console.log(docs.data())
      setValues({...docs.data()})
    }
    useEffect(()=>{
        if(props.currentId===""){
            setValues({...initialStateValues})
        }else{
            getLinkById(props.currentId)
        }
    },[props.currentId])
    return (
        <form className="card card-body">
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input
                    onChange={handlerInputChange}
                    type="text"
                    className="form-control"
                    placeholder="https://someurl.com"
                    name="url"
                    value={values.url}
                     />
            </div>

            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input
                    onChange={handlerInputChange}
                    type="text"
                    className="form-control"
                    placeholder="Website name"
                    name="name" 
                    value={values.name}/>
            </div >

            <div className="form-group">
                <textarea
                    onChange={handlerInputChange}
                    name="description"
                    rows="3"
                    className="form-control"
                    placeholder="Write a description"
                    value={values.description}
                ></textarea></div>
            <button
                className="btn btn-primary btn-block"
                onClick={handlerSubmit}
            >
              {props.currentId === "" ? "Save" : "Update"}
            </button>
        </form>
    )
}


export default LinkForm;
import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForm";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
const Links = () => {

    const addOrEditLink = async (linkObject) => {
        // console.log(linkObject)
        if (currentId === "") {
            await addDoc(collection(db, "links"), linkObject)
            toast.success("new task added", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else {
            let aux = doc(db, "links", currentId)
            await updateDoc(aux, linkObject)
            alert("Link Updated Successfully")
            setCurrentId("")
        }
    }

    const getLinks = async () => {
        const querySnapshot = await getDocs(collection(db, "links"));

        const docs = []
        querySnapshot.forEach((doc) => {

            docs.push({ ...doc.data(), id: doc.id })
        });
        setLinks(docs);
    }

    const [links, setLinks] = useState([])
    const [currentId, setCurrentId] = useState("")

    useEffect(() => {
        getLinks()
    }, [links])

    const onDeleteLink = async (id) => {
        // console.log(id)
        const taskDocRef = doc(db, 'links', id)
        if (window.confirm("are you sure you want to delete this link ?")) {
            await deleteDoc(taskDocRef)
            toast.error('task deleted', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }
    return (
        <div>
            <div className="col-md-8 p-2">
                {/* <LinkForm addOrEditLink={addOrEditLink} /> */}
                <LinkForm {...{ addOrEditLink, currentId, links }} />
            </div>
            <div className="col-md-8 p-2">
                {links.map(link => (
                    <div className="card mb-1" key={link.id} >
                        <div className="card-body" >
                            <div className="d-flex justify-content-between">
                                <h4>{link.name}</h4>
                                <div >
                                    <i
                                        className="material-icons text-danger"
                                        onClick={() => onDeleteLink(link.id)}
                                    >close</i>
                                    <i
                                        className="material-icons "
                                        onClick={() => setCurrentId(link.id)}
                                    >create</i>
                                </div>
                            </div>
                            <p>{link.description}</p>
                            <a href={link.url} target="_blank" rel="noreferrer" >Go to website</a>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Links;
import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import "./App.css";
function FirebaseFiles() {
  const [file, setFile] = useState(null);
  const [fileTarget, setFileTarget] = useState();
  const [fileName, setFileName] = useState();
  const [images, setImages] = useState([]);
  const [wait, setWait] = useState("Submit");
  const [id, setId] = useState(null);

 
  useEffect(() => {
    
    firebase.db
      .collection("user")
      .get()
      .then(data => {
        setImages([])
        return data.forEach(doc => {
          const avatar = firebase.storeRef.child(`${doc.data().avatar}`);
          const id = doc.id
          const path = doc.data().avatar
          avatar.getDownloadURL().then(url => {
            images.push({url, path, id})
            setImages([...images])
          });
        })
      }
      );
  }, [id]);

  const showFile = e => {
    const reader = new FileReader();
    if (e.target.value) {
      setFileName(e.target.files[0].name);
      setFileTarget(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setFile(reader.result);
      };
    }
    else{
      setFile(null)
    }
  };
 const deleteImg = (path, id)=> {
    firebase.delete(path).then(d=>console.log(d))
    firebase.onDelete(id,"user")
    setImages([])
    setId(id);
 }
  
  const onSubmit1 = () => {
    if (fileName) {
      setWait("Wait...");
      const upload = firebase.uploadImg(`user/avatar/${fileName}`, fileTarget);
      upload.then(data =>
        firebase
          .onCreate({ avatar: data.metadata.fullPath }, "user")
          .then(d => {
            setWait("Submit");
            setImages([])
            setId(d.id);
          })
      );
    }
  };
  

  return (
    <div className="main">
      <div className = "aside">
      <img className="preview" src={file}></img>
       
      <input className="file" type="file" onChange={showFile}></input>
      
      <button
        className="submit"
        onClick={wait !== "Wait..." && file !== null? onSubmit1 : ()=>{}}
      >
        {wait}
      </button>
      </div>
      <div className = "images" id = "scroll">
        {images.map(e => (
           <div key = {e.id} className="image">
          <img  src={e.url}></img>
          <button onClick = {()=>deleteImg(e.path, e.id)} className="butt">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FirebaseFiles;

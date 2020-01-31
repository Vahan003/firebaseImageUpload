import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import "./App.css";
function FirebaseFiles() {
  const [file, setFile] = useState();
  const [fileTarget, setFileTarget] = useState();
  const [fileName, setFileName] = useState();
  const [images, setImages] = useState([]);
  const [wait, setWait] = useState("Submit");
  const [id, setId] = useState();

  useEffect(() => {
    firebase.db
      .collection("user")
      .get()
      .then(data =>
        data.forEach(doc => {
          const avatar = firebase.storeRef.child(`${doc.data().avatar}`);
          avatar.getDownloadURL().then(url => {
            images.push(url);
            setImages([...images]);
          });
        })
      );
  }, []);

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
  };

  const onSubmit = () => {
    const avatar = firebase.storeRef.child(`user/avatar/${fileName}`);
    let fileData = new Blob([fileTarget], { type: "image/jpeg" });
    avatar
      .put(fileData)
      .then(snapshot =>
        firebase.onCreate({ avatar: snapshot.metadata.fullPath }, "user")
      );
  };
  const onSubmit1 = () => {
    if (fileName) {
      setWait("Wait...");
      const upload = firebase.uploadImg(`user/avatar/${fileName}`, fileTarget);
      upload.then(data =>
        firebase
          .onCreate({ avatar: data.metadata.fullPath }, "user")
          .then(d => {
            setWait("Reload");
            setId(d.id);
          })
      );
    }
  };
  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="main">
      <img className="preview" src={file}></img>
      <input className="file" type="file" onChange={showFile}></input>
      <button
        className="submit"
        onClick={wait !== "Reload" ? onSubmit1 : reload}
      >
        {wait}
      </button>
      <div>
        {images.map(e => (
          <img className="image" src={e}></img>
        ))}
      </div>
    </div>
  );
}

export default FirebaseFiles;

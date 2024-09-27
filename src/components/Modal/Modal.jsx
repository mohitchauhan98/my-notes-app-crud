import React, { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({ close, note, save }) => {
    const [editTitle,setEditTitle] = useState("")
    const [editDesc, setEditDesc] = useState("")

    useEffect(() => {
        if(note){
            setEditTitle(note.title)
            setEditDesc(note.desc)
        }
    }, [note])

    const handleSave = () => {
        save({ title: editTitle, desc: editDesc }); // Call save to update the note
    };
  return (
    <>
      <div className="overlay" onClick={close}></div>
      <div className="modal-box">
        <div className="modal-wrapper">
          <div>Edit Notes</div>
          <div>
            <div className="modal-title">
              <h5>Title</h5>
              <input type="text" placeholder="Enter Yout Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}/>
            </div>
            <div className="modal-title">
              <h5>Description</h5>
              <textarea type="text" placeholder="Enter Yout Description" value={editDesc} onChange={(e) =>setEditDesc(e.target.value)}/>
            </div>
          </div>
          <div className="modal-button">
            <button onClick={handleSave}>Save</button>
            <button onClick={close}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

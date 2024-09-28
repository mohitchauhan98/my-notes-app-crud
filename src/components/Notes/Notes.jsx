import React, { useEffect, useState } from "react";
import "./Notes.css";
import Modal from "../Modal/Modal";
import SearchBar from "../SearchBar/SearchBar";

const Notes = () => {
  const [inputValue, setInputValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [notes, setNotes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editedNote, setEditedNote] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNotes = () => {
    setInputValue("");
    setDescriptionValue("");
    if(!inputValue || !descriptionValue){
      alert("Please fill in all the fields")
      return
    }
    setNotes(() => {
      const updatedNotes = [
        ...notes,
        { title: inputValue, desc: descriptionValue },
      ];
      return updatedNotes;
    });
  };

  const handleRemove = (index) => {
    const updateNote = [...notes];
    updateNote.splice(index, 1);
    setNotes(updateNote);
  };

  const handleOpenModal = (index) => {
    setEditedNote(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEditNotes = (updatedNote) => {
    const editNote = [...notes];
    editNote[editedNote] = updatedNote;
    setNotes(editNote);
    handleCloseModal();
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="notes">
        <div className="notes-box">
          <div className="notes-title">
            <h5>Title</h5>
            <input
              type="text"
              placeholder="Enter Yout Title"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="notes-title">
            <h5>Description</h5>
            <textarea
              type="text"
              placeholder="Enter Yout Description"
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
            />
          </div>
          <div>
            <button className="notes-button" onClick={handleAddNotes}>
              Add Notes
            </button>
          </div>
        </div>
        <div className="notes-wrapper">
          <div>Your Notes :</div>
          <div>
            {filteredNotes.map((item, index) => (
              <div key={index} className="note-card">
                <div>
                  <p className="note-card-title">
                    <span>Title : </span>
                    {item.title}
                  </p>
                  <p className="note-card-title">
                    <span>Description : </span>
                    {item.desc}
                  </p>
                </div>
                <div className="note-buttons">
                  <button onClick={() => handleOpenModal(index)}>Edit</button>
                  <button onClick={handleRemove}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {openModal ? (
        <Modal
          close={handleCloseModal}
          note={notes[editedNote]}
          save={handleEditNotes}
        />
      ) : null}
    </>
  );
};

export default Notes;

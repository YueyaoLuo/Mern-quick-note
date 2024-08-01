import * as usersService from "../../utilities/users-service";
import * as usersAPI from "../../utilities/users-api";
import React, { useState, useEffect } from "react";

export default function NoteHistroyPage({user}) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  //fetching all notes
  useEffect(function () {
    async function getNotes() {
      const allNotes = await usersAPI.getAll();
      setNotes(allNotes);
    }
    getNotes();
  }, []);

  const handleInputChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleCreateNote = async(e) => {
    e.preventDefault();
    const noteData = { text: newNote, user: user._id};
    console.log("note data is: ", noteData)
    const createdNote = await usersAPI.handleCreateNote(noteData);
    console.log("createdNote is", createdNote)
    setNotes([createdNote, ...notes]);
    setNewNote("");// Clear input field
  } 

  return (
    <div className="noteList">
      <h1>Notes</h1>
      
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <p>{note.text}</p>
            <p>{new Date(note.createdAt).toLocaleString('en-AU')}</p>
          </li>
        ))}
      </ul>
      <div>
        <textarea
          value={newNote}
          onChange={handleInputChange}
          placeholder="Write a new note"
        />
        <button onClick={handleCreateNote}>Add Note</button>
      </div>
      {notes.length === 0 && <p>No Notes Yet!</p>}
    </div>
  );
}

import React from 'react'
import noteContext from "../context/notes/NoteContext"
import { useContext } from 'react/cjs/react.development'
import NoteItem from './NoteItem';

function Notes() {
    const context=useContext(noteContext)
    const {notes,setNotes}=context;
    return (
        <div className="row my-3">
            <h2>Your Notes</h2>
            {notes.map((note)=>{
                return <NoteItem note={note}></NoteItem>

            })}
            </div>
    )
}

export default Notes


import React from 'react'
import noteContext from "../context/notes/NoteContext"
import { useContext } from 'react/cjs/react.development'
import NoteItem from './NoteItem';
import { AddNote } from './AddNote';
import { useEffect } from 'react';
const Notes=()=> {
    const context=useContext(noteContext)
    // const {addNote}=context;
    const {notes,getNotes}=context;
    useEffect(() => {
        getNotes()
    }, [])
    return (
        <>
        <AddNote></AddNote>
        <div className="row my-3">
            <h2>Your Notes</h2>
            {notes.map((note)=>{
                return <NoteItem note={note} key={note._id}></NoteItem>

            })}
            </div>
            </>
    )
}

export default Notes


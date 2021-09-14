import React from 'react'
import noteContext from "../context/notes/NoteContext"
import { useContext } from 'react'
import { useState } from 'react'
export const AddNote = () => {
    const context=useContext(noteContext)
    const {addNote}=context;
    const [note, setNote] = useState({title:"",desc:"",tag:"default"})
    const handleClick=(e)=>{
        e.preventDefault()
        addNote(note.title,note.desc,note.tag)
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <div className="container my-3">


                <h2>Add a Note</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc">Description</label>
                        <input type="text" className="form-control" id="desc" name="desc" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}
export default AddNote
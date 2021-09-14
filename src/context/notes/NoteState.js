// import react from "react";
import noteContext from "./NoteContext";
import { useState } from "react";

const NoteState=(props)=>{
    const host="http://localhost:5000"
    const notesInitial=[]
    const [notes, setNotes] = useState(notesInitial)
    const getNotes=async()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        
        headers: {
          'Content-Type': 'application/json'
          
        },
        
        
      });
      
      
    const json=await response.json()
        console.log(json);
        setNotes(json)
    }

    const addNote=async(title,desc,tag)=>{
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            
            headers: {
              'Content-Type': 'application/json'
              
            },
            
            body: JSON.stringify({title,desc,tag})
          });
          
          
        console.log("adding a new note");
        const note={
            "_id":1,
            "title":title,
            "desc":desc,
            "tag":tag,
            
        };

        setNotes(notes.concat(note))
    }
    const deleteNote=async(id)=>{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        
        headers: {
          'Content-Type': 'application/json'
          
        },
        
        
      });
      
      
        const json=await response.json()
        console.log(json);
        console.log("deleting the note with id "+id);
        const newNotes=notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }
    const editNote=async(id,title,desc,tag)=>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST',
            
            headers: {
              'Content-Type': 'application/json'
              
            },
            
            body: JSON.stringify({title,desc,tag})
          });
          const json=response.json()

        
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element.id===id) {
                element.title=title
                element.desc=desc
                element.tag=tag
            }
            
        }
    }
    return (
        <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}



export default NoteState
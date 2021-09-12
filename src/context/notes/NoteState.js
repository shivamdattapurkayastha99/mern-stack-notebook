// import react from "react";
import noteContext from "./NoteContext";
import { useState } from "react";

const NoteState=(props)=>{
    const notesInitial=[]
    const [notes, setNotes] = useState(notesInitial)
    return (
        <noteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}



export default NoteState
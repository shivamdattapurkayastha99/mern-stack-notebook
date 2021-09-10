// import react from "react";
import noteContext from "./NoteContext";
import { useState } from "react";

const NoteState=(props)=>{
    const s1={
        "name":"shivam",
        "class":"A"
    }
    const [state, setState] = useState(s1)
    const update=()=>{
        setTimeout(() => {
            setState({
                "name":"datta",
                "class":"B"
            })
        }, 1000);
    }
    return (
        <noteContext.Provider value={{state:state,update:update}}>
            {props.children}
        </noteContext.Provider>
    )
}



export default NoteState
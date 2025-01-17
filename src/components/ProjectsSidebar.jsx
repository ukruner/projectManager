import { useEffect } from "react";
import Button from "./Button";

export default function ProjectsSidebar({ getCommonTasks, title, updateSelection, dictState, handleAddProject}){

 
    useEffect (()=>{
        getCommonTasks(dictState, title)}, [title]);;

    useEffect (()=>{handleHighlight}, [updateSelection]);

    function handleHighlight(val1, val2){
        updateSelection(val1, val2);
        // setSelectedTitle(true);
    }

  
    
    return <aside className="w-1/3 pl-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">YOUR PROJECTS</h2>
        <Button onClick={handleAddProject} > + Add project</Button>

        <section className="mt-8">
            <ol>
                <li>
                    {dictState.projects.length > 0 && dictState.projects.map(entry=>{return <button onClick={()=>handleHighlight(entry.title, entry.description)} className={`${title === entry.title+entry.description ? 'active: bg-stone-800': ''} w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800`} key={entry.title+entry.description}>
            Title: {entry.title}
            Description: {entry.description}
            Due Date: {entry.dueDate}
        </button>})}
                </li>
            </ol>
        </section>
    </aside>


}
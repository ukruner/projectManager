import { useState, useEffect } from "react";
import SubTasks from "./SubTasks";
import Button from "./Button";

export default function SelectedTask ({ handleDeletion, localButtonClicked, addTask, clearTask, data, title, updateState, updateSelection }){

    const [selection, setSelection] = useState({id: ''});
    // const [buttonClicked, setButtonClicked] = useState(false);
    
    // console.log(data);
    useEffect(()=>{if (title){
    const filtered = data.projects.filter(entry => {
        if (entry.title+entry.description === title){
            return entry;
        }
    })
    // console.log(title);
    // console.log(filtered[0])
    setSelection(filtered[0])}}, [title]);

    // const updateProjectTasks = (projectId, newTask) => {
    //     console.log("Updating project:", projectId, "with tasks:", newTask); // Debugging
    //     console.log(data);
    //     const newState = 
    //         data.map(project =>{
    //             if(project.id === projectId){
    //                 console.log('condition true');
    //                 const newTaskList = [...project.listOfTasks, newTask];
    //                 return {...project, listOfTasks: newTaskList}}
    //                 else {
    //                     console.log('condition false');
    //                     return project}});
    //     console.log(newState);
    //     updateState(newState);
    //     ;
    // };

    function handleClickDeletion(title){
        handleDeletion(title);
    }
    

    return <div className="w-[35rem] mt-16">
        <header className="pb-4 mb-4 border-b-2 border-stone-300">
        {selection && <><div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-stone-600 mb-2">Title: {selection.title}</h1>
        <Button onClick={handleClickDeletion(title)} className="text-stone-600 hover:text-stone-950">Delete</Button>
        </div>
        <p className="mb-4 text-stone-400">Due Date: {selection.dueDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">Description: {selection.description}</p></>}</header>
        <SubTasks localButtonClicked={localButtonClicked} addTask={addTask} clearTask={clearTask} data = {data} updateState={updateState} selectedProject={selection}  title={title} key={selection.id} projectId={selection.id}></SubTasks>
        </div>
}
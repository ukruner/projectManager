import { useState, useRef, useEffect } from "react"
import Input from "./Input"
import Button from "./Button"


export default function SubTasks ({data, localButtonClicked, addTask, clearTask, selectedProject, projectId, setSelection, updateState }){

    const refInputExists = useRef();
    const [inputChecker, setInputChecker] = useState(false);

    // const [localButtonClicked, setLocalButtonClicked] = useState(false);

    // const [localState , setLocalState] = useState(false);

    // useEffect(()=>setButtonClicked(true), [data]);

    // const [taskBase, updateTaskBase] = useState([]);

    function handleSave(){
        if (refInputExists.current.value){
            // setLocalButtonClicked(projectId);
            addTask(refInputExists.current.value, selectedProject.id);
            refInputExists.current.value = '';
            // console.log(title);
        }
        else {
            setInputChecker(true);
        }
    }

    // useEffect(()=>{setSelection(data)}, [data])

// PASS ONLY ONE ELEMENT OF DICTSTATE TO SELECTEDTASK AND SUBTASKS;

    function handleDelete(val){
        clearTask(val, projectId); 
        
        // updateState(editedState);

        
        // selectedProject.listOfTasks.filter(entry => 
        //         entry !== val)
        // const updatedData = {
        //             ...selectedProject,
        //             listOfTasks: editedData
        //         };
        // setSelection(projectId, updatedData);
        // if (editedData.length === 0){
        //     setLocalButtonClicked(false);
        // }
            // if (entry.title + entry.description === title){
            //     const taskList = entry.listOfTasks.filter(task => {return task !== val});
            //     const newVar = {...entry, listOfTasks: taskList};
            //     console.log(newVar);
            //     if (taskList.length === 0){setLocalButtonClicked(false)};
            //     return newVar}
            //     else {
            //         return entry;
            //     }
            // });
            
        // console.log(editedData);
        //         // return {...entry, listOfTasks: taskList}       }});
        //     // const editDictState = [...data, localArray];
        // // console.log(editDictState);
        // updateState(editedData);
        }
//     }
// useEffect (()=>{if(data && data.listOfTasks.length === 0){setLocalButtonClicked(false)}}, [data])
//     useEffect((()=>{
//         data.map(entry=>{
//             if (entry.title + entry.description === title){
//                 if (entry.listOfTasks.length === 0){
//                 setButtonClicked(false)};
//             }
//         }
//     )})
// , [data]);   
        
                //     {setButtonClicked(false)}
    // useEffect((entry)=>{data.f
    //     (taskList.length === 0)
    //     //     {setButtonClicked(false)}
    //     // console.log(title);
    //     // console.log(filtered[0])
    //     setSelection(filtered[0])}}, [title]);

    // BUTTONCLICKED SEEMS TO BE A UNIVERSAL STATE THAT AFFECTS OTHER RENDERED COMPONENTS, IF CHANGED.

    return <div>
        <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            {inputChecker && <p>Please enter valid value</p>}
            <div className="flex items-center">
            <Input ref={refInputExists} classic={true}></Input>
            <Button onClick={handleSave} className="text-stone-600 hover:text-stone-950 px-2"> Add Task </Button>
            </div>
            { localButtonClicked === projectId && <ul className="p-4 mt-8 rounded-md bg-stone-100">
            {data.filter(entry => entry.id === projectId).map((entry)=> entry.tasks.map(task => (<li key={task} className="flex justify-between my-4"> <p>{task}</p><Button onClick={() => handleDelete(task)} className="text-stone-600 hover:text-stone-950 px-2">Clear</Button>
                    </li>)))}

            </ul>}
            {localButtonClicked === projectId && <p>TESTING IT</p>}
    </div>
}
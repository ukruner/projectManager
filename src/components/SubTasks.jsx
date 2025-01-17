import { useState, useRef } from "react"
import Input from "./Input"
import Button from "./Button"


export default function SubTasks ({data, localButtonClicked, addTask, clearTask, selectedProject, projectId, setSelection, updateState }){

    const refInputExists = useRef();

    const [inputChecker, setInputChecker] = useState(false);


    function handleSave(){
        if (refInputExists.current.value){
            addTask(refInputExists.current.value, selectedProject.id);
            refInputExists.current.value = '';
        }
        else {
            setInputChecker(true);
        }
    }

    function handleDelete(val){
        clearTask(val, projectId); 
        }


    return <div>
        <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            {inputChecker && <p>Please enter valid value</p>}
            <div className="flex items-center">
            <Input ref={refInputExists} classic={true}></Input>
            <Button onClick={handleSave} className="text-stone-600 hover:text-stone-950 px-2"> Add Task </Button>
            </div>
            { localButtonClicked === projectId && <ul className="p-4 mt-8 rounded-md bg-stone-100">
            {data.tasks.map(entry => {
                if(entry.projectId === projectId){
                    return <li key={entry.text} className="flex justify-between my-4"> <p>{entry.text}</p><Button onClick={() => handleDelete(entry.text)} className="text-stone-600 hover:text-stone-950 px-2">Clear</Button>
</li>}})

}
            </ul>}
    </div>
}
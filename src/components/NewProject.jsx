import { useRef, useState, useEffect } from "react";
import Input from "./Input"
import Button from "./Button";

export default function NewProject({sendFormBody, clickButton, dictState, dialogState, setDialogState }){

    const titleRef = useRef();
    const descRef = useRef();
    const dueDateRef = useRef();

    const dialogRef = useRef();
    const bigDialogRef = useRef();


    const [output, setOutput] = useState(false);
    let findCurrentVal = [];

    useEffect(()=>{if (dialogRef.current){
        dialogRef.current.showModal();
    }}, [output])

    useEffect(()=>{if (bigDialogRef.current){
        bigDialogRef.current.showModal();
    }}, [dialogState])
    
    
    function handleSave(){
        const combination = titleRef.current.value+descRef.current.value;
    
        findCurrentVal = dictState.filter(entry => {
            return entry.id === combination});
        if (titleRef.current.value && descRef.current.value && dueDateRef.current.input.value){
            if (findCurrentVal.length > 0) {
                setOutput("You are entering a duplicate value")
            }
            else{
            setOutput("Entry posted successfully")
            sendFormBody(titleRef.current.value, descRef.current.value, dueDateRef.current.input.value);
            titleRef.current.value = '';
            descRef.current.value = '';
            dueDateRef.current.value = '';
        }}
        else {
            setOutput("Fields missing")
        }
    }

    function onReset(){
        setOutput('');
        
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    }

    function onBigReset(){
        setDialogState(false);
        clickButton(false);
        if (bigDialogRef.current) {
            bigDialogRef.current.close();
        }
    }

    return <dialog ref={bigDialogRef} onClose={onBigReset} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-800">PLEASE ADD A NEW PROJECT</h2>
        <menu className="flex items-center justify-end gap-4 my-4">
            <li><Button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</Button></li>
            <li><Button onClick={()=>clickButton(false)} className="text-stone-800 hover:text-stone-950">Cancel</Button></li>
        </menu> 
        <div className="flex items-center gap-4">
            <Input ref={titleRef} classic={true}>Title</Input>
            <Input ref={descRef} textarea={true}>Description</Input>
            <Input ref={dueDateRef} datearea={true}>Due Date</Input>
        </div>
        {output && <dialog className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md" ref={dialogRef} onClose={onReset}>{output}</dialog>}
    </dialog>
}
import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import SelectedTask from "./components/SelectedTask";
import DefaultScreen from "./components/defaultScreen";
import { useState, useEffect} from "react";

function App() {

  const [buttonClicked, setButtonClicked] = useState(false);

  const [localButtonClicked, setLocalButtonClicked] = useState(false);
  const [titleSelected, setTitleSelected] = useState();
  const [listPopulated, setListPopulated] = useState(false);
  const [bigDialogOpen, setBigDialogOpen] = useState(false);

  const [taskStore, setTaskStore] = useState([]);

  // const [selection, setSelection] = useState(null);
  const [dictState, setDictState] = useState([]);

  function sendFormBody(titleval, descriptionval, dueDateval){
    const jsObject = {id: '', title:'', description:'', dueDate:'', tasks:[]};
    jsObject.id = titleval+descriptionval;
    jsObject.title = titleval,
    jsObject.description = descriptionval,
    jsObject.dueDate = dueDateval;

    updateState(prevState => {return [...prevState, jsObject]});
}

function handleDeletion(title){
  updateState(prevState => {
    const editedState =   prevState.filter(entry => {
    return entry.id !== title})
  return editedState;
      });
      
  updateSelection(null, null);
  // const newData = (data.projects.filter(entry => {
  //     return entry.id !== title}));
  // console.log(newData
  };

function addTask(newTask, projectId) {
  // console.log(selectedProject);
  // const newTask = refInputExists.current.value;
  // console.log(newTask);
  // console.log(projectId);
  // const updatedData = {
  //     ...selectedProject,
  //     listOfTasks: newList
  // };
  // setSelection(data);
  setLocalButtonClicked(projectId);
  setListPopulated(true);
  updateState(prevState => {
    console.log(prevState);
    const editedState = prevState.map((entry)=>{if (entry.id === projectId){ return {...entry, tasks: [...entry.tasks, newTask]}}
  else{return entry}})
    console.log(editedState);
  return editedState});
    // const newData = { text: newTask, id: newTask, projectId: projectId};
    // return {...prevState, tasks: [...prevState.tasks, newData]}});
  // const newState = data.map(entry => {
  //     if (entry.id === projectId){
  //     const newEntry = {...entry, listOfTasks: [...entry.listOfTasks, newTask]};
  //     return newEntry;
  //     }
  //     return entry});
  // console.log(newState);
  // updateState(newState);
  // const newTaskbase = [...taskBase, refInputExists.current.value]
  // updateState(newState);
  // updateTaskBase(newTaskbase);
  // refInputExists.current.value = "";
  // setInputChecker(false);
  // setLocalButtonClicked(true);
  // setSelection(projectId, newTask);

}


function clearTask (val, projectId) {

  updateState(prevState => {
      const correctProject = prevState.find(entry => {
       if(entry.id === projectId){
        return entry;
       }});
      console.log(correctProject);
      const newTaskArray = correctProject.tasks.filter(task => {
        if (task !== val) {
          return task }
          } ); 
      console.log(newTaskArray);
      if (newTaskArray.length === 0){
        setLocalButtonClicked(false);
      }
      const updatedProject = {...correctProject, tasks: newTaskArray}
      
      const editedState = prevState.map(entry =>
        entry.id === projectId ? updatedProject : entry)
      console.log(editedState);
  return editedState   })};
  // data.tasks.map(entry => {
  //   if (entry.id === projectId){
  //       const editedArray = entry.listOfTasks.filter(task => task !== val);
  //       const newEntry = {...entry, listOfTasks: editedArray};
  //       console.log(newEntry);
  //       console.log(projectId);
  //       updateState(prevState => prevState.map(entry=>
  //           entry.id === projectId ? newEntry : entry
  //       ))
  //       if (editedArray.length === 0){
  //           // setLocalButtonClicked(false);
  //       }
  //       return newEntry;
  //   }
  //   return entry;

useEffect(() => {
  console.log('State updated:', dictState);
}, [dictState]);

  const setDialogState = (val) =>
    setBigDialogOpen(val);

  const updateSelection = (val, val2) => {
    const stringsum = val+val2;
    if (stringsum){
    setTitleSelected(stringsum)}
    else{
      setTitleSelected(null);
    };

  }

  useEffect(()=>{console.log(localButtonClicked), [localButtonClicked]})


  const clickButton = (val) => {
    setButtonClicked(val);
  }

  function handleAddProject(){
    setDialogState(true);
    clickButton(true);
};

const updateButton = (val) => {
  setLocalButtonClicked(val);
}

  const updateState = (val) =>
    setDictState(val);

  // function getCommonTasks(dictState, projId){
  //   const fetchedArray = dictState.filter(entry => 
  //     entry.projectId === projId  
  //     )
  //   if (fetchedArray.length > 0){
  //     setLocalButtonClicked(projId)
  //   }
  //   else{ setLocalButtonClicked(false)}
  // }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar setListPopulated={setListPopulated} setLocalButtonClicked={updateButton} buttonClicked={buttonClicked} title={titleSelected} updateSelection={updateSelection} handleAddProject={handleAddProject} dictState={dictState}></ProjectsSidebar>
      {titleSelected ? <SelectedTask handleDeletion={handleDeletion} localButtonClicked={localButtonClicked} addTask={addTask} clearTask={clearTask} title={titleSelected} data={dictState} updateState={updateState} updateSelection={updateSelection} ></SelectedTask> : <DefaultScreen handleAddProject={handleAddProject}></DefaultScreen>}
      {buttonClicked && <NewProject sendFormBody={sendFormBody} buttonClicked={buttonClicked} clickButton={clickButton} dialogState={bigDialogOpen} setDialogState={setDialogState} dictState={dictState} updateState={updateState}></NewProject>}
    </main>
  );
}

export default App;

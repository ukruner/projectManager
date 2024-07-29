import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import SelectedTask from "./components/SelectedTask";
import DefaultScreen from "./components/defaultScreen";
import { useState, useEffect} from "react";

function App() {

  const [buttonClicked, setButtonClicked] = useState(false);

  const [localButtonClicked, setLocalButtonClicked] = useState(false);
  const [titleSelected, setTitleSelected] = useState();

  const [bigDialogOpen, setBigDialogOpen] = useState(false);

  const [taskStore, setTaskStore] = useState([]);

  // const [selection, setSelection] = useState(null);
  const [dictState, setDictState] = useState({projects: [], tasks: []});

  function sendFormBody(titleval, descriptionval, dueDateval, idval){
    const jsObject = {id: '', title:'', description:'', dueDate:''};
    jsObject.id = titleval+descriptionval;
    jsObject.title = titleval,
    jsObject.description = descriptionval,
    jsObject.dueDate = dueDateval;
    console.log(jsObject);
    console.log('Before update:', dictState);
    updateState(prevState => {return {...prevState, projects: [...prevState.projects, jsObject]}});
    console.log('After update:', dictState);
}

function handleDeletion(title){
  console.log(title);
  updateState(prevState => {const editedProjects = prevState.projects.filter(entry => {
      return entry.id !== title})
      console.log(editedProjects);
      return {...prevState, projects: editedProjects}});
      
  // updateSelection(null, null);
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
  updateState(prevState => {
    const newData = { text: newTask, id: newTask, projectId: projectId};
    return {...prevState, tasks: [...prevState.tasks, newData]}});
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
      const editedData = prevState.tasks.filter(entry => {
        if (entry.projectId === projectId){
          return entry.text !== val
        }
        else {return entry}
      })
      const arr = editedData.filter(entry => 
        entry.projectId === projectId  
        )
      if (arr.length === 0){
        setLocalButtonClicked(false);
      }
  return {...prevState, tasks: editedData}});
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
}
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

  // useEffect(()=>{console.log(localButtonClicked), [localButtonClicked]})


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

  function getCommonTasks(dictState, projId){
    const fetchedArray = dictState.tasks.filter(entry => 
      entry.projectId === projId  
      )
    if (fetchedArray.length > 0){
      setLocalButtonClicked(projId)
    }
    else{ setLocalButtonClicked(false)}
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar getCommonTasks={getCommonTasks} setLocalButtonClicked={updateButton} buttonClicked={buttonClicked} title={titleSelected} updateSelection={updateSelection} handleAddProject={handleAddProject} dictState={dictState}></ProjectsSidebar>
      {titleSelected ? <SelectedTask handleDeletion={handleDeletion} localButtonClicked={localButtonClicked} addTask={addTask} clearTask={clearTask} title={titleSelected} data={dictState} updateState={updateState} updateSelection={updateSelection} ></SelectedTask> : <DefaultScreen handleAddProject={handleAddProject}></DefaultScreen>}
      {buttonClicked && <NewProject sendFormBody={sendFormBody} buttonClicked={buttonClicked} clickButton={clickButton} dialogState={bigDialogOpen} setDialogState={setDialogState} dictState={dictState} updateState={updateState}></NewProject>}
    </main>
  );
}

export default App;

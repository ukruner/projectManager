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
  const [dictState, setDictState] = useState({projects: [], tasks: []});


  useEffect(() => {
    console.log('State updated:', dictState);
  }, [dictState]);

  
  function sendFormBody(titleval, descriptionval, dueDateval){
    const jsObject = {id: '', title:'', description:'', dueDate:''};
    jsObject.id = titleval+descriptionval;
    jsObject.title = titleval,
    jsObject.description = descriptionval,
    jsObject.dueDate = dueDateval;

    updateState(prevState => {return {...prevState, projects: [...prevState.projects, jsObject]}});
}

function handleDeletion(title){
  updateState(prevState => {const editedProjects = prevState.projects.filter(entry => {
      return entry.id !== title})
      return {...prevState, projects: editedProjects}});
      
  updateSelection(null, null);
};

function addTask(newTask, projectId) {

  setLocalButtonClicked(projectId);
  updateState(prevState => {
    const newData = { text: newTask, id: newTask, projectId: projectId};
    return {...prevState, tasks: [...prevState.tasks, newData]}});
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
}

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

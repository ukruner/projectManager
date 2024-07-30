import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import SelectedTask from "./components/SelectedTask";
import DefaultScreen from "./components/defaultScreen";
import { useState, useEffect} from "react";

function App() {
  
  const [dictState, setDictState] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [localButtonClicked, setLocalButtonClicked] = useState(false);
  const [titleSelected, setTitleSelected] = useState();
  const [bigDialogOpen, setBigDialogOpen] = useState(false);


  useEffect(() => {
    console.log('State updated:', dictState);
  }, [dictState]);

  useEffect(()=>{console.log(localButtonClicked), [localButtonClicked]})


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
  };



  function addTask(newTask, projectId) {
  setLocalButtonClicked(projectId);

  updateState(prevState => {
    const editedState = prevState.map((entry)=>{
      if (entry.id === projectId){ 
        return {...entry, tasks: [...entry.tasks, newTask]}}
    else{
      return entry}})
  return editedState});

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

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar setLocalButtonClicked={updateButton} buttonClicked={buttonClicked} title={titleSelected} updateSelection={updateSelection} handleAddProject={handleAddProject} dictState={dictState}></ProjectsSidebar>
      {titleSelected ? <SelectedTask handleDeletion={handleDeletion} localButtonClicked={localButtonClicked} addTask={addTask} clearTask={clearTask} title={titleSelected} data={dictState} updateState={updateState} updateSelection={updateSelection} ></SelectedTask> : <DefaultScreen handleAddProject={handleAddProject}></DefaultScreen>}
      {buttonClicked && <NewProject sendFormBody={sendFormBody} buttonClicked={buttonClicked} clickButton={clickButton} dialogState={bigDialogOpen} setDialogState={setDialogState} dictState={dictState} updateState={updateState}></NewProject>}
    </main>
  );
}

export default App;

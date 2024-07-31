import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import SelectedTask from "./components/SelectedTask";
import DefaultScreen from "./components/defaultScreen";
import { useState, useEffect } from "react";

let projects = [];

function App() {
  
  const [buttonClicked, setButtonClicked] = useState(false);
  const [localButtonClicked, setLocalButtonClicked] = useState(false);
  const [titleSelected, setTitleSelected] = useState();
  const [bigDialogOpen, setBigDialogOpen] = useState(false);

  useEffect(() => {
    console.log("Main project db updated:", projects);
  }, [projects]);


  function sendFormBody(titleval, descriptionval, dueDateval) {
    projects.push({
      id: titleval + descriptionval,
      title: titleval,
      description: descriptionval,
      dueDate: dueDateval,
      tasks: [],
    });
  }

  function handleDeletion(title) {
    projects = projects.filter((entry) => entry.id !== title);
    updateSelection(null, null);
  }

  function addTask(newTask, projectId) {
    console.log(newTask);
    projects = projects.filter((project) => {
      if (project.id === projectId) {
        project.tasks.push(newTask);
        console.log(project.tasks);
        return project;
      } else {
        return project;
      }
    });
  }

  function clearTask(val, projectId) {
    projects = projects.filter((project) => {
      if (project.id === projectId) {
        project.tasks = project.tasks.filter((task) => {
          return task !== val;
        });
        console.log(project.tasks);
        return project;
      } else {
        return project;
      }
    });
  }

  const setDialogState = (val) => setBigDialogOpen(val);

  const updateSelection = (id) => {
    if (id) {
      setTitleSelected(id);
    } else {
      setTitleSelected(null);
    }
  };

  const clickButton = (val) => {
    setButtonClicked(val);
  };

  function handleAddProject() {
    setDialogState(true);
    clickButton(true);
  }

  const updateButton = (val) => {
    setLocalButtonClicked(val);
  };

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        projects={projects}
        setLocalButtonClicked={updateButton}
        buttonClicked={buttonClicked}
        title={titleSelected}
        updateSelection={updateSelection}
        handleAddProject={handleAddProject}
      ></ProjectsSidebar>
      {titleSelected ? (
        <SelectedTask
          projects={projects}
          handleDeletion={handleDeletion}
          addTask={addTask}
          clearTask={clearTask}
          title={titleSelected}
          updateSelection={updateSelection}
        ></SelectedTask>
      ) : (
        <DefaultScreen handleAddProject={handleAddProject}></DefaultScreen>
      )}
      {buttonClicked && (
        <NewProject
          projects={projects}
          sendFormBody={sendFormBody}
          buttonClicked={buttonClicked}
          clickButton={clickButton}
          dialogState={bigDialogOpen}
          setDialogState={setDialogState}
        ></NewProject>
      )}
    </main>
  );
}

export default App;

import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import SelectedTask from "./components/SelectedTask";
import DefaultScreen from "./components/defaultScreen";
import { useState, useEffect } from "react";

let projects = [];

function App() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [titleSelected, setTitleSelected] = useState();
  const [bigDialogOpen, setBigDialogOpen] = useState(false);

  useEffect(() => {
    console.log("Main project db updated:", projects);
  }, [pageRender]);

  const setDialogState = (val) => setBigDialogOpen(val);

  const updateSelection = (id) => {
    if (id) {
      setTitleSelected(id);
    } else {
      setTitleSelected(null);
    }
  };

  function handleDeletion(title) {
    projects = projects.filter((entry) => entry.id !== title);
    console.log(projects);
    updateSelection(null, null);
  }

  const clickButton = (val) => {
    setButtonClicked(val);
  };

  function handleAddProject() {
    setDialogState(true);
    clickButton(true);
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        projects={projects}
        buttonClicked={buttonClicked}
        title={titleSelected}
        updateSelection={updateSelection}
        handleAddProject={handleAddProject}
      ></ProjectsSidebar>
      {titleSelected ? (
        <SelectedTask
          projects={projects}
          title={titleSelected}
          updateSelection={updateSelection}
          handleDeletion={handleDeletion}
        ></SelectedTask>
      ) : (
        <DefaultScreen handleAddProject={handleAddProject}></DefaultScreen>
      )}
      {buttonClicked && (
        <NewProject
          projects={projects}
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

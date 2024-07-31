import { useState, useRef } from "react";
import Input from "./Input";
import Button from "./Button";

export default function SubTasks({
  selection,
  projects,
  addTask,
  clearTask,
  title,
}) {
  const refInputExists = useRef();

  const [inputChecker, setInputChecker] = useState(false);
  const [taskPopulator, setTaskPopulator] = useState(true);

  function handleSave() {
    if (refInputExists.current.value) {
      addTask(refInputExists.current.value, title);
      console.log(projects);
      setTaskPopulator(refInputExists.current.value);
      refInputExists.current.value = "";
    } else {
      setInputChecker(true);
    }
  }

  function handleDelete(val) {
    clearTask(val, title);
    const projectSelected = projects.find((entry) => entry.id === title);
    console.log(projectSelected);
    if (projectSelected.tasks.length === 0) {
      setTaskPopulator(false);
    } else {
      setTaskPopulator(val + 1);
    }
    console.log(taskPopulator);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      {inputChecker && <p>Please enter valid value</p>}
      <div className="flex items-center">
        <Input ref={refInputExists} classic={true}></Input>
        <Button
          onClick={handleSave}
          className="text-stone-600 hover:text-stone-950 px-2"
        >
          {" "}
          Add Task{" "}
        </Button>
      </div>
      {selection && selection.tasks.length > 0 && taskPopulator && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {projects
            .filter((entry) => entry.id === title)
            .map((entry) =>
              entry.tasks.map((task) => {
                return (
                  <li key={task} className="flex justify-between my-4">
                    {" "}
                    <p>{task}</p>
                    <Button
                      onClick={() => handleDelete(task)}
                      className="text-stone-600 hover:text-stone-950 px-2"
                    >
                      Clear
                    </Button>
                  </li>
                );
              })
            )}
        </ul>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Componentes/Header";
import Footer from "./Componentes/Footer";
import Tasks from "./Componentes/Tasks";
import AddTask from "./Componentes/AddTask";
import About from "./Componentes/About";

function App() {
  const [showAddTasks, setshowAddTasks] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch Tasks

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5050/tasks");
    const data = await res.json();

    return data;
  };

  // Fetch Task

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5050/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // ADD TASk
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5050/tasks/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random()*1000)+1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
    // // console.log("Task added")
  };

  /** Delete Task */

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5050/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle remainder

  const toggleRemainder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, remainder: !taskToToggle.remainder };

    const res = await fetch(`http://localhost:5050/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, remainder: data.remainder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setshowAddTasks(!showAddTasks)}
          showAdd={showAddTasks}
        />

        
          <Route
            path="/"
            exact
            render={(props) => (
              <>
                {showAddTasks && <AddTask onAdd={addTask} />}

                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleRemainder}
                  />
                ) : (
                  "No task to show "
                )}
              </>
            )}
          />
          <Route path="/about" component={About} />
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;

// {tasks.lenght > 0 ? (< Tasks tasks={tasks} onDelete = {deleteTask} />) : ("No Tasks to show ")}
//{tasks.lenght > 0 ? (< Tasks tasks={tasks} onDelete = {deleteTask} onToggle={toggleRemainder} />) : " No task to show "}
// {< Tasks tasks={tasks} onDelete = {deleteTask} onToggle={toggleRemainder} />}

import "./App.css";
import TodoForm from "./TodoForm";
import AppNavbar from "./AppNavbar";
import { useState, useEffect, useMemo } from "react";
import TodoList from "./TodoList";
import { Routes, Route } from "react-router-dom";
import TaskDetailView from "./TaskDetailView";
import EditTaskModal from "./EditTaskModal";
import useTheme from "./ThemeProvider";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const { theme } = useTheme();

  function addTask(task) {
    const newTask = {
      ...task,
      id: Date.now(),
      isCompleted: false,
      tags: task.tags || [],
    };
    setTasks((prev) => [...prev, newTask]);
  }

  function toggleTaskCompletion(taskId) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  }

  function updateTask(updatedTask) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  }

  function deleteTask(taskId) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter((t) => t.isCompleted).length,
    important: tasks.filter((t) =>
      t.tags.some((tag) => tag.toLowerCase() === "important")
    ).length,
  };

  const filteredTasks = useMemo(() => {
    let tasksToFilter = tasks;

    tasksToFilter = tasksToFilter.filter((task) => {
      if (filter === "completed") {
        return task.isCompleted;
      }
      if (filter === "important") {
        return task.tags.some((tag) => tag.toLowerCase() === "important");
      }
      return true;
    });

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      tasksToFilter = tasksToFilter.filter(
        (task) =>
          task.title.toLowerCase().includes(lowercasedQuery) ||
          (task.description &&
            task.description.toLowerCase().includes(lowercasedQuery))
      );
    }

    return tasksToFilter;
  }, [filter, tasks, searchQuery]);

  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
  }, [theme]);

  return (
    <div className="App">
      <AppNavbar
        onFilterChange={setFilter}
        activeFilter={filter}
        counts={taskCounts}
        onSearchChange={setSearchQuery}
      />
      <EditTaskModal
        task={editingTask}
        onUpdate={updateTask}
        onHide={() => setEditingTask(null)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TodoForm addTask={addTask} />
              <TodoList
                tasks={filteredTasks}
                toggleTaskCompletion={toggleTaskCompletion}
                onEdit={setEditingTask}
                onDelete={deleteTask}
                totalTasksCount={tasks.length}
              />
            </>
          }
        />
        <Route
          path="/task/:taskId"
          element={<TaskDetailView tasks={tasks} />}
        />
      </Routes>
    </div>
  );
}

export default App;

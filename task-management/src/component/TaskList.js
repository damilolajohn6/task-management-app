import React, { useState, useEffect } from "react";
import axios from "axios";
import EditTask from "./EditTask";
import "./TaskList.css";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 5;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
      setFilteredTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const handleDelete = async (taskId) => {
    await axios.delete(`http://localhost:5000/tasks/${taskId}`);
    fetchData();
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
  };

  const handleFilter = (filterType, value) => {
    let filtered = [];
    if (filterType === "priority") {
      filtered = tasks.filter((task) => task.priority === value);
    } else if (filterType === "dueDate") {
      filtered = tasks.filter((task) => task.dueDate === value);
            // Modify filteredTasks accordingly
    } else if (filterType === "category") {
            filtered = tasks.filter((task) => task.category === value);
      // Modify filteredTasks accordingly
    }

    setFilteredTasks(filtered);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const handleSearch = (searchTerm) => {
    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
    setCurrentPage(1); // Reset to the first page when search term changes
  };

  // Paginate the tasks based on current page and items per page
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentTasks = filteredTasks.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <div className="task-list-container">
      <h2 className="heading">Task List</h2>

      <SearchBar handleSearch={handleSearch} />
      <div className="divider"></div>
      <Filter handleFilter={handleFilter} />

      <ul className="task-list">
        {currentTasks.map((task) => (
          <li key={task.id} className="task-item">
            <strong>Title:</strong> {task.title}
            <br />
            <strong>Description:</strong> {task.description}
            <br />
            <strong>Due Date:</strong> {task.due_date}
            <br />
            <strong>Priority:</strong> {task.priority}
            <br />
            <strong>Category:</strong> {task.category}
            <br />
            <div className="task-actions">
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={filteredTasks.length}
        paginate={(pageNumber) => setCurrentPage(pageNumber)}
      />

      {taskToEdit && (
        <EditTask
          taskId={taskToEdit.id}
          initialTitle={taskToEdit.title}
          initialDescription={taskToEdit.description}
          initialDueDate={taskToEdit.dueDate}
          initialPriority={taskToEdit.priority}
          initialCategory={taskToEdit.category}
          onUpdate={() => {
            fetchData();
            setTaskToEdit(null);
          }}
        />
      )}
    </div>
  );
};

export default TaskList;

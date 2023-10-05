
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TaskForm.css";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      console.log("Please log in to create a task.");
      return;
    }

    try {
      const formattedDueDate = dueDate ? new Date(dueDate) : null;
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");

      const taskData = {
        title,
        description,
        due_date: formattedDueDate
          ? formattedDueDate.toISOString().split("T")[0]
          : null,
        priority,
        category,
        user_id: userId, // Include user_id in the request payload
      };

      const response = await axios.post(
        "http://localhost:5000/tasks",
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle response as needed, maybe display a success message
      console.log("Task created successfully:", response.data);

      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("");
      setCategory("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="task-form-container">
      <h2>Add Task</h2>
      {isLoggedIn ? (
        <form className="task-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <button type="submit">Add Task</button>
        </form>
      ) : (
        <p>Please log in to create a task.</p>
      )}
    </div>
  );
};

export default TaskForm;

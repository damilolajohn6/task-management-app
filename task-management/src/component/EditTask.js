import React, { useState } from "react";
import axios from "axios";
import "./EditTask.css";

const EditTask = ({
  taskId,
  initialTitle,
  initialDescription,
  initialDueDate,
  initialPriority,
  initialCategory,
  onUpdate,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [dueDate, setDueDate] = useState(initialDueDate);
  const [priority, setPriority] = useState(initialPriority);
  const [category, setCategory] = useState(initialCategory);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/tasks/${taskId}`, {
        title,
        description,
        due_date: dueDate,
        priority,
        category,
      });
      onUpdate(); // Notify the parent component about the update
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="editTaskContainer">
      <h2>Edit Task</h2>
      <form className="editTaskForm" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label className="label" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="formGroup">
          <label className="label" htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="formGroup">
          <label className="label" htmlFor="dueDate">
            Due Date:
          </label>
          <input
            type="date"
            id="dueDate"
            className="input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="formGroup">
          <label className="label" htmlFor="priority">
            Priority:
          </label>
          <select
            id="priority"
            className="select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="formGroup">
          <label className="label" htmlFor="category">
            Category:
          </label>
          <input
            type="text"
            id="category"
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <button type="submit" className="button">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;

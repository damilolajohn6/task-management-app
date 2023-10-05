import React from "react";
import "./Filter.css";



const Filter = ({ handleFilter }) => {
  const handlePriorityChange = (e) => {
    const priority = e.target.value;
    handleFilter("priority", priority);
  };

  const handleDueDateChange = (e) => {
    const dueDate = e.target.value;
    handleFilter("dueDate", dueDate);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    handleFilter("category", category);
  };

  return (
    <div className="filter-container">
      <label htmlFor="priority" className="filter-label">
        Priority:
      </label>
      <select
        id="priority"
        className="filter-select"
        onChange={handlePriorityChange}
      >
        <option value="">All</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <label htmlFor="dueDate" className="filter-label">
        Due Date:
      </label>
      <select
        id="dueDate"
        className="filter-select"
        onChange={handleDueDateChange}
      >
        <option value="">All</option>
        <option value="today">Today</option>
        <option value="thisWeek">This Week</option>
        <option value="overdue">Overdue</option>
      </select>

      <label htmlFor="category" className="filter-label">
        Category:
      </label>
      <select
        id="category"
        className="filter-select"
        onChange={handleCategoryChange}
      >
        <option value="">All</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};

export default Filter;

import React from 'react'
import "./task.css";
import TaskForm from "../component/TaskForm";
import TaskList from "../component/TaskList";
import Header from '../component/Header';



function Task(props) {
  return (
    <div>
      <Header />
      <div className="app-content App">

        <TaskForm />
        <div className="divider"></div>
        <TaskList />
      </div>
    </div>
  );
}


export default Task

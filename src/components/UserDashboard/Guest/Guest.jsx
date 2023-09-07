import styles from './Guest.module.css'
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
const Guest = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Guest</h1>
      <div className={styles.guest}>
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTask}>Add Guest</button>
      </div>
      <div className={styles.card}>

      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Guest Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.index}>
              <td>{task.index}</td>
              <td>{task}</td>
              <td>
                <button onClick={() => handleDeleteTask(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
};

export default Guest;

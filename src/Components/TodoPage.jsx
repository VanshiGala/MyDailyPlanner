import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, ListGroup, ListGroupItem } from 'reactstrap';

const TodoPage = () => {
  const [task, setTask] = useState(''); // State to hold the new task input
  const [tasks, setTasks] = useState([]); // State to hold the list of tasks

  // Handle adding a new task
  const handleAddTask = (e) => {
    e.preventDefault();

    // Ensure the task is not empty
    if (task.trim() === '') {
      return;
    }

    // Add the new task to the list with 'completed' status as false initially
    setTasks([...tasks, { name: task, completed: false }]);
    setTask(''); // Clear the input field after adding
  };

  // Handle deleting a task
  const handleDeleteTask = (index) => {
    // Remove the task by filtering it out
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Handle toggling the completion status of a task
  const handleToggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className='tb'>
      <h1 className='th'>ToDo List</h1>
      <Form onSubmit={handleAddTask} className='tform'>
        <FormGroup>
          <Label for="task">New Task</Label>
          <Input
            type="text"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)} // Update the task state on input change
            placeholder="Enter your task here"
            required
          />
        </FormGroup>
        <Button type="submit" color="primary" className='tbtn'>Add Task</Button>
      </Form>

      <h3 className="th1">Tasks</h3>
      {tasks.length === 0 ? (
        <p className='tp'>No tasks yet. Start adding some!</p>
      ) : (
        
        <ol className='tL'>
          {tasks.map((task, index) => (
            <ListGroupItem
              key={index}
            >
              <div>
                <Input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(index)} // Toggle completion on checkbox click
                />
                <span style={{ marginLeft: '10px' }}>{task.name}</span>
              </div>
              <Button color="danger" onClick={() => handleDeleteTask(index)}>
                Delete
              </Button>
            </ListGroupItem>
        
          ))}
        </ol>
      )}
    </div>
  );
};

export default TodoPage;

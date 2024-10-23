import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Button, ListGroup, ListGroupItem, Label } from 'reactstrap';

const TodoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const handleToggleTask = (index) => {
    const newTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <Container fluid className="mt-0"style={{ backgroundColor: '#999999', minHeight:'100vh'}}>
      <h1 className='text-center'>Plan Your Day!</h1>
      <Form onSubmit={handleAddTask}>
        
        <FormGroup className='p-3'>
          <Input 
            type="text"
            placeholder="Add a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
        </FormGroup>
        
        <Button color="primary" type="submit">Add Task</Button>
      </Form>
      <Row className="mt-2">
        <Col xs='4'>
          <ListGroup>
            {tasks.map((task, index) => (
              <ListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                <div>
                  <Input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(index)}
                    aria-label="Checkbox for task completion"
                  />
                  <Label className={task.completed ? 'completed' : ''} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.text}
                  </Label>
                </div>
                <Button color="danger" onClick={() => handleDeleteTask(index)} size="sm">
                  Delete
                </Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoPage;


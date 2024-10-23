import React, { useState } from 'react';
import { Container, Card, CardBody, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

// Header with Navbar and Logout Button
function Header() {
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">TodoPage</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link to="/login">
            <Button color="light">Logout</Button>
          </Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

// Todo Item Component
function TodoItem({ todo, onDelete, onComplete }) {
  return (
    <li className="list-group-item">
    <Card className="mb-3">
      <CardBody>
        <Row className="align-items-center">
          {/* Checkbox to mark complete */}
          <Col xs="auto">
            <input type="checkbox" checked={todo.completed} onChange={() => onComplete(todo.id)} />
          </Col>

          {/* Task text, truncate if too long */}
          <Col>
             <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}> 
              {todo.text.length > 50 ? `${todo.text.substring(0, 50)}...` : todo.text}
            </span>
          </Col>

          {/* Delete Button */}
          <Row className="justify-content-end">
          <Col xs="auto">
            <Button color="danger" onClick={() => onDelete(todo.id)} >
              Delete
            </Button>
          </Col>
          </Row>
        </Row>
      </CardBody>
    </Card>
    </li>
  );
}

// Main TodoApp Component
function TodoApp() {
   const [todos, setTodos] = useState([
     
   ]);
  const [modal, setModal] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  // Toggle modal visibility
  const toggleModal = () => setModal(!modal);

  // Add a new task
  const saveTodo = () => {
    if (newTodo.trim()) {
      const newTask = { id: todos.length + 1, text: newTodo, completed: false };
      setTodos([...todos, newTask]);
      setNewTodo('');
      toggleModal();
    }
  };

  // Delete a task
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Mark task as completed
  const completeTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div fluid style={{ backgroundColor: '#999999', minHeight:'100vh'}}>
      <Header />
      <Container >
        {/* Add Task Button */}
        <Row className="justify-content-start">
          <Col md="12" >
            <Button color="primary" onClick={toggleModal} className="mt-3 mb-2">
              Add Task
            </Button>
          </Col>
        </Row>

         {/* Ordered List of Todos using Grid */}
        <ol className="list-group">
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              onDelete={deleteTodo}
              onComplete={completeTodo}
            />
          ))}
        </ol>
      </Container>

      {/* Modal for Adding a New Task */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add New Task</ModalHeader>
        <ModalBody>
        <ol className="list-group">
            <Col md='12'>
          <Input
            type="text"
            placeholder="Enter task details..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)} 
          />
            </Col>
        </ol>
        </ModalBody>
        <ModalFooter>
             <Button color="primary" onClick={saveTodo}>
                Save
             </Button>
             <Button color="secondary" onClick={toggleModal}>
                Cancel
             </Button>
          
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TodoApp;

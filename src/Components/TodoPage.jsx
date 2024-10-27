import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody, Row, Col, Button, Input } from 'reactstrap';
import {  useNavigate } from 'react-router-dom';


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
              <span className={`${todo.completed ? 'line-through' : ''}`}>
                 {todo.text.length > 50 ? `${todo.text.substring(0, 50)}...` : todo.text}
              </span>
              <div>
                <small>{todo.username} - {todo.timestamp}</small>
              </div>
            </Col>

            {/* Delete Button */}
            <Col xs="auto">
              <Button color="danger" onClick={() => onDelete(todo.id)} className='ml-auto'>
                Delete
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </li>
  );
}

// Main TodoApp Component
function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [deletedTodos, setDeletedTodos] = useState([]);
  const username = localStorage.getItem('username') || 'User'; // Retrieve the username from localStorage

  const navigate = useNavigate();

  // Load todos from localStorage on mount
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    const storedDeletedTodos = localStorage.getItem('deletedTodos');
    const storedCompletedTodos =localStorage.getItem('completedTodos') || [];

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    if (storedDeletedTodos) {
      setDeletedTodos(JSON.parse(storedDeletedTodos));
    }
  }, []);
  
  // Add a new task
  const addTodo = (event) => {
    if ((event.key === 'Enter' || event.type === 'click') && newTodo.trim()) {
      const timestamp = new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        day: 'numeric',
        month: 'short',
      });
      const newTask = {
        id: Date.now(), // Use timestamp as a unique ID
        text: newTodo,
        username: username,
        timestamp: timestamp,
        completed: false
      };
      const updatedTodos = [...todos, newTask];
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos)); // Update localStorage
      setNewTodo('');
    }
  };

  // Delete a task
  const deletePendingTodo = (id) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos)); // Update localStorage
    const storedDeletedTodos = localStorage.getItem('deletedTodos');
    const deletedTodos = storedDeletedTodos ? JSON.parse(storedDeletedTodos) : [];
    localStorage.setItem('deletedTodos', JSON.stringify([...deletedTodos, todoToDelete])); // Update deleted todos in localStorage
  };

  const deleteCompletedTodo = (id) => {
      const todoToDelete = todos.find((todo) => todo.id === id);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
     setCompletedTodos(completedTodos.filter((todo) => todo.id !== id));
        // setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos)); // Update localStorage
    const storedDeletedTodos = localStorage.getItem('deleteCompletedTodo');
    const deletedTodos = storedDeletedTodos ? JSON.parse(storedDeletedTodos) : [];
    localStorage.setItem('deleteCompletedTodo', JSON.stringify([...deletedTodos, todoToDelete])); // Update deleted todos in localStorage
  };


  
    const completeTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);

    if (todo.completed) {
      // If already completed, move back to pending
      setTodos([...todos, { ...todo, completed: false }]);
      setCompletedTodos(completedTodos.filter((t) => t.id !== id));
    } else {
      // Move to completed list
      setCompletedTodos([...completedTodos, { ...todo, completed: true }]);
      setTodos(todos.filter((t) => t.id !== id));
    }
  };

  // Navigate to the bin page
  const navigateToBin = () => {
    navigate('/bin');
  };

    return (
    <div fluid className=" bg-gray-300 min-h-screen"> {/*container*/}
      <Container>
        {/* Ordered List of Pending Todos */}
        <h3 className="text-lg font-semibold  space-y-2 mb-2 m-0 w-full p-2">Pending Todos</h3>
        <ol className="list-group">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDelete={deletePendingTodo} onComplete={completeTodo} />
          ))}
        </ol>
        {/* Bin Button */}
        <Button color="warning" onClick={navigateToBin} className="absolute top-[55px] right-[1px] z-[1000]"
>
          Go to Bin
        </Button>
      

        {/* Ordered List of Completed Todos */}
        <h3 className="text-lg font-semibold w-full space-y-2 mb-1 m-0">Completed Todos</h3>
        <ol className="list-group mb-5">
          {completedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDelete={deleteCompletedTodo} onComplete={completeTodo} />
          ))}
        </ol>
      </Container>
        

      {/* Input Box for Adding a New Task */}
      <div className="todo-input-box fixed bottom-0 w-full p-[10px]  bg-white border-t border-gray-300">
        <Input
          type="text"
          placeholder="Enter a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={addTodo}
        />
        <Button color="primary" onClick={addTodo} className="absolute right-0 top-2  ">ADD</Button>
      </div>
       
    </div>
   );
}

export default TodoPage;
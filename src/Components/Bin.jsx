
import React, { useEffect, useState } from 'react';
import { Container, Card, CardBody, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

function Bin() {
  const [deletedTodos, setDeletedTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load deleted todos from localStorage when the component mounts
    const storedDeletedTodos = localStorage.getItem('deletedTodos');
    if (storedDeletedTodos) {
      try {
        const parsedDeletedTodos = JSON.parse(storedDeletedTodos);
        if (Array.isArray(parsedDeletedTodos)) {
          setDeletedTodos(parsedDeletedTodos.filter(todo => todo && todo.text)); // Filter out invalid entries
        }
      } catch (error) {
        console.error("Error parsing deletedTodos from localStorage:", error);
      }
    }
  }, []);

  const handleRestore = (id) => {
    const todoToRestore = deletedTodos.find(todo => todo && todo.id === id);

    // Restore logic: Remove the todo from deletedTodos and add it back to todos
    if (todoToRestore) {
      const updatedDeletedTodos = deletedTodos.filter(todo => todo && todo.id !== id);
      setDeletedTodos(updatedDeletedTodos);
      localStorage.setItem('deletedTodos', JSON.stringify(updatedDeletedTodos));

      // Update the main todo list in localStorage
      const storedTodos = localStorage.getItem('todos');
      const todos = storedTodos ? JSON.parse(storedTodos) : [];
      const updatedTodos = [...todos, { ...todoToRestore, completed: false }]; // Restore as not completed
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
  };

  return (
    <Container>
      <h3>Deleted Todos</h3>
      <ol className="list-group">
        {deletedTodos.length === 0 ? (
          <>No deleted todos</>
        ) : (
          deletedTodos.map((todo) => (
            todo && todo.text ? ( // Check if todo and its text exist before rendering
              <Card key={todo.id} className="mb-3">
                <CardBody>
                  <p>{todo.text}</p>
                  <Button color="primary" onClick={() => handleRestore(todo.id)}>Restore</Button>
                </CardBody>
              </Card>
            ) : null // Render nothing if todo is invalid
          ))
        )}
      </ol>
      <Button color="secondary" onClick={() => navigate('/todopage')}>
        Back to Todo List
      </Button>
    </Container>
  );
}

export default Bin;


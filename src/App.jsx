import "./App.css";
import "./index.css";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodoStats from "./components/TodoStats";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [editedText, setEditedText] = useState("");
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalTodos, setTotalTodos] = useState(0);
  const [isEditing, setIsEditing] = useState({});

  const addTodo = (newTodo) => {
    console.log("todo added!!");

    axios
      .post(
        "http://localhost:3001/api/tasks",
        {
          text: newTodo.text,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const createdTodo = res.data;

        setTodos((prevTodos) => [...prevTodos, createdTodo]);
      })
      .catch((err) => console.log(err));
  };

  const deleteTodo = (id) => {
    console.log(`todo with id ${id} deleted!!!`);

    axios.delete(`http://localhost:3001/api/tasks/delete/${id}`).then((res) => {
      const updatedTodos = todos.filter((todo) => todo.id !== id);

      setTodos(updatedTodos);
    });
  };

  const toggleCompletion = async (id, completionState) => {
    try {
      console.log(`todo with id ${id}'s completion is toggled`);
      console.log(todos, completionState);

      const response = await axios.put(
        `http://localhost:3001/api/tasks/toggle/${id}`,
        {
          isCompleted: !completionState,
        }
      );

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? response.data : todo))
      );
    } catch (error) {
      console.error("Error updating todo item:", error);
    }
  };

  const clearCompleted = (e) => {
    e.preventDefault();

    console.log(`clearing all completed todos...!`);

    axios
      .delete("http://localhost:3001/api/tasks/delete-completed")
      .then((res) => {
        const completedTodos = todos.filter(
          (todo) => todo.isCompleted === false
        );

        setTodos(completedTodos);
      });
  };

  //Filter Functionality
  const filteredTodos = todos.filter((todo) => {
    const filterCondition = (todo) => {
      if (filter == "All") {
        return true;
      }
      if (filter == "Completed") {
        return todo.isCompleted;
      }
      if (filter == "Incomplete") {
        return !todo.isCompleted;
      }
    };

    const matchesFilterCondition = filterCondition(todo);
    const matchesSearchQuery = todo.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilterCondition && matchesSearchQuery;
  });

  const handleSaveClick = async (id) => {
    console.log(`todo with id ${id} is now saved`);

    await axios.put(`http://localhost:3001/api/tasks/edit/${id}`, {
      text: editedText,
    });

    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: editedText };
        }
        return todo;
      })
    );

    setIsEditing((prevEditingStates) => ({
      ...prevEditingStates,
      [id]: false,
    }));
  };

  const handleEditClick = (id, text) => {
    console.log(`handle editing active..! currently editing ${id}`);

    setIsEditing((prevEditingStates) => ({
      ...prevEditingStates,
      [id]: true,
    }));

    setEditedText(text);
  };

  //Fetch Data
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/tasks");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors, show error messages, etc.
    }
  };

  useEffect(() => {
    fetchData();
  }, [todos]);

  return (
    <div className="App">
      <div className="main-wrapper py-24">
        <h1 className="text-4xl font-bold text-center mb-16">Fun TODO Appz</h1>
        <TodoStats todos={todos} totalTodos={totalTodos}></TodoStats>

        <TodoForm
          setSearchQuery={setSearchQuery}
          setFilter={setFilter}
          addTodo={addTodo}
          clearCompleted={clearCompleted}
          filter={filter}
        ></TodoForm>

        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          handleSaveClick={handleSaveClick}
          editedText={editedText}
          setEditedText={setEditedText}
          toggleCompletion={toggleCompletion}
          filteredTodos={filteredTodos}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleEditClick={handleEditClick}
        ></TodoList>
      </div>
    </div>
  );
}

export default App;

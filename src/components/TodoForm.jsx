import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const TodoForm = ({
  addTodo,
  filter,
  setFilter,
  setSearchQuery,
  clearCompleted,
}) => {
  const [todoTextInput, setTodoTextInput] = useState("");

  const handleInputChange = (e) => {
    let textInput = e.target.value;

    setTodoTextInput(textInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //todo list can't be empty
    if (todoTextInput.trim() === "") {
      alert("Can't be empty!");
      return;
    }

    let newTodo = {
      text: todoTextInput,
      isImportant: false,
      isCompleted: false,
    };

    addTodo(newTodo);
    setTodoTextInput("");
  };

  return (
    <form className="todo-form py-5">
      <div className="form-container">
        <div className="flex justify-center gap-2">
          <input
            onChange={handleInputChange}
            value={todoTextInput}
            type="text"
            className="p-3 border-solid border-2 border-gray-600 rounded-2xl"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="p-3 bg-blue-600 text-white rounded-2xl"
          >
            Add new todo +
          </button>

          <button
            onClick={clearCompleted}
            className="p-3 outline outline-2 outline-blue-600 text-blue-600 rounded-2xl outlined"
          >
            Clear All Completed Todos ✅
          </button>
        </div>

        {/* //Search Functionality */}
        <div className="flex justify-center gap-2 items-center">
          Search your Todos...
          <input
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            type="text"
            className="p-3 border-solid border-2 border-gray-600 rounded-2xl"
          />
          <button
            type="button"
            className="p-3 bg-blue-600 text-white rounded-2xl"
          >
            Search
          </button>
        </div>

        {/* Filter Functionality */}
        <div className="items-center flex justify-center gap-2">
          <h3>Filter By</h3>

          <button
            type="button"
            onClick={() => setFilter("All")}
            className={
              filter == "All" ? "button-filter active" : "button-filter"
            }
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setFilter("Incomplete")}
            className={
              filter == "Incomplete" ? "button-filter active" : "button-filter"
            }
          >
            Incomplete
          </button>
          <button
            type="button"
            onClick={() => setFilter("Completed")}
            className={
              filter == "Completed" ? "button-filter active" : "button-filter"
            }
          >
            Complete
          </button>
        </div>
      </div>
    </form>
  );
};

export default TodoForm;

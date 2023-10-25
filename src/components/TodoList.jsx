import React, { useEffect } from "react";
import TodoItem from "./TodoItem";

const TodoList = ({
  todos,
  editedText,
  setEditedText,
  handleSaveClick,
  handleEditClick,
  deleteTodo,
  toggleCompletion,
  filteredTodos,
  isEditing,
}) => {
  return (
    <div className="todo-list-container">
      <ul className="todo-list">
        {todos.length == 0 ? (
          <h2 className="font-bold">You have no todos!</h2>
        ) : (
          filteredTodos.map((todo) => {
            return (
              <TodoItem
                handleSaveClick={handleSaveClick}
                handleEditClick={handleEditClick}
                todo={todo}
                deleteTodo={deleteTodo}
                editedText={editedText}
                setEditedText={setEditedText}
                toggleCompletion={toggleCompletion}
                isEditing={isEditing[todo._id] || false}
              ></TodoItem>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default TodoList;

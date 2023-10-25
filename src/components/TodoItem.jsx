import React, { useEffect, useState } from "react";

const TodoItem = ({
  todo,
  editedText,
  setEditedText,
  handleSaveClick,
  deleteTodo,
  toggleCompletion,
  isEditing,
  handleEditClick,
  setIsEditing,
}) => {
  return (
    <div>
      {/* Editing State */}
      {isEditing ? (
        <li className="todo-item is-editing">
          <input
            onChange={(e) => setEditedText(e.target.value)}
            className="border-solid border-2 border-gray-600 rounded-2xl"
            type="text"
            value={editedText}
          />
          <button
            onClick={() => handleSaveClick(todo._id)}
            className="bg-blue-500 p-2 text-white rounded-3xl"
          >
            Save
          </button>
        </li>
      ) : (
        <li className="todo-item">
          <input
            className="todo-item-checkbox"
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => toggleCompletion(todo._id, todo.isCompleted)}
          />

          <span className={todo.isCompleted ? "completed" : ""}>
            {todo.text}
          </span>

          <button
            onClick={() => {
              deleteTodo(todo._id);
            }}
            className="bg-red-500 p-2 text-white rounded-3xl"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => {
              handleEditClick(todo._id, todo.text);
            }}
            className="bg-yellow-500 p-2 text-white  rounded-3xl"
          >
            Edit
          </button>
        </li>
      )}
    </div>
  );
};

export default TodoItem;

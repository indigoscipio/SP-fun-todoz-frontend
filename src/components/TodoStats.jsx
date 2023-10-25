import React from "react";

const TodoStats = ({ todos, totalTodos }) => {
  const getTotalTodos = () => {
    return todos.length;
  };

  const getCompletedTodos = () => {
    const completedTodos = todos.filter((todo) => todo.isCompleted);
    return completedTodos.length;
  };

  const getIncompleteTodos = () => {
    const incompleteTodos = todos.filter((todo) => !todo.isCompleted);
    return incompleteTodos.length;
  };

  return (
    <div className="todo-stats-container">
      <div className="flex text-md gap-x-6 justify-center uppercase font-bold">
        <h2>Your Todo Stats</h2>
        <h3>Total Todos: {getTotalTodos()}</h3>
        <h3>Completed Todos: {getCompletedTodos()}</h3>
        <h3>Incomplete Todos: {getIncompleteTodos()}</h3>
      </div>
    </div>
  );
};

export default TodoStats;

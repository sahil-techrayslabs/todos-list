// import React, { useState, useEffect } from "react";
// import "./App.css";

// const App = () => {
//   const [todos, setTodos] = useState([]);
//   const [filter, setFilter] = useState("all"); // all, active, completed
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   useEffect(() => {
//     const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
//     setTodos(savedTodos);

//     const savedFilter = localStorage.getItem("filter") || "all";
//     setFilter(savedFilter);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todos));
//   }, [todos]);

//   const addTodo = (task, dueDate, priority) => {
//     const newTodo = {
//       id: Date.now(),
//       task,
//       completed: false,
//       dueDate,
//       priority,
//     };
//     setTodos([...todos, newTodo]);
//   };

//   const toggleComplete = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   };

//   const openSidebar = () => {
//     setIsSidebarOpen(true);
//   };

//   const closeSidebar = () => {
//     setIsSidebarOpen(false);
//   };

//   const filteredTodos = todos.filter((todo) => {
//     if (filter === "active" && todo.completed) return false;
//     if (filter === "completed" && !todo.completed) return false;
//     if (searchQuery && !todo.task.toLowerCase().includes(searchQuery.toLowerCase())) return false;
//     return true;
//   });

//   return (
//     <div className="app-container">
//       <header>
//         <h1>Todo App</h1>
//         <button className="sidebar-toggle" onClick={openSidebar}>
//           View/Edit Todos
//         </button>
//       </header>

//       <div className="main-content">
//         <div className="add-task">
//           <h2>Add a New Task</h2>
//           <input type="text" placeholder="Task" id="task" />
//           <input type="date" id="dueDate" />
//           <select id="priority">
//             <option value="High">High</option>
//             <option value="Medium">Medium</option>
//             <option value="Low">Low</option>
//           </select>
//           <button
//             onClick={() =>
//               addTodo(
//                 document.getElementById("task").value,
//                 document.getElementById("dueDate").value,
//                 document.getElementById("priority").value
//               )
//             }
//           >
//             Add Task
//           </button>
//         </div>

//         <div className="todo-table-container">
//           <h2>Todo List</h2>
//           <table className="todo-table">
//             <thead>
//               <tr>
//                 <th>Task</th>
//                 <th>Due Date</th>
//                 <th>Priority</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTodos.map((todo) => (
//                 <tr key={todo.id}>
//                   <td>{todo.task}</td>
//                   <td>{todo.dueDate}</td>
//                   <td>{todo.priority}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {isSidebarOpen && (
//         <div className="sidebar">
//           <button className="close-sidebar" onClick={closeSidebar}>
//             Close
//           </button>
//           <h2>Manage Todos</h2>
//           <ul>
//             {todos.map((todo) => (
//               <li key={todo.id}>
//                 <p>
//                   <strong>{todo.task}</strong> - {todo.dueDate} - {todo.priority}
//                 </p>
//                 <button onClick={() => toggleComplete(todo.id)}>
//                   {todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
// import React, { useState, useEffect } from "react";
// import "./App.css";

// const App = () => {
//   const [todos, setTodos] = useState([]);
//   const [filter, setFilter] = useState("all"); // all, active, completed
//   const [searchQuery, setSearchQuery] = useState("");
//   const [darkMode, setDarkMode] = useState(false);
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [editTodoData, setEditTodoData] = useState(null);

//   // Load Todos from Local Storage
//   useEffect(() => {
//     const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
//     setTodos(savedTodos);
//   }, []);

//   // Save Todos to Local Storage
//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todos));
//   }, [todos]);

//   const addTodo = (task, dueDate, priority) => {
//     const newTodo = {
//       id: Date.now(),
//       task,
//       completed: false,
//       dueDate,
//       priority,
//     };
//     setTodos([...todos, newTodo]);
//     setIsAddDialogOpen(false); // Close dialog after adding
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter((todo) => todo.id !== id));
//   };

//   const toggleComplete = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   };

//   const openEditDialog = (todo) => {
//     setEditTodoData(todo);
//     setIsEditDialogOpen(true);
//   };

//   const editTodo = (id, updatedTask, updatedDueDate, updatedPriority) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id
//           ? { ...todo, task: updatedTask, dueDate: updatedDueDate, priority: updatedPriority }
//           : todo
//       )
//     );
//     setIsEditDialogOpen(false); // Close dialog after editing
//   };

//   const filteredTodos = todos.filter((todo) => {
//     if (filter === "active" && todo.completed) return false;
//     if (filter === "completed" && !todo.completed) return false;
//     if (searchQuery && !todo.task.toLowerCase().includes(searchQuery.toLowerCase())) return false;
//     return true;
//   });

//   return (
//     <div className={`app-container ${darkMode ? "dark" : ""}`}>
//       <header>
//         <h1>Todo App</h1>
//         <button className="add-task-button" onClick={() => setIsAddDialogOpen(true)}>
//           Add New Task
//         </button>
//       </header>
//       <main>
//       <div className="header-actions">
//           <input
//             type="text"
//             placeholder="Search tasks..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <div className="filter-buttons">
//             <button
//               className={filter === "all" ? "active" : ""}
//               onClick={() => setFilter("all")}
//             >
//               All ({todos.length})
//             </button>
//             <button
//               className={filter === "active" ? "active" : ""}
//               onClick={() => setFilter("active")}
//             >
//               Active ({todos.filter((todo) => !todo.completed).length})
//             </button>
//             <button
//               className={filter === "completed" ? "active" : ""}
//               onClick={() => setFilter("completed")}
//             >
//               Completed ({todos.filter((todo) => todo.completed).length})
//             </button>
//           </div>
//           <button
//             className="dark-mode-toggle"
//             onClick={() => setDarkMode(!darkMode)}
//           >
//             {darkMode ? "🌙" : "☀️"}
//           </button>
//         </div>
//         <table className="todo-table">
//           <thead>
//             <tr>
//               <th>Task</th>
//               <th>Due Date</th>
//               <th>Priority</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTodos.map((todo) => (
//               <tr key={todo.id}>
//                 <td>{todo.task}</td>
//                 <td>{todo.dueDate}</td>
//                 <td>{todo.priority}</td>
//                 <td></td>
//                 <td>
//                   <button onClick={() => toggleComplete(todo.id)}>
//                     {todo.completed ? "Mark Incomplete" : "Mark Complete"}
//                   </button>
//                   <button onClick={() => openEditDialog(todo)}>Edit</button>
//                   <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </main>

//       {isAddDialogOpen && (
//         <div className="dialog-overlay">
//           <div className="dialog">
//             <h2>Add New Task</h2>
//             <input type="text" id="newTask" placeholder="Task" />
//             <input type="date" id="newDueDate" />
//             <select id="newPriority">
//               <option value="High">High</option>
//               <option value="Medium">Medium</option>
//               <option value="Low">Low</option>
//             </select>
//             <button
//               onClick={() =>
//                 addTodo(
//                   document.getElementById("newTask").value,
//                   document.getElementById("newDueDate").value,
//                   document.getElementById("newPriority").value
//                 )
//               }
//             >
//               Add
//             </button>
//             <button onClick={() => setIsAddDialogOpen(false)}>Cancel</button>
//           </div>
//         </div>
//       )}

//       {isEditDialogOpen && (
//         <div className="dialog-overlay">
//           <div className="dialog">
//             <h2>Edit Task</h2>
//             <input
//               type="text"
//               defaultValue={editTodoData.task}
//               id="editTask"
//             />
//             <input
//               type="date"
//               defaultValue={editTodoData.dueDate}
//               id="editDueDate"
//             />
//             <select defaultValue={editTodoData.priority} id="editPriority">
//               <option value="High">High</option>
//               <option value="Medium">Medium</option>
//               <option value="Low">Low</option>
//             </select>
//             <button
//               onClick={() =>
//                 editTodo(
//                   editTodoData.id,
//                   document.getElementById("editTask").value,
//                   document.getElementById("editDueDate").value,
//                   document.getElementById("editPriority").value
//                 )
//               }
//             >
//               Save Changes
//             </button>
//             <button onClick={() => setIsEditDialogOpen(false)}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from "react";
// import "./App.css";

// const App = () => {
//   const [todos, setTodos] = useState([]);
//   const [filter, setFilter] = useState("all"); // all, active, completed
//   const [searchQuery, setSearchQuery] = useState("");
//   const [darkMode, setDarkMode] = useState(false);
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [editTodoData, setEditTodoData] = useState(null);
//   const [actionMenuOpen, setActionMenuOpen] = useState(null);

//   // Load Todos from Local Storage
//   useEffect(() => {
//     const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
//     setTodos(savedTodos);
//   }, []);

//   // Save Todos to Local Storage
//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todos));
//   }, [todos]);

//   const addTodo = (task, dueDate, priority) => {
//     const newTodo = {
//       id: Date.now(),
//       task,
//       completed: false,
//       dueDate,
//       priority,
//     };
//     setTodos([...todos, newTodo]);
//     setIsAddDialogOpen(false); // Close dialog after adding
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter((todo) => todo.id !== id));
//   };

//   const toggleComplete = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, completed: true } : todo
//       )
//     );
//   };

//   const openEditDialog = (todo) => {
//     setEditTodoData(todo);
//     setIsEditDialogOpen(true);
//   };

//   const editTodo = (id, updatedTask, updatedDueDate, updatedPriority) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id
//           ? {
//               ...todo,
//               task: updatedTask,
//               dueDate: updatedDueDate,
//               priority: updatedPriority,
//             }
//           : todo
//       )
//     );
//     setIsEditDialogOpen(false); // Close dialog after editing
//   };

//   const filteredTodos = todos.filter((todo) => {
//     if (filter === "active" && todo.completed) return false;
//     if (filter === "completed" && !todo.completed) return false;
//     if (searchQuery && !todo.task.toLowerCase().includes(searchQuery.toLowerCase())) return false;
//     return true;
//   });

//   return (
//     <div className={`app-container ${darkMode ? "dark" : ""}`}>
//       <header>
//         <h1>Todo App</h1>
//         <button
//           className="add-task-button"
//           onClick={() => setIsAddDialogOpen(true)}
//         >
//           Add New Task
//         </button>
//       </header>
//       <main>
//         <div className="header-actions">
//           <input
//             type="text"
//             placeholder="Search tasks..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <div className="dropdown">
//             <button className="dropdown-button">Filter</button>
//             <div className="dropdown-content">
//               <button onClick={() => setFilter("all")}>
//                 All ({todos.length})
//               </button>
//               <button onClick={() => setFilter("active")}>
//                 Active ({todos.filter((todo) => !todo.completed).length})
//               </button>
//               <button onClick={() => setFilter("completed")}>
//                 Completed ({todos.filter((todo) => todo.completed).length})
//               </button>
//             </div>
//           </div>
//           <button
//             className="dark-mode-toggle"
//             onClick={() => setDarkMode(!darkMode)}
//           >
//             {darkMode ? "🌙" : "☀️"}
//           </button>
//         </div>
//         <table className="todo-table">
//           <thead>
//             <tr>
//               <th>Task</th>
//               <th>Due Date</th>
//               <th>Priority</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTodos.map((todo) => (
//               <tr key={todo.id}>
//                 <td>{todo.task}</td>
//                 <td>{todo.dueDate}</td>
//                 <td>{todo.priority}</td>
//                 <td>{todo.completed ? "Completed" : "Not Completed"}</td>
//                 <td>
//                   <button
//                     className="action-button"
//                     onClick={() =>
//                       setActionMenuOpen(actionMenuOpen === todo.id ? null : todo.id)
//                     }
//                   >
//                     +
//                   </button>
//                   {actionMenuOpen === todo.id && (
//                     <div className="action-menu">
//                       {!todo.completed && (
//                         <button onClick={() => toggleComplete(todo.id)}>
//                           Mark Complete
//                         </button>
//                       )}
//                       <button onClick={() => openEditDialog(todo)}>Edit</button>
//                       <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </main>

//       {isAddDialogOpen && (
//         <div className="dialog-overlay">
//           <div className="dialog">
//             <h2>Add New Task</h2>
//             <input type="text" id="newTask" placeholder="Task" />
//             <input type="date" id="newDueDate" />
//             <select id="newPriority">
//               <option value="High">High</option>
//               <option value="Medium">Medium</option>
//               <option value="Low">Low</option>
//             </select>
//             <button
//               onClick={() =>
//                 addTodo(
//                   document.getElementById("newTask").value,
//                   document.getElementById("newDueDate").value,
//                   document.getElementById("newPriority").value
//                 )
//               }
//             >
//               Add
//             </button>
//             <button onClick={() => setIsAddDialogOpen(false)}>Cancel</button>
//           </div>
//         </div>
//       )}

//       {isEditDialogOpen && (
//         <div className="dialog-overlay">
//           <div className="dialog">
//             <h2>Edit Task</h2>
//             <input type="text" defaultValue={editTodoData.task} id="editTask" />
//             <input
//               type="date"
//               defaultValue={editTodoData.dueDate}
//               id="editDueDate"
//             />
//             <select defaultValue={editTodoData.priority} id="editPriority">
//               <option value="High">High</option>
//               <option value="Medium">Medium</option>
//               <option value="Low">Low</option>
//             </select>
//             <button
//               onClick={() =>
//                 editTodo(
//                   editTodoData.id,
//                   document.getElementById("editTask").value,
//                   document.getElementById("editDueDate").value,
//                   document.getElementById("editPriority").value
//                 )
//               }
//             >
//               Save Changes
//             </button>
//             <button onClick={() => setIsEditDialogOpen(false)}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // all, active, completed
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editTodoData, setEditTodoData] = useState(null);
  const [actionMenuId, setActionMenuId] = useState(null); // Track which action menu is open

  // Load Todos from Local Storage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // Save Todos to Local Storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task, dueDate, priority) => {
    const newTodo = {
      id: Date.now(),
      task,
      completed: false,
      dueDate,
      priority,
    };
    setTodos([...todos, newTodo]);
    setIsAddDialogOpen(false); // Close dialog after adding
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const openEditDialog = (todo) => {
    setEditTodoData(todo);
    setIsEditDialogOpen(true);
  };

  const editTodo = (id, updatedTask, updatedDueDate, updatedPriority) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, task: updatedTask, dueDate: updatedDueDate, priority: updatedPriority }
          : todo
      )
    );
    setIsEditDialogOpen(false); // Close dialog after editing
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active" && todo.completed) return false;
    if (filter === "completed" && !todo.completed) return false;
    if (searchQuery && !todo.task.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <header>
        <h1>Modern Todo App</h1>
        <button className="add-task-button" onClick={() => setIsAddDialogOpen(true)}>
          + Add Task
        </button>
      </header>
      <main>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="dropdown">
            <button className="dropdown-button">Filter</button>
            <div className="dropdown-content">
              <button
                className={filter === "all" ? "active" : ""}
                onClick={() => setFilter("all")}
              >
                All ({todos.length})
              </button>
              <button
                className={filter === "active" ? "active" : ""}
                onClick={() => setFilter("active")}
              >
                Active ({todos.filter((todo) => !todo.completed).length})
              </button>
              <button
                className={filter === "completed" ? "active" : ""}
                onClick={() => setFilter("completed")}
              >
                Completed ({todos.filter((todo) => todo.completed).length})
              </button>
            </div>
          </div>
          <button
            className="dark-mode-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
        <table className="todo-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.task}</td>
                <td>{todo.dueDate || "No Due Date"}</td>
                <td>{todo.priority}</td>
                <td>{todo.completed ? "Completed" : "Active"}</td>
                <td>
                  <button
                    className="action-button"
                    onClick={() => setActionMenuId(actionMenuId === todo.id ? null : todo.id)}
                  >
                    +
                  </button>
                  {actionMenuId === todo.id && (
                    <div className="action-menu">
                      {!todo.completed && (
                        <button onClick={() => toggleComplete(todo.id)}>
                          Mark Complete
                        </button>
                      )}
                      <button onClick={() => openEditDialog(todo)}>Edit</button>
                      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Add Task Dialog */}
      {isAddDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h2>Add New Task</h2>
            <input type="text" id="newTask" placeholder="Task" />
            <input type="date" id="newDueDate" />
            <select id="newPriority">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button
              onClick={() =>
                addTodo(
                  document.getElementById("newTask").value,
                  document.getElementById("newDueDate").value,
                  document.getElementById("newPriority").value
                )
              }
            >
              Add Task
            </button>
            <button onClick={() => setIsAddDialogOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Edit Task Dialog */}
      {isEditDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h2>Edit Task</h2>
            <input
              type="text"
              defaultValue={editTodoData.task}
              id="editTask"
            />
            <input
              type="date"
              defaultValue={editTodoData.dueDate}
              id="editDueDate"
            />
            <select defaultValue={editTodoData.priority} id="editPriority">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button
              onClick={() =>
                editTodo(
                  editTodoData.id,
                  document.getElementById("editTask").value,
                  document.getElementById("editDueDate").value,
                  document.getElementById("editPriority").value
                )
              }
            >
              Save Changes
            </button>
            <button onClick={() => setIsEditDialogOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

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
//   const [actionMenuId, setActionMenuId] = useState(null); // Track which action menu is open

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
//         <h1>Modern Todo App</h1>
//         <button className="add-task-button" onClick={() => setIsAddDialogOpen(true)}>
//           + Add Task
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
//               <button
//                 className={filter === "all" ? "active" : ""}
//                 onClick={() => setFilter("all")}
//               >
//                 All ({todos.length})
//               </button>
//               <button
//                 className={filter === "active" ? "active" : ""}
//                 onClick={() => setFilter("active")}
//               >
//                 Active ({todos.filter((todo) => !todo.completed).length})
//               </button>
//               <button
//                 className={filter === "completed" ? "active" : ""}
//                 onClick={() => setFilter("completed")}
//               >
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
//                 <td>{todo.dueDate || "No Due Date"}</td>
//                 <td>{todo.priority}</td>
//                 <td>{todo.completed ? "Completed" : "Active"}</td>
//                 <td>
//                   <button
//                     className="action-button"
//                     onClick={() => setActionMenuId(actionMenuId === todo.id ? null : todo.id)}
//                   >
//                     +
//                   </button>
//                   {actionMenuId === todo.id && (
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

//       {/* Add Task Dialog */}
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
//               Add Task
//             </button>
//             <button onClick={() => setIsAddDialogOpen(false)}>Cancel</button>
//           </div>
//         </div>
//       )}

//       {/* Edit Task Dialog */}
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



import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ThemeStatus from "./ThemeStatus";

export const ThemeContext = createContext();

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editTodoData, setEditTodoData] = useState(null);
  const [actionMenuId, setActionMenuId] = useState(null);

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
    if (!task) {
      alert("Task field cannot be empty!");
      return;
    }

    const newTodo = {
      id: Date.now(),
      task,
      completed: false,
      dueDate: dueDate || new Date().toISOString().split("T")[0], // Default to today's date
      priority,
    };
    setTodos([...todos, newTodo]);
    setIsAddDialogOpen(false);
  };

  const deleteTodo = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
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
    if (!updatedTask) {
      alert("Task field cannot be empty!");
      return;
    }

    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              task: updatedTask,
              dueDate: updatedDueDate || new Date().toISOString().split("T")[0],
              priority: updatedPriority,
            }
          : todo
      )
    );
    setIsEditDialogOpen(false);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active" && todo.completed) return false;
    if (filter === "completed" && !todo.completed) return false;
    if (searchQuery && !todo.task.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <Router>
        <div className={`app-container ${darkMode ? "dark" : ""}`}>
          <header>
            <h1>Modern Todo App</h1>
            <button
              className="dark-mode-toggle"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "🌙" : "☀️"}
            </button>
            <Link to="/theme-status" className="theme-status-link">
              View Theme Status
            </Link>
          </header>

          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
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
                        className="add-task-button"
                        onClick={() => setIsAddDialogOpen(true)}
                      >
                        + Add Task
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
                                onClick={() =>
                                  setActionMenuId(actionMenuId === todo.id ? null : todo.id)
                                }
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
                                  <button onClick={() => openEditDialog(todo)}>
                                    Edit
                                  </button>
                                  <button onClick={() => deleteTodo(todo.id)}>
                                    Delete
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                }
              />
              <Route path="/theme-status" element={<ThemeStatus />} />
            </Routes>
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
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;





// import React, { useState, useEffect, createContext } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import "./App.css";
// import ThemeStatus from "./ThemeStatus";

// export const ThemeContext = createContext();

// const App = () => {
//   const [todos, setTodos] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [darkMode, setDarkMode] = useState(false);
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [editTodoData, setEditTodoData] = useState(null);
//   const [actionMenuId, setActionMenuId] = useState(null);

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
//     if (!task) {
//       alert("Task field cannot be empty!");
//       return;
//     }

//     const newTodo = {
//       id: Date.now(),
//       task,
//       completed: false,
//       dueDate: dueDate || new Date().toISOString().split("T")[0], // Default to today's date
//       priority,
//     };
//     setTodos([...todos, newTodo]);
//     setIsAddDialogOpen(false);
//   };

//   const deleteTodo = (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this task?");
//     if (confirmDelete) {
//       setTodos(todos.filter((todo) => todo.id !== id));
//     }
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
//     if (!updatedTask) {
//       alert("Task field cannot be empty!");
//       return;
//     }

//     setTodos(
//       todos.map((todo) =>
//         todo.id === id
//           ? {
//               ...todo,
//               task: updatedTask,
//               dueDate: updatedDueDate || new Date().toISOString().split("T")[0],
//               priority: updatedPriority,
//             }
//           : todo
//       )
//     );
//     setIsEditDialogOpen(false);
//   };

//   const filteredTodos = todos.filter((todo) => {
//     if (filter === "active" && todo.completed) return false;
//     if (filter === "completed" && !todo.completed) return false;
//     if (searchQuery && !todo.task.toLowerCase().includes(searchQuery.toLowerCase())) return false;
//     return true;
//   });

//   return (
//     <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
//       <Router>
//         <div className={`app-container ${darkMode ? "dark" : ""}`}>
//           <header>
//             <h1>Modern Todo App</h1>
//             <button
//               className="dark-mode-toggle"
//               onClick={() => setDarkMode(!darkMode)}
//             >
//               {darkMode ? "🌙" : "☀️"}
//             </button>
//             <Link to="/theme-status" className="theme-status-link">
//               View Theme Status
//             </Link>
//           </header>

//           <main>
//             <Routes>
//               <Route
//                 path="/"
//                 element={
//                   <>
//                     <div className="header-actions">
//                       <input
//                         type="text"
//                         placeholder="Search tasks..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                       />
//                       <div className="dropdown">
//                         <button className="dropdown-button">Filter</button>
//                         <div className="dropdown-content">
//                           <button
//                             className={filter === "all" ? "active" : ""}
//                             onClick={() => setFilter("all")}
//                           >
//                             All ({todos.length})
//                           </button>
//                           <button
//                             className={filter === "active" ? "active" : ""}
//                             onClick={() => setFilter("active")}
//                           >
//                             Active ({todos.filter((todo) => !todo.completed).length})
//                           </button>
//                           <button
//                             className={filter === "completed" ? "active" : ""}
//                             onClick={() => setFilter("completed")}
//                           >
//                             Completed ({todos.filter((todo) => todo.completed).length})
//                           </button>
//                         </div>
//                       </div>
//                       {!isAddDialogOpen && !isEditDialogOpen && (
//                         <button
//                           className="add-task-button"
//                           onClick={() => setIsAddDialogOpen(true)}
//                         >
//                           + Add Task
//                         </button>
//                       )}
//                     </div>

//                     <table className="todo-table">
//                       <thead>
//                         <tr>
//                           <th>Task</th>
//                           <th>Due Date</th>
//                           <th>Priority</th>
//                           <th>Status</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredTodos.map((todo) => (
//                           <tr key={todo.id}>
//                             <td>{todo.task}</td>
//                             <td>{todo.dueDate || "No Due Date"}</td>
//                             <td>{todo.priority}</td>
//                             <td>{todo.completed ? "Completed" : "Active"}</td>
//                             <td>
//                               {!isAddDialogOpen &&
//                                 !isEditDialogOpen &&
//                                 actionMenuId !== todo.id && (
//                                   <button
//                                     className="action-button"
//                                     onClick={() => setActionMenuId(todo.id)}
//                                   >
//                                     +
//                                   </button>
//                                 )}
//                               {actionMenuId === todo.id && (
//                                 <div className="action-menu">
//                                   {!todo.completed && (
//                                     <button onClick={() => toggleComplete(todo.id)}>
//                                       Mark Complete
//                                     </button>
//                                   )}
//                                   <button onClick={() => openEditDialog(todo)}>
//                                     Edit
//                                   </button>
//                                   <button onClick={() => deleteTodo(todo.id)}>
//                                     Delete
//                                   </button>
//                                 </div>
//                               )}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </>
//                 }
//               />
//               <Route path="/theme-status" element={<ThemeStatus />} />
//             </Routes>
//           </main>

//           {/* Add Task Dialog */}
//           {isAddDialogOpen && (
//             <div className="dialog-overlay">
//               <div className="dialog">
//                 <h2>Add New Task</h2>
//                 <input type="text" id="newTask" placeholder="Task" />
//                 <input type="date" id="newDueDate" />
//                 <select id="newPriority">
//                   <option value="High">High</option>
//                   <option value="Medium">Medium</option>
//                   <option value="Low">Low</option>
//                 </select>
//                 <button
//                   onClick={() =>
//                     addTodo(
//                       document.getElementById("newTask").value,
//                       document.getElementById("newDueDate").value,
//                       document.getElementById("newPriority").value
//                     )
//                   }
//                 >
//                   Add Task
//                 </button>
//                 <button onClick={() => setIsAddDialogOpen(false)}>Cancel</button>
//               </div>
//             </div>
//           )}

//           {/* Edit Task Dialog */}
//           {isEditDialogOpen && (
//             <div className="dialog-overlay">
//               <div className="dialog">
//                 <h2>Edit Task</h2>
//                 <input
//                   type="text"
//                   defaultValue={editTodoData.task}
//                   id="editTask"
//                 />
//                 <input
//                   type="date"
//                   defaultValue={editTodoData.dueDate}
//                   id="editDueDate"
//                 />
//                 <select defaultValue={editTodoData.priority} id="editPriority">
//                   <option value="High">High</option>
//                   <option value="Medium">Medium</option>
//                   <option value="Low">Low</option>
//                 </select>
//                 <button
//                   onClick={() =>
//                     editTodo(
//                       editTodoData.id,
//                       document.getElementById("editTask").value,
//                       document.getElementById("editDueDate").value,
//                       document.getElementById("editPriority").value
//                     )
//                   }
//                 >
//                   Save Changes
//                 </button>
//                 <button onClick={() => setIsEditDialogOpen(false)}>Cancel</button>
//               </div>
//             </div>
//           )}
//         </div>
//       </Router>
//     </ThemeContext.Provider>
//   );
// };

// export default App;






// import React, { useState, useEffect, createContext } from "react";
// import "./App.css";
// import ThemeStatus from "./ThemeStatus";

// export const ThemeContext = createContext();

// const App = () => {
//   const [todos, setTodos] = useState([]);
//   const [filter, setFilter] = useState("all"); // "all", "active", "completed"
//   const [searchQuery, setSearchQuery] = useState("");
//   const [darkMode, setDarkMode] = useState(false);
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [editTodoData, setEditTodoData] = useState(null);
//   const [actionMenuId, setActionMenuId] = useState(null); // Tracks which action menu is open

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
//     if (!task) {
//       alert("Task field cannot be empty!");
//       return;
//     }

//     const newTodo = {
//       id: Date.now(),
//       task,
//       completed: false,
//       dueDate: dueDate || new Date().toISOString().split("T")[0], // Default to today's date
//       priority,
//     };
//     setTodos([...todos, newTodo]);
//     setIsAddDialogOpen(false); // Close dialog after adding
//   };

//   const deleteTodo = (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this task?");
//     if (confirmDelete) {
//       setTodos(todos.filter((todo) => todo.id !== id));
//     }
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
//     if (!updatedTask) {
//       alert("Task field cannot be empty!");
//       return;
//     }

//     setTodos(
//       todos.map((todo) =>
//         todo.id === id
//           ? {
//               ...todo,
//               task: updatedTask,
//               dueDate: updatedDueDate || new Date().toISOString().split("T")[0],
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
//     <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
//       <div className={`app-container ${darkMode ? "dark" : ""}`}>
//         <header>
//           <h1>Modern Todo App</h1>
//           <button
//             className="dark-mode-toggle"
//             onClick={() => setDarkMode(!darkMode)}
//           >
//             {darkMode ? "🌙" : "☀️"}
//           </button>
//         </header>

//         <main>
//           <div className="header-actions">
//             <input
//               type="text"
//               placeholder="Search tasks..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <div className="dropdown">
//               <button className="dropdown-button">Filter</button>
//               <div className="dropdown-content">
//                 <button
//                   className={filter === "all" ? "active" : ""}
//                   onClick={() => setFilter("all")}
//                 >
//                   All ({todos.length})
//                 </button>
//                 <button
//                   className={filter === "active" ? "active" : ""}
//                   onClick={() => setFilter("active")}
//                 >
//                   Active ({todos.filter((todo) => !todo.completed).length})
//                 </button>
//                 <button
//                   className={filter === "completed" ? "active" : ""}
//                   onClick={() => setFilter("completed")}
//                 >
//                   Completed ({todos.filter((todo) => todo.completed).length})
//                 </button>
//               </div>
//             </div>
//             <button
//               className="add-task-button"
//               onClick={() => setIsAddDialogOpen(true)}
//             >
//               + Add Task
//             </button>
//           </div>

//           <table className="todo-table">
//             <thead>
//               <tr>
//                 <th>Task</th>
//                 <th>Due Date</th>
//                 <th>Priority</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTodos.map((todo) => (
//                 <tr key={todo.id}>
//                   <td>{todo.task}</td>
//                   <td>{todo.dueDate || "No Due Date"}</td>
//                   <td>{todo.priority}</td>
//                   <td>{todo.completed ? "Completed" : "Active"}</td>
//                   <td>
//                     {actionMenuId !== todo.id && (
//                       <button
//                         className="action-button"
//                         onClick={() => setActionMenuId(todo.id)}
//                       >
//                         +
//                       </button>
//                     )}
//                     {actionMenuId === todo.id && (
//                       <div className="action-menu">
//                         {!todo.completed && (
//                           <button onClick={() => toggleComplete(todo.id)}>
//                             Mark Complete
//                           </button>
//                         )}
//                         <button onClick={() => openEditDialog(todo)}>Edit</button>
//                         <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </main>

//         <ThemeStatus />

//         {/* Add Task Dialog */}
//         {isAddDialogOpen && (
//           <div className="dialog-overlay">
//             <div className="dialog">
//               <h2>Add New Task</h2>
//               <input type="text" id="newTask" placeholder="Task" />
//               <input type="date" id="newDueDate" />
//               <select id="newPriority">
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
//               <button
//                 onClick={() =>
//                   addTodo(
//                     document.getElementById("newTask").value,
//                     document.getElementById("newDueDate").value,
//                     document.getElementById("newPriority").value
//                   )
//                 }
//               >
//                 Add Task
//               </button>
//               <button onClick={() => setIsAddDialogOpen(false)}>Cancel</button>
//             </div>
//           </div>
//         )}

//         {/* Edit Task Dialog */}
//         {isEditDialogOpen && (
//           <div className="dialog-overlay">
//             <div className="dialog">
//               <h2>Edit Task</h2>
//               <input
//                 type="text"
//                 defaultValue={editTodoData.task}
//                 id="editTask"
//               />
//               <input
//                 type="date"
//                 defaultValue={editTodoData.dueDate}
//                 id="editDueDate"
//               />
//               <select defaultValue={editTodoData.priority} id="editPriority">
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
//               <button
//                 onClick={() =>
//                   editTodo(
//                     editTodoData.id,
//                     document.getElementById("editTask").value,
//                     document.getElementById("editDueDate").value,
//                     document.getElementById("editPriority").value
//                   )
//                 }
//               >
//                 Save Changes
//               </button>
//               <button onClick={() => setIsEditDialogOpen(false)}>Cancel</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </ThemeContext.Provider>
//   );
// };

// export default App;

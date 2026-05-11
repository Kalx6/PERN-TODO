import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Check, SquarePen, Trash2, X } from "lucide-react";

function App() {
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedTodo, setEditedTodo] = useState("");
  const [errors, setErrors] = useState(null);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/todo", {
      description,
      completed: false,
    });
    setDescription("");
    getTodos();

    try {
    } catch (err) {
      console.log(err.message);
    }
  };

  // getTodos();
  const getTodos = async () => {
    try {
      setErrors(null);
      const res = await axios("http://localhost:5000/todo");
      // console.log(res.data);
      setTodos(res.data);
    } catch (err) {
      console.log(err.message);
      setErrors("Failed to fetch todos. Please try again later.");
    }
  };

  useEffect(() => {
    getTodos();
  }, [description, editedTodo, todos]);

  const saveTodo = async (id) => {
    try {
      const currentTodo = todos.find((todo) => todo.todo_id === id);
      const trimmedText = editedTodo.trim();

      if (currentTodo.description === trimmedText) {
        setEditingTodo(null);
        setEditedTodo("");
        return;
      }
      axios.put(`http://localhost:5000/todo/${id}`, {
        description: editedTodo,
      });
      setEditingTodo(null);
      setEditedTodo("");
      getTodos();
    } catch (err) {
      console.log(err.message);
      setErrors("Failed to update todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      axios.delete(`http://localhost:5000/todo/${id}`);
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.log(err.message);
      setErrors("Failed to delete todo");
    }
  };

  const toggleCompleted = async (id) => {
    try {
      const todo = todos.find((todo) => todo.todo_id === id);
      await axios.put(`http://localhost:5000/todo/${id}`, {
        description: todo.description,
        completed: !todo.completed,
      });
      setTodos(
        todos.map((todo) =>
          todo.todo_id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex justify-center items-center p-4">
      <div className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <h1 className="text-4xl text-center mb-8 font-bold text-gray-800">
          PERN TODO APP
        </h1>
        {errors && (
          <div>
            <p className="text-red-500 ">{errors}</p>
          </div>
        )}
        <form
          onSubmit={onSubmitForm}
          className="flex items-center gap-2 shadow-md mb-6 border-b-1 border-blue-500 rounded-md "
        >
          <input
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400 mt-4 "
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What needs to be done?"
            required
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium">
            Add Task
          </button>
        </form>
        <div>
          {todos.length === 0 ? (
            <p className="text-gray-600">No tasks available. Add a new task</p>
          ) : (
            <div className="flex flex-col gap-y-4">
              {todos.map((todo) => (
                <div key={todo.todo_id} className="pb-4">
                  {editingTodo === todo.todo_id ? (
                    <div className="flex items-center gap-x-3">
                      <input
                        type="text"
                        value={editedTodo}
                        onChange={(e) => setEditedTodo(e.target.value)}
                        className="flex-1 p-2 border rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-inner"
                      />
                      <div>
                        <button
                          onClick={() => saveTodo(todo.todo_id)}
                          className="bg-green-500 py-2 px-3 mt-2 mr-1 text-white rounded-lg hover:bg-green-400 cursor-pointer"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => setEditingTodo(null)}
                          className="bg-red-500 py-2 px-3 mt-2 mr-1 text-white rounded-lg hover:bg-red-400 cursor-pointer"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-4 overflow-hidden ">
                        <button
                          onClick={() => toggleCompleted(todo.todo_id)}
                          className={`flex-shrink-0 h-6 w-6 border-2 rounded-full flex items-center justify-center cursor-pointer ${todo.completed ? "bg-green-500 border-green-500 text-white" : "border-gray-300 hover:border-blue-400"}`}
                        >
                          {todo.completed && <Check size={16} />}
                        </button>
                        <span>{todo.description}</span>
                      </div>
                      <div className="flex gap-x-2">
                        <button
                          onClick={() => {
                            setEditingTodo(todo.todo_id);
                            setEditedTodo(todo.description);
                          }}
                          className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 cursor-pointer"
                        >
                          <SquarePen size={16} />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.todo_id)}
                          className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

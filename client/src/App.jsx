import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Check } from "lucide-react";

function App() {
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [editedTodo, setEditedTodo] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/todo", {
      description,
      completed: false,
    });
    setDescription("");
    getTodos();

    try {
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTodos = async () => {
    try {
      const res = await axios("http://localhost:5000/todo");
      console.log(res.data);
      setTodos(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  // getTodos();

  return (
    <div className="min-h-screen bg-gray-800 flex justify-center items-center p-4">
      <div className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <h1 className="text-4xl text-center mb-8 font-bold text-gray-800">
          PERN TODO APP
        </h1>
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
            <div>
              {todos.map((todo) => (
                <div key={todo.todo_id}>
                  <button
                    className={`h-6 w-6 border-2 rounded-full flex items-center justify-center cursor-pointer ${todo.completed ? "bg-green-500 border-green-500 text-white" : "border-gray-300 hover:border-blue-400"}`}
                  >
                    {todo.completed && <Check size={16} />}
                  </button>
                  <span>{todo.description}</span>
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

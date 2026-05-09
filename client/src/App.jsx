import { useState } from "react";

function App() {
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [editedTodo, setEditedTodo] = useState("");

  return (
    <div className="min-h-screen bg-gray-800 flex justify-center items-center p-4">
      <div className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <h1 className="text-4xl text-center font-bold text-gray-800">
          PERN TODO APP
        </h1>
        <form action="">
          <input
            className="w-full outline-none px-3 [y-2 text-gray-700 placeholder-gray-400 mt-4 transition-all focus:border-b-[1px] focus:border-gray-400 "
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What needs to be done?"
          />
        </form>
      </div>
    </div>
  );
}

export default App;

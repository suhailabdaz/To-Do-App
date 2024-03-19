import { Form } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IoCheckboxOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, seteditId] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTask = () => {
    if (input.trim() !== "") {
      const isDuplicate = tasks.some((task) => task.list === input);
      if (!isDuplicate) {
        if (editId !== 0) {
          const updatedTasks = tasks.map((task) =>
            task.id === editId ? { ...task, list: input } : task
          );
          setTasks(updatedTasks);
          seteditId(0);
        } else {
          setTasks([...tasks, { list: input, id: Date.now(), status: false }]);
        }
        setInput("");
      } else {
        alert("Task already exists!");
      }
    }
  };

  const deleteTask = (id) => {
    const modified = tasks.filter((task) => task.id !== id);
    setTasks(modified);
  };
  const onEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id == id);
    setInput(taskToEdit.list);
    seteditId(taskToEdit.id);
  };
  const statusChange = (id) => {
    let complete = tasks.map((task) => {
      if (task.id == id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setTasks(complete);
  };

  return (
    <div className="mx-[33vw] my-[10vh] p-10 rounded-xl w-[33vw]">
      <h1 className="text-black text-5xl p-1 mx-5 my-5 text-center font-thin">
        Tasks List
      </h1>
      <form className="p-3 mx-4" onSubmit={handleSubmit}>
        <input
          className="h-8 w-[20vw] rounded-md p-3 border-solid border-2 border-black	"
          value={input}
          ref={inputRef}
          type="text"
          placeholder="Enter your task"
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="button"
          className="bg-gray-500 text-white h-10 w-12 ml-2 rounded-md"
          onClick={addTask}
        >
          {editId !== 0 ? "Edit" : "Add"}
        </button>
      </form>
      <div className="text-black">
        <ul>
          {tasks.map((task) => (
            <li
              className="flex justify-between space-x-3 mx-5 p-2 my-2 border-solid border-2 border-slate-900 items-center"
              key={task.id}
            >
              <span>
                {task.status ? (
                  <IoCheckboxOutline
                    className={"mx-3 size-7 cursor-pointer text-green-600"}
                    title="Done"
                    onClick={() => statusChange(task.id)}
                  />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank
                    className={"mx-3 size-7 cursor-pointer"}
                    title="Done"
                    onClick={() => statusChange(task.id)}
                  />
                )}
              </span>
              <span
                className={`${
                  task.status === true ? "line-through opacity-50" : ""
                }  text-lg truncate w-1/2`}
              >
                {task.list}
              </span>
              <span className="flex items-center space-x-3">
                <AiFillEdit
                  title="Edit"
                  className="size-7 cursor-pointer"
                  onClick={() => onEdit(task.id)}
                />
                <MdDelete
                  className="fill-red-600 size-7 hover:cursor-pointer"
                  onClick={() => deleteTask(task.id)}
                  title="Delete"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;

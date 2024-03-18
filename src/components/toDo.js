import { Form } from "react-router-dom"
import { useState,useRef,useEffect } from "react"
import { MdDelete } from "react-icons/md";
import { IoCheckboxOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";





const Todo=()=>{
    const [tasks,settasks]=useState([])
    const [input,setinput]=useState("")

    const inputRef=useRef("null")

    useEffect(()=>{
        inputRef.current.focus();
    })

    const handleSubmit=(e)=>{
        e.preventDefault()
    }
    const addTask=()=>{
        settasks([...tasks,input])
        setinput("")
    }

    return (
        <div className="mx-[33vw] my-[10vh] p-10 rounded-xl w-[33vw]">
            <h1 className="text-slate-300 text-5xl p-1 mx-5 my-5 text-center">TO-DO APP</h1>
            <form className="p-3 mx-4" onSubmit={handleSubmit}>
            <input className="h-8 w-[20vw] rounded-md p-3" value={input} ref={inputRef} type="text" placeholder="Enter your task " onChange={(e)=>setinput(e.target.value)}/>
            <button type="button" className= " bg-gray-500 text-white h-10 w-10 ml-2 rounded-md" onClick={addTask}>Add</button>
            </form>
            <div className="text-black">
                <ul>
                    {
                        tasks.map((task,index)=>{
                            return <li className=" flex mx-5 p-2 my-2 border-solid border-2 border-slate-900 items-center" key={index}><span><IoCheckboxOutline title="Done"/></span>{task}<span className="flex items-center space-x-2"><AiFillEdit title="Edit"/><MdDelete title="Delete"/></span></li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Todo
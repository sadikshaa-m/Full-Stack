import { ToDo } from "@/models/model";
import axios from "axios"

export default async function ToDos() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
    const todos = response.data;
  return (
    <div className="p-2">
      {todos.slice(0,5).map((todo : ToDo)=> {
return <div>{todo.title}</div>
      })}
    </div>
  )
}

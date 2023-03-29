import React from "react";
import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Albums from "./Routers/Albums";
import Comment from "./Routers/Comment";
import Complete from "./Routers/CompleteTodo";
import Home from "./Routers/Home";
import PendingTodo from "./Routers/PendingTodo";
import Post from './Routers/Post'
import Todo from "./Routers/Todo";
export default function App()
{
  return(
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/post/*" element={<Post/>} ></Route>
        <Route exact path="/comment/*" element={<Comment/>} ></Route>
        <Route exact path="/todo/*" element={<Todo/>} ></Route>
        <Route exact path="/pendingtodo/*" element={<PendingTodo/>}></Route>
        <Route exact path="/completetodo/*" element={<Complete/>}></Route>
        <Route exact path='/album/*' element={<Albums/>}></Route>
      </Routes>
    </Router>
  )
}
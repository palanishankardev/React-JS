import { useEffect,useState } from "react";
import React from "react";
import axios from "axios";
export default function Todo()
{
    const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('userId');
const api=[
  axios.get(`https://jsonplaceholder.typicode.com/users/${id}`),
  axios.get('https://jsonplaceholder.typicode.com/todos'),
]
const [user,setUser]=useState([])
const [todo,setTodo]=useState([])

useEffect(()=>{
  axios.all(api)
  .then(axios.spread((...alldata)=>
  {
    setUser(alldata[0].data)
    setTodo(alldata[1].data)
  }))
  .catch(error=>console.log(error))

},[])
const single=todo.filter(ele=>ele.userId===user.id)
const complete=single.filter(ele=>ele.completed===false)
    return(
      <div style={{ display: "block", padding: 30,fontSize:'18px',justifyContent:'center',alignItems:'center' }}>
      <h2 style={{textAlign:'center',marginBottom:'50px',textDecorationLine:'underline'}}>Not Completed ToDos Details</h2>
      <p style={{textAlign:'center',marginBottom:'50px'}}>Name: {user.name}</p>
    <table width='1300px' height='700px' border="1px solid black" style={{borderCollapse:'collapse',marginLeft:'300px'}}>
             <tr >
                 <th width="100px" >Todo ID</th>
                 <th width="400px">Title</th>
                 <th width="100px">Status</th>
             </tr>
              {
                complete.map((item) => {
                  const todoid=(tid)=>{
                      if(tid%20!=0)
                      return tid%20
                      else
                      return 20
                  }
                  const comp=status=>(status)?"Completed":"Not Completed"
                  return (
                    <tr key={item.id}>
                      <td style={{ textAlign: 'center' }}>
                        {todoid(item.id)}
                      </td>
                      <td >{item.title}</td>
                      <td style={{ textAlign: 'center',color:(!item.completed)?'orangered':'green' }}>{comp(item.completed)}</td>
                     
                    </tr>
                  );
                })
              }   
         </table>
   </div>
    )
}
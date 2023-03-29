import axios from "axios";
import React, { useState,useEffect } from "react";
import '../index.css'
export default function Post()
{
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('userId');

  const [user,setUser]=useState([])
  const [post,setPost]=useState([])

  const api=[
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`),
    axios.get('https://jsonplaceholder.typicode.com/posts')
  ]

  useEffect(()=>{
    axios.all(api)
    .then(axios.spread((...alldata)=>
  {
    setUser(alldata[0].data)
    setPost(alldata[1].data)
  }))
  },[])
  const single=post.filter(ele=>ele.userId===user.id)
    return(
      <div style={{ display: "block", padding: 30,fontSize:'18px',justifyContent:'center',alignItems:'center' }}>
        <h2 style={{textAlign:'center',marginBottom:'50px',textDecorationLine:'underline'}}>Post Details</h2>
        <p style={{textAlign:'center',marginBottom:'50px'}}>Name: {user.name}</p>
      <table width='1300px' height='700px' border="1px solid black" style={{borderCollapse:'collapse',marginLeft:'300px'}}>
               <tr >
                   <th width="100px" >S/No.</th>
                   <th width="400px" >Title</th>
                   <th width="700px">Body</th>
               </tr>
                {
                  single.map((item,index)=>{
                    const postid=(itid)=>{
                      if(itid%10===0)
                      return 10
                      else
                      return itid%10
                    }
                    return (
                      <tr >
                      <td style={{textAlign:'center'}}>
                        {postid(item.id)}
                        
                        </td>
                      <td>{item.title}</td>
                      <td>{item.body}</td>
                      </tr>
                    )
                  })
                }
               
                   
           </table>
     </div>
   
    )
}
import React, { useEffect,useState } from "react";
import axios from "axios";

export default function Comment()
{
    const searchParams = new URLSearchParams(window.location.search);
   const id = searchParams.get('userId');
  const api=[
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`),
    axios.get('https://jsonplaceholder.typicode.com/posts'),
    axios.get('https://jsonplaceholder.typicode.com/comments')
  ]
  const [user,setUser]=useState([])
  const [post,setPost]=useState([])
  const [comment,setComment]=useState([])
  
  useEffect(()=>{
    axios.all(api)
    .then(axios.spread((...alldata)=>
    {
      setUser(alldata[0].data)
      setPost(alldata[1].data)
      setComment(alldata[2].data)
      
    }))
    .catch(error=>console.log(error))
  
  },[])
  const singlePost=post.filter(ele=>ele.userId===user.id)
  const sample=singlePost.map((item)=>{
    return comment.filter(ele=>ele.postId===item.id)
  })
  const newarr=sample.flat()
    return(
      <div style={{ display: "block", padding: 30,fontSize:'18px',justifyContent:'center',alignItems:'center' }}>
      <h2 style={{textAlign:'center',marginBottom:'50px',textDecorationLine:'underline'}}>Comment Details</h2>
      <p style={{textAlign:'center',marginBottom:'50px'}}>Name: {user.name}</p>
    <table width='1300px' height='700px' border="1px solid black" style={{borderCollapse:'collapse',marginLeft:'300px'}}>
             <tr >
                 <th width="100px" >S/No.</th>
                 <th width="100px">Post ID</th>
                 <th width="400px">Commenter Name</th>
                 <th width="400px">Commenter Email</th>
                 <th width="700px">Comment</th>
             </tr>
              {
                newarr.map((item) => {
                  const commentid=(cid)=>{
                      if(cid%50!=0)
                      return cid%50
                      else
                      return 50
                  }
                  return (
                    <tr key={item.id}>
                      <td style={{ textAlign: 'center' }}>
                        {commentid(item.id)}
                      </td>
                      <td style={{ textAlign: 'center' }}>{item.postId}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.body}</td>
                    </tr>
                  );
                })
              }   
         </table>
   </div>
    )
}
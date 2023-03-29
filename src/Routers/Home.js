import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import '../index.css'
const api=[
  axios.get('https://jsonplaceholder.typicode.com/users'),
  axios.get('https://jsonplaceholder.typicode.com/posts'),
  axios.get('https://jsonplaceholder.typicode.com/comments'),
  axios.get('https://jsonplaceholder.typicode.com/todos'),
  axios.get('https://jsonplaceholder.typicode.com/albums'),
]
 
export default function Home() {

const[user,setUser]=useState([])
const[post,setPost]=useState([])
const[comments,setComments]=useState([])
const[todos,setTodos]=useState([])
const[albums,setAlbums]=useState([])


useEffect(()=>{
  axios.all(api)
  .then(axios.spread((...alldata)=>
  {
    setUser(alldata[0].data)
    setPost(alldata[1].data)
    setComments(alldata[2].data)
    setTodos(alldata[3].data)
    setAlbums(alldata[4].data)
  }))
  .catch(error=>console.log(error))

},[])

const postdet=(id)=>{
  return post.filter(ele=>ele.userId===id).length
}
const todo=(id)=>{
  return todos.filter(ele=>ele.userId===id).length
}
const commentdet=(id)=>{
  const comm= comments.filter(ele=>ele.postId===id).length
  const posts=post.filter(ele=>ele.userId===id).length
  return comm*posts
}
const pending=(id)=>{
 return todos.filter(ele=>ele.userId===id && !ele.completed).length
}
const complete=(id)=>{
  return todos.filter(ele=>ele.userId===id && ele.completed).length
}

const album=(id)=>{
  return albums.filter(ele=> ele.userId===id).length
}

return (
	<div style={{ display: "block", padding: 30,fontSize:'18px' }}>
	 <table width='1000px' border="1px solid black" style={{borderCollapse:'collapse'}}>
            <tr>
                <th>S/No.</th>
                <th>Company Name</th>
                <th>Person Name</th>
                <th >Details</th><th>Actions</th>
            </tr>
            
                {user.map((item,index)=>{
                  return(
                   <tr key={item.id}>
                    <td style={styles.AlignText}>{item.id}</td>
                    <td style={styles.AlignText}>{item.company.name}</td>
                    <td style={styles.AlignText}>{item.name}</td>
                    <td>
                    name: {item.name}<br></br>
                    username: {item.username}<br></br>
                    email: {item.email}
                    <br></br>
                    street: {item.address.street}
                    <br></br>
                    suite: {item.address.suite}
                    <br></br>
                    city: {item.address.city}
                    <br></br>
                    zipcode: {item.address.zipcode}
                    <br></br>
                    latitude: {item.address.geo.lat}
                    <br></br>
                    longitude: {item.address.geo.lng}
                    <br></br>
                    phone: {item.phone}
                    <br></br>
                    website: {item.website}
                    <br></br>
                    catchPhrase: {item.company.catchPhrase}
                    <br></br>
                    bs: {item.company.bs}
                    </td>
                    <td style={styles.cellwidth}>
                    <Link to={`/post?userId=${item.id}`} className='Link'>Post({postdet(item.id)})</Link>
                    <br></br>
                    <Link to={`/comment/?userId=${item.id}`} className='Link'>Comments({commentdet(item.id)})</Link>
                    <br></br>
                    <Link to={`/todo?userId=${item.id}`} className='todo'> Todos({todo(item.id)})</Link>
                    <br></br>
                    <Link to={`/pendingtodo?userId=${item.id}`} className='pending'> Pending Todos({pending(item.id)})</Link>
                    <br></br>
                    <Link to={`/completetodo?userId=${item.id}`} className='complete'>Completed Todos({complete(item.id)})
                    </Link>
                    <br></br>
                    <Link to={`/album?userId=${item.id}`} className='Link'>
                    Albums ({album(item.id)})
                    </Link>
                    </td>
                    </tr>
                  )
                })}

        </table>
	</div>
);
}

const styles={
  AlignText:{
    textAlign:'center'
  },
  cellwidth:{
    width:'18%',
    textAlign:'center'
  }
}


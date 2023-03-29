import React,{useEffect,useState} from "react";
import axios from "axios";
export default function Albums()
{
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('userId');
    const api=[
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`),
      axios.get('https://jsonplaceholder.typicode.com/albums'),
      axios.get('https://jsonplaceholder.typicode.com/photos')
    ]
    const [user,setUser]=useState([])
    const [albumns,setAlbums]=useState([])
    const [photos,setPhotos]=useState([])
    useEffect(()=>{
      axios.all(api)
      .then(axios.spread((...alldata)=>{
            setUser(alldata[0].data)
            setAlbums(alldata[1].data)
            setPhotos(alldata[2].data)
      }))
    },[]);
    const singleal=albumns.filter(ele=>ele.userId===user.id)
    
    return(
      <div style={{ display: "block", padding: 30,fontSize:'18px',justifyContent:'center',alignItems:'center' }}>
      <h2 style={{textAlign:'center',marginBottom:'50px',textDecorationLine:'underline'}}>Albums Details</h2>
      <p style={{textAlign:'center',marginBottom:'50px'}}>Name: {user.name}</p>
    {
      singleal.map((item)=>{
        const photo=photos.filter(ele=>ele.albumId===item.id)
        return(
          <div style={{display:'flex',flexDirection:'row'}}>
             <h1 style={{marginRight:'100pt'}}>Album No: {item.id}</h1>
         {photo.map((item2)=>{
          return (
            <div  >
              
                <div style={{flex:1}}>
                  <img src={item2.url} alt="Photos" width="500" height="300" style={{padding:3}}></img>
                  </div>  
                  
              </div>
          )
         })}
          </div>
        )
      })
    }
   </div>
    )
}
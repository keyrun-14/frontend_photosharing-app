
import React, { useState } from 'react'
import {  Link } from "react-router-dom";
import "../css/postpage.css"

const UpdatePostPage = () => {
  const [postDetails,setPostDetails]=useState({
    image:"",name:"",location:"",description:""
  });
  function handle(e){
     const dataFromInputFields={...postDetails }
     dataFromInputFields[e.target.id]=e.target.value
     setPostDetails(dataFromInputFields)
     console.log(dataFromInputFields)  
  } 
  function posting(id){
    console.log(postDetails)
    // e.preventDefault();
    fetch("http://localhost:9000/posts"+id,{
      method:"PUT",
      mode: 'cors',
      headers:{"content-Type":"application/json",'Access-Control-Allow-Origin':'*'},
      body:JSON.stringify(postDetails)
    }).then((res)=>console.log(res)).catch(e=>console.log(e))
    window.location.replace("http://localhost:3000/Postview");
  }
  return (
    <div className='post-form-container'>
        <form className='post-details-form' onSubmit={(e)=>posting(e)}>
          <div >
          <input onChange={(e)=>handle(e)} value={postDetails.image} className='postpage-input-fields' placeholder='select' id="image" type="file" required></input>
          </div>
          <div>
          <input onChange={(e)=>handle(e)} value={postDetails.name} className='postpage-input-fields' type="text" id="name" placeholder='name to be updated' required></input>
          </div>
          <div>
          <input onChange={(e)=>handle(e)} value={postDetails.location} className='postpage-input-fields' type="text" id="location"  placeholder='Location to be updated'></input>
          </div>
          <div>
          <input onChange={(e)=>handle(e)} value={postDetails.description} className='postpage-input-fields' type="text" id="description" placeholder='Description to be updated'></input>
          </div>
          <button>UPDATE</button>          
        </form>
    </div>
  )
}
export default UpdatePostPage




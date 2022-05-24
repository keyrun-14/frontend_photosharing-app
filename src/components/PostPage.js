
import React, { useState } from 'react'

import "../css/postpage.css"
import Header from './Header';

const PostPage = () => {
  const [postDetails,setPostDetails]=useState({
    image:"",name:"",location:"",description:""
  });
  function handle(e){
     const dataFromInputFields={...postDetails }
     dataFromInputFields[e.target.id]=e.target.value
     setPostDetails(dataFromInputFields)
     console.log(dataFromInputFields)  
  } 
 
  // function posting(e){
  //   const formdata= new FormData(e.target)
  //   formdata.set("image",formdata.get("image"))
  //   formdata.set("name",formdata.get("name"))
  //   formdata.set("location",formdata.get("location"))
  //   formdata.set("description",formdata.get("description"))
  //   console.log(formdata)
  //   // e.preventDefault();
  //   fetch("http://localhost:9000/posts",{
  //     method:"POST",
  //     mode: 'cors',      
  //     headers:{"content-Type":"application/json",'Access-Control-Allow-Origin':'*'},
  //     body:formdata
  //   }).then((res)=>console.log(res)).catch(e=>console.log(e))
  //   window.location.replace("http://localhost:3000/Postview");
  // }
  // function posting(e){
  //   console.log(e+"error")

  //   e.preventDefault();
  //   fetch("http://localhost:9000/posts",{
  //     method:"POST",
  //     mode: 'cors',      
  //     headers:{"content-Type":"application/json",'Access-Control-Allow-Origin':'*'},
  //     body:JSON.stringify(postDetails)
  //   }).then((res)=>console.log(res)).catch(e=>console.log(e))
  //   window.location.replace("http://localhost:3000/Postview");
  // }

  const posting = async (e) => {
    e.preventDefault();
      const image = e.target.elements.image.value;
      const name = e.target.elements.name.value;
      const description = e.target.elements.description.value;
      const location = e.target.elements.location.value;
      const date = String(new Date());
        const formData = new FormData();
        formData.append("name", name);
        formData.append("location", location);
        formData.append("description", description);
        const file = e.target.elements.image.files[0];
        console.log(file,"------>")
        formData.append("image", file);
        formData.append("date", date);
    await fetch("https://photoshareapp007.herokuapp.com/posts", {
          method: "POST",
          headers: {},
          body: formData,
        }).then(res=>console.log(res))
        window.location.replace("/Postview");
      } 
  // useEffect(() => {
  //   axios.get('http://localhost:9000/posts')
  //   .then(response =>{ console.log(response.data)
  //   setData(response.data)
  //   });
  // }, []);  
  return (<>
<Header/>
  <div className='post-form-container'>
        <form encType="multipart/form-data" className='post-details-form' onSubmit={(e)=>posting(e)}>
          <div >
          <input onChange={(e)=>handle(e)} value={postDetails.image} className='postpage-input-fields' name='image' placeholder='select' id="image" type="file" required></input>
          </div>
          <div>
          <input onChange={(e)=>handle(e)} value={postDetails.name} className='postpage-input-fields' name="name" type="text" id="name" placeholder='name' required></input>
          </div>
          <div>
          <input onChange={(e)=>handle(e)} value={postDetails.location} className='postpage-input-fields' name='location' type="text" id="location"  placeholder='Location'></input>
          </div>
          <div>
          <input onChange={(e)=>handle(e)} value={postDetails.description} className='postpage-input-fields' name='description' type="text" id="description" placeholder='Description'></input>
          </div>
          <button>Post</button>          
        </form>
    </div>
  </>
    
  )
}
export default PostPage




 // function posting(e){
  //   e.preventDefault();
  //   axios.post("http://localhost:8000/posts",{
  //     name:postDetails.name,
  //     image:postDetails.image,
  //     location:postDetails.location,
  //     description:postDetails.description
  //   }).then(res=>console.log(res))
  // }
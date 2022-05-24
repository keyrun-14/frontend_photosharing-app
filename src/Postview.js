import React, { useEffect, useState } from "react";
import {  Link } from "react-router-dom";
import axios from "axios"
import Header from "./components/Header";
import "./Postview.css";

const Postview = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  
  // const fetchURL = "http://localhost:3004/Data";
  // const getData = async () => {
  //   const response = await fetch(fetchURL);
  //   const data = await response.json();
  //   setData(data);
  //   console.log(data);
  // };
  useEffect(() => {
    axios.get('https://photoshareapp007.herokuapp.com/')
    .then(response =>{ console.log(response.data)
    setData(response.data)
    });
    // getData();
  }, []);  
  function deletepost(id){
    fetch("https://photoshareapp007.herokuapp.com/"+id,{
      method:"DELETE",
      mode: 'cors',
      headers:{"content-Type":"application/json",'Access-Control-Allow-Origin':'*'}
     
    }).then((res)=>console.log(res)).catch(e=>console.log(e))
    window.location.replace("/Postview");
  }
  // function editing(id){
  //   fetch("http://localhost:9000/posts"+id,{
  //     method:"PUT",
  //     mode: 'cors',
  //     headers:{"content-Type":"application/json",'Access-Control-Allow-Origin':'*'},
  //     body:JSON.stringify(postDetails)
  //   }).then(()=>renderIntoDocument("/Postview")).catch(e=>console.log(e))
  // }
  return (
    
    <div className="site-container">
      <Header />
      <div className="full-body">
        {data.map((user) => (     
     
          <div className="postview">
               
            <div className="user">
              <div>
                <h2 className="username">{user.name}</h2>
                {user.location}
              </div>
              <p className="three-dots">
                <svg
                  aria-label="More options"
                  class="_8-yf5 "
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <circle cx="12" cy="12" r="1.5"></circle>
                  <circle cx="6" cy="12" r="1.5"></circle>
                  <circle cx="18" cy="12" r="1.5"></circle>
                </svg>
                <ul className="edit-delete">
                  {/* <li><Link to="/edit" >edit</Link></li> */}
                  <li onClick={()=>deletepost(user._id)}>delete</li>
                </ul>
              </p>
            </div>
            <div className="post">
              <div>
                <img src={"https://photoshareapp007.herokuapp.com/"+user.image} alt="image"></img>
              </div>
            </div>
            <div className="like-share">
              <div
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                <svg
                  aria-label="Like"
                  class="_8-yf5 "
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
                </svg>
              </div>
              <div>
                <svg
                  aria-label="Share Post"
                  class="_8-yf5 "
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <line
                    fill="none"
                    stroke="currentColor"
                    stroke-linejoin="round"
                    stroke-width="2"
                    x1="22"
                    x2="9.218"
                    y1="3"
                    y2="10.083"
                  ></line>
                  <polygon
                    fill="none"
                    points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                    stroke="currentColor"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></polygon>
                </svg>{" "}
              </div>
              <div>{user.date}</div>
            </div>
            <div className="likes">{count + user.likes} likes</div>
            <div className="description">
              <b>{user.description}</b>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Postview;

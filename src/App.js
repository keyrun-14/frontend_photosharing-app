import {BrowserRouter, Route,Routes} from "react-router-dom";
import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Postview from "./Postview"
import PostPage from "./components/PostPage";
import UpdatePostPage from "./components/UpdatePostPage";

function App() {
  return (
    <div className="App">
        
    
      <BrowserRouter>
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register />} />
          <Route path="/Postview" element={<Postview />} />
          <Route path="/posts" element={<PostPage />} />
          <Route path="/edit"  element={<UpdatePostPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

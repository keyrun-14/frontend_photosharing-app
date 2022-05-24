import React from 'react'
import cam from "./cam.svg"
import {  Link } from "react-router-dom";
const Header = () => {
  return (
    <div className='heading-instaclone'>
        <div className='app-name-insta'>&#127744;<b>Instaclone</b></div>
        <div className='cam-icon'>
          <Link to="/posts"><img className='cam-img' src={cam} alt='cam'></img></Link>
        </div>
    </div>
  )
}

export default Header
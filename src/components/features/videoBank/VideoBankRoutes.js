import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './home';


function VideoBankMain() {
  return (
   <Routes>
 <Route path="/" element={<Home/>} />
    </Routes>
  )
}

export default VideoBankMain;
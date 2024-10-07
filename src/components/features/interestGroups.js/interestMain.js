import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './home';
import CreateMain from './createMain';


function InterestMain() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:groupId" element={<CreateMain/>}/>
      </Routes>
    );
}

export default InterestMain

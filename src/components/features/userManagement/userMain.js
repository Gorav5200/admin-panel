import React from 'react'
import { Routes, Route } from "react-router-dom";
import UserDetail from './userDetail';
import UserList from './userList';
import AddUser from './addUser';


function UserMain() {
  return (
   <Routes>
      <Route path="add" element={<AddUser/>} />
      <Route path="edit/:uid" element={<AddUser/>} />
      <Route path="detail/:uid" element={<UserDetail/>} />
      <Route path="/" element={<UserList/>} />
    </Routes>
  )
}

export default UserMain;
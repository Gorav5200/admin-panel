import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../common/header';
import { useSelector } from 'react-redux';

   
function Main() {
  const {userInfo} = useSelector(state => state.users)
  return (
    <>
      <Header content={`Hi ${userInfo.name}, Welcome`}/>
      <Outlet/>
    </>
  );
}

export default Main
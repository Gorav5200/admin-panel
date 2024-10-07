import React, { useEffect, useLayoutEffect } from 'react'
import Header from '../../../common/header'
import CollapsibleTable from '../../../common/collapsibleTable'
import { useDispatch } from 'react-redux';
import { resetDrawer } from '../../../../ducks/drawerSlice';


function ExamList({examList}) {
  console.log("examList:",examList);
  const dispatch = useDispatch();

 
   return(
    <div className="h-screen overflow-scroll ">
    <Header content={"Overview"} />
   
    <div className="bg-white p-3 m-2 rounded-md  ">
      
     <CollapsibleTable examList={examList}/>
     {/* <CollapsibleDataGrid/> */}
     </div>
  </div>
   )

  
}

export default ExamList;

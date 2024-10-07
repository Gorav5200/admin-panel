import React, { useEffect, useState } from 'react'
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Divider, IconButton, CardActionArea, Tooltip, Skeleton } from '@mui/material';
import {  LocationOn } from '@mui/icons-material';

import Header from '../../common/header';
import { dateFormatting, dateFormattingString, truncateTitle } from '../../../services/common';
import { useGetEventListQuery } from '../../../services/apis/eventApi';
import { eventApi } from '../../../services/Constant';
import DetailModal from './detailModal';
import { CustomButton,CustomButtonStyle } from '../../../styles/muiRoot';
import { useNavigate } from 'react-router-dom';
import { resetEvent } from '../../../ducks/eventSlice';
import { useDispatch } from 'react-redux';
import { Empty } from 'antd';

function HomePage() {
const navigate=useNavigate();
const dispatch = useDispatch();
  const{details,isLoading,isError,isFetching,isSuccess}=useGetEventListQuery(`${eventApi.endPoint}/list`,{
    refetchOnMountOrArgChange:true,
    selectFromResult:({data,isLoading,isError})=>{
   if(!isLoading && !isError && data){
    return {details:data.data}
   }
   return {}
    }
  });
useEffect(() => {
  dispatch(resetEvent());
}, [])

  console.log("🚀 ~ HomePage ~ data:", details)
  return (
    <div className="w-full h-screen ">
      <Header content={"Events "} />
      <div className="bg-white p-3 m-2 ">
        <div className=" p-2 flex justify-between items-center ">
          <h2 className="text-xl font-inter font-semibold">All Events</h2>
          <CustomButton
            sx={{ ...CustomButtonStyle, borderRadius: 2 }}
            disabled={isLoading || isFetching}
            onClick={() => navigate(`/main/events/create`)}
          >
            + Create Event
          </CustomButton>
        </div>
        <Divider />
        <br />
        <div
          className= "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[80vh]  overflow-scroll"
          
        >
          {isLoading || isFetching ? (
            Array.from({ length: 20 }).map((_, ind) => (
              <div key={ind} className="skeleton-card ">
                <Skeleton variant="rounded" width={"100%"} height={168} />
                <Skeleton height={78} />
              </div>
            ))
          ) :isSuccess && details?.length === 0 ? (
            <div className="flex justify-center items-center  h-[80vh]  ">
              <Empty
                description="No Data Found"
                className="text-center"
              ></Empty>
            </div>
          ) : (
            details?.map((card, index) => <MuiCard key={index} {...card} />)
          )}
        </div>
      </div>
    </div>
  );
}

const MuiCard = ({ title, description, thumbnail, address, date, _id }) => {

  return (
    <>
      <Card sx={{width: 345, height: "35ch" }}>
        <CardMedia
          component="img"
          sx={{ height: "15ch" }}
          image={thumbnail}
          alt={title}
        />
        <CardContent className='relative '>
          <h6 className='text-orange-500 font-inter text-sm'>Event</h6>
          <h5 className='font-inter text-xl font-semibold '>
            {truncateTitle(title, 4)}
          </h5>
          <h5 className='font-inder text-base text-gray-800 my-1'>
            {dateFormattingString(date)}
          </h5>
          <Divider />
          {address && <address className='my-2 text-sm bg-medGrey p-1 rounded-md'>
            <LocationOn /> {address}
          </address>}
          <p className='font-inder text-xs text-gray-700 font-medium my-1 h-[30px] overflow-hidden'>
        
        <Tooltip title={description} placement='top'>
        {truncateTitle(description, 10)}
        </Tooltip>
          </p>
        </CardContent>
        <CardActions>
          <div className='ml-auto'>
            <DetailModal id={_id} />
          </div>
        </CardActions>
      </Card>
    </>
  );
};

export default HomePage
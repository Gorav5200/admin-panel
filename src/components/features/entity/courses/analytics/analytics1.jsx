import React from 'react'
import { Stack, Typography } from '@mui/material';
import AnalyticsGraph1 from './analyticsgraph1';

const Analytics1 = () => {
    return (
        <>
        <Stack direction={"row"} spacing={1} justifyContent={"space-between"} sx={{marginTop:"30px"}}>
        <Stack direction={"column"} spacing={1} padding={"10px"}>
            <Typography variant='h6' sx={{fontWeight:"700"}}>18-24</Typography>
            <Typography variant='subtitle2'>Average Age Group</Typography>
            <Typography variant='h6' sx={{fontWeight:"700"}}>2,585</Typography>
            <Typography variant='subtitle2'>Tatal Male</Typography>
            <Typography variant='h6' sx={{fontWeight:"700"}}>1,020</Typography>
            <Typography variant='subtitle2'>Tatal Female</Typography>
        </Stack>
       <AnalyticsGraph1 />
        </Stack>
        </>
    )
}

export default Analytics1

import { Box, Card, CardActionArea, CardContent, Chip, Divider, Stack, Tooltip } from '@mui/material'
import React from 'react'
import { HTMLConverter, dateFormatting, truncateTitle } from '../../../../../../services/common'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function ImportantNews() {
  const navigate = useNavigate();
  const {importantNews}= useSelector(state => state.examSpecification.viewDetails)
  console.log("🚀 ~ ImportantNews ~ importantNews:", importantNews)
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 overflow-scroll h-[calc(100vh-20vh)] p-8">
    {importantNews &&
        importantNews?.map(
          ({ blogId, description, _id, createdAt, title ,thumbnail}) => (
            <Card
              key={_id}
              sx={{
                maxWidth: 345,
                minWidth: 345,
                height: "max-content",
              }}
            >
            
                <CardContent
                  component="div"
                  alt="green iguana"
                  sx={{
                    height: "13em",
                    p: 0,
                    position: "relative",
                
                    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${"/backgroundImages/Thumbnail.png"})`,
                          objectFit: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                  }}
                >
                  <Stack
                    className="absolute bottom-2 w-full overflow-scroll scrollbar-hide scrroll-smooth"
                    spacing={2}
                    direction="row"
                    pe={1}
                  
                    
                  >
                    <Box component="div" className='marquee'
                       
                        sx={{bgcolor: "#000000BF", color: "whitesmoke",width:"fit-content" ,height:"auto",whiteSpace: 'nowrap',p:0.5, borderRadius:3,fontSize:12}}
                      >
                   {blogId?.title}
                      </Box>
                  </Stack>
                </CardContent>

                <Divider />
                <CardContent sx={{ p: 1 }}>
                <Tooltip title={title} arrow>
                  <h5 className="font-semibold text-xl mb-1">
                    {" "}
                    {truncateTitle(title, 4)}
                  </h5>
                  </Tooltip>
                  <Tooltip title={description} arrow>
                  <p className="font-inder text-left text-sm ">
                 <HTMLConverter>
                 {truncateTitle(description, 14)}
                 </HTMLConverter>
                  </p>
                  </Tooltip>
                </CardContent>
                <br />
                <small className="text-gray-400 absolute bottom-0 right-0 m-3  ">
                  Created on {dateFormatting(createdAt)?.date}
                </small>
           
            </Card>
          )
        )}
  </section>
  )
}

export default ImportantNews
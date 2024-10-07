import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia } from '@mui/material';
import React from 'react'
import TruncateText from '../../../../../common/FunctionComponents/truncate';
import { CustomButtonStyle,ButtonStyle,CustomButton } from '../../../../../../styles/muiRoot';
import { useGetClassDoubtsQuery } from '../../../../../../services/apis/exam/class';
import { classApi } from '../../../../../../services/Constant';
import { useParams } from 'react-router-dom';
function ClassDoubts() {
const params=useParams();
  const{data,isLoading,isSuccess}=useGetClassDoubtsQuery(`${classApi.endPoint}/doubts`);
console.log("paramod doubt", params)
console.log("data form", data)

  return (
    <div>
    <div>

    </div>
    <div className='flex justify-start flex-wrap h-[80vh] overflow-scroll p-2 gap-5 '>
    {[...Array(20)].map(()=>(
      <Card
      sx={{
        // minWidth: "26em",
        fontFamily: "var(--font-inter)",
        borderRadius: 2,
        p: 1,
        width: "25em", 
        mx:"auto"
        
      }}
    >
      <CardHeader
        sx={{ m: 0, pb: 0 }}
        avatar={
          <Avatar
            alt="Remy Sharp"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCpj7w5FSVRyofzC1reh7jGN87NEmeCb7amwsyc2xEmjwv0cIYrR0MKpvzrCAKWgOOwiY&usqp=CAU"
            sx={{ width: 56, height: 56 }}
          />
        }
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            Preethi Bajaj
            <img src="/icons/WinnerStar.png"></img>
          </div>
        }
        subheader={"Id : 9999"}
       
      />

      <CardContent className="text-sm  font-inter font-[600] text-primary ">
      
        <p className="text-sm font-normal my-2 ">
          {" "}
   
            <TruncateText
              text="Help me with the solution to this question, If f(5 + x) = f(5 - x) for every real x and f(x) = 0 has four distinct real roots, then the sum of the roots is?"
              maxLength={133}
            />
         
        </p>

        <CardMedia
          component="img"
          sx={{
            height: 50,
            width:75,
            borderRadius: 2,
            my: 2,
          }}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCpj7w5FSVRyofzC1reh7jGN87NEmeCb7amwsyc2xEmjwv0cIYrR0MKpvzrCAKWgOOwiY&usqp=CAU"
          alt="Paella dish"
        />
        <h4 className="text-secondary">ASSIGNED TO:</h4>
        <p>
          Dev Rana{" "}
          <span className="text-red-600 font-normal ml-2 text-xs">
          •  10 mins back
          </span>
        </p>

       
      </CardContent>

      <CardActions>
     
          <CustomButton
  
            style={{
               ...CustomButtonStyle,
                borderRadius: 5,
                height: 40,
                width: 60,
                fontSize: 14,
                width: 108,
            }}
            onClick={() => alert()}
          >
            Re-Assign
          </CustomButton>
          <CustomButton
         
            style={{
               ...ButtonStyle,
                borderRadius: 5,
                height: 40,
                width: 60,
                fontSize: 14,
                width: 108,
            }}
            onClick={() => alert()}
          >
            Solve
          </CustomButton>

      </CardActions>

      <footer>
        <p className="text-right text-secondary text-xs">25 Jun</p>
      </footer>
      </Card>
    ))}

    </div>
    </div>
  )
}

export default ClassDoubts


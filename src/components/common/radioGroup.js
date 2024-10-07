import React from "react";
import RadioGroup from "@mui/material/RadioGroup";
import { CustomButton } from "../../styles/muiRoot";

export default function IconlessRadio({ data, style, row, setData , value ,...props}) {

const handleButtonClick = (value) => {
    // Set the selected value in the child component
    console.log("{{value=======>>>>}}}",value);
    setData(value)
  };
 
  return (
    <>
      
      <RadioGroup
        aria-labelledby="storage-label"
        value={value}
        size="large"
        sx={{ gap: style.rowGap }}
        row={row}
        {...props}
      //  defaultValue={data.defaultValue[0]}
        
      >
        {data?.map((item) => (
          <CustomButton
            disabled={props.readOnly ?true : false}
            key={item.value}
            sx={{
              p: 1.5,
              borderRadius: style.borderRadius,
              boxShadow: 2,
              cursor: "pointer",
              width: style.width,
              textAlign: "center",
              fontSize: style.fontSize,
              backgroundColor: value === item.value? "black" : "transparent", // Change background color when selected
              color: value === item.value ? "white" : "black", // Change text color when selected
              ":disabled": {
                backgroundColor: value === item.value? "black" : "transparent", // Change background color when selected
              color: value === item.value ? "white" : "black", // Change text color when selected
    }
            }}
            
            onClick={() => {
              if(props.disabled === false ){
                handleButtonClick(item.value)
              }else if(!props.disabled)(
                handleButtonClick(item.value)
              )
              else{
                return null
              }
            }}
          >
            {item.title}
          </CustomButton>
        ))}
      </RadioGroup>
    </>
  );
}

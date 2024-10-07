import React, { useEffect, useState } from "react";
import { Box, RadioGroup } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";

export default function MultipleSelect({ data, style, row, setData, dataSet }) {
 
  
  const handleCheckboxChange = (value) => {
    if (dataSet?.includes(value)) {
      setData(dataSet.filter((val) => val.toLowerCase() !== value));
    } else {
      setData([...(dataSet ?? []), value]);
    }
  };

  return (
    <RadioGroup
      aria-labelledby="storage-label"
      value={dataSet}
      size="large"
      
      sx={{ gap: style.rowGap }}
      row={row}
    >
      {data?.map((value) => (
        <Paper
          key={value}
          sx={{
            p: 1.5,
            borderRadius: style.borderRadius,
            boxShadow: 2,
            cursor: "pointer",
            width: style.width,
            textAlign: "center",
            fontSize: style.fontSize,
            backgroundColor: dataSet?.includes(value.toLowerCase()) ? "black" : "transparent", // Change background color when selected
            color: dataSet?.includes(value.toLowerCase()) ? "white" : "black", // Change text color when selected
          }}
          onClick={() => handleCheckboxChange(value?.toLowerCase())}
        >
          {value}
        </Paper>
      ))}
    </RadioGroup>
  );
}

  import * as React from "react";
  import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
  import { DatePicker } from "@mui/x-date-pickers/DatePicker";
  import dayjs from "dayjs";


  export default function DatePickerComp({ data, setData, DynamicName, style,...props }) {
    const handleDateChange = (date) => {
      setData(dayjs(date)?.format());
    };


    const formattedDate = dayjs(data).format("DD/MM/YYYY");

    return (
    
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={data ? dayjs.utc(data) : null}
          disabled={props.disabled ??false}
          helperText={props?.helperText}
          onChange={handleDateChange}
          name={DynamicName}
          format="DD/MM/YYYY"
          error={props.error}
          // noValidate
          sx={{
            width: "100%",
            "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
              fontSize: "16px",
              height: style?.height || "0.4375em",

              // Add other styles as needed
            },
            ...style,
          }}
          renderInput={(params) => (
            <input
        
              {...params}
              value={formattedDate || ""}
              helperText={
                dayjs(data).isBefore(dayjs(), "day")
                  ? "Selected date is in the past"
                  : ""
              }
            />
          )}
        />
      </LocalizationProvider>
    );
  }

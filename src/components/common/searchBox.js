import * as React from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress } from "@mui/material";

export default function InputWithIcon({
  placeholder,
  value,
  handleChange,
  ...props
}) {
  return (
    <Box sx={{ "& > :not(style)": { m: 0 } }}>
      <TextField
        id="input-with-icon-textfield"
        fullWidth
        size="small"
        placeholder={placeholder}
        autoComplete="off"
        disabled={props.loading || props.disabled}
        value={value}
        onChange={handleChange}
        {...props}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <div className="w-6">
                {props.loading ? (
                  <CircularProgress color="primary" size={15} />
                ) : (
                  <SearchIcon size={15} />
                )}
              </div>
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
    </Box>
  );
}

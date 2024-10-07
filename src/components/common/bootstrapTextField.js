import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { FormHelperText } from "@mui/material";

const BootstrapInput = styled(InputBase)(({ theme, error, size, style }) => ({
  "label + &": {
    marginTop: theme.spacing(4),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: style
      ? style.inputFieldBackground
      : theme.palette.mode === "light"
      ? "transparent"
      : "#1A2027",
    border: "1px solid black",
    borderColor: error
      ? "rgb(185 28 28)"
      : theme.palette.mode === "light"
      ? "#E0E3E7"
      : "#2D3843",
    fontSize: 16,
    width: "100%",
    padding: getInputPadding(size),
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.1rem`,
      borderColor: "black",
      color: "red",
    },
    "&:error": {
      borderColor: "red",
    },
  },
}));

const getInputPadding = (size) => {
  switch (size) {
    case "small":
      return "8.5px 12px";
    case "medium":
      return "12.5px 12px";
    case "large":
      return "16.5px 12px";
    default:
      return "8.5px 12px"; // medium
  }
};

function BootstrapTextField({ label, placeholder, ...props }) {
  console.log("🚀 ~ BootstrapTextField ~ props:", props);
  return (
    <>
      <FormControl variant="standard" sx={{ width: "100%" }}>
        <InputLabel
          shrink
          htmlFor="bootstrap-input"
          sx={{
            fontSize: 20,
            fontFamily: "var(--font-inter)",
            fontWeight: 500,
            color: "#455564",
            ...props.style,
          }}
        >
          {label}
        </InputLabel>

        <BootstrapInput
          id="bootstrap-input"
          placeholder={placeholder}
          value={props.value}
          {...props}
        />
        <FormHelperText sx={{ color: "rgb(185 28 28)" }}>
          {props?.helperText}
        </FormHelperText>
      </FormControl>
    </>
  );
}

export default BootstrapTextField;

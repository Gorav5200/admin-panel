import React from "react";
import React, { useRef, useState } from "react";
import { MuiTelInput } from "mui-tel-input";
import { Typography, Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { ButtonStyle } from "../../../styles/muiRoot";
import { Link, useNavigate } from "react-router-dom";

function SignUpWeb() {
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const refs = useRef([]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleInput = (e, index) => {
    const inputValue = e.target.value;
    setOtp((prevOtp) => {
      // Copy the previous OTP value
      const newOtp = [...prevOtp];

      // Update the OTP digit at the current index
      newOtp[index] = inputValue;

      return newOtp;
    });

    if (inputValue.length === 1 && index < 5) {
      refs.current[index + 1].focus();
    } else if (inputValue.length === 0 && index > 0) {
      refs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = () => {
    // Use the otp value as needed, e.g., send it to a server for verification
    console.log("Entered OTP:", otp.join(""));
  };

  return (
    <div className="flex items-center justify-center  h-full ">
      <div className="text-primary w-3/5  flex flex-col gap-2">
        <Typography variant="h3">Welcome to iQuanta</Typography>
        <div className="my-2">
          <label htmlFor="Mobile number" className="text-sm ms-1">
            Please enter your mobile number
          </label>
        </div>
        <MuiTelInput
          value={value}
          onChange={handleChange}
          defaultCountry="IN"
          fullWidth
        />
        <small className="text-secondary ms-1">
          {" "}
          We will send you an OTP code on this number for your verification
        </small>
        <div className="flex justify-between my-2  ">
          <label htmlFor="otp" className="text-sm ms-1">
            Enter OTP
          </label>
          <Link to="/" className="text-blue-800 text-xs">
            {" "}
            Resend OTP
          </Link>
        </div>
        <div className="flex space-x-6">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              type="text"
              id={`otp${index + 1}`}
              name={`otp${index + 1}`}
              className="w-12 h-12 text-center border border-gray-300 rounded"
              maxLength="1"
              autoComplete="off"
              ref={(el) => (refs.current[index] = el)}
              onChange={(e) => handleInput(e, index)}
            />
          ))}
        </div>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            borderRadius: 2,
            height: 48,
            textTransform: "none",
            ":disabled": { color: "white" },
          }}
          fullWidth
          disabled={true}
        >
          Confirmed
        </Button>
        <paragraph className="text-secondary text-sm m-2">
          By confirming, you are agreeing to all of our{" "}
          <b className="underline underline-offset-2">terms & conditions</b>
        </paragraph>
        <div class="flex items-center my-2 text-secondary">
          <div class="flex-grow bg-secondary h-px"></div>
          <div class="px-3 ">or </div>
          <div class="flex-grow bg-secondary h-px"></div>
        </div>
        <Link className="text-center  hover:text-blue-800  text-sm">
          {" "}
          Sign up with Email
        </Link>

        <Stack direction={"row"} justifyContent={"space-around"}>
          <Button sx={ButtonStyle} variant="outlined" startIcon={<FcGoogle />}>
            Google
          </Button>
          <Button
            sx={ButtonStyle}
            variant="outlined"
            startIcon={<FaFacebook color="#4267B2" />}
          >
            Facebook
          </Button>
          <Button
            sx={ButtonStyle}
            variant="outlined"
            startIcon={<AiOutlineMail color="#E56C51" />}
          >
            Mail
          </Button>
        </Stack>
        <paragraph className=" text-center text-sm m-2">
          Have an account ?
          <Link className="text-blue-800 ms-1" to={"/auth/signin"}>
            Sign in
          </Link>
        </paragraph>
      </div>
    </div>
  );
}

export default SignUpWeb;

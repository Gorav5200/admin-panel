import React, { useEffect, useRef, useState } from "react";

import { MuiTelInput } from "mui-tel-input";
import {
  Typography,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiLock, CiUnlock } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import {
  useAdminLoginEmailMutation,
  useAdminLoginPhoneMutation,
  useVerifyOtpMutation,
} from "../../../services/apis/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import isUserLoggedIn from "./isLoggedIn";
import { setUserInfo } from "../../../ducks/userSlice";
import { useDispatch } from "react-redux";
function SignIn() {
  const [signIn, setSignIn] = useState("email");
  return (
    <>
      {signIn === "email" ? (
        <SignInEmail signInType={setSignIn} />
      ) : (
        <SignInPhone signInType={setSignIn} />
      )}
    </>
  );
}

export default isUserLoggedIn(SignIn);

function SignInEmail({ signInType }) {
  const [showPassword, setShowPassword] = useState(false);
  const [adminLoginEmail] = useAdminLoginEmailMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
      .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await adminLoginEmail(values);
        if (result?.data?.success) {
          localStorage.setItem("token", result.data.accessToken);
          toast.success(result.data.message);
          dispatch(setUserInfo(result.data.userInfo));
          navigate("/main");
        } else {
          toast.error(result.error.data.message);
          navigate("/auth/signin");
        }
      } catch (error) {
        toast("Something went wrong");
        navigate("/auth/signin");
      }
    },
  });


  return (
    <div className="flex items-center justify-center  h-full ">
      <div className="text-primary w-3/5  flex flex-col gap-2">
        <div className="mb-7">
          <Typography variant="h3">Welcome to iQuanta</Typography>
          <small className="text-secondary ms-1">
            {" "}
            Enter your details to proceed further
          </small>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="login id" className="text-sm ms-1">
            Email{" "}
          </label>
          <div className="px-1">
            <TextField
              margin="dense"
              type="text"
              fullWidth
              id="outlined-multiline-flexible"
              name="email"
              value={formik.values.email}
              {...formik.getFieldProps("email")}
              error={formik.touched.email && formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
          <label htmlFor="password" className="text-sm ms-1">
            Password
          </label>
          <div className="px-1">
            <TextField
              fullWidth
              margin="dense"
              id="password"
              type={showPassword ? "text" : "password"}
              {...formik.getFieldProps("password")}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
              value={formik.values.password}
              name="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <CiUnlock /> : <CiLock />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="flex items-center justify-between text-secondary">
            <paragraph to="/" className="text-primary text-xs font-inter">
              {" "}
              <Checkbox
                checked={true}
                sx={{
                  color: "var(--primary)",
                  "&.Mui-checked": {
                    color: "var(--primary)",
                  },
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
              Remember me
            </paragraph>
            <Link
              to="/auth/forgot"
              className="text-primary text-xs font-inter underline"
            >
              {" "}
              Forgot password
            </Link>
          </div>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "var(--primary)",
              width: 178,
              height: 46,
              fontFamily: "var(--font-inter)",

              fontSize: 15,
              borderRadius: 2,
              textTransform: "none",
              my: 3,
              ":hover": {
                backgroundColor: "var(--primary)",
              },
            }}
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? <CircularProgress size={24} /> : " Log In"}
          </Button>
        </form>
        <Link
          onClick={() => signInType("phone")}
          className="underline hover:text-blue-800 m-2 text-sm"
        >
          {" "}
          Sign in with Phone Number
        </Link>
      </div>
    </div>
  );
}

function SignInPhone({ signInType }) {
const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const refs = useRef([]);

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

  //auth integration-----Phone
  const [adminLoginPhone] = useAdminLoginPhoneMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  // const [phoneNumber, setphoneNumber] = useState("");

  // const handleSendOtp = async () => {
  //   if (!phoneNumber || !/^\+91\d{10}$/.test(phoneNumber)) {
  //     toast.error('Please enter a valid phone number.');
  //     return;
  //   }
  //   try {

  //     const res = await adminLoginPhone({ phoneNumber });

  //     if (res?.data?.success === true) {

  //       toast(res.data.message);

  //       setAuth(true);
  //     }
  //     else {

  //       toast.error(res.error.data.message);
  //       setAuth(false);
  //     }

  //   } catch (error) {
  //     // console.log(error);
  //     // toast(error.error.data.message);
  //     // setAuth(false);
  //   }

  // }
  const initialValues = {
    phoneNumber: "",
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Please enter a valid phone number")
      .required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await adminLoginPhone({ phoneNumber: values.phoneNumber });

        if (res?.data?.success === true) {
          toast(res.data.message);
          setAuth(true);
        } else {
          toast.error(res.error.data.message);
          setAuth(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleVerifyOtp = async () => {

    const enteredOtp = otp.join("");
    if (!enteredOtp || !/^\d{6}$/.test(enteredOtp)) {
      toast.error("Please enter a valid OTP.");
      return;
    }
    try {
      const otpRes = await verifyOtp({
        phoneNumber: formik.values.phoneNumber,
        otp: enteredOtp,
      });

      if (otpRes?.data?.success === true) {
         dispatch(setUserInfo(otpRes.data.userInfo));
        localStorage.setItem("token", otpRes.data.accessToken);
        toast(otpRes.data.message);
        navigate("/main");
      } else {
        toast.error(otpRes.error.data.message);
      }
    } catch (error) {}
  };

  const handleResentOtp = async (ee) => {
    ee.preventDefault();
    try {
      const resent = await adminLoginPhone({
        phoneNumber: formik.values.phoneNumber,
      });
      if (resent?.data?.success === true) {
        toast(resent.data.message);
      } else {
        toast.error(resent.error.data.message);
      }
    } catch (error) {
      // toast(error.error);
    }
  };
  return (
    <div className="flex items-center justify-center  h-full ">
      <div className="text-primary w-3/5  flex flex-col gap-2">
        <div className="mb-7">
          <Typography variant="h3">Welcome to iQuanta</Typography>
          <small className="text-secondary ms-1">
            {" "}
            Enter your details to proceed further
          </small>
        </div>
        {auth === false ? (
          <>
            <form onSubmit={formik.handleSubmit}>
              <div className="my-2">
                <label htmlFor="Mobile number" className="text-sm ms-1">
                  Please enter your mobile number
                </label>
              </div>
              {/* <MuiTelInput
              value={number}
              onChange={handleChange}
              defaultCountry="IN"
              fullWidth
              name="phoneNumber"

            /> */}
              <TextField
                id="outlined-basic"
                label="Mobile Number"
                variant="outlined"
                fullWidth
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
              <small className="text-secondary ms-1">
                {" "}
                We will send you an OTP code on this number for your
                verification
              </small>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "var(--primary)",
                  width: 178,
                  height: 46,
                  fontFamily: "var(--font-inter)",
                  fontSize: 15,
                  borderRadius: 2,
                  textTransform: "none",
                  my: 3,
                  ":hover": {
                    backgroundColor: "var(--primary)",
                  },
                }}
                type="submit"
              >
                Send OTP
              </Button>
            </form>
          </>
        ) : (
          <>
            <div className="flex justify-between my-2  ">
              <label htmlFor="otp" className="text-sm ms-1">
                Enter OTP
              </label>
              <Button
                className="text-blue-800 text-xs"
                onClick={handleResentOtp}
              >
                {" "}
                Resend OTP
              </Button>
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
                backgroundColor: "var(--primary)",
                width: 178,
                height: 46,
                fontFamily: "var(--font-inter)",
                fontSize: 15,
                borderRadius: 2,
                textTransform: "none",
                my: 3,
                ":hover": {
                  backgroundColor: "var(--primary)",
                },
              }}
              onClick={handleVerifyOtp}
            >
              Sign In
            </Button>
          </>
        )}

        <Link
          onClick={() => signInType("email")}
          className="underline hover:text-blue-800  text-sm m-2"
        >
          {" "}
          Sign in with Email
        </Link>
      </div>
    </div>
  );
}

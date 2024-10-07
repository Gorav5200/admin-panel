import React from "react";
import { Typography, Button, TextField } from "@mui/material";
import { useAdminSignUpMutation } from "../../../services/apis/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

function SignUp() {
  const [adminSignUp] = useAdminSignUpMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phoneNumber: Yup.string()
        .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
        .required("Phone number is required"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await adminSignUp(values);
        if (result?.data?.success) {
          toast(result.data.message);
          navigate("/auth/signin");
        } else {
          toast.error(result.error.data.message);
        }
      } catch (error) {
        console.error("Signup error:", error);
        toast("An error occurred during signup");
      }
    },
  });

  return (
    <>
      <div className="flex items-center justify-center h-full">
        <div className="text-primary w-3/5 flex flex-col gap-2">
          <div className="mb-7">
            <Typography variant="h3">Welcome to iQuanta</Typography>
            <small className="text-secondary ms-1">
              {" "}
              Enter your details to proceed further
            </small>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="name" className="text-sm ms-1">
                Name{" "}
              </label>
              <TextField
                margin="dense"
                type="text"
                fullWidth
                id="name"
                {...formik.getFieldProps("name")}
                error={formik.touched.name && formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm ms-1">
                Email
              </label>
              <TextField
                margin="dense"
                type="email"
                fullWidth
                id="email"
                {...formik.getFieldProps("email")}
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="text-sm ms-1">
                Phone Number
              </label>
              <TextField
                margin="dense"
                type="text"
                fullWidth
                id="phoneNumber"
                {...formik.getFieldProps("phoneNumber")}
                error={formik.touched.phoneNumber && formik.errors.phoneNumber}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              />
            </div>
            <Button
              type="submit"
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
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;

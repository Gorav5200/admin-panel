import useCustomRouter from "../../../services/utilities/customRouter";


import { Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useRequestResetPasswordMutation } from "../../../services/apis/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Forgot() {
  const [requestResetPassword] = useRequestResetPasswordMutation();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await requestResetPassword({ email: values.email });

      if (result?.data?.success === true) {
        toast(result.data.message);
      } else {
        toast.error(result.error.data.error.message);
      }
    } catch (error) {
      // Handle error
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-full">
        <div className="text-primary w-3/5 flex flex-col gap-2">
          <div className="mb-7">
            <Typography variant="h3">
              Lost your password? Enter your details to recover.
            </Typography>
            <small className="text-secondary ms-1">
              {" "}
              Enter your details to proceed further
            </small>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <label htmlFor="email" className="text-md ms-1">
                  Email Id{" "}
                </label>

                <Field
                  as={TextField}
                  margin="dense"
                  type="email"
                  fullWidth
                  name="email"
                  id="email"
                  placeholder="Enter here"
                  error={!!errors.email && touched.email}
                  helperText={<ErrorMessage name="email" />}
                />

                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
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
                  Recover
                </Button>
              </Form>
            )}
          </Formik>
        </div>

      </div>
      <PasswordReset />
    </>
  );
}

export default Forgot;




function PasswordReset({ mailId }) {
  const { navigate } = useCustomRouter();
  return (
    <div className="flex items-center justify-center  h-full ">
      <div className="text-primary w-2/3  flex flex-col gap-2">
        <div className="p-3">
          <Typography variant="h3">Password Reset Mail Sent</Typography>
          <br />
          <small className="text-secondary mt-2 ">
            {" "}
            An e-mail has been sent to your rescue email address,
            J******123@mail.com, follow the directions in your e-mail to reset
            your password.
          </small>
        </div>

        <Button
          variant="contained"
          onClick={() => navigate("/auth/signin")}
          sx={{
            backgroundColor: "var(--primary)",
            width: 178,
            height: 46,
            fontFamily: "var(--font-inter)",
            fontSize: 15,
            borderRadius: 2,
            textTransform: "none",
            ml: 1,
            ":hover": {
              backgroundColor: "var(--primary)",
            },
          }}
        >
          Done
        </Button>
      </div>
    </div>
  );
}

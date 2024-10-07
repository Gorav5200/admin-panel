import React, { useEffect, useState } from "react";
import {
    Typography,
    Button,
    TextField,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { CiLock, CiUnlock } from "react-icons/ci";
import { useFormik } from "formik";
import * as yup from "yup";
import { useVerifyEmailMutation } from "../../../services/apis/auth";
import { useResetPasswordMutation } from "../../../services/apis/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Weak Password')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Password & Confirm Password Must Match!')
        .required('Confirm Password is required'),
});

function SetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [verified, setVerified] = useState(false);
    const [email, setEmail] = useState("");
    const [verifyEmail] = useVerifyEmailMutation();
    const [resetPassword] = useResetPasswordMutation();
    const navigate = useNavigate();

    useEffect(() => {
        const url = window.location.href;
        const parts = url?.split("/");

        const token = parts.pop() || parts.pop();
        const email = parts.pop() || parts.pop();
        const myEmail = atob(email);
        setEmail(myEmail)

        const fetchData = async () => {
            try {
                const response = await verifyEmail({ email, token });
                if (response?.data?.success) {
                    setVerified(true);
                } else {
                    toast.error("Verification Failed.");
                    navigate("/auth/signin");
                }
            } catch (error) {
                // Handle error
            }
        };

        fetchData();
    }, [verifyEmail]);

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await resetPassword({ email, newPassword: values.password, confirmPassword: values.confirmPassword });
                if (response?.data?.success) {
                    toast(response.data.message);
                    navigate("/auth/signin");
                } else {
                    toast.error(response.error.data.message);
                }
            } catch (error) {
                // Handle error
            }
        },
    });

    return (
        <>
            {verified && (
                <div className="flex items-center justify-center h-full">
                    <div className="text-primary w-3/5 flex flex-col gap-2">
                        <div className="mb-7">
                            <Typography variant="h3">Welcome to iQuanta</Typography>
                            <small className="text-secondary ms-1">
                                Enter your details to proceed further
                            </small>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <label htmlFor="password" className="text-sm ms-1">
                                    Password
                                </label>
                                <TextField
                                    fullWidth
                                    name="password"
                                    margin="dense"
                                    type={showPassword ? "text" : "password"}
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
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="text-sm ms-1">
                                    Confirm Password
                                </label>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    name="confirmPassword"
                                    type={showPassword ? "text" : "password"}
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
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                />
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
                            >
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default SetPassword;

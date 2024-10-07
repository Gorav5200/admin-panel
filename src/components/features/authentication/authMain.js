import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./signUp";
import SignIn from "./signIn";
import Forgot from "./forgot";
import Auth from "./auth";
import SetPassword from "./setPassword";
function AuthMain() {
  return (
    <Routes>
          <Route path="/" element={<Auth />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot" element={<Forgot />} />
          <Route path="forgot/verify/:email/:token" element={<SetPassword />} />
          </Route>
        
         
    </Routes>
  );
}

export default AuthMain;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from "./components/main";
import AuthMain from "./components/features/authentication/authMain";
import { ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";
import React from "react";
import { SnackbarProvider } from "notistack";
import { Fade } from "@mui/material";
import { messaging } from './firebase';
import { message } from "antd";
//import { getToken, onMessage } from 'firebase/messaging';
//import * as serviceWorkerRegistration from './serviceWorkerRegistration';
//import {socket} from './socket';

const App = () => {
  
  const [cookies] = useCookies(["token"]);
  const isAuthenticated = !!cookies.token;
;


  
  //console.log("cookies auth", useCookies(["token"]));
  // useEffect(() => {
  //   // Request permission to send notifications
  //   Notification.requestPermission().then((permission) => {
  //     if (permission === 'granted') {
  //       console.log('Notification permission granted.');
  //       // Get FCM token
  //       getToken(messaging, { vapidKey: 'AIzaSyCIPMWRndFxpyywkSD3uHNaKpc3DsvPQsA' }).then((currentToken) => {
  //         if (currentToken) {
  //           console.log('FCM Token:', currentToken);
  //           // Send the token to your server to save it and use it to send notifications
  //         } else {
  //           console.log('No registration token available. Request permission to generate one.');
  //         }
  //       }).catch((err) => {
  //         console.log('An error occurred while retrieving token. ', err);
  //       });
  //     } else {
  //       console.log('Unable to get permission to notify.');
  //     }
  //   });

  //   // Handle incoming messages
  //   onMessage(messaging, (payload) => {
  //     console.log('Message received. ', payload);
  //     // Show notification or handle the message
  //   });
  // }, []);


  // const isAuthenticated = verifyToken(cookies.token);


  
  return (
    <Router>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        autoHideDuration={1200}
        maxSnack={3}
        TransitionComponent={Fade} // Add the Slide transition
        TransitionProps={{
          direction: "up", // Specify the direction of the slide
        }}
        classes={{
          root: "snackbar-root", // Add your custom class here
          anchorOriginBottomRight: "snackbar-bottom-right", // Add custom class for anchor origin
        }}
        SnackbarContentProps={{
          className: "snackbar-content", // Add your custom class for Snackbar content
        }}
      >
        <ToastContainer />

        <Routes>
          <Route path="/auth/*" element={<AuthMain />} />
          <Route path="/main/*" element={<Main />} />
        </Routes>
      </SnackbarProvider>
    </Router>
  );
};

export default App;

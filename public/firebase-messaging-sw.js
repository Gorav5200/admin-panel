// // public/firebase-messaging-sw.js
// importScripts('https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/9.8.4/firebase-messaging.js');

// const firebaseConfig = {
//     apiKey: "AIzaSyAGpHLkgq5rvvtk5HLlPwRq-YATdwRyeEo",
//     authDomain: "iverse-b36c2.firebaseapp.com",
//     projectId: "iverse-b36c2",
//     storageBucket: "iverse-b36c2.appspot.com",
//     messagingSenderId: "529813189910",
//     appId: "1:529813189910:web:799f531b9cc5fd2680cc37",
//     measurementId: "G-L8GT7435S7"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();

// // Handle background messages
// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: '/firebase-logo.png'
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

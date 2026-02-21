importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBLwrmWAGQx0he9mEsyNhV_bmpGMDkWh98",
  authDomain: "pet-adoption-ccbbc.firebaseapp.com",
  projectId: "pet-adoption-ccbbc",
  storageBucket: "pet-adoption-ccbbc.firebasestorage.app",
  messagingSenderId: "218049514296",
  appId: "1:218049514296:web:ed84c0393720c140b48fcd",
  measurementId: "G-T0WTTYF0SJ"
});

// ✅ Define messaging properly
const messaging = firebase.messaging();

// ✅ Background Notification
messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification?.title || " Notification Title! ";
  const notificationOptions = {
    body: payload.notification?.body || " Notification Body! ",
    icon: payload.notification?.image || "/logo121.jpg",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
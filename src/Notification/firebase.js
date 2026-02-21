// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBLwrmWAGQx0he9mEsyNhV_bmpGMDkWh98",
  authDomain: "pet-adoption-ccbbc.firebaseapp.com",
  projectId: "pet-adoption-ccbbc",
  storageBucket: "pet-adoption-ccbbc.firebasestorage.app",
  messagingSenderId: "218049514296",
  appId: "1:218049514296:web:ed84c0393720c140b48fcd",
  measurementId: "G-T0WTTYF0SJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

export const requestForToken = async () => {
  const permission = await Notification.requestPermission();
  console.log("permission ", permission);
  if (permission === "granted") {
    console.log("Notification permission granted");
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
    });
    console.log("FCM Token:", token);
    return token;
  }
};

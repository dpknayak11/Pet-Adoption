import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
    apiKey: "AIzaSyBLwrmWAGQx0he9mEsyNhV_bmpGMDkWh98",
  authDomain: "pet-adoption-ccbbc.firebaseapp.com",
  projectId: "pet-adoption-ccbbc",
  storageBucket: "pet-adoption-ccbbc.firebasestorage.app",
  messagingSenderId: "218049514296",
  appId: "1:218049514296:web:ed84c0393720c140b48fcd",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 🔔 Get Token
export const requestForToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission denied");
      return null;
    }

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    console.log("FCM Token:", token);
    return token;
  } catch (error) {
    console.log("Error getting token:", error);
    return null;
  }
};
// 🔔 Foreground Notification Listener
export const onMessageListener = (callback) => {
  onMessage(messaging, (payload) => {
    callback(payload);
  });
};
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBLwrmWAGQx0he9mEsyNhV_bmpGMDkWh98",
  authDomain: "pet-adoption-ccbbc.firebaseapp.com",
  projectId: "pet-adoption-ccbbc",
  storageBucket: "pet-adoption-ccbbc.firebasestorage.app",
  messagingSenderId: "218049514296",
  appId: "1:218049514296:web:ed84c0393720c140b48fcd",
});

// ✅ Define messaging properly
const messaging = firebase.messaging();

// ✅ Background Notification
messaging.onBackgroundMessage(function (payload) {
  console.log("Background message:", payload);

  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/logo121.jpg",
      badge: "/logo121.jpg",
    }
  );
});
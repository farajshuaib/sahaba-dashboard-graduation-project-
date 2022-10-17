// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBTvCFtIg0A_JTokDcMWtMxxGdt60ztP6s",
    authDomain: "sahaba-fc030.firebaseapp.com",
    projectId: "sahaba-fc030",
    storageBucket: "sahaba-fc030.appspot.com",
    messagingSenderId: "177856090714",
    appId: "1:177856090714:web:a302bc1e93032d7ec77e63",
    measurementId: "G-PBJ1EWM5NN"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/favicon.ico",
    };

    // eslint-disable-next-line no-restricted-globals
    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});
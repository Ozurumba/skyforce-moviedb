
importScripts('./assets/js/firebase-app.js');
importScripts('./assets/js/firebase-messaging.js');

firebase.initializeApp({
    'messagingSenderId': '514143393930'
});

const messaging = firebase.messaging();

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js',
);

try {
  // Initialize the Firebase app in the service worker by passing in
  // your app's Firebase config object.
  // https://firebase.google.com/docs/web/setup#config-object
  // firebase.initializeApp({
  // });
  // Retrieve an instance of Firebase Messaging so that it can handle background
  // messages.
  // if (firebase.messaging.isSupported()) {
  //   const messaging = firebase.messaging();
  //   messaging.setBackgroundMessageHandler(function (payload) {
  //     console.log(
  //       '[firebase-messaging-sw.js] Received background message ',
  //       payload,
  //     );
  //     const notificationTitle = payload.data.title;
  //     const notificationOptions = {
  //       body: payload.data.body,
  //       icon: '/firebase-logo.png',
  //     };
  //     return self.registration.showNotification(
  //       notificationTitle,
  //       notificationOptions,
  //     );
  //   });
  //   self.addEventListener('notificationclick', (event) => {
  //     console.log(event);
  //     return event;
  //   });
  // }
} catch (err) {
  console.log(err);
}

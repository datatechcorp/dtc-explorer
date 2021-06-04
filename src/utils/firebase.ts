import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/messaging';
import 'firebase/firestore';

function init(): void {
  try {
    firebase.initializeApp({
      apiKey: 'AIzaSyDBJ7EJXS-ouqWPl7gYqFvsIatlM-WVFHY',
      authDomain: 'amas-store.firebaseapp.com',
      databaseURL: 'https://amas-store.firebaseio.com',
      projectId: 'amas-store',
      storageBucket: 'amas-store.appspot.com',
      messagingSenderId: '1058477978658',
      appId: '1:1058477978658:web:a8419486c015778f5f067b',
      measurementId: 'G-0SXJ5GP3TV',
    });
    if (firebase.analytics.isSupported()) {
      firebase.analytics();
    }
    if (firebase.messaging.isSupported()) {
      firebase
        .messaging()
        .usePublicVapidKey(
          'BLK0c2mIqzKL8E7KtxCTMtbUSMB37282bbypp_Un-0-8piZcNrY9M8yc11jGdbCwDm-wGMu_iy_OynwLVgkoB_w',
        );
    }
  } catch (err) {
    console.log('Init firebase error', err);
  }
}

function getNotificationToken(): Promise<string | null> {
  if (!firebase.messaging.isSupported()) {
    return Promise.resolve(null);
  }
  return firebase
    .messaging()
    .requestPermission()
    .then(() => {
      return firebase.messaging().getToken();
    })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken;
      } else {
        // Show permission request.
        console.log(
          'Firebase: No Instance ID token available. Request permission to generate one.',
        );
        // Show permission UI.
        return null;
      }
    })
    .catch((err) => {
      console.log('Firebase: An error occurred while retrieving token. ', err);
      return null;
    });
}

function onMessage(callback): void {
  try {
    if (!firebase.messaging.isSupported()) {
      return;
    }
    firebase.messaging().onMessage(callback);
  } catch (err) {
    console.log('Firebase on message error', err);
  }
}

let newOrderForUserUnsubscribe;

function unsubscribeUserNewOrder(): void {
  try {
    if (newOrderForUserUnsubscribe) {
      newOrderForUserUnsubscribe();
      newOrderForUserUnsubscribe = null;
    }
  } catch (err) {
    console.log('Unsubscribe firebase error', err);
  }
}

function subscribeUserNewOrder(userId: string, callback): void {
  try {
    unsubscribeUserNewOrder();
    newOrderForUserUnsubscribe = firebase
      .firestore()
      .collection('orders')
      .where('user', '==', userId)
      .orderBy('createdAt', 'asc')
      .limitToLast(1)
      .onSnapshot((querySnapshot) => {
        const newOrders: any = [];
        querySnapshot.forEach((item) => {
          newOrders.push(item.data());
        });
        console.log('On new order', newOrders);
        if (newOrders.length > 0) {
          callback(newOrders[0]);
        }
      });
  } catch (err) {
    console.log('Firebase on message error', err);
  }
}

let orderStatusUnsubscribe;
function unsubscribeOrderStatus(): void {
  try {
    if (orderStatusUnsubscribe) {
      orderStatusUnsubscribe();
      orderStatusUnsubscribe = null;
    }
  } catch (err) {
    console.log('Unsubscribe firebase error', err);
  }
}

function subscribeOrderStatus(orderId: string, callback): void {
  try {
    console.log('Subscribe order status', orderId);
    orderStatusUnsubscribe = firebase
      .firestore()
      .collection('orders')
      .doc(orderId)
      .onSnapshot((snapshot) => {
        const order = snapshot.data();
        if (order) {
          callback(order);
        }
      });
  } catch (err) {
    console.log('Firebase on message error', err);
  }
}

let newExchangeCommandUnsubscribe;
function unsubscribeNewExchangeCommand(): void {
  try {
    if (newExchangeCommandUnsubscribe) {
      newExchangeCommandUnsubscribe();
      newExchangeCommandUnsubscribe = null;
    }
  } catch (err) {
    console.log('Unsubscribe firebase error', err);
  }
}

function subscribeNewExchangeCommand(callback): void {
  try {
    unsubscribeNewExchangeCommand();
    newExchangeCommandUnsubscribe = firebase
      .firestore()
      .collection('exchange')
      .orderBy('createdAt', 'asc')
      .limitToLast(1)
      .onSnapshot((querySnapshot) => {
        const newOrders: any = [];
        querySnapshot.forEach((item) => {
          newOrders.push(item.data());
        });
        console.log('On new command', newOrders);
        if (newOrders.length > 0) {
          callback(newOrders[0]);
        }
      });
  } catch (err) {
    console.log('Firebase on message error', err);
  }
}

export const firebaseUtils = {
  init,
  getNotificationToken,
  onMessage,
  subscribeUserNewOrder,
  unsubscribeUserNewOrder,
  subscribeOrderStatus,
  unsubscribeOrderStatus,
  subscribeNewExchangeCommand,
  unsubscribeNewExchangeCommand,
};

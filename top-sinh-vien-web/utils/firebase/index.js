import * as firebase from 'firebase';
import { localStorageSet } from '../helper';

class FirebaseHandler {
  constructor() {
    this.configs = {
      apiKey: process.env.FIREBASE_API_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
      messagingSenderId: process.env.FIREBASE_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    };
    this.app = null;
    this.messaging = null;
  }

  initialApp() {
    if (firebase.messaging.isSupported()) {
      this.app = firebase.initializeApp(this.configs);
      this.messaging = this.app.messaging();
      this.messaging.usePublicVapidKey(process.env.FIREBASE_MESSAGING_PUBLIC_KEY);
      this.askForGetNotification();
    } else return false;

  }

  async generateToken() {
    if (!this.messaging) return null;

    try {
      const token = await this.messaging.getToken();
      return token;
    } catch (e) {
      console.log(e);
    }
  }

  askForGetNotification() {
    Notification.requestPermission()
      .then(async permission => {
        if (permission === 'granted') {
          const token = await this.generateToken();
          if (token) localStorageSet(process.env.FIREBASE_TOKEN_KEY, token);
        }
        else
          console.log('Unable to get permission to notify.');
      })
      .catch(error => {
        console.log(error);
      });

  }
}

export default new FirebaseHandler();

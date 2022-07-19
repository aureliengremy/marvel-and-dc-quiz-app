import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "marvel-and-dc-quiz-2c0f0.firebaseapp.com",
  projectId: "marvel-and-dc-quiz-2c0f0",
  storageBucket: "marvel-and-dc-quiz-2c0f0.appspot.com",
  messagingSenderId: "750274098015",
  appId: "1:750274098015:web:cec93d190fe498fff5bcea"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export const db = getFirestore()

export const user = uid => doc(db, `users/${uid}`);

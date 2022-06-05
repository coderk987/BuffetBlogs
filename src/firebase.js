import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_KEY,

  authDomain: "svelte-blog-6c6e7.firebaseapp.com",

  projectId: "svelte-blog-6c6e7",

  storageBucket: "svelte-blog-6c6e7.appspot.com",

  messagingSenderId: "535899493784",

  appId: "1:535899493784:web:942f77db8237ff93c587ed",
};

let app;
if (getApps.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  getApp();
}

export const db = getFirestore(app);
export const auth = getAuth();

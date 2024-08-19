// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZtM_QYsfGRtUMRq_4uhRjtH31g7ctApM",
  authDomain: "note-ai-6f788.firebaseapp.com",
  projectId: "note-ai-6f788",
  storageBucket: "note-ai-6f788.appspot.com",
  messagingSenderId: "467544725481",
  appId: "1:467544725481:web:9c09e234f362bd29d39d78",
  measurementId: "G-5K501XEMYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
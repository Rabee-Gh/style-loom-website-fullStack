import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyBxuaG2I0xzCFoYhzGmy97rFdjybenTHq4",
  authDomain: "styleloom-fashion.firebaseapp.com",
  projectId: "styleloom-fashion",
  storageBucket: "styleloom-fashion.firebasestorage.app",
  messagingSenderId: "439533031790",
  appId: "1:439533031790:web:965fb8befc8be9b077317f",
  measurementId: "G-556Z4903R4"
};

if (!firebaseConfig.apiKey) {
  console.warn('Firebase configuration is missing or incomplete');
}

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export default app;
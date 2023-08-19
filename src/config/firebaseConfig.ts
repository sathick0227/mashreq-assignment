import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlc-IveSPJ3Cew8VEjL-iCrpRhgxl0HXI",
  authDomain: "mashreq-task.firebaseapp.com",
  databaseURL: "https://mashreq-task-default-rtdb.firebaseio.com",
  projectId: "mashreq-task",
  storageBucket: "mashreq-task.appspot.com",
  messagingSenderId: "324653802024",
  appId: "1:324653802024:web:3610db1c4c8ae648a84b1d",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
export { firestore, auth };

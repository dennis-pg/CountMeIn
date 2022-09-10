import * as firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"
const app = firebase.initializeApp({
  apiKey: "AIzaSyCnvXnzoSMWlPIq0gRH-yi6TO_Hplg7Y4o",
  authDomain: "countmein-4f942.firebaseapp.com",
  projectId: "countmein-4f942",
  storageBucket: "countmein-4f942.appspot.com",
  messagingSenderId: "437545739820",
  appId: "1:437545739820:web:57cc1c1470ff338d541389",
  measurementId: "G-G7DF5VSGQE"
})

export const auth = app.auth()
export default app


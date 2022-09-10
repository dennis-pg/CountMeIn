import * as React from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import { useAuth } from "../../../contexts/AuthContext"
// import app from "../../../firebase";
// import FirestoreHealthMetrics from '../../../FirestoreHealthMetrics';

export default function Navbar() {
  const { currentUser, logout } = useAuth()
  // const ref=app.firestore().collection("UserHealthMetrics");
  // console.log("ref: "+ref);
  return (
    <>
      <ResponsiveAppBar />
      <h1>{currentUser?.email}</h1>
      <h2>userType: {currentUser?.displayName}</h2>
      {/* <FirestoreHealthMetrics/> */}
    </>
  );
}

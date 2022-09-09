import * as React from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import { useAuth } from "../../../contexts/AuthContext"

export default function Navbar() {
  const { currentUser, logout } = useAuth()
  return (
    <>
      <ResponsiveAppBar />
      <h1>{currentUser?.email}</h1>
      <h2>userType: {currentUser?.displayName}</h2>
    </>
  );
}

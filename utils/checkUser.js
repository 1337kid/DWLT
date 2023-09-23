"use client"
import { signOut } from "next-auth/react";
import { getCookies } from "cookies-next";

const checkUser = () => {
  const token = getCookies('token').token
  if(!token) {
    signOut()
    console.log('user logged out, login again')
  } else {
    return true
  }
}

export default checkUser
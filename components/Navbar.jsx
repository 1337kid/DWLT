"use client"
import { useSession } from "next-auth/react"
import {signIn, signOut} from 'next-auth/react'
import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  const session = useSession()

  return (
    <nav className="bg-sky-100 px-2 py-4 flex justify-between items-center border-b-2 border-b-slate-500">
      <div>
        <Link href="/"><h3 className="text-xl font-bold">DWLT</h3></Link>
      </div>
      <div>
        {session.status === 'authenticated' ? (
        <>
          <div className="flex gap-2 items-center">
            <h4>{session.data.user.wallet}</h4>
            <Link href="/dashboard">
              <Image src={session.data.user.image} height={30} width={30} className="rounded-sm" alt="image"/>
            </Link>
            <button className="sign_in_button" onClick={() => signOut()}>Sign Out</button>
          </div>
        </>
        ) : (<>
          <button className="sign_in_button" onClick={() => signIn('google')}>Sign In</button>
        </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
"use client"
import { signIn, useSession } from 'next-auth/react'
import { CustBtn, Footer } from '@/components'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import checkUser from '@/utils/checkUser'

export default function Home() {
  const session = useSession()
  const router = useRouter()
  const [status,setStatus] = useState({users:0,transactions:0})

  useEffect(() => {
    if(session.status === 'authenticated'){checkUser()}
    fetch(`/api/status`).then(res => res.json()).then(data => setStatus(data))
  },[])

  return (
    <div>
    <div className='flex justify-center max-md:px-2 py-2 bg-slate-200'>
      <div className='w-11/12 max-md:w-full flex p-2'>
        <div className='flex flex-col w-full items-center'>
        <div className='text-center'>
          <h1 className='text-[60px] font-bold leading-[70px] max-sm:text-[50px] max-sm:leading-[55px]'>Send money and enjoy<br/>
          having a <span className='gradient-text'>Digital Wallet</span></h1>
        </div>
        <div className='max-w-4xl py-5'>
          <h4 className='text-xl text-center'>
          DWLT is a multi-user web application resembling a digital wallet, 
          designed to facilitate seamless transactions. DWLT aims to make people's 
          lives easier by replacing a physical wallet for most of the transactions.
          </h4>
        </div>
        {session.status === 'authenticated' ? (
          <CustBtn text="Go to Dashboard" onClickFunc={() => router.push('/dashboard')}/>
        ) : (
          <CustBtn text="Get started" onClickFunc={() => signIn('google')}/>
        )}

        <div className='flex flex-row justify-between w-6/12 pt-10 max-sm:flex-col'>
          <div className='text-center'>
            <h1 className='text-[100px] gradient-text'>{status?.users}</h1>
            <p className='text-[30px] gradient-text'>Users</p>
          </div>
          <div className='text-center'>
          <h1 className='text-[100px] gradient-text'>{status?.transactions}</h1>
          <p className='text-[30px] gradient-text'>Transactions</p>
          </div>
        </div>
      </div>
      </div>
    </div>
    <Footer/>
  </div>
  )
}
"use client"
import { useState,useEffect } from "react"
import { getCookies } from 'cookies-next';
import { TransactionCard } from "@/components"
import checkUser from "@/utils/checkUser";

const page = () => {
  const token = getCookies('token').token
  const [history,setHisory] = useState({sent:[],received:[]})

  useEffect(() => {
    if(checkUser()){
    fetch('/api/history',{
      headers:{'Authorization':`bearer ${token}`}
    }).then(res => res.json()).then(data => setHisory(data))}
  },[])

  return (
    <div className='py-3 flex flex-col gap-3 w-full bg-slate-50 mt-2 rounded-sm px-2'>
      <h2 className="text-3xl underline underline-offset-2">Transactions</h2>
      <div className="flex justify-between max-sm:flex-col gap-3">
        <div className="w-full text-center">
          <h4 className="text-xl">Sent</h4>
          {history.sent.length !== 0 ? <TransactionCard data={history.sent} type="sent"/> : <p>No records</p>}
        </div>
        <div className="w-full text-center">
          <h4 className="text-xl">Received</h4>
          {history.received.length !== 0 ? <TransactionCard data={history.received} type="received"/> : <p>No records</p>}
        </div>
      </div>
    </div>
  )
}

export default page
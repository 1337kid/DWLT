"use client"
import { useState,useEffect } from "react"
import { getCookies } from 'cookies-next';
import { Alertbox, CustBtn } from "@/components"
import { useRouter } from "next/navigation"

const page = () => {
  const router = useRouter()
  const [amount,setAmount] = useState(null)
  const token = getCookies('token') 
  const [wallet,setWallet] = useState(0)
  const [alertbox,setAlertbox] = useState(null)

  const [pay,setPay] = useState({email:null,amount:null})
  
  useEffect(() => {
    fetch('/api/user/wallet',{
      headers:{'Authorization':`bearer ${token}`}
    }).then(res => res.json()).then(data => setWallet(data.wallet))
  },[alertbox])

  //Update Wallet , api call
  const addToWallet = (e) => {
    e.preventDefault()
    fetch('/api/user/wallet',{
      method:'POST',
      headers:{'Authorization':`bearer ${token}`},
      body:JSON.stringify({data:wallet+parseInt(amount)})
    })
    setWallet((wallet) => {return wallet + parseInt(amount)})
  }

  //Send money, api call
  const sendMoney = async(e) => {
    e.preventDefault()
    await fetch('/api/sendmoney',{
      method:'POST',
      headers:{'Authorization':`bearer ${token}`},
      body:JSON.stringify({data:pay})
    }).then(res => res.json()).then(data => setAlertbox(data))
  }

  return (
    <div className="py-3 flex flex-col gap-3 w-full bg-slate-50 mt-2 rounded-sm px-2">
      <h2 className="text-3xl underline underline-offset-2">Dashboard</h2>
      <h4 className="text-xl">Current Wallet : {wallet}</h4>
      <div className="bg-slate-200 rounded-sm p-2 flex flex-row justify-between gap-3 max-sm:flex-col">
        <div className="card-sky">
          As this web app doesn't work on real money, the user is supposed to enter an amount for their digital wallet
        </div>
        <div className="w-full px-4">
          <form className="flex flex-col gap-3">
            <input className="form_input" required placeholder="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)}/>
            <span className="text-center"><CustBtn type="submit" onClickFunc={(e) => addToWallet(e)} text="Add to Wallet"/></span>
          </form>
        </div>
      </div>

      <h4 className="text-xl underline underline-offset-2">Send Money</h4>
      {alertbox && <Alertbox type={alertbox.type} message={alertbox.message} setterfunc={() => setAlertbox(null)}/>}
      <div className="flex justify-between max-sm:flex-col">
        <form className="flex flex-col w-full gap-3 p-2">
          <input required className="form_input" value={pay.email}  placeholder="E-Mail Address" type="email" onChange={(e) => setPay(pay => { return {...pay,email:e.target.value}})}/>
          <input required className="form_input" value={pay.amount} placeholder="Amount" type="number" onChange={(e) => setPay(pay => { return {...pay,amount:e.target.value}})}/>
          <CustBtn type="submit" text="Send money" onClickFunc={(e) => sendMoney(e)}/>
        </form>
        <div className="flex gap-3 flex-col items-center">
          <div className="p-2 rounded-md w-full text-center">
            Consider setting up "OneClick" payments if you are planning to pay a constant sum multiple times to a specific person
          </div>
          <CustBtn text="Setup OneClick pay" onClickFunc={() => router.push('/dashboard/oneclick')}/>
        </div>
      </div>
    </div>
  )
}

export default page
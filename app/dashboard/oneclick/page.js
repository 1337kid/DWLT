"use client"
import { CustBtn, OneClickCard } from "@/components"
import { useState,useEffect } from "react"
import { getCookies } from 'cookies-next';
import { Alertbox } from "@/components"
import checkUser from "@/utils/checkUser";

const page = () => {
  const token = getCookies('token').token
  const [formData,setFormData] = useState({title:'',email:'',amount:''})
  const [alertbox,setAlertbox] = useState(null)
  const [oneclicks,setOneclicks] = useState([])

  useEffect(() => {
    if(checkUser()){
    fetch("/api/oneclick",{
      headers:{'Authorization':`bearer ${token}`}
    }).then(res => res.json()).then(data => setOneclicks(data))}
  },[alertbox])

  //create onclick
  const createOneclick = async(e) => {
    e.preventDefault()
    await fetch("/api/oneclick",{
      method:'POST',
      headers:{'Authorization':`bearer ${token}`},
      body:JSON.stringify({data:formData})
    }).then(res => res.json()).then(data => setAlertbox(data))
  }

  //pay money
  const sendMoney = async(pay) => {
    await fetch('/api/sendmoney',{
      method:'POST',
      headers:{'Authorization':`bearer ${token}`},
      body:JSON.stringify({data:pay})
    }).then(res => res.json()).then(data => setAlertbox(data))
  }

  return (
    <div className='py-3 flex flex-col gap-3 w-full bg-slate-50 mt-2 rounded-sm px-2'>
      <h2 className="text-3xl underline underline-offset-2">OneClick Pay</h2>
      {alertbox && <Alertbox type={alertbox.type} message={alertbox.message} setterfunc={() => setAlertbox(null)}/>}
      <div className='flex max-sm:flex-col justify-between'>
        <div className='w-full text-center'>
          <h4 className='text-xl pb-2'>Setup OneClick</h4>
          <form className='flex flex-col gap-3'>
            <input className="form_input" required placeholder="Title" type="text" value={formData.title} onChange={(e) => setFormData(formData => { return {...formData,title:e.target.value}})}/>
            <input className="form_input" required placeholder="E-mail" type="email" value={formData.email} onChange={(e) => setFormData(formData => { return {...formData,email:e.target.value}})}/>
            <input className="form_input" required placeholder="Amount" type="number" value={formData.amount} onChange={(e) => setFormData(formData => { return {...formData,amount:e.target.value}})}/>
            <CustBtn type="submit" text="Submit" onClickFunc={(e) => createOneclick(e)}/>
          </form>
        </div>
        <div className='w-full text-center px-3'>
          <h4 className='text-xl'>OneClick Pay</h4>
          <div className="pt-2 flex gap-3 flex-col">
            {oneclicks.length !== 0 ? oneclicks.map((item) => (
              <OneClickCard item={item} handleClick={() => sendMoney({email:item.email,amount:item.amount})}/>
            )) : (
              <>
                <p>No records</p>
              </>
            )}
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default page
import connectToDB from "@/utils/database"
import Transaction from "@/models/Transaction"
import User from "@/models/User"
import jwt from "jsonwebtoken"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export const POST = async(req) => {
  const {data} = await req.json()
  const token = headers().get('authorization')

  if(!token) {
    return NextResponse.json({type:'error',message:'Token not specified'},{status:403})
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1],process.env.JWT_SECRET_KEY)
    await connectToDB()
    const toUser = await User.findOne({email:data.email})
    if(!toUser){
      return NextResponse.json({type:'error',message:'User does not exist'},{status:404})
    }
    let currentAmt = toUser.wallet
    toUser.wallet = currentAmt + parseInt(data.amount)
    await toUser.save()
    const newTransaction = new Transaction({from:decoded.id,to:data.email,amount:data.amount})
    await newTransaction.save()
    const fromUser = await User.findOne({email:decoded.id})
    currentAmt = fromUser.wallet
    fromUser.wallet = currentAmt - parseInt(data.amount)
    await fromUser.save()
    return NextResponse.json({type:'success',message:'Transaction was successful'},{status:200})
  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:500})
  }
}
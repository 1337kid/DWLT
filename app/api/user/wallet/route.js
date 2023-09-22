import connectToDB from "@/utils/database"
import jwt from 'jsonwebtoken'
import {headers} from 'next/headers'
import { NextResponse } from "next/server"
import User from "@/models/User"

export const GET = async() => {
  const token = headers().get('authorization')

  if(!token) {
    return NextResponse.json({type:'error',message:'Token not specified'},{status:403})
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1],process.env.JWT_SECRET_KEY)
    await connectToDB()
    const userdata = await User.findOne({email:decoded.id})
    return NextResponse.json({wallet:userdata.wallet},{status:200})
  } catch (error) {
    return NextResponse.json({error})
  }
}

export const POST = async(req) => {
  const token = headers().get('authorization')
  const {data} = await req.json()
  if(!token) {
    return NextResponse.json({type:'error',message:'Token not specified'},{status:403})
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1],process.env.JWT_SECRET_KEY)
    await connectToDB()
    const userdata = await User.findOne({email:decoded.id})
    userdata.wallet = parseInt(data)
    await userdata.save()
    return NextResponse.json({wallet:userdata.wallet},{status:200})
  } catch (error) {
    return NextResponse.json(error,{status:500})
  }
}

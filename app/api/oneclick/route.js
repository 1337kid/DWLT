import { headers } from "next/headers"
import Oneclick from "@/models/Oneclick"
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import connectToDB from "@/utils/database"

export const GET = async() => {
  const token = headers().get('authorization')
  if(!token) {
    return NextResponse.json({type:'error',message:'Token not specified'},{status:403})
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1],process.env.JWT_SECRET_KEY)
    await connectToDB()
    const oneclicks = await Oneclick.find({user:decoded.id})
    return NextResponse.json(oneclicks,{status:200})
  } catch (error) {
    return NextResponse.json(error)
  }
}

export const POST = async(req) => {
  const {data} = await req.json()
  const token = headers().get('authorization')
  if(!token) {
    return NextResponse.json({type:'error',message:'Token not specified'},{status:403})
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1],process.env.JWT_SECRET_KEY)
    await connectToDB()
    const oneclick = new Oneclick({title:data.title,user:decoded.id,email:data.email,amount:data.amount})
    oneclick.save()
    return NextResponse.json({type:'success',message:'OneClick has been created'},{status:200})
  } catch (error) {
    return NextResponse.json(error)
  }
}
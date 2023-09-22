import jwt from 'jsonwebtoken'
import { headers } from 'next/headers'
import Transaction from '@/models/Transaction'
import { NextResponse } from 'next/server'
import connectToDB from '@/utils/database'

export const GET = async() => {
  const token = headers().get('authorization')
  if(!token) {
    return NextResponse.json({type:'error',message:'Token not specified'},{status:403})
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1],process.env.JWT_SECRET_KEY)
    await connectToDB()
    const sent = await Transaction.find({from:decoded.id})
    const received = await Transaction.find({to:decoded.id})
    return NextResponse.json({sent:sent,received:received},{status:200})
  } catch (error) {
    return NextResponse.json(error)
  }
}

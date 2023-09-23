import connectToDB from "@/utils/database";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export const GET = async() => {
  try {
    await connectToDB()
    const users =  await User.countDocuments({})
    const transactions = await Transaction.countDocuments({})
    return NextResponse.json({users:users,transactions:transactions},{status:200})
  } catch (error) {
    return NextResponse.json(error,{status:500})
  }
}
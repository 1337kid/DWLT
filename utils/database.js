import mongoose, { mongo } from "mongoose";

let isConnected = false

const connectToDB = async() => {
  mongoose.set('strictQuery',true)
  
  if(isConnected) {
    console.log('DB already connected')
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO,{dbName:'test'})
    isConnected = true
    console.log('DB connected')
  } catch (error) {
    console.log(error)
  }
}

export default connectToDB
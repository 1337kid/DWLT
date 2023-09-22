import mongoose,{Schema,model,models} from "mongoose";

const userSchema = new Schema({
  email:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  imageUrl:{
    type:String,
    required:true
  },
  wallet:{
    type:Number,
    required:true,
    default:0
  }
})

const User = models.User || model('User',userSchema)

export default User
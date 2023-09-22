import mongoose,{Schema,models,model} from "mongoose";

const oneclickSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  user:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  amount:{
    type:Number,
    required:true
  }
})

const Oneclick = models.Oneclick || model('Oneclick',oneclickSchema)

export default Oneclick
import mongoose,{Schema,model,models} from "mongoose";

const transactionSchema = new Schema({
  from:{
    type:String,
    require:true
  },
  to:{
    type:String,
    require:true
  },
  amount:{
    type:Number,
    require:true
  }
})

const Transaction = models.Transaction || model('Transaction',transactionSchema)

export default Transaction
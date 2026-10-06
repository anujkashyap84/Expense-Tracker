import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    description : {
    type : String,
    required : true
  },
  amount : {
    type : Number,
    required : true
  },
  category: {
    type: String,
    required : true,
  },
  date: {
    type: Date,
    required : true
  },
  // for taking particular user income data, we will use userId as a reference to the user model
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  type: {
    type: String,
    default: "income",  
  },
}, { timestamps: true });

const incomeModel = mongoose.models.Income || mongoose.model("Income", incomeSchema); 
export default incomeModel;
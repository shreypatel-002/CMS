import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
    
    CustomerID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer' 
    },
    Name:{
        type: String,
        required: true,
    },
    PhoneNo:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    issueCategory:{
        type: String,
        required: true,
    },
    issueDescription:{
        type: String,
        required: true,
    },
    callDate:{
        type: Date,
        required: true,
    },
    callTime:{
        type: String,
        required: true,
    },
    supportAgentName:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Engineer' ,
    },
    priorityLevel:{
        type: String,
        required: true,
    },
    LeadID:{
        type:String,
    }
  



},{timestamps:true});

const Lead = mongoose.model('Lead',LeadSchema);

export default Lead;
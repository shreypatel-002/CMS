import mongoose from "mongoose";

const EngineerSchema = new mongoose.Schema({


  ECode: { 
    type: String,
    required: true,
    unique:true
    
},
  Name: {
    type : String,
    required: true,
  },
  email:{
    type: String,
    require:true,
  },
  PhoneNo : {
    type : String,
    required: true,
    unique:true
  },
  Area: {
    type: String,
    require: true,
  },
  Profile:{
    type: String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV54oqffDRzdzVnVxnUZRG6N2RAOK0ieANYEdpQBuJdg&s",
  },
  Tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] // Added tasks field

});


EngineerSchema.set('toJSON', { virtuals: true }); 

const EngineerList = mongoose.model('Engineer',EngineerSchema);

export default EngineerList;
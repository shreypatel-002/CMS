import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({

  Name: { 
    type: String,
    required: true,
    
},
  Email: {
    type : String,
    required: true,
    
    
   
  },

  PhoneNo : {
    type : String,
    required: true,
    unique:true
  },
  CustomerID : {
    type: String,
    require: true,
    unique:true
  }

});

const List = mongoose.model('Customer',CustomerSchema);

export default List;
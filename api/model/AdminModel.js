import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar:{
    type: String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV54oqffDRzdzVnVxnUZRG6N2RAOK0ieANYEdpQBuJdg&s",
  },
  role: {
    type: String,
    default: "admin",
  },
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;

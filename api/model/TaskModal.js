import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({

  title: { 
    type: String,
     required: true
     },
  description: { 
    type: String
     },
  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Engineer' 
    }, 
  Customer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer' 
    }, 
  status: { type: String, 
    enum: ['Pending', 'In Progress', 'Completed'], 
    default: 'Pending' },

  dueDate: { type: Date }
});

const Task = mongoose.model('Task', TaskSchema);
export default Task;

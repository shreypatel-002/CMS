import EngineerList from "../model/EngineerModel.js"; // Correct path to Engineer model
import Task from '../model/TaskModal.js'
import List from "../model/CustomerModel.js";




export const CreateTask = async (req, res, next) => {
  const { title, description, assignedTo, Customer, dueDate } = req.body;

  try {
    const newTask = new Task({ title, description, assignedTo, Customer, dueDate });
    await newTask.save();

    if (assignedTo) {
      const engineer = await EngineerList.findById(assignedTo);
      if (!engineer) {
        return res.status(404).json({ message: 'Assigned engineer not found' });
      }
      engineer.Tasks = engineer.Tasks || [];
      engineer.Tasks.push(newTask._id);
      await engineer.save();
    }

    if (Customer) {
      const customer = await List.findById(Customer);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      customer.Tasks = customer.Tasks || [];
      customer.Tasks.push(newTask._id);
      await customer.save();
    }

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

export const getTask = async (req, res) => {
  const { ECode } = req.query;
  
  try {
  const engineer = await EngineerList.findOne({ ECode });
  if (!engineer) {
  return res.status(404).json({ message: 'Engineer not found' });
  }
  
  const tasks = await Task.find({ assignedTo: engineer._id }).populate('Customer', 'Name');
  
  res.status(200).json({ tasks });
  } catch (error) {
  console.error('Error fetching tasks:', error.message);
  res.status(500).send(error.message);
  }
  };

export const updateTask = async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};


export const deleteTask =async(req,res,next)=>{
  const { id } = req.params
  try {
    
    const result = await Task.findByIdAndDelete(id);
    if(!result) {
      console.error(`task not found: ${id}`);
      return res.status(404).send({ error: ' not found' });
    }
    console.log(`task deleted successfully: ${id}`);
      res.status(200).send({ message: 'task deleted successfully' });


  } catch (error) {
    console.error('Error during deletion:', error);
    res.status(500).send({ error: 'Failed to delete task', details: error.message })
    
  }
}
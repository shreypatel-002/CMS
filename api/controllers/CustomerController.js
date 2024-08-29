import List from '../model/CustomerModel.js';

// Add a new customer
export const AddCustomer = async (req, res, next) => {
  const { Name, Email, PhoneNo,CustomerID } = req.body;


  const phoneRegex = /^\d{10}$/; // Matches exactly 10 digits

  if (!phoneRegex.test(PhoneNo)) {
    return res.status(401).json({ message: 'Please enter a valid 10-digit phone number' });
  }
  const CustomerIDRegex = /^\d{3}$/;
  if (!CustomerIDRegex.test(CustomerID)) {
    return res.status(401).json({ message: 'Please enter valid 3-digit code only' });
  }

  if (!Name || !PhoneNo || !Email || !CustomerID) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newUser = new List({ Name, Email, PhoneNo, CustomerID });
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error code
      return res.status(409).json({ message: 'Engineer with this ecode already exists.'})}
    console.error('Error creating customer:', error.message);
    next(error);
  }
};

// List or search customers with pagination
export const Customerlist = async (req, res, next) => {
  try {
    const { limit = '', startIndex = 0, SearchTerm = '' } = req.query;
    const query = {};

    if (SearchTerm) {
      query.$or = [
        { Name: { $regex: SearchTerm, $options: 'i' } },
        { CustomerID: { $regex: SearchTerm, $options: 'i' } }
      ];
    }

    const totalCount = await List.countDocuments(query);

    const customers = await List.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(startIndex));

    res.status(200).json({ totalCount, customers });
  } catch (error) {
    console.error('Error fetching customers:', error.message);
    res.status(500).json({ message: 'Server error' });
    next(error);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const updatedCustomer = await List.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Engineer not found' });
    }
    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error('Error updating engineer:', error.message);
    res.status(500).json({ message: 'Error updating engineer', error: error.message });
  }
};

export const DeleteCustomer = async(req,res,next)=>{
  const { id } = req.params;
  try {

    const result = await List.findByIdAndDelete(id);
    if (!result) {
      console.error(`customer not found: ${id}`);
      return res.status(404).send({ error: ' not found' });
    }
    console.log(`customer deleted successfully: ${id}`);
    res.status(200).send({ message: 'customer deleted successfully' });
  } catch (error) {
    console.error('Error during deletion:', error);
    res.status(500).send({ error: 'Failed to delete customer', details: error.message });
  }

}
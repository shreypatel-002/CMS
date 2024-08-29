import EngineerList from "../model/EngineerModel.js";
import Lead from "../model/LeadsModel.js";
import CustomerList from "../model/CustomerModel.js"; // Import the Customer model correctly
import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail', 'Yahoo', etc.
  auth: {
    user: process.env.Email, // Your email
    pass: process.env.Email_Password,  // Your email password
  },
});
export const CreateLead = async (req, res, next) => {
  const {
    CustomerID,
    Name,
    PhoneNo,
    email,
    issueCategory,
    issueDescription,
    callDate,
    callTime,
    supportAgentName,
    priorityLevel,
  } = req.body;

  const LeadID = `${Date.now()}${Math.floor(Math.random() * 10000)}`;

  const newUser = new Lead({
    CustomerID,
    Name,
    PhoneNo,
    email,
    issueCategory,
    issueDescription,
    callDate,
    callTime,
    supportAgentName,
    priorityLevel,
    LeadID,
  });

  try {
    await newUser.save();

    if (CustomerID) {
      const customer = await CustomerList.findById(CustomerID); // Use CustomerList
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      customer.Tasks = customer.Tasks || [];
      customer.Tasks.push(newUser._id);
      await customer.save();
    }

    if (supportAgentName) {
      const engineer = await EngineerList.findById(supportAgentName);
      if (!engineer) {
        return res.status(404).json({ message: 'Assigned engineer not found' });
      }
      engineer.Tasks = engineer.Tasks || [];
      engineer.Tasks.push(newUser._id);
      await engineer.save();
    }
    const mailOptions = {
      from: process.env.Email,
      to: email,
      subject: 'Lead Created Successfully',
      text: `Dear ${Name},\n\nYour lead has been created successfully. Here are the details:\n\nLead ID: ${LeadID}\nIssue Category: ${issueCategory}\nIssue Description: ${issueDescription}\n\nThank you for contacting us.\n\nBest Regards,\nSupport Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};


export const ShowLead = async (req, res, next) => {
  const {id} = req.params
  try {
    const data = await Lead.find({id});
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching leads:', error.message);
    res.status(500).json({ message: 'Error fetching leads', error: error.message });
  }
};

export const EditLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Error updating lead', error: error.message });
  }
};

export const DeleteLead = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Lead.findByIdAndDelete(id);
    if (!result) {
      console.error(`Lead not found: ${id}`);
      return res.status(404).send({ error: 'Lead not found' });
    }
    console.log(`Lead deleted successfully: ${id}`);
    res.status(200).send({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error during deletion:', error);
    res.status(500).send({ error: 'Failed to delete lead', details: error.message });
  }
};

export const TrackLead = async (req, res, next) => {
  try {
    const { limit = 10, startIndex = 0, SearchTerm = '' } = req.query;
    const query = {};

    if (SearchTerm) {
      query.$or = [{ LeadID: { $regex: SearchTerm, $options: 'i' } }];
    }

    const totalCount = await Lead.countDocuments(query);

    const Trackleads = await Lead.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(startIndex));

    res.status(200).json({ totalCount, Trackleads });
  } catch (error) {
    console.error('Error fetching leads:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
    next(error);
  }
};

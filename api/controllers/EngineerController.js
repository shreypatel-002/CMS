import EngineerList from "../model/EngineerModel.js";
import mongoose from "mongoose";

export const AddEngineer = async (req, res, next) => {
  const { ECode, Name, email, PhoneNo, Area,Profile } = req.body;

  const phoneRegex = /^\d{10}$/; // Matches exactly 10 digits
  if (!phoneRegex.test(PhoneNo)) {
    return res.status(401).json({ message: 'Please enter a valid 10-digit phone number' });
  }

  if (!ECode || !Name || !email || !PhoneNo || !Area||!Profile) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newEngineer = new EngineerList({ ECode, Name, email, PhoneNo, Area,Profile, Tasks: [] });
  try {
    await newEngineer.save();
    res.status(201).json(newEngineer);
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error code
      return res.status(409).json({ message: 'Engineer with this ecode already exists.' });
    }
    console.error('Error creating engineer:', error.message);
    next(error);
  }
};

export const ShowEngineer = async (req, res, next) => {
  try {
    const { limit = 6, startIndex = 0, SearchTerm = '', filter = '' } = req.query;
    const query = {};

    if (SearchTerm) {
      query.$or = [
        { Name: { $regex: SearchTerm, $options: 'i' } },
        { ECode: { $regex: SearchTerm, $options: 'i' } }
      ];
    }

    if (filter) {
      query.Area = filter;
    }

    const totalCount = await EngineerList.countDocuments(query);

    const Engineers = await EngineerList.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(startIndex));

    res.status(200).json({ totalCount, Engineers });
  } catch (error) {
    console.error('Error fetching Engineers:', error.message);
    res.status(500).json({ message: 'Server error' });
    next(error);
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

export const updateEngineer = async (req, res, next) => {
  try {
    const updatedEngineer = await EngineerList.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEngineer) {
      return res.status(404).json({ message: 'Engineer not found' });
    }
    res.status(200).json(updatedEngineer);
  } catch (error) {
    console.error('Error updating engineer:', error.message);
    res.status(500).json({ message: 'Error updating engineer', error: error.message });
  }
};

export const deleteEngineer = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await EngineerList.findByIdAndDelete(id);
    if (!result) {
      console.error(`Engineer not found: ${id}`);
      return res.status(404).send({ error: 'Engineer not found' });
    }
    console.log(`Engineer deleted successfully: ${id}`);
    res.status(200).send({ message: 'Engineer deleted successfully' });
  } catch (error) {
    console.error('Error during deletion:', error);
    res.status(500).send({ error: 'Failed to delete engineer', details: error.message });
  }
};

import express from 'express'
import { AddEngineer, ShowEngineer, deleteEngineer, updateEngineer } from '../controllers/EngineerController.js';
import { CreateTask, deleteTask, getTask, updateTask } from '../controllers/TaskController.js';
import { verifyToken } from '../Utils/VerifyToken.js';



const router = express.Router();

    //engineer crud oprations 
router.get('/ShowEngineer',ShowEngineer)
router.post('/AddEngineer', AddEngineer)
router.put('/UpdateEngineer/:id',updateEngineer)
router.delete('/deleteEngineer/:id',deleteEngineer);

        //task crud operations
router.post('/task', CreateTask);
router.get('/tasks',getTask);
router.put('/updateTask/:id',updateTask);
router.delete('/deleteTask/:id',deleteTask);
export default router;
import express from 'express';
import { CreateLead, DeleteLead, EditLead, ShowLead, TrackLead } from '../controllers/LeadsController.js';


const router = express.Router();


router.post('/Create',CreateLead)
router.get('/Show', ShowLead)
router.put('/Edit/:id', EditLead)
router.delete('/delete/:id',DeleteLead)
router.get('/TrackLead',TrackLead);
export default router;
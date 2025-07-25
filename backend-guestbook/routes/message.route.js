import express from 'express'
import { addMessage , getMessages ,getMessagesAdmin } from '../controllers/message.controller.js'
const router = express.Router();


router.get('/', getMessages);
router.post('/' ,addMessage);
router.get('/admin' , getMessagesAdmin)


export default router;

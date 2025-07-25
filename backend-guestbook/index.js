import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import messageRoutes from './routes/message.route.js';


dotenv.config();
const app = express();
app.use(express.json());
const PORT =3000 ;






app.use(cors());


app.use(cors({
  origin: 'http://localhost:5173' 
}));



mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to DataBase'))
  .catch((err) => console.error('DataBase connection error:', err));



  app.use('/messages', messageRoutes);

  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



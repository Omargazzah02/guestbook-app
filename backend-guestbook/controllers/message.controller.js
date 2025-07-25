import { Message } from "../models/message.model.js"

export const addMessage = async (req, res) => {
    try {
        const {name , message} = req.body;


     if (!name || !message) {
      return res.status(400).json({ message: 'Name and message are required.' });
    }

    const newMessage = new Message({ name, message });
    await newMessage.save();

    res.status(201).json({ message: 'Message added successfully.', data: newMessage });

        

    }catch (err) {

            res.status(500).json({ message: "Internal server error" });

    }
}



export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }); // -1 = descending order
    res.status(200).json(messages);
  } catch (error) {

    res.status(500).json({ message: "Internal server error" });

    }

    
};




export const getMessagesAdmin = async (req, res) => {
  try {
    const messages = await Message.find()
    res.status(200).json(messages);
  } catch (error) {

    res.status(500).json({ message: "Internal server error" });

    }
};
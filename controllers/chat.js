const Chatmodal = require("../models/chatModal")

const createChat = async (req, res) => {
  try {
    const newChat = new Chatmodal(req.body)
    const response = await newChat.save()
     res.status(201).json({
        message: "Chat created successfully",
        success: true,
        data: response
     })
   } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const findUserChats = async (req, res) => {
  try {
    const userId = req.params.userId;
    const chats = await Chatmodal.find({
        members: {$in: [ userId ] },
    }).populate('members').sort({"updatedAt": -1})
      res.status(201).json({
        message: "Chat fetched successfully",
        success: true,
        data: chats
     })
   } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const findChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.params;
    const chat = await Chatmodal.findOne({
         members: {$all: [firstId, secondId] },
    })
    res.status(200).json(chat)
   } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

 
module.exports = {
   createChat,
    findUserChats,
    findChat
  }
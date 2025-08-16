const Messagemodal = require("../models/messageModal")
const Chatmodal = require("../models/chatModal")

const createMessage = async (req, res) => {
  try {
   
    const message = new Messagemodal(req.body)
    const savedMessage = await message.save()
    const currentChat = await Chatmodal.findOneAndUpdate({
        _id: req.body.chatId
    }, {
        lastMessage: savedMessage._id,
        $inc: {unreadMessageCount: 1}
    })
    
    res.status(201).json({
        message: 'Message sent successfully',
        success: true,
        data: savedMessage
    })
   } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



const getMessages = async (req, res) => {
  try {
    const messages = await Messagemodal.find({ chatId:req.params.chatId }).sort({createdAt: 1 })
    res.status(200).json({
        message: "Messages fetched successfully",
        success: true,
        data: messages
    })
   } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


 
module.exports = {
    createMessage,
    getMessages
  }
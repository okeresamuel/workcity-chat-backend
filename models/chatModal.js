const mongoose = require("mongoose")
const chatSchema = new mongoose.Schema({
    members:{
        type:[
            {type: mongoose.Schema.Types.ObjectId, ref: "userschema"}
        ]
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId, ref: "messages"
    },
     unreadMessageCount: {
        type: Number,
        default: 0
    },
},
{timestamps:true})


const Chatmodal = mongoose.model("chat", chatSchema)
module.exports = Chatmodal;
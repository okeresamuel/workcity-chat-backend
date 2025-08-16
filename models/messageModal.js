const mongoose = require("mongoose")
const messageSchema = new mongoose.Schema({
    chatId:{
        type:mongoose.Schema.Types.ObjectId, ref: "chat"
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId, ref: "userschema"
    },
     text:{
        type:String,
        required: true
    },
    read:{
        type: Boolean,
        default: false
    }
},
{timestamps:true})


const Messagemodal = mongoose.model("messages", messageSchema)
module.exports = Messagemodal;
const express = require("express")
const passport = require("passport")
const router = express.Router()
const { protect, isAdmin } = require("../middleware/auth")
const { register, login, addRole, fetchUsers } = require("../controllers/user")
const { createChat, findChat, findUserChats } = require("../controllers/chat")
const {createMessage, getMessages} = require("../controllers/message")

// users routes
router.post("/register", register)
router.post("/addrole", addRole)
router.post("/fetchuser", fetchUsers)
router.post("/login",  passport.authenticate("local"), login)

//chat routes
router.post("/createchat", createChat)
router.get("/chats/:userId", findUserChats)
router.get("/find/:firstId/:secondId", findChat)

//message
router.post("/createmessage", createMessage)
router.get("/getmessage/:chatId", getMessages)

module.exports = router;
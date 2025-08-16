const express = require("express")
const app = express()
const cors = require("cors")
const passport = require("passport")
const helmet = require("helmet")
const localStrategy = require("passport-local")
const session = require("express-session")
const User = require("./models/user")
const morgan = require("morgan")
require("./config/db")
require("colors")

app.use(session({
    secret: process.env.SESSION__SECREAT,
    resave: true,
    saveUninitialized: true,
}))

app.use(express.json({limit:"30mb"}))
app.use(express.urlencoded({extended:false, limit:"30mb"}))
app.use(passport.initialize())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())




app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(helmet())
app.use(morgan("common"))

const server  =  require("http").createServer(app)
const io = require("socket.io")(server, {cors: {
    origin: "http://localhost:5173",
    methods: ['GET', 'POST']
}})

app.use("/", require("./routes/routes"))

io.on("connection", socket => {
   socket.on("join-room", userId => {
     socket.join(userId)
   })
   socket.on('send-message', (message)=> {
     console.log(message)
       io
       .to(message.members[0])
       .to(message.members[1])
       .emit('receive-message', message)
   })
})

const port = process.env.PORT || 3001
server.listen(port, console.log(`App is listening on port ${port}`.blue.underline))
Workcity Chat Backend

Real-time chat application with user authentication, message handling, and room management capabilities.

🚀 Technologies Used
Runtime: Node.js (v16+)
Framework: Express.js
Database: MongoDB with Mongoose ODM
Real-time Communication: Socket.io
Authentication: JWT (JSON Web Tokens)
Password Hashing: bcryptjs
Validation: express-validator
Logging: Morgan
Environment Management: dotenv
CORS: cors middleware
Security: helmet

📋 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (version 16.0 or higher)
npm or yarn package manager
MongoDB (local installation or MongoDB Atlas)
Git

⚙️ Setup Instructions
1. Clone the repository
git clone https://github.com/okeresamuel/workcity-chat-backend.git
cd workcity-chat-backend
2. Install dependencies
bash
npm install
# or
yarn install
3. Environment Configuration
Create a .env file in the root directory and add your environment variables:

env
# Server Configuration
NODE_ENV=development     
PORT=3001

# Database
dburl=mongodb+srv://okere:<Yourpassword>@cluster0.ljvwzic.mongodb.net/

# JWT Configuration
SECREAT=611829e3b6e3b421e9bc57206f198f4b6579fb41589c0c767a3c5ea60a530c6c
SESSION__SECREAT=819f3fb7b629f88aeb00869b6f22dc5426832d56047b67a6b5155ee20fba291f

# The application will automatically connect and create necessary collections
5. Start the development server
bash
# Development mode with nodemon
nodemon

const User = require("../models/user")
require("dotenv").config()
const jwt = require("jsonwebtoken")

// register
const register = async (req, res)=>{
    const { username, email, password } = req.body;
    const user = new User ({ username, email })
    try {
      const registereduser = await User.register(user, password.trim()) 
      if(registereduser){
          res.status(200).json({
            id: registereduser._id,
            username: registereduser.username,
            email: registereduser.email,
            password: registereduser.hash,
            Admin: registereduser.isAdmin,
            token: token(registereduser._id, registereduser.isAdmin,)
          })
        }
   } catch (error) {
      res.status(404).json(error.message)
   }
  }

//login user. 
const login = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username: username }).select('-password');
    
    if (!user) {
      return res.status(400).json({ message: 'User not found' }); // JSON response
    }

    // Check role
    if (!user.role || user.role === null) {
      return res.status(403).json({ 
        message: 'Access denied. No role assigned to user.' 
      }); // JSON response
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
      id: user._id,
      Admin: user.isAdmin,
      role: user.role,
      token: token(user._id, user.isAdmin)
    }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' }); // JSON response
  }
};

const addRole = async (req, res) => {
  try {
    const { role, username } = req.body;
    
    // Validate input
    if (!role || !username) {
      return res.status(400).json({ 
        message: 'Role and username are required' 
      });
    }
    
    // Find user and update role in one operation
    const user = await User.findOneAndUpdate({ username: username }, { role: role }, { new: true } );
    
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      message: 'Role assigned successfully',
      username: user.username,
      email: user.email,
      id: user._id,
      Admin: user.isAdmin,
      role: user.role,
      token: token(user._id, user.isAdmin)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const fetchUsers = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ 
        message: 'Role is required' 
      });
    }
    
    const users = await User.find({ role: role }).select('-password'); // Exclude password field
    
    if (!users || users.length === 0) {
      return res.status(404).json({ 
        message: `No users found with role: ${role}` 
      });
    }
    res.status(200).json({
      success: true,
      count: users.length,
      users: users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

function token (id, isAdmin){
  return jwt.sign({id, isAdmin}, process.env.SECREAT, {expiresIn:"30d"})
}
 
module.exports = {
    register,
    login,
    addRole,
    fetchUsers
  }
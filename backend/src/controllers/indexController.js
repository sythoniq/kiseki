const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const prisma = require('../configs/prisma.js')

const checkUsername = require('../configs/helpers.js').checkUsername;

async function handleLogin(req, res, next) {
  try {
    const { username, password } = req.body

    const user = await prisma.user.findUnique({
      where: {
        name: username, 
      }
    }) 

    if (user) {
      const result = await bcrypt.compare(password, user.hash)
      if (result) {
        const token = jwt.sign({userid: user.id}, process.env.SECRET, {expiresIn: '7d'});
        return res.json({success: true, msg: "User logged in", token});
      } else {
        throw(new Error("User not logged in, incorrect password"))
      }
    } else {
      throw(new Error("User not found"))  
    }
  } catch(err) {
    return res.json({success: false, msg: "Login failed", err})
  }
}

module.exports = {
  handleLogin
}

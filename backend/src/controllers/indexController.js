const bcrypt = require('bcryptjs')
const prisma = require('../configs/prisma.js')

const checkUsername = require('../configs/helpers.js').checkUsername;

async function handleRegister(req, res, next) {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10)
    const result = await checkUsername(username);  
    if (result) {
      const user = await prisma.user.create({
        data: {
          name: username,
          hash
        }
      }) 
      return res.json({success: true, user})
    }
  } catch(err) {
    return res.json({success: false, msg: "Failed to create user", err})
  }
}

async function handleLogin(req, res, next) {
  try {
    console.log('hi')
  } catch(err) {
    console.error(err)
  }
}

module.exports = {
  handleLogin,
  handleRegister
}

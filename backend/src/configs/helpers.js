require('dotenv').config()
const jwt = require('jsonwebtoken')
const prisma = require('./prisma.js')

async function checkUsername(username) { // Check username availability
  try {
    const user = await prisma.user.findUnique({
      where: {
        name: username
      }
    })
    if (!user) {
      return true;
    } else {
      throw(new Error("Username taken"))
    }
  } catch(err) {
    throw(err);
  } 
}

async function validateUser(req, res, next) {
  const token = req.headers['authorization']
  try {
    const result = jwt.verify(token, process.env.SECRET) 
    if (result) {
      const user = await prisma.user.findUnique({
        where: {id: Number(result.userid)}
      })   
      if (user) {
        req.user = user;
        next();
      } else {
        throw(new Error("User not found"))
      }
    } else {
      throw(new Error("Jwt not verified"))
    }
  } catch(err) {
    return res.status(401).json({success: false, msg: "Unauthorized to access this route", err})
  }
}

async function validateAuthor(req, res, next) {
  try { 
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.user.id)
      }
    });
    if (user.author == true) {
      next()
    } else {
      throw new Error("Unauthorized")
    }
  } catch(err) {
    return res.json({success: false, msg: "Unauthorized to make posts", err})
  }
}

module.exports = {
  checkUsername,
  validateUser,
  validateAuthor
}

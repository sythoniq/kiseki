const prisma = require('../configs/prisma.js')

async function handleLogin(req, res, next) {
  try {
    console.log('hi')
  } catch(err) {
    console.error(err)
  }
}

async function handleRegister(req, res, next) {
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

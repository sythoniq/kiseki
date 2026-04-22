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

module.exports = {
  checkUsername
}

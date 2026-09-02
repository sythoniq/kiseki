const prisma = require("./prisma.js")


async function validateUser(req, res, next) {
	if(!req.user) {
		return res.status(401).json({success: false, message: "Unauthorized!"})
	}	

	next();
}

async function validateAuthor(req, res, next) {
	if (!req.user.author) {
		return res.status(401).json({success: false, message: "Unauthorized!"})
	}
	
	next()
}

async function validateAdmin(req, res, next) {
	if (!req.user.admin) {
		return res.status(401).json({success: false, message: "Unauthorized!"})
	}

	next()
}

module.exports = {
	validateUser,
	validateAuthor,
	validateAdmin
}

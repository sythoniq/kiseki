const prisma = require("./prisma.js")

function validateUser(req, res, next) {
	if(!req.user) {
		return res.status(401).json({success: false, message: "Unauthorized!"})
	}	

	next();
}

function validateAuthor(req, res, next) {
	if(!req.user) {
		return res.status(401).json({success: false, message: "Unauthorized!"})
	}

	if (!req.user.author) {
		return res.status(401).json({success: false, message: "Unauthorized!"})
	}
	
	next()
}

function validateAdmin(req, res, next) {
	if (!req.user) {
		return res.status(401).json({success: false, message: "Unauthorized"})
	}

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

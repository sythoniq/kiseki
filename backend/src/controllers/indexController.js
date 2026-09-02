const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const prisma = require('../configs/prisma.js')

async function getUser(req, res, next) {
	try {
		const user = req.user

		return res.status(200).json({success: true, message: "User found", user})
	} catch(e) {
		return res.status(500).json({success: false, message: e.message})
	}
}

async function handleRegister(req, res, next) {
	try {
		if (!req.body.username || !req.body.password) {
			return res.status(400).json({success: false, message: "Missing data!"})
		}

		const { username, password } = req.body
		const user = await prisma.user.findUnique({
			where: { user_name: username }
		})

		if (user) {
			return res.status(409).json({success: false, message: "Failed to register!"})
		}

		const hash = await bcrypt.hash(password, 10)
		const newUser = await prisma.user.create({
			data: {
				user_name: username,
				user_hash: hash
			}
		})
		if (!newUser) {
			return res.status(500).json({success: false, message: "Unexpected error!"})
		}

		return res.status(200).json({success: true, message: "User created!"})
	} catch(e) {
		return res.status(500).json({success: false, message: e.message})
	}
}

async function handleLogin(req, res, next) {
	try {
		if (!req.body.username || !req.body.password) {
			return res.status(400).json({success: false, message: "Missing data!"})
		}

		const { username, password } = req.body;
		const user = await prisma.user.findUnique({
			where: {
				user_name: username
			}
		})

		if (!user) {
			return res.status(401).json({success: false, message: "Invalid credentials"})
		}
		
		const result = await bcrypt.compare(password, user.user_hash)
		if (!result) {
			return res.status(401).json({success: false, message: "Invalid credentials"})
		}

		const token = jwt.sign({userid: user.user_id, iat: Date.now()}, process.env.JWT_SECRET, {expiresIn: '7d'});

		return res.status(200).json({success: true, message: "Login successful", token: `Bearer ${token}`})
	}	catch(e) {
		return res.status(500).json({success: false, message: e.message})
	}
}

module.exports = {
	getUser,
	handleRegister,
  handleLogin
}

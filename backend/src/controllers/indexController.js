const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const prisma = require('../configs/prisma.js')

const validator = require("../utils/validation.js")

async function getUser(req, res, next) {
	try {
		const user = req.user

		return res.status(200).json({success: true, message: "User found", user})
	} catch(e) {
		return res.status(500).json({success: false, message: "Server Error!"})
	}
}

const handleRegister = [
	validator.validateUser,
	async function handleRegister(req, res, next) {
		try {
			const result = validator.validate(req, res)
			if (!result.success) return;
			const data = result.data

			const { username, password } = data
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

			return res.status(200).json({success: true, message: "User created!"})
		} catch(e) {
			return res.status(500).json({success: false, message: "Server Error!"})
		}
	}
]

const handleLogin = [
	validator.validateUser,
	async function handleLogin(req, res, next) {
		try {
			const result = validator.validate(req, res)
			if (!result.success) return;
			const data = result.data

			const { username, password } = data
			const user = await prisma.user.findUnique({
				where: {
					user_name: username
				}
			})

			if (!user) {
				return res.status(401).json({success: false, message: "Invalid credentials"})
			}

			const results = await bcrypt.compare(password, user.user_hash)
			if (!results) {
				return res.status(401).json({success: false, message: "Invalid credentials"})
			}

			const token = jwt.sign({userid: user.user_id, iat: Date.now()}, process.env.JWT_SECRET, {expiresIn: '7d'});

			return res.status(200).json({success: true, message: "Login successful", token: `Bearer ${token}`})
		}	catch(e) {
			return res.status(500).json({success: false, message: "Server Error!"})
		}
	}
]


module.exports = {
	getUser,
	handleRegister,
  handleLogin
}

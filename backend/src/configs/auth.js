const prisma = require("./prisma.js")
const jwt = require("jsonwebtoken")

module.exports = (async (req, res, next) => {
	try {
		if (!req.headers["authorization"]) {
			throw new Error("Authorization header missing")
		}
		const token = req.headers["authorization"].split(" ")[1];

		if (token == undefined || token == null) {
			req.user = null;
			return next()
		}

		const result = jwt.verify(token, process.env.JWT_SECRET);
		if (!result) {
			throw new Error("Verification failed")
		}

		const user = await prisma.user.findUnique({
			where: {
				user_id: result.userid
			},
			omit: {
				user_hash: true
			}
		})

		if (!user) {
			throw new Error("User not found!")
		}

		req.user = user
		return next()
	} catch (e) {
		req.user = null;
		return next()
	}
})

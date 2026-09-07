const { body, param, validationResult, matchedData } = require("express-validator")

const validateUser = [
	body("username").notEmpty().withMessage("Username not provided!")
		.isLength({min: 3}).withMessage("Username must be more than 3 characters!"),
	body("password").notEmpty().withMessage("Password not provided!")
		.isLength({min: 8}).withMessage("Password must be more than 8 characters!")
]

const validatePost = [
	param("postId").isInt().withMessage("Invalid post ID!").optional(),
	body("title").notEmpty().withMessage("Post title not provided!"),
	body("content").notEmpty().withMessage("Content not provided!"),
	body("category").notEmpty().withMessage("Category not provided!")
]

const validateComment = [
	param("postId").isInt().withMessage("Invalid post ID"),
	body("content").notEmpty().withMessage("Content not provided!")
]

// Special usecase validation... not certain on its usefulness or neccessity atm
const validateId = [
	param("postId").isInt({min: 0}).withMessage("Invalid post ID!").optional(),
	param("commentId").isInt({min: 0}).withMessage("Invalid comment ID!").optional()
]

function validate(req, res) {
	const result = validationResult(req)
	if (!result.isEmpty()) {
		res.status(400).json({ success: false, message: "Validation error", error: result.array()})
		return { success: false }
	}
	return { success: true, data: matchedData(req)}	
}

module.exports = {
	validateUser,
	validatePost,
	validateComment,
	validateId,
	validate
}

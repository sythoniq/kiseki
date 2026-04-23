const { Router } = require("express")
const posts = Router()

const controller = require("../controllers/postController.js")
const auth = require("../configs/helpers.js")

posts.get("/", controller.getPosts)
posts.get("/:postId", controller.getPost)
posts.get("/:postId/comments", controller.getPostComments)

posts.post("/upload", auth.validateUser, auth.validateAuthor, controller.uploadPost)
posts.post("/:postId/comment", auth.validateUser, controller.postComment)

module.exports = posts

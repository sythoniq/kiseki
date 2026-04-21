const { Router } = require("express")
const posts = Router()

const controller = require("../controllers/postController.js")

posts.get("/", controller.getPosts)
posts.get("/:postId", controller.getPost)
posts.get("/:postId/comments", controller.getPostComments)

posts.post("/upload", controller.uploadPost)
posts.post("/post/comment", controller.postComment)

module.exports = posts

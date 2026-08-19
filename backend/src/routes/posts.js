const { Router } = require("express")
const posts = Router()

const controller = require("../controllers/postController.js")

posts.get("/", controller.getPosts)
posts.get("/:postId", controller.getPost)

posts.get("/:postId/comments", controller.getPostComments)
posts.post("/:postId/comment", controller.postComment)

// Author/Admin routes
posts.post("/upload", controller.uploadPost)
posts.post("/:postId/update", controller.updatePost)
posts.post("/:postId/delete", controller.deletePost)
posts.post("/:postId/publish", controller.publishPost)
posts.post("/:postId/unpublish", controller.unpublishPost);
posts.post("/:postId/comment/:commentId", controller.deletePostComment)

module.exports = posts

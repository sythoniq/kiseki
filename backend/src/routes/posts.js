const { Router } = require("express")
const posts = Router()
const auth = require("../configs/middleware.js")

const controller = require("../controllers/postController.js")

posts.get("/", controller.getPosts)
posts.get("/:postId", controller.getPost)

posts.post("/:postId/comment", auth.validateUser, controller.postComment)

// Author/Admin routes
posts.post("/upload", auth.validateUser, auth.validateAuthor, controller.uploadPost)
posts.put("/:postId/update", auth.validateUser, auth.validateAuthor, controller.updatePost)
posts.delete("/:postId/delete", auth.validateUser, controller.deletePost)
posts.post("/:postId/publish", auth.validateUser, auth.validateAuthor, controller.publishPost)
posts.post("/:postId/unpublish", auth.validateUser, auth.validateAuthor, controller.unpublishPost);
posts.delete("/:postId/comment/:commentId", auth.validateUser, controller.deletePostComment)

module.exports = posts

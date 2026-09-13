const { Router } = require("express")
const posts = Router()
const auth = require("../configs/middleware.js")

const controller = require("../controllers/postController.js")

posts.get("/", controller.getPosts)
posts.get("/author", auth.validateUser, auth.validateAuthor, controller.getAllPosts)
posts.get("/:postId", controller.getPost)


// Author/Admin routes
posts.post("/upload", auth.validateUser, auth.validateAuthor, controller.uploadPost)
posts.put("/:postId/update", auth.validateUser, auth.validateAuthor, controller.updatePost)
posts.delete("/:postId/delete", auth.validateUser, controller.deletePost)
posts.put("/:postId/publish", auth.validateUser, auth.validateAuthor, controller.publishPost)
posts.put("/:postId/unpublish", auth.validateUser, auth.validateAuthor, controller.unpublishPost);

module.exports = posts

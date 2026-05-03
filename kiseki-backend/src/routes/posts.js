const { Router } = require("express")
const posts = Router()

const controller = require("../controllers/postController.js")
const auth = require("../configs/helpers.js")

posts.get("/", controller.getPosts)
posts.get("/:postId", controller.getPost)
posts.get("/:postId/comments", controller.getPostComments)


posts.post("/upload", auth.validateUser, auth.validateAuthor, controller.uploadPost)
posts.post("/:postId/update", auth.validateUser, auth.validateAuthor, controller.updatePost)
posts.post("/:postId/comment", auth.validateUser, controller.postComment)
posts.post("/:postId/delete", auth.validateUser, auth.validateAuthor, controller.deletePost)
posts.post("/:postId/comment/:commentId", auth.validateUser, auth.validateAuthor, controller.deletePostComment)
posts.post("/:postId/publish", auth.validateUser, auth.validateAuthor, controller.publishPost)
posts.post("/:postId/unpublish", auth.validateUser, auth.validateAuthor, controller.unpublishPost);


module.exports = posts

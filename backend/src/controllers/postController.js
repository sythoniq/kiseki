const prisma = require("../configs/prisma.js")
const validator = require("../utils/validation.js")

async function getPostById(postId) {
	const post = await prisma.post.findUnique({where: {post_id: postId}})

	if (!post) {
		return { success: false }
	}

	return { success: true, post}
}

async function getPosts(req, res, next) {
  try {
    const posts = await prisma.post.findMany({
			where: {
				published: true
			}
		})
		return res.status(200).json({success: true, posts});
  } catch(err) {
    return res.status(500).json({success: false, message: "Server Error"})
  } 
}

const getPost = [
	validator.validateId,
	async function getPost(req, res, next) {
		try {
			const result = validator.validate(req, res)
			if (!result.success) return;
			const data = result.data

			const post = await prisma.post.findUnique({
				where: { post_id: Number(data.postId), published: true },
				include: {
					comments: {
						select: {
							comment_id: true,
							comment_content: true,
							author: {
								select: {
									user_name: true
								},
							}
						}
					}
				}
			})

			if (!post) {
				return res.status(404).json({success: false, message:"Post not found!"})
			}

			return res.status(200).json({success: true, post})
		} catch(err) {
			return res.status(500).json({success: false, message: "Server Error"})
		}
	}
]

const uploadPost = [
	validator.validatePost,

	async function uploadPost(req, res, next) {
		try {
			const result = validator.validate(req, res)
			if (!result.success) return;
			const data = result.data
			const post = await prisma.post.create({
				data: {
					post_title: data.title,
					post_content: data.content,
					author_id: Number(req.user.user_id),
					post_category: data.category
				}
			})

			return res.status(200).json({success: true, message: "Post uploaded", post})
		} catch(err) {
			return res.status(500).json({success: false, message: "Server Error"})
		}
	}
]

const postComment = [
	validator.validateId,
	validator.validateComment,
	async function postComment(req, res, next) { 
		try {
			const result = validator.validate(req, res)
			if (!result.success) return;
			const data = result.data
				
			const postResult = getPostById(Number(data.postId))
			if (!postResult.success) {
				return res.status(404).json({ success: false, message: "Post not found!"})
			}

			const comment = await prisma.comment.create({
				data: {
					comment_content: data.content,
					author_id: Number(req.user.user_id),
					post_id: Number(data.postId) 
				}
			}) 

			return res.status(200).json({success: true, message: "Comment posted successfully", comment})
		} catch(err) {
			return res.status(500).json({success: false, message: "Server Error!"}); 
		} 
	}
]


const deletePost = [
	validator.validateId,
	async function deletePost(req, res, next) {
		try {
			const result = validator.validate(req, res)
			if (!result.success) return;
			const data = result.data


			const post = await prisma.post.findUnique({
				where: {
					post_id: Number(req.params.postId)
				}
			})

			if (!post) {
				return res.status(404).json({success: false, message: "Post not found"})
			}

			if (req.user.user_id != post.author_id && !req.user.admin) {
				return res.status(403).json({success: false, message: "Unauthorized!"})
			}

			await prisma.post.delete({
				where: {
					post_id: Number(req.params.postId)
				}
			})

			return res.status(200).json({success: true, message: "Post deleted!"})
		} catch(err) {
			return res.status(500).json({success: false, message: "Server Error!"});
		}
	}
]

const deletePostComment = [
	validator.validateId,
	async function deletePostComment(req, res, next) {
		try {
			const result = validator.validate(req, res)
			if (!result.success) return;
			const data = result.data


			const comment = await prisma.comment.findUnique({
				where: {
					comment_id: Number(data.commentId)
				}
			});

			if (!comment) {
				return res.status(404).json({success: false, message: "Comment not found!"})
			}

			if (comment.author_id != req.user.user_id && !req.user.admin) {
				return res.status(403).json({success: false, message: "Unauthorized!"})
			}

			await prisma.comment.delete({
				where: {
					comment_id: Number(req.params.commentId)
				}
			})

			return res.status(200).json({success: true, message: "Comment deleted!"})
		} catch (err) {
			return res.status(500).json({success: false, message: "Server Error"}) 
		}
	}
]

const updatePost = [
	validator.validateId,
	validator.validatePost,
	async function updatePost(req, res, next) {
		try {
			const result = validator.validate(req, res)
			if (!result.success) return;
			const data = result.data

			const post = await prisma.post.findUnique({
				where: {
					post_id: Number(data.postId)
				}
			})

			if (!post) {
				return res.status(404).json({success: false, message: "Post not found!"})
			}

			if (req.user.user_id != post.author_id) {
				return res.status(403).json({success: false, message: "Unauthorized!"})
			}

			const updatePost = await prisma.post.update({
				where: { post_id: Number(data.postId) },
				data: { post_title: data.title, post_content: data.content, post_category: data.category }
			})

			return res.status(200).json({success: true, message: "Post updated", updatePost})
		} catch(err) {
			return res.status(500).json({success: false, message: "Server Error"}) 
		}
	}
]

const publishPost = [
	validator.validateId,
	async function publishPost(req, res, next) {
		try {
			const result = validator.validate(req, res)
			if (!result.success) return;
			const data = result.data

			const post = await prisma.post.findUnique({
				where: {
					post_id: Number(data.postId)
				}
			})

			if (!post) {
				return res.status(404).json({success: false, message: "Post not found!"})
			}

			if (post.author_id != req.user.user_id) {
				return res.status(403).json({success: false, message: "Unauthorized!"})
			}

			if (post.published) {
				return res.status(200).json({success: true, message: "Post already published!"});
			}

			const publishPost = await prisma.post.update({
				where: { post_id: Number(data.postId) },
				data: { published: true }
			});
			return res.status(200).json({success: true, message: "Post published!"})

		} catch(err) {
			return res.status(500).json({success: false, message: "Server Error"})
		}
	}
]

const unpublishPost = [
	validator.validateId,
	async function unpublishPost(req, res, next) {
		try {
			const result = validator.validate(req, res)
			if (!result.success) return;
			const data = result.data

			const post = await prisma.post.findUnique({
				where: {
					post_id: Number(data.postId)
				}
			})

			if (!post) {
				return res.status(404).json({success: false, message: "Post not found!"})
			}

			if (post.author_id != req.user.user_id) {
				return res.status(403).json({success: false, message: "Unauthorized!"})
			}

			if (!post.published) {
				return res.status(200).json({success: true, message: "Post is not published!"});
			}

			await prisma.post.update({
				where: { post_id: Number(data.postId) },
				data: { published: false }
			});
			return res.status(200).json({success: true, message: "Post unpublished!"})

		} catch(err) {
			return res.status(500).json({success: false, message: "Server Error"})
		}
	}
]


module.exports = {
  getPosts,
  getPost,
  uploadPost,
  updatePost,
  postComment,
  deletePost,
  deletePostComment,
  publishPost,
  unpublishPost
}

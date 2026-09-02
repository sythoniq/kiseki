const prisma = require("../configs/prisma.js")

async function getPosts(req, res, next) {
  try {
    const posts = await prisma.post.findMany({
			where: {
				published: true
			}
		})
		return res.status(200).json({success: true, posts});
  } catch(err) {
    return res.status(500).json({success: false, message: err.message})
  } 
}
  
async function getPost(req, res, next) {
  try {
		if (isNaN(Number(req.params.postId))) {
			return res.status(400).json({success: false, message: "Invalid post id"})
		}

		const post = await prisma.post.findUnique({
			where: { post_id: Number(req.params.postId), published: true },
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
    return res.status(200).json({success: true, post})
  } catch(err) {
    return res.status(500).json({success: false, message: err.message})
  }
}

async function uploadPost(req, res, next) {
  try {
		if (!req.body.title || !req.body.content) {
			return res.status(400).json({success: false, message: "Data missing!"})
		}

    const post = await prisma.post.create({
      data: {
        post_title: req.body.title,
        post_content: req.body.content,
        author_id: Number(req.user.user_id),
				post_category: req.body.category
      }
    })
		
    return res.status(200).json({success: true, message: "Post uploaded", post})
  } catch(err) {
    return res.status(500).json({success: false, message: err.message})
  }
}
async function postComment(req, res, next) { 
  try {
		if (isNaN(Number(req.params.postId))) {
			return res.status(400).json({success: false, message: "Invalid post id"})
		}

		if (!req.body.content) {
			return res.status(400).json({success: false, message: "Missing data!"})
		}

    const comment = await prisma.comment.create({
      data: {
        comment_content: req.body.content,
        author_id: Number(req.user.user_id),
        post_id: Number(req.params.postId) 
      }
    }) 

    return res.status(200).json({success: true, message: "Comment posted successfully", comment})
  } catch(err) {
    return res.status(500).json({success: false, message: err.message}); 
  } 
}

async function deletePost(req, res, next) {
  try {
		if (isNaN(Number(req.params.postId))) {
			return res.status(400).json({success: false, message: "Invalid post id"})
		}

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

		const delPost = await prisma.post.delete({
			where: {
				post_id: Number(req.params.postId)
			}
		})

		return res.status(200).json({success: true, message: "Post deleted!"})
  } catch(err) {
    return res.status(500).json({success: false, message: err.message});
  }
}

async function deletePostComment(req, res, next) {
  try {
		const comment = await prisma.comment.findUnique({
			where: {
				comment_id: Number(req.params.commentId)
			}
		});

		if (!comment) {
			return res.status(404).json({success: false, message: "Comment not found!"})
		}

		if (comment.author_id != req.user.user_id && !req.user.admin) {
			return res.status(403).json({success: false, message: "Unauthorized!"})
		}

		const delComment = await prisma.comment.delete({
			where: {
				comment_id: Number(req.params.commentId)
			}
		})

		return res.status(200).json({success: true, message: "Comment deleted!"})
  } catch (err) {
    return res.status(500).json({success: false, message: err.message}) 
  }
}

async function updatePost(req, res, next) {
  try {
		if (isNaN(Number(req.params.postId))) {
			return res.status(400).json({success: false, message: "Invalid post id"})
		}

    const post = await prisma.post.findUnique({
      where: {
        post_id: Number(req.params.postId)
      }
    })

		if (!post) {
			return res.status(404).json({success: false, message: "Post not found!"})
		}

		if (req.user.user_id != post.author_id) {
			return res.status(403).json({success: false, message: "Unauthorized!"})
		}

		const updatePost = await prisma.post.update({
			where: { post_id: Number(req.params.postId) },
			data: { post_title: req.body.title, post_content: req.body.content}
		})

		return res.status(200).json({success: true, message: "Post updated", updatePost})
  } catch(err) {
    return res.status(500).json({success: false, message: err.message}) 
  }
}

async function publishPost(req, res, next) {
	try {
		if (isNaN(Number(req.params.postId))) {
			return res.status(400).json({success: false, message: "Invalid post id"})
		}

		const post = await prisma.post.findUnique({
			where: {
				post_id: Number(req.params.postId)
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
			where: { post_id: Number(req.params.postId) },
			data: { published: true }
		});
		return res.status(200).json({success: true, message: "Post published!"})

	} catch(err) {
		return res.status(500).json({success: false, message: err.message})
	}
}

async function unpublishPost(req, res, next) {
	try {
		if (isNaN(Number(req.params.postId))) {
			return res.status(400).json({success: false, message: "Invalid post id"})
		}

		const post = await prisma.post.findUnique({
			where: {
				post_id: Number(req.params.postId)
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

		const publishPost = await prisma.post.update({
			where: { post_id: Number(req.params.postId) },
			data: { published: false }
		});
		return res.status(200).json({success: true, message: "Post unpublished!"})

	} catch(err) {
		return res.status(500).json({success: false, message: err.message})
	}
}

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

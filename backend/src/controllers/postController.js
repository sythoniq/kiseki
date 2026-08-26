const prisma = require("../configs/prisma.js")

async function getPosts(req, res, next) {
  try {
    const posts = await prisma.post.findMany({})
		return res.status(200).json({success: true, posts});
  } catch(err) {
    return res.status(500).json({success: false, message: err.message})
  } 
}
  
async function getPost(req, res, next) {
  try {
		if (!req.params.postId) {
			return res.status(404).json({success: false, message: "Post Id not provided"})
		}
    const post = await prisma.post.findUnique({
      where: { post_id: Number(req.params.postId) },
			include: { comments: true },
    })

    return res.status(200).json({success: true, post})
  } catch(err) {
    return res.status(500).json({success: false, message: err.message})
  }
}

async function getPostComments(req, res, next) {
  try {
		const postId = Number(req.params.postId)
    const comments = await prisma.$queryRaw`
      SELECT comment_content, "User".user_name FROM "Comment" INNER JOIN "User" ON
      "Comment"."author_id"="User"."user_id" WHERE "Comment".post_id = ${postId};
    `;
    return res.status(200).json({success: true, comments})
  } catch(err) {
    return res.status(500).json({success: false, message: err.message})
  }
}

async function uploadPost(req, res, next) {
  try {
		if (!req.body.title || !req.body.content) {
			return res.status(400).json({success: false, message: "Data missing!"})
		}

		if (!req.user) {
			return res.status(401).json({success: false, message: "Unauthorized"})
		}

		const user = await prisma.user.findUnique({
			where: {
				user_id: req.user.userid
			}
		})

		if (!user.author) {
			return res.status(401).json({success: false, message: "Unauthorized"})
		}

    const post = await prisma.post.create({
      data: {
        post_title: req.body.title,
        post_content: req.body.content,
        author_id: Number(req.user.userid)
      }
    })
		
    return res.status(200).json({success: true, message: "Post uploaded", post})
  } catch(err) {
    return res.status(500).json({success: false, message: err.message})
  }
}
async function postComment(req, res, next) { 
  try {
		if (!req.body.content) {
			return res.status(400).json({success: false, message: "Missing data!"})
		}

		if (!req.user) {
			return res.status(401).json({success: false, message: "Unauthorized"})
		}

    const comment = await prisma.comment.create({
      data: {
        content: req.body.content,
        author_id: Number(req.user.userid),
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
		if (!req.user) {
			return res.status(401).json({success: false, message: "Unauthorized!"});
		}

		const user = await prisma.user.findUnique({
			where: {
				user_id: Number(req.user.userid)
			}
		})

		if(!user) {
			return res.status(401).json({success: false, message: "Unauthorized"})
		}
		
    const post = await prisma.post.findUnique({
      where: {
        post_id: Number(req.params.postId)
      }
    })

		if (!post) {
			return res.status(404).json({success: false, message: "Post not found"})
		}

		if (user.user_id != post.author_id) {
			return res.status(401).json({success: false, message: "Unauthorized!"})
		}

		const delPost = await prisma.post.delete({
			where: {
				post_id: Number(req.params.postId)
			}
		})
		// Checking what exactly prisma returns when delete is called
		console.log(delPost)
		return res.status(200).json({success: true, message: "Post deleted!"})
  } catch(err) {
    return res.status(500).json({success: false, message: err.message});
  }
}

async function deletePostComment(req, res, next) {
  try {
		if (!req.user) {
			return res.status(401).json({success: false, message: "Unauthorized!"})
		}

		const user = await prisma.user.findUnique({
			where: {
				user_id: Number(req.user.userid)
			}
		})

    const comment = await prisma.comment.findUnique({
      where: {
        comment_id: Number(req.params.commentId)
      }
    });

		if (!comment) {
			return res.status(404).json({success: false, message: "Comment not found!"})
		}

		if (comment.author_id != req.user.userid && !user.admin) {
			return res.status(401).json({success: false, message: "Unauthorized!"})
		}

		const delComment = await prisma.comment.delete({
			where: {
				comment_id: Number(req.params.commentId)
			}
		})

		return res.status(200).json({success: true, message: "Comment deleted!"})
  } catch (err) {
    return res.json({success: false, message: err.message}) 
  }
}

async function updatePost(req, res, next) {
  try {
		if (!req.user) {
			return res.status(401).json({success: false, message: "Unauthorized!"})
		}

		const user = await prisma.user.findUnique({
			where: {
				user_id: Number(req.user.userid)
			}
		})

    const post = await prisma.post.findUnique({
      where: {
        post_id: Number(req.params.postId)
      }
    })

		if (user.user_id != post.author_id) {
			return res.status(401).json({success: false, message: "Unauthorized!"})
		}

		if (!post) {
			return res.status(404).json({success: false, message: "Post not found!"})
		}

		// Not fully sensible way to do the post update fully relying on the client to provide everything so the frontend should always make sure i provide both title and content.... TT
		
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
		if (!req.user) {
			return res.status(401).json({success: false, message: "Unauthorized!"})
		}

		const user = await prisma.user.findUnique({
			where: {
				user_id: Number(req.user.userid)
			}
		})

		if (!user.author) {
			return res.status(401).json({success: false, message: "Unauthorized!"})
		}

		const post = await prisma.post.findUnique({
			where: {
				post_id: Number(req.params.postId)
			}
		})

		if (!post) {
			return res.status(404).json({success: false, message: "Post not found!"})
		}

		if (post.author_id != user.user_id) {
			return res.status(401).json({success: false, message: "Unauthorized!"})
		}

		if (post.published) {
			return;
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
		if (!req.user) {
			return res.status(401).json({success: false, message: "Unauthorized!"})
		}

		const user = await prisma.user.findUnique({
			where: {
				user_id: Number(req.user.userid)
			}
		})

		if (!user.author) {
			return res.status(401).json({success: false, message: "Unauthorized!"})
		}

		const post = await prisma.post.findUnique({
			where: {
				post_id: Number(req.params.postId)
			}
		})

		if (!post) {
			return res.status(404).json({success: false, message: "Post not found!"})
		}

		if (post.author_id != user.user_id) {
			return res.status(401).json({success: false, message: "Unauthorized!"})
		}

		if (!post.published) {
			return;
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
  getPostComments,
  uploadPost,
  updatePost,
  postComment,
  deletePost,
  deletePostComment,
  publishPost,
  unpublishPost
}

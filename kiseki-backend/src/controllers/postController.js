const prisma = require("../configs/prisma.js")

async function getPosts(req, res, next) {
  try {
    const posts = await prisma.post.findMany({})
    res.json({success: true, posts})
  } catch(err) {
    res.json({success: false, err})
  } 
}
  
async function getPost(req, res, next) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(req.params.postId) }
    })
    res.json({success: true, post})
  } catch(err) {
    console.error(err);
    res.json({success: false, err})
  }
}

async function getPostComments(req, res, next) {
  try {
    const comments = await prisma.$queryRaw`
      SELECT content, "User".name FROM "Comment" INNER JOIN "User" ON
      "Comment"."authorId"="User"."id";
    `;
    res.json({success: true, comments})
  } catch(err) {
    res.json({success: false, err})
  }
}
async function uploadPost(req, res, next) {
  try {
    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        authorId: Number(req.user.id)
      }
    })
    return res.json({success: true, msg: "Post uploaded", post})
  } catch(err) {
    return res.json({success: false, err})
  }
}
async function postComment(req, res, next) { 
  try {
    const comment = await prisma.comment.create({
      data: {
        content: req.body.content,
        authorId: Number(req.user.id),
        postId: Number(req.params.postId) 
      }
    }) 
    res.json({success: true, msg: "Comment posted successfully", comment})
  } catch(err) {
    console.log(err);
    res.json({success: false, msg: "Comment not posted", err}); 
  } 
}

async function deletePost(req, res, next) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.postId)
      }
    })
    if (post) {
      await prisma.post.delete({
        where: {
          id: Number(req.params.postid)
        }
      })
      return res.json({success: true, msg: "Post deleted successfully"})
    } else {
      throw new Error("Post doesnt exist")
    }
  } catch(err) {
    return res.json({success: false, msg: err});
  }
}

async function deletePostComment(req, res, next) {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: Number(req.params.commentId)
      }
    });
    if (comment) {
      await prisma.comment.delete({
        where: {
          id: Number(req.params.commentId)
        }
      }) 
      return res.json({success: true, msg: "Comment deleted"})
    } else {
      throw new Error("Comment not found")
    }
  } catch (err) {
    return res.json({success: false, msg: err}) 
  }
}

async function updatePost(req, res, next) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.postId)
      }
    })
    if (post) {
      const post = await prisma.post.update({
        where: { id: Number(req.params.postId ) },
        data: { title: req.body.title, content: req.body.content}
      })
      return res.json({success: true, msg: "Post updated", post})
    } else {
      throw new Error("Post not found")
    }
  } catch(err) {
    console.log(err);
    return res.json({success: false, msg: err}) 
  }
}

async function publishPost(req, res, next) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.postId)
      }
    })
    if (post) {
      await prisma.post.update({
        where: { id: Number(req.params.postId) },
        data: { published: true }
      })
      return res.json({success: true, msg: "Post published"})
    } else {
      throw new Error("Post not found")
    }
  } catch(err) {
    return res.json({success: false, msg: err})
  }
}

async function unpublishPost(req, res, next) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.postId)
      }
    }) 
    if (post) {
      await prisma.post.update({
        where: { id: Number(req.params.postId) },
        data: { published: false }
      }) 
      return res.json({success: true, msg: "Unpublished post"})
    } else {
      throw new Error("Post not found")
    }
  } catch(err) {
    return res.json({success: false, msg: err})
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

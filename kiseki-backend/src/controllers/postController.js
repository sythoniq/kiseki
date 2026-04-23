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
    const comments = await prisma.comment.findMany({
      where: {
        postId: Number(req.params.postId) 
      }
    })
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
        authorId: Number(req.body.authorid)
      }
    })
    return res.json({success: true, msg: "Post uploaded", post})
  } catch(err) {
    return res.json({success: false, err})
  }
}
async function postComment(req, res, next) { 
  try {
    const { content, authorid } = req.body; 
    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: Number(authorid),
        postId: Number(req.params.postId) 
      }
    }) 
    res.json({success: true, msg: "Comment posted successfully", comment})
  } catch(err) {
    console.log(err);
    res.json({success: false, msg: "Comment not posted", err}); 
  } 
}

module.exports = {
  getPosts,
  getPost,
  getPostComments,
  uploadPost,
  postComment
}

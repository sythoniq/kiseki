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
  console.log(req.body)
  try {
    await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        authorId: req.body.userId
      }
    })
    res.json({success: true, msg: "Post uploaded"})
  } catch(err) {
    console.error(err);
    res.json({success: false, err})
  }
}
async function postComment(req, res, next) { console.log("hi")}

module.exports = {
  getPosts,
  getPost,
  getPostComments,
  uploadPost,
  postComment
}

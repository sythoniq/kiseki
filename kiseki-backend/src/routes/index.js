const { Router } = require("express")
const index = Router()

const controller = require("../controllers/indexController.js")
const auth = require("../configs/helpers.js")

index.post("/register", controller.handleRegister)
index.post("/login", controller.handleLogin)
index.post("/auth", auth.validateUser, (req, res) => {
  const user = req.user;
  res.json({success: true, msg: "User authrorized", user})
})
index.post("/author", auth.validateAuthor)

module.exports = index

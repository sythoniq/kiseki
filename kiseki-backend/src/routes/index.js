const { Router } = require("express")
const index = Router()

const controller = require("../controllers/indexController.js")
const auth = require("../configs/helpers.js").validateUser

index.post("/register", controller.handleRegister)
index.post("/login", controller.handleLogin)
index.post("/auth", auth, (req, res) => {
  const user = req.user;
  res.json({success: true, msg: "User authrorized", user})
})

module.exports = index

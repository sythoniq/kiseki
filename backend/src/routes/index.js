const { Router } = require("express")
const index = Router()

const auth = require("../configs/middleware")
const controller = require("../controllers/indexController.js")

index.post("/", auth.validateUser, controller.getUser)

index.post("/register", controller.handleRegister)
index.post("/login", controller.handleLogin)
index.post("/role", auth.validateUser, controller.handleNewAuthor)

module.exports = index

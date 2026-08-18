const { Router } = require("express")
const index = Router()

const controller = require("../controllers/indexController.js")

index.post("/register", controller.handleRegister)
index.post("/login", controller.handleLogin)

module.exports = index

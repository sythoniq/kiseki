const express = require("express")
const app = express()

const index = require("./routes/index.js")
const posts = require("./routes/posts.js")

app.use("/", index)
app.use("/posts", posts)

app.listen(3000, (error) => {
  if (error) {
    console.error(error)
  }
  console.log("Server running on 3000")
})

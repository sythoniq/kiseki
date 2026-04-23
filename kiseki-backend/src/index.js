const cors = require('cors')
const express = require("express")
const app = express()

const index = require("./routes/index.js")
const posts = require("./routes/posts.js")

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", index)
app.use("/posts", posts)

app.listen(3000, (error) => {
  if (error) {
    console.error(error)
  }
  console.log("Server running on 3000")
})

import express from "express"
import cors from "cors"

import { usersRouter } from "./routes/users"
import { mailRouter } from "./routes/mail"

const app = express()
const port = process.env.PORT
const allowedOrigin = process.env.ALLOWED_ORIGIN

app.use(cors({ origin: allowedOrigin }))
app.use(express.json())

app.use("/users", usersRouter)
app.use("/mail", mailRouter)

app.get("/", (req, res) => {
  res.send("Cool Cars API is up and running")
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

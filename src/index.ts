import express from "express"
import cors from "cors"

import { usersRouter } from "./routes/users"
import { mailRouter } from "./routes/mail"

const app = express()
const port = process.env.PORT
const allowedOrigin = process.env.ALLOWED_ORIGIN

app.use(express.json())

app.use("/users", cors({ origin: allowedOrigin }), usersRouter)
app.use("/mail", mailRouter)

app.get("/", (req, res) => {
  res.send(process.env.MAIL_ALLOWED_ORIGIN)
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

import express from "express"
import { config as dotenvConfig } from "dotenv"

dotenvConfig()

const app = express()
const port = process.env.PORT

app.get("/", (req, res) => {
  res.send("Cool Cars API is up and running :)")
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

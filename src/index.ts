import express from "express"
import cors from "cors"

import axios from "axios"

import { usersRouter } from "./routes/users"

const app = express()
const port = process.env.PORT
const allowedOrigin = process.env.ALLOWED_ORIGIN

app.use(cors({ origin: allowedOrigin }))
app.use(express.json())

app.use("/users", usersRouter)

app.get("/", (req, res) => {
  res.send("Cool Cars API is up and running")
})

app.use("/sms", async (req, res) => {
  const response = await axios.post(
    `https://xkjev4.api.infobip.com/sms/3/messages`,
    {
      messages: [
        {
          destinations: [
            {
              to: "40743100368"
            }
          ],
          content: {
            text: "Hello, this is a test message"
          }
        }
      ]
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `App ${process.env.INFOBIP_API_KEY}`
      }
    }
  )

  res.send(response.data)
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

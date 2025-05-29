import { Router } from "express"
import cors from "cors"
import { rateLimit } from "express-rate-limit"

import { handlePostRequest } from "./services/post"

const contactRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  handler: (_, res) =>
    res
      .status(429)
      .json({ error: "Too many requests, please try again later." })
})

export const mailRouter = Router()

mailRouter.use(cors({ origin: process.env.MAIL_ALLOWED_ORIGIN }))
mailRouter.options("/", contactRateLimiter)
mailRouter.post("/", handlePostRequest)

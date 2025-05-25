import { Router } from "express"
import cors from "cors"

import { handlePostRequest } from "./services/post"

export const mailRouter = Router()

mailRouter.post(
  "/",
  cors({ origin: process.env.MAIL_ALLOWED_ORIGIN }),
  handlePostRequest
)

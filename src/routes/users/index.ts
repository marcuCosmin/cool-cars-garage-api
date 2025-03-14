import { Router } from "express"
import { config as dotenvConfig } from "dotenv"

import { handleGetRequest } from "./services/get"
import { handleDeleteRequest } from "./services/delete"

dotenvConfig()

export const usersRouter = Router()

usersRouter.get("/", handleGetRequest)
usersRouter.delete("/", handleDeleteRequest)

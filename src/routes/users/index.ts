import { Router } from "express"

import { handleGetRequest } from "./services/get"
import { handleDeleteRequest } from "./services/delete"

export const usersRouter = Router()

usersRouter.get("/", handleGetRequest)
usersRouter.delete("/", handleDeleteRequest)

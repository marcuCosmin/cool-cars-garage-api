import { Router } from "express"

import { handleGetRequest } from "./services/get"
import { handleDeleteRequest } from "./services/delete"
import { handleInviteRequest } from "./services/invite"
import { handleCreateRequest } from "./services/create"

export const usersRouter = Router()

usersRouter.get("/", handleGetRequest)
usersRouter.delete("/", handleDeleteRequest)
usersRouter.post("/", handleCreateRequest)
usersRouter.post("/invite", handleInviteRequest)

import { Router } from "express"

import { validate } from "../middleware/validation.middleware"
import AuthMiddleware from "../middleware/auth.middleware"
import { loginSchema, signupSchema } from "../schema/auth.schema"
import { getSession, login, logout, refreshToken, signup, updateAuth } from "../controller/auth.controller"
import RefreshTokenMiddleware from "../middleware/refreshToken.middleware"

const AuthRouter = Router()

AuthRouter.post("/signup", validate(signupSchema), signup)
AuthRouter.post("/login", validate(loginSchema), login)
AuthRouter.get("/refresh-token", RefreshTokenMiddleware, refreshToken)
AuthRouter.get("/session", getSession)
AuthRouter.put("/:id", AuthMiddleware, updateAuth)
AuthRouter.post("/logout", AuthMiddleware, logout)

export default AuthRouter

import { Request, Response, CookieOptions } from "express"

import { CatchError, TryError } from "../lib/error"
import { AuthTokensInterface, SessionRequestInterface } from "../types/auth.interface"

import * as AuthService from "../services/auth.service"
import { baseCookieOptions, setCookies } from "../lib/setCookies"
import { successResponse } from "../lib/response"


// Signup Controller
export const signup = async (req: Request, res: Response) => {
  try {
    await AuthService.registerUser(req.body)
    res.status(201).json({ message: "Signup successful." })
  } catch (err) {
    CatchError(res, err, "Signup failed.")
  }
}

// Login Controller
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Check credentials
    const user = await AuthService.validateUserLogin(email, password)

    // Create tokens
    const tokens: AuthTokensInterface = await AuthService.createAuthTokens({
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      mobile: user.mobile,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    })

    // set cookie using helper function setCookies
    setCookies(res, tokens)

    res.json({ message: "Login successful" })
  } catch (err) {
    CatchError(res, err, "Login failed")
  }
}

// Refresh Token 
export const refreshToken = async (req: SessionRequestInterface, res: Response) => {
  try {
    const session = req.session
    if(!session) 
      throw TryError("Unauthorized.", 401)

    const tokens: AuthTokensInterface = await AuthService.createAuthTokens(session)

    // set cookie using helper function setCookies
    setCookies(res, tokens)

    res.json({ message: "Token refreshed successfully." })
  } catch (err) {
    CatchError(res, err, "Failed to refresh tokens.")
  }
}

// Session
export const getSession = async(req: Request, res: Response)=>{
  try {
    const accessToken = req.cookies?.accessToken

    if(!accessToken)
      throw TryError('Invalid session.', 401)

    const session = await AuthService.verifySession(accessToken)
    
    res.json(session)

  } catch (err) {
    CatchError(res, err, "Invalid session.")
  }
}

// update user 
export const updateAuth = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await AuthService.updateUser(id, req.body)
    res.json(successResponse("Success: User info update successful.", user))
  } catch (err) {
    CatchError(res, err, "Failed to update user info.")
  }
}

// Logout Controller
export const logout = async (req: SessionRequestInterface, res: Response) => {
  try {
    const session = req.session
    if(!session) 
      throw TryError("Unauthorized", 401)

    await AuthService.clearRefreshToken(session.id.toString())

    const expiredOptions: CookieOptions = {
      ...baseCookieOptions,
      maxAge: 0,
    }

    res.clearCookie("accessToken", expiredOptions)
    res.clearCookie("refreshToken", expiredOptions)

    res.json({ message: "Logout successful." })
  } catch (err) {
    CatchError(res, err, "Failed to logout.")
  }
}

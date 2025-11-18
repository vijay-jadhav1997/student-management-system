import AuthModel from "../model/auth.model"
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
import moment from "moment"
import { v4 as uuid } from "uuid"
import { AuthTokensInterface, SessionInterface } from "../types/auth.interface"
import { config } from "../config"
import { TryError } from "../lib/error"
import { SignupInput } from "../schema/auth.schema"

const ACCESS_TOKEN_EXPIRES_IN = "10m"
const ACCESS_TOKEN_MAXAGE_IN_MS = 10 * 60 * 1000
const REFRESH_TOKEN_MAXAGE_IN_MS = 7 * 24 * 60 * 60 * 1000

const REFRESH_TOKEN_DAYS = 7

// Generate access + refresh tokens
export const generateTokens = (payload: SessionInterface) => {
  const accessToken = jwt.sign(payload, config.jwtSecret, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  })
  const refreshToken = uuid()
  return { accessToken, refreshToken }
}

// Update refresh token in DB
export const updateRefreshToken = async (userId: string, refreshToken: string) => {
  await AuthModel.updateOne(
    { _id: userId },
    {
      $set: {
        refreshToken,
        expiry: moment().add(REFRESH_TOKEN_DAYS, "days").toDate(),
      },
    }
  )
}

// Create tokens and store refresh token in DB
export const createAuthTokens = async (user: SessionInterface): Promise<AuthTokensInterface> => {
  const { accessToken, refreshToken } = generateTokens(user)

  await updateRefreshToken(user.id.toString(), refreshToken)

  return {
    accessToken,
    refreshToken,
    accessTokenMaxAge: ACCESS_TOKEN_MAXAGE_IN_MS,
    refreshTokenMaxAge: REFRESH_TOKEN_MAXAGE_IN_MS,
  }
}

// create a new user in Database
export const registerUser = async (data: SignupInput) => {
  return await AuthModel.create(data)
}

// Validate credentials
export const validateUserLogin = async (email: string, password: string) => {
  const user = await AuthModel.findOne({ email })
  if (!user) throw TryError("User not found", 404)

  const isLogin = await bcrypt.compare(password, user.password)
  if (!isLogin) throw TryError("Invalid credentials", 400)

  return user
}

// Clear refresh token from DB - logout
export const updateUser = async (userId: string, data:SignupInput) => {
  const user = await AuthModel.findByIdAndUpdate(
    userId,
    { $set: data },
    {new: true}
  )
  return { 
    id: user._id,
    fullname: user.fullname,
    mobile: user.mobile,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    avatar: user.avatar,
  }
}

// Clear refresh token from DB - logout
export const clearRefreshToken = async (userId: string) => {
  await AuthModel.updateOne(
    { _id: userId },
    { $set: { refreshToken: null, expiry: null } }
  )
}

// verify session
export const verifySession = async (accessToken: string) => {
  const session = jwt.verify(accessToken, config.jwtSecret) as JwtPayload
  return { 
    id: session?.id,
    fullname: session?.fullname,
    mobile: session?.mobile,
    email: session?.email,
    createdAt: session?.createdAt,
    updatedAt: session?.updatedAt,
    avatar: session?.avatar,
  }
}

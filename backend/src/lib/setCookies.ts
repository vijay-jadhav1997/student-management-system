import { CookieOptions, Response } from "express"
import { config } from "../config"
import { AuthTokensInterface } from "../types/auth.interface"

export const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: config.nodeEnv !== "development",
  sameSite: config.nodeEnv === 'development' ? 'lax' : 'none',
  // domain: config.domain,
}

export const setCookies = (res:Response, tokens: AuthTokensInterface) => {
  // Set cookies
  res.cookie("accessToken", tokens.accessToken, {
    ...baseCookieOptions,
    maxAge: tokens.accessTokenMaxAge,
  })
  res.cookie("refreshToken", tokens.refreshToken, {
    ...baseCookieOptions,
    maxAge: tokens.refreshTokenMaxAge,
  })
}
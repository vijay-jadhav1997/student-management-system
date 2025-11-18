import { Request } from "express"
import { Types } from "mongoose"

export interface SessionInterface {
	id: Types.ObjectId
	fullname: String
	email: String
	mobile: String
	avatar?: String | null
	createdAt?: Date
	updatedAt?: Date
}

export interface SessionRequestInterface extends Request{
	session?: SessionInterface
}

export interface AuthTokensInterface {
	accessToken: string
	refreshToken: string
	accessTokenMaxAge: number
	refreshTokenMaxAge: number
}
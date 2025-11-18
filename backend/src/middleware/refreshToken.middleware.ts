import { NextFunction, Response } from "express"
import { CatchError, TryError } from "../lib/error"
import AuthModel from "../model/auth.model"
import { SessionInterface, SessionRequestInterface } from "../types/auth.interface"
import moment from "moment"

const RefreshTokenMiddleware = async (req:SessionRequestInterface, res: Response, next: NextFunction) => {
	try {
		const refreshToken = req.cookies?.refreshToken
		
		if(!refreshToken)
			throw TryError("Refresh token required", 403)
		
		const user = await AuthModel.findOne({refreshToken})
		
		if(!user)
			throw TryError("User not found.", 404)
		
		const today = moment()
		const expiry = moment(user.expiry)
		
		if(today.isAfter(expiry))
			throw TryError("refresh token expired", 401)
		

		const session: SessionInterface = {
			id: user._id,
			fullname: user.fullname,
			email: user.email,
			mobile: user.mobile,
			avatar: user.avatar,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		}

		req.session = session
		next()
	} catch (err) {
			CatchError(res, err, "Failed to refresh tokens.")
	}
}

export default RefreshTokenMiddleware
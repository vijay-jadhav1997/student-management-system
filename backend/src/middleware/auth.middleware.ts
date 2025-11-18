import { NextFunction, Response } from "express"
import { CatchError, TryError } from "../lib/error"
import jwt, { JwtPayload } from "jsonwebtoken"
import { SessionInterface, SessionRequestInterface } from "../types/auth.interface"

const AuthMiddleware = async (req: SessionRequestInterface, res: Response, next: NextFunction) => {
	try {
		const accessToken = req.cookies?.accessToken

		if (!accessToken)
			throw TryError("Unauthorized.", 401)

		if (!process.env.JWT_SECRET)
			throw TryError("Server misconfiguration: JWT secret missing.", 500)

		let user: JwtPayload
		try {
			user = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload
		} catch {
			throw TryError("Invalid or expired token.", 403)
		}

		if (!user.id || !user.email)
			throw TryError("Invalid token payload.", 400)

		const session: SessionInterface = {
			id: user.id,
			fullname: user.fullname,
			email: user.email,
			mobile: user.mobile,
		}

		req.session = session
		next()
	} catch (err) {
		CatchError(res, err, "Failed to authenticate.")
	}
}

export default AuthMiddleware
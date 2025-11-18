import { Response } from "express"
import {z as zod} from "zod"

interface CatchError extends Error {
	status? : number
}

export const TryError = (message: string, status: number)=>{
	const err: CatchError = new Error(message)
	err.status = status
	return err
}

export const CatchError = (res: Response, err: unknown, prodMsg: string = "Internal Server error.")=>{
	if(err instanceof zod.ZodError){
		return res.status(400).json({
			success: false,
			message: err.message,
			errors: err.issues
		})

	}
	
	if(err instanceof Error){
		const message = (process.env.NODE_ENV === 'development' ? err.message : prodMsg)
		const status: number = (err as CatchError).status || 500

		return res.status(status).json({
			success: false,
			message,
		})
	}
	return res.status(500).json({ success: false, message: "Internal server error." })
}
export const successResponse = (message: string= "Operation Successful", data: any = null )=>{
  const response = {
    success: true,
    message,
    data
  }
  return response
}

export const ErrorResponse = (message: string= "Operation Successful", errors: any = null )=>{
  const response = {
    success: false,
    message,
    errors
  }
  return response
}
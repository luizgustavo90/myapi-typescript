import { NextFunction, Request, Response } from 'express'
import { decode } from 'jsonwebtoken'

type JwtPayloadProps = {
  sub: string
}

export const addUserInfo = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Access token not present',
    })
  }
  const token = authHeader.replace('Bearer ', '')
  if (!token) {
    return res.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Access token not present',
    })
  }
  try {
    const decodedToken = decode(token)
    const { sub } = decodedToken as JwtPayloadProps
    req.user = { id: sub }
  } catch (err) {
    return res.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Access token not present',
    })
  }
}

import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response, response } from 'express'
import { Secret, verify } from 'jsonwebtoken'
import authConfig from '@config/auth'

type JwtPayloadProps = {
  sub: string
}

export const userInfo = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Access token not present',
    })
  }
  const token = authHeader.replace('Bearer ', '')
  if (!token) {
    return response.status(401).json({
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
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Access token not present',
    })
  }
}

import { RefreshToken } from '@users/entities/RefreshToken'
import { MongoInvalidArgumentError } from 'typeorm'

type CreateRefreshTokenDTO = {
  token: string
  valid: boolean
  user_id: string
  expires: Date
}

export interface IRefreshTokenRepository {
  create({
    expires,
    token,
    user_id,
    valid,
  }: CreateRefreshTokenDTO): Promise<RefreshToken>

  findByToken(token: string): Promise<RefreshToken | null>
  invalidate(refresh_token: RefreshToken): Promise<void>
}

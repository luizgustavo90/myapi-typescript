import { RefreshToken } from '@users/entities/RefreshToken'
import {
  CreateRefreshTokenDTO,
  IRefreshTokenRepository,
} from './IRefreshTokenRepository'
import { Repository } from 'typeorm'
import { dataSource } from '@shared/typeorm'
import { appendFile } from 'fs'
import { AppError } from '@shared/errors/AppError'

export class RefreshTokenRepository implements IRefreshTokenRepository {
  private repository: Repository<RefreshToken>
  constructor() {
    this.repository = dataSource.getRepository(RefreshToken)
  }
  async create({
    expires,
    token,
    user_id,
    valid,
  }: CreateRefreshTokenDTO): Promise<RefreshToken> {
    const refreshToken = this.repository.create({
      expires,
      token,
      user_id,
      valid,
    })
    return this.repository.save(refreshToken)
  }
  async findByToken(token: string): Promise<RefreshToken> {
    return this.repository.findOneBy({ token })
  }
  async invalidate(refresh_token: RefreshToken): Promise<void> {
    const refreshToken = await this.findByToken(refresh_token.token)
    if (!refreshToken) {
      throw new AppError(`token not found`)
    }
    refreshToken.valid = false
    await this.repository.save(refreshToken)
  }
}

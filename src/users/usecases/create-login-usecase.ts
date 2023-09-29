import { User } from '@users/entities/User'
import { AppError } from '@shared/errors/AppError'
import { IUsersRepository } from '@users/repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import jwtconfig from '@config/auth'
import { IRefreshTokenRepository } from '@users/repositories/IRefreshTokenRepository'

type CreateLoginDTO = {
  email: string
  password: string
}

type IResponse = {
  user: User
  accessToken: string
  refreshToken: string
}

@injectable()
export class CreateLoginUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('RefreshTokenRepository')
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute({ email, password }: CreateLoginDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordConfirmed = await compare(password, user.password)
    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const accessToken = sign({}, jwtconfig.jwt.secret, {
      subject: user.id,
      expiresIn: jwtconfig.jwt.expiresIn,
    })

    const expires = new Date(Date.now() + jwtconfig.refreshToken.duration)
    const refreshToken = sign({}, jwtconfig.refreshToken.secret, {
      subject: user.id,
      expiresIn: jwtconfig.refreshToken.expiresIn,
    })
    await this.refreshTokenRepository.create({
      token: refreshToken,
      expires,
      user_id: user.id,
      valid: true,
    })
    return { user, accessToken, refreshToken }
  }
}

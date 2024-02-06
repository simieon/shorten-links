import {Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import {RegisterUserDto} from "./dto/register-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {GoogleCredentials, GoogleLoginUserDto} from "./dto/google-login-user.dto";
import {OAuth2Client} from "google-auth-library";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto){
    return this.authService.register(registerUserDto)
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto){
    return this.authService.login(loginUserDto)
  }

  @Post('google/login')
  async googleLogin(@Body() googleLoginUserDto: GoogleLoginUserDto){
    const ticket = await client.verifyIdToken({
      idToken: googleLoginUserDto.token,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const {email} = ticket.getPayload()
    const credentials: GoogleCredentials = {
      email
    }
    const data = await this.authService.googleLogin(credentials)

    return {
      ...data
    }
  }
}

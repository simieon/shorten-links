import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";
import {RegisterUserDto} from "./dto/register-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import * as bcrypt from "bcrypt";
import {keys} from "../config/keys";
import {GoogleCredentials} from "./dto/google-login-user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(registerUserDto: RegisterUserDto){
    const user = await this.userRepository.findOneBy({email: registerUserDto.email})

    if(user){
      throw new BadRequestException('User already exists')
    }

    const hash = await bcrypt.hash(registerUserDto.password, keys.jwtSalt)
    const newUser = this.userRepository.create({...registerUserDto, password: hash})

    return this.userRepository.save(newUser)
  }

  async login(loginUserDto: LoginUserDto){
    const user = await this.userRepository.findOneBy({email: loginUserDto.email})

    if(!user){
      throw new BadRequestException('Invalid login or password')
    }

    if (!await bcrypt.compare(loginUserDto.password, user.password)) {
      throw new BadRequestException('Invalid login or password')
    }

    const payload = {sub: user.id, email: user.email}

    return {
      access_token: await this.jwtService.signAsync(payload),
      userId: user.id
    }
  }

  async googleLogin(credentials: GoogleCredentials){
    const user = await this.userRepository.findOneBy({email: credentials.email})

    if(user){
      const payload = {sub: user.id, email: user.email}
      return {
        access_token: await this.jwtService.signAsync(payload),
        userId: user.id
      }
    }

    const newUser = this.userRepository.create({...credentials})
    await this.userRepository.save(newUser)

    const payload = {sub: newUser.id, email: newUser.email}
    return {
      access_token: await this.jwtService.signAsync(payload),
      userId: newUser.id
    }
  }
}

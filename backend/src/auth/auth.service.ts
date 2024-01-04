import {BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";
import {RegisterUserDto} from "./dto/register-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import * as bcrypt from "bcrypt";
import {keys} from "../config/keys";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(registerUserDto: RegisterUserDto){
    const user = await this.userRepository.findOneBy({email: registerUserDto.email})

    if(user){
      return {message: "User already exists", statusCode: 400}
    }

    const hash = await bcrypt.hash(registerUserDto.password, keys.jwtSalt)
    const newUser = this.userRepository.create({...registerUserDto, password: hash})

    return this.userRepository.save(newUser)
  }

  async login(loginUserDto: LoginUserDto){
    const user = await this.userRepository.findOneBy({email: loginUserDto.email})

    if(!user){
      return {statusCode: 400, message: 'Wrong login or password'}
    }

    if (!await bcrypt.compare(loginUserDto.password, user.password)) {
      return {statusCode: 400, message: 'Wrong login or password'}
    }

    const payload = {sub: user.id, email: user.email}

    return {
      access_token: await this.jwtService.signAsync(payload),
      userId: user.id
    }
  }
}

import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {keys} from "../config/keys";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean>{
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if(!token){
      throw new UnauthorizedException()
    }

    try {
      request['user'] = await this.jwtService.verifyAsync(
        token,
        {
          secret: keys.jwtSecret
        }
      )
    } catch{
      console.log(1)
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined{
    const [type, token] = request.headers['authorization']?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
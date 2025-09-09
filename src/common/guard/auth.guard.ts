import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { config } from "src/config/env.config";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly jwt:JwtService){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request=context.switchToHttp().getRequest()
        const auth:string=request.headers.authorization
        if(!auth){
            throw new UnauthorizedException('Unauthorization')
        }
        const bearer=auth.split(' ')[0]
        const token=auth.split(' ')[1]
        if(bearer!=='Bearer' || !token){
            throw new UnauthorizedException('Unauthorization')
        }
        try {
            const data=this.jwt.verify(token,{
                secret:config.TOKEN.ACCESS_KEY
            })
            if(!data?.is_active){
                throw new ForbiddenException('User is not found')
            }
            request.user=data
            return true
        } catch (error) {
            throw new UnauthorizedException('Token is expired or incorrect')
        }
    }
}
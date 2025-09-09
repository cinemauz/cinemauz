import { createParamDecorator, ExecutionContext, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";

export const  CookieGetter=createParamDecorator(
    async (data:string,context:ExecutionContext):Promise<string>=>{
        try {
            const request=context.switchToHttp().getRequest()
            const refreshToken=request.cookies[data]
            if(!refreshToken){
                throw new UnauthorizedException('Refresh Token not found')
            }
            return refreshToken
        } catch (error) {
            throw new InternalServerErrorException(
                `Error on reading cookie: ${error}`
            )
        }
    }
)
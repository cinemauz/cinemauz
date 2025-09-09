import { HttpStatus, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "src/config/env.config";
import cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export class Application {
    static async main(): Promise<void> {
        const app = await NestFactory.create(AppModule)

        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        }))

        app.use(cookieParser())

        const api='api'
        app.setGlobalPrefix(api)
        const configSwagger=new DocumentBuilder()
            .setTitle('Theatr')
            .setVersion('1.0.0')
            .addBearerAuth({
                type:'http',
                scheme:'Bearer',
                in:'Header'
            })
            .build()

        const documentSwagger=SwaggerModule.createDocument(app,configSwagger)
        SwaggerModule.setup(api,app,documentSwagger)

        const PORT = Number(config.PORT) ?? 3003
        app.listen(PORT,()=>console.log('Server is running',PORT))
    }
}

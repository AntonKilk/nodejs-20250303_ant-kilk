import { APP_GUARD } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { JwtGuard } from "./auth/jwt.guard";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import dbConfig from "./config/database";
import jwtConfig from "./config/jwt";
import oauthConfig from "./config/oauth";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig, jwtConfig, oauthConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(dbConfig.asProvider()),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}

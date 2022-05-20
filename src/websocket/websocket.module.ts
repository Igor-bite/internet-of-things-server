import { Module } from '@nestjs/common';
import { WebsocketGateway } from "./websocket.gateway";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [UsersModule, JwtModule.register({
    publicKey: process.env.JWT_PUBLIC_KEY
  })],
  providers: [WebsocketGateway],
  exports: [WebsocketGateway]
})
export class WebsocketModule {}
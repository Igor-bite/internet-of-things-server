import { Module } from '@nestjs/common';
import { WebsocketGateway } from "./app.gateway";

@Module({
  providers: [WebsocketGateway],
  exports: [WebsocketGateway]
})
export class WebsocketModule {}
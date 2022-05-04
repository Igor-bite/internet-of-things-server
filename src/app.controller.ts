import { Get, Controller, Render, Query } from "@nestjs/common";
import { WebsocketGateway } from "./gateway/app.gateway";

@Controller()
export class AppController {
  constructor(private readonly socket: WebsocketGateway) {}

  @Get()
  @Render('index')
  root() {
    return { isLogged: false };
  }

  @Get('notify')
  notify(
    @Query('message') message: string
  ) {
    this.socket.sendMessage(message);
    return { status: "OK" }
  }
}

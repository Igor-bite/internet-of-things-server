import { Get, Controller, Render, Query } from "@nestjs/common";
import { WebsocketGateway } from "./websocket/websocket.gateway";
import DevicesService from "./devices/devices.service";

@Controller()
export class AppController {
  constructor(private readonly socket: WebsocketGateway, private readonly devicesService: DevicesService) {}

  @Get()
  @Render('index')
  root() {
    return { isLogged: false };
  }

  @Get('notify')
  async notify(
    @Query('message') message: string,
    @Query('deviceId') deviceToken?: string
  ) {
    let device = await this.devicesService.getDeviceByToken(deviceToken);
    this.socket.sendMessageToUser(message, device.ownerId);
    return { status: "OK" }
  }
}
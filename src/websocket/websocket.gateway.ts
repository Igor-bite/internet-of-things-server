import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { JwtService } from "@nestjs/jwt";
import UsersService from "../users/users.service";
import * as fs from "fs";

@WebSocketGateway( {
  cors: {
    origin: '*',
  },
})
@UseGuards(AuthGuard)
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

  @WebSocketServer() server: Server;
  private clients = []; // userId : socketId

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.sendMessageToSocket(payload, client.id);
  }

  afterInit(server: Server) {
    console.log('Websocket Init');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    const token = client.handshake.headers.cookie.split(';')[0].split('=')[1];
    const userId = this.decodeUserIdFrom(token);
    userId.then(
      result => {
        if (result) {
          this.remove(result);
          console.log(this.clients.map( value => {
            return value.userId;
          }));
        }
      },
      error => {
        console.log("User was not found: " + error);
      }
    );
  }

  remove(userId: number) {
    for (let i = 0; i < this.clients.length; i++) {
      if ( this.clients[i].userId === userId) {
        this.clients.splice(i, 1);
      }
    }
  }

  async decodeUserIdFrom(token: string) {
    token = token.replace("%3D", "").replace("%3D", "").replace("%3D", "").replace("%3D", "")
    console.log(`Decoding token:\n${token}`);
    let payload = token.split('.')[1]
    let decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('ascii'));

    /*try {
      let returned = this.jwtService.verify(token, {
        algorithms: ['RS256']
      });
      console.log(`Returned ${returned} `);
    } catch (e) {
      console.log(e);
    }*/
    let user = await this.usersService.getUserBySupertokenId(decodedPayload.userId);
    return user.id
  }

  handleConnection(
    client: Socket
  ) {
    const token = client.handshake.headers.cookie.split(';')[0].split('=')[1];
    const userId = this.decodeUserIdFrom(token);
    userId.then(
      result => {
        if (result) {
          this.clients.push({
            userId:   result,
            socketId: client.id
          });
        }
      },
      error => {
        console.log("User was not found: " + error);
      }
    );
    console.log(`Client connected: socketId: ${client.id}`);
  }

  sendMessageToSocket(message: string, socketId: string) {
    this.server.to(socketId).emit('msgToClient', message);
  }

  sendMessageToUser(message: string, userId: number) {
    console.log(this.clients.map( value => {
      return value.userId;
    }));
    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i].userId === userId) {
        const socketId = this.clients[i].socketId
        this.sendMessageToSocket(message, socketId);
      }
    }
  }
}
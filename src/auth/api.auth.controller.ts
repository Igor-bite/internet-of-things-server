import {
  Get,
  Controller,
  Query,
  UnauthorizedException, Render, Response
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { map } from "rxjs/operators";
import UsersService from "../users/users.service";
import CreateUserDto from "../users/dto/createUser.dto";
import { Response as Res } from 'express';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export default class ApiAuthController {
  constructor(private readonly httpService: HttpService,
              private readonly usersService: UsersService) {}

  @Get('callback/github')
  @ApiOkResponse({ description: 'Todo found and returned' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No todo with this id' })
  @Render('index')
  async githubCallback(
    @Query('code') code: number,
    @Response({ passthrough: true }) res: Res
  ) {
    if (!code) {
      return { isLogged: false }
    }

    const result = await lastValueFrom(
      this.httpService
        .post(
          'http://localhost:3000/api/auth/signinup',
          JSON.stringify({
            code,
            redirectURI: 'http://localhost:3000/callback/github',
            thirdPartyId: 'github',
          }),
          {
            headers: {
              rid: 'thirdparty',
              'Content-Type': 'application/json',
            },
          },
        )
        .pipe(
          map((r) => {
            return {
              headers: r.headers,
              data: r.data,
            };
          }),
        ),
    );
    const data = result.data;
    let cookie = result.headers["set-cookie"];
    const user = data.user;
    const email = user.email;
    const id = user.id;

    const newUser = Object.assign(new CreateUserDto(), {
      email: email,
      name: email,
      supertokenId: id
    });
    let finalUser = await this.usersService.getUserBySupertokenId(id);
    if (!finalUser) {
      finalUser = await this.usersService.addUser(id, newUser);
    }
    res.header( 'set-cookie', cookie);
    return { isLogged: true, name: finalUser.name };
  }
}
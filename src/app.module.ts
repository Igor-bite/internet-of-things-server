import { Module } from '@nestjs/common';
import { RouterModule } from "@nestjs/core";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from "./api/api.module";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from "./users/users.module";

@Module({
  imports: [ConfigModule.forRoot(),
            ApiModule,
            UsersModule,
            RouterModule.register([
              {
                path: 'api',
                module: ApiModule,
              }]
            ),
            AuthModule.forRoot({
              connectionURI: process.env.CONNECTION_URI,
              apiKey: process.env.API_KEY,
              appInfo: {
                appName: process.env.APP_NAME,
                apiDomain: process.env.API_DOMAIN,
                websiteDomain: process.env.WEBSITE_DOMAIN,
                apiBasePath: process.env.API_BASE_PATH,
                websiteBasePath: process.env.WEBSITE_BASE_PATH
              },
            }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

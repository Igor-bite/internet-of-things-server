import { Module } from '@nestjs/common';
import { RouterModule } from "@nestjs/core";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from "./api/api.module";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(),
            ApiModule,
            RouterModule.register([
              {
                path: 'api',
                module: ApiModule,
              }]
            ),
            AuthModule.forRoot({
              connectionURI: "https://a89ebc61c61911ec8aa6f9f72d564744-eu-west-1.aws.supertokens.io:3567",
              apiKey: "kNZcBk1kH7J1latt3psabC2yTY=UfH",
              appInfo: {
                appName: "IoTServer",
                apiDomain: "http://localhost:3000",
                websiteDomain: "http://localhost:3000",
                apiBasePath: "/api/auth",
                websiteBasePath: "/login"
              },
            }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

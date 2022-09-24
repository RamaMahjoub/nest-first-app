import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';
import { AccessTokenGuard } from './guards/accessToken.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  getHello(@Headers('Authorization') auth: string) {
    const jwt = auth.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt, { json: true }) as {
      uuid: string;
    };
    console.log(json['sub']);
    return this.appService.getHello();
  }
}

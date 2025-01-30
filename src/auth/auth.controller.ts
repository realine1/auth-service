import { Controller, Post, Body, Inject, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy, // Correct injection
  ) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user$ = this.userService.send({ cmd: 'get-user' }, { username: body.username });
    const user = await firstValueFrom(user$);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    await this.authService.validateUser(body.username, body.password, user);
    return this.authService.login(user);
  }
}

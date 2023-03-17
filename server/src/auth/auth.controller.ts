import { Controller, UseGuards, Request, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

type User = {
    username: string,
    password: string
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() req: User) {
        return this.authService.login(req);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }

    @Post('register')
    register(@Body() req: User): Promise<string> {
        return this.authService.register(req.password);
    }
}
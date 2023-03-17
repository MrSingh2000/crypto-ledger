import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { crypto } from 'src/interface/crypto.interface';
import mongoose from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

@Controller('crypto')
export class CryptoController {
    constructor(private readonly cryptoService: CryptoService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('buy')
    buy(@Body() res: crypto): Promise<string> {
        return this.cryptoService.buy(res);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('sell/:id')
    sell(@Body() res: crypto, @Param('id') id: string): Promise<string> {
        return this.cryptoService.sell(res, id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('del/:id')
    del(@Param('id') id: string): Promise<string> {
        return this.cryptoService.del(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('data')
    getData(): Promise<any> {
        return this.cryptoService.getData();
    }
}

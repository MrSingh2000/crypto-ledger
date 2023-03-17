import { Module } from '@nestjs/common';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CryptoScehma } from 'src/schemas/crypto.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [MongooseModule.forFeature([{name: 'crypto', schema: CryptoScehma}]), AuthModule],
    controllers: [CryptoController],
    providers: [CryptoService],
})
export class CryptoModule { }

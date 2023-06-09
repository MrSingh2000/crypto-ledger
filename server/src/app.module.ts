import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './test/cats/cats.module';
import { CryptoModule } from './crypto/crypto.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), MongooseModule.forRoot(process.env.MONGO_URI, { dbName: 'cryptoledger' }), CatsModule, CryptoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

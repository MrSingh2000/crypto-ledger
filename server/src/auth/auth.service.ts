import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDoc } from 'src/schemas/auth.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    // injecting the model
    constructor(
        @InjectModel("user") private userModel: Model<AuthDoc>,
        private jwtService: JwtService
    ) { }

    async verify(username: string, pass: string): Promise<any> {
        let data = await this.userModel.findOne({ username: username });

        if (!data)
            return null;

        const isMatch = await bcrypt.compare(pass, data.password);

        if (!isMatch)
            return null;

        let { password, ...res } = data;

        return res;
    }

    async login(user: any) {
        console.log("login data: ", user);
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async register(password: string): Promise<string> {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);

        let data: { username: string, password: string } = {
            username: "admin",
            password: hash
        };

        try {
            await this.userModel.create(data);
            return "Success";
        } catch (error) {
            return "Error occurred!";
        }
    }

}

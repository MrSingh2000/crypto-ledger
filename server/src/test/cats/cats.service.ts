import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
    getFunction(): string {
        return "Get function works";
    }
}

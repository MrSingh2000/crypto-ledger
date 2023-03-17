import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDoc = HydratedDocument<Auth>;

@Schema()
export class Auth {
    @Prop({ required: true, unique: true })
    username: string

    @Prop({ required: true })
    password: string
}

export const AuthScehma = SchemaFactory.createForClass(Auth);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CryptoDoc = HydratedDocument<Crypto>;

@Schema()
export class Crypto {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    quantity: number

    @Prop()
    buy: number

    @Prop()
    sell: {
        price: number,
        quantity: number,
        sdate: number
    }[]

    // Note: Dates need to be handled on the frontend
    @Prop()
    bdate: Date

    // values not provided by the user
    @Prop()
    profit: number[]
}

export const CryptoScehma = SchemaFactory.createForClass(Crypto);
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Mongoose, mongo } from 'mongoose';
import { crypto } from 'src/interface/crypto.interface';
import { CryptoDoc } from 'src/schemas/crypto.schema';

@Injectable()
export class CryptoService {
    // injecting the model
    constructor(@InjectModel("crypto") private cryptoModel: Model<CryptoDoc>) { }

    async buy(data: crypto): Promise<string> {
        // create new record
        if ("buy" in data) {
            const doc = new this.cryptoModel({
                ...data,
                bdate: Date.now()
            });
            doc.save()
            return "Success";
        }
        return "Invalid Data";
    }

    async sell(data: crypto, id: string): Promise<string> {
        let mId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
        let doc = await this.cryptoModel.findById(mId).lean();

        if (!doc)
            return "Entry not found";

        if (doc.quantity - data.quantity < 0 || data.quantity === 0)
            return "Not enough credits";

        let sellArr: {
            price: number,
            quantity: number,
            sdate: number
        }[] = [...doc.sell];
        
        sellArr.push({
            price: data.sell,
            quantity: data.quantity,
            sdate: Date.now()
        });

        let profitArr: number[] = [...doc.profit];
        profitArr.push((data.sell - doc.buy) * data.quantity);

        // calculating profit
        let newData: object = {
            name: doc.name,
            bdate: doc.bdate,
            buy: doc.buy,
            quantity: doc.quantity - data.quantity,
            sdate: Date.now(),
            sell: sellArr,
            profit: profitArr
        }

        await this.cryptoModel.findOneAndUpdate({ _id: doc._id }, newData);

        return 'Success';
    }

    async del(id: string): Promise<string> {
        let mId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
        await this.cryptoModel.findByIdAndDelete(mId);
        return "Successs";
    }

    async getData(): Promise<any> {
        let data = await this.cryptoModel.find();
        return data;
    }

}

export interface data {
    _id: any,
    name: string,
    quantity: number,
    buy: number,
    sell: {
        price: number,
        quantity: number,
        sdate: number
    }[],
    bdate: Date,
    profit: number[],
    __v: any
}

export interface buyCoin {
    name: string,
    buy: number,
    quantity: number
}

export interface sellCoin {
    sell: number,
    quantity: number
}
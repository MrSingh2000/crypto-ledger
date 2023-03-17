import mongoose from "mongoose"

export interface crypto {
    name?: string,
    buy: number,
    sell: number,
    bdate: Date,
    sdate: Date,
    quantity: number
}
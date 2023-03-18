import { buyCoin, data, sellCoin } from "./data.interface";
import React from 'react';

export interface ContextData {
    token: string,
    setToken: React.Dispatch<React.SetStateAction<string>>,
    data: data[],
    getData: () => void,
    buy: buyCoin,
    setBuy: React.Dispatch<React.SetStateAction<buyCoin>>,
    handleAdd: () => void,
    handleDelete: (id: string) => void,
    isBuy: boolean,
    setIsBuy: React.Dispatch<React.SetStateAction<boolean>>,
    handleSell: (id: string) => void,
    sell: sellCoin,
    setSell: React.Dispatch<React.SetStateAction<sellCoin>>,
    profileProfit: number,
    handleLogin: (data: {
        username: string,
        password: string
    }) => void,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
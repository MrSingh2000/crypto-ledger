import { useState, ReactNode, useContext } from "react";
import defaultContext from "./context";
import axios from "axios";
import Constants from 'expo-constants';
import { buyCoin, data, sellCoin } from "../interface/data.interface";

// create the note state
const ContextStore = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState("");

  const [data, setData] = useState<data[]>([]);
  const [buy, setBuy] = useState<buyCoin>({ name: "", buy: 0, quantity: 0 });
  const [isBuy, setIsBuy] = useState(false);
  const [sell, setSell] = useState<sellCoin>({ sell: 0, quantity: 0 });
  const [profileProfit, setProfileProfit] = useState<number>(0);

  const handleProfileProfit = (data: data[]) => {
    let total: number = 0;
    data.map((item: data) => {
      total += item.profit.reduce((a, b) => a + b, 0);
    });

    setProfileProfit(total);
  }

  const getData = () => {
    axios({
      url: `${Constants.expoConfig?.extra?.apiUrl}/crypto/data`,
      method: 'get',
      headers: {
        'authtoken': token
      }
    })
      .then(function (response) {
        setData(response.data);
        handleProfileProfit(response.data);
      })
      .catch(function (error) {
        console.log("Error: ", error);
      })
  }

  const handleAdd = () => {
    if (buy.name === "" || buy.buy === 0 || buy.quantity === 0)
      return;
    axios({
      url: `${Constants.expoConfig?.extra?.apiUrl}/crypto/buy`,
      method: 'post',
      data: buy,
      headers: {
        'authtoken': token
      }
    }).then((res) => {
      setBuy({ name: "", buy: 0, quantity: 0 });
      getData();
    }).catch((err) => {
      console.log("error: ", err);
    })
  }

  const handleDelete = (id: string) => {
    axios({
      url: `${Constants.expoConfig?.extra?.apiUrl}/crypto/del/${id}`,
      method: 'delete',
      headers: {
        'authtoken': token
      }
    }).then((res) => {
      getData();
    }).catch((err) => {
      console.log("error: ", err);
    })
  }

  const handleSell = (id: string) => {
    console.log(sell);
    if (sell.sell === 0 || sell.quantity === 0)
      return;
    axios({
      url: `${Constants.expoConfig?.extra?.apiUrl}/crypto/sell/${id}`,
      method: 'post',
      headers: {
        'authtoken': token
      },
      data: sell
    }).then((res) => {
      console.log("res: ", res);
      getData();
    }).catch((err) => {
      console.log("error: ", err);
    })
  }

  const handleLogin = (data: {
    username: string,
    password: string
  }) => {
    console.log(data);
    axios({
      url: `${Constants.expoConfig?.extra?.apiUrl}/auth/login`,
      method: 'post',
      data
    }).then((res) => {
      setToken(res.data.access_token);
    }).catch((err) => {
      console.log("error: ", err);
    })
  }

  // this is the boiler for creating a context, always same whenever use context
  return (
    // value holds the things needs to be accessed in other components
    <defaultContext.Provider value={{
      token,
      setToken,
      data,
      getData,
      buy,
      setBuy,
      handleAdd,
      handleDelete,
      isBuy,
      setIsBuy,
      handleSell,
      sell,
      setSell,
      profileProfit,
      handleLogin
    }}>
      {/* {console.log("new: ", token)} */}
      {children}
    </defaultContext.Provider>
  )
}

export default ContextStore;
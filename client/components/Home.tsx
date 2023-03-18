import { View, Text, StyleSheet, FlatList, TextInput, TouchableHighlight, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Box } from 'native-base';
import { data } from './interface/data.interface';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ModalCustom from './ModalCustom';
import defaultContext from './context/context';
import { FontAwesome5 } from '@expo/vector-icons';
import Preloader from './Preloader';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home() {
    const { setToken,
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
        loading,
        setLoading
    } = useContext(defaultContext);

    const handleChange = (key: string, e: string | number) => {
        if (typeof e === "string") {
            setBuy(oldstate => ({ ...oldstate, [key]: e }));
        }
        else if (typeof e === "number") {
            setBuy(oldstate => ({ ...oldstate, [key]: e }));
        }
    }

    const handleSellChange = (key: string, e: string) => {
        setSell(oldstate => ({ ...oldstate, [key]: parseFloat(e) }));
    }

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [Id, setId] = useState<string>("");
    const onModalClose = () => {
        setIsModalVisible(false);
    };


    const FlatList_Header = () => {
        return (
            <View style={{
                height: 20,
                width: "100%",
                borderBottomColor: 'black',
                borderBottomWidth: 0.5,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                backgroundColor: '#E1F2FE'
            }}>
                <Text>Qt.</Text>
                <Text>Price</Text>
                <Text>Date</Text>
            </View>
        );
    }

    const Card = (id: string, item: data) => {
        let buydate: Date = new Date(item.bdate);
        let profit: number = item.profit.reduce((a, b) => a + b, 0);

        return (
            <Box key={id} style={styles.box}>
                <View style={[styles.flex, { alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'black', paddingHorizontal: 5 }]}>
                    <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome5 name="bitcoin" size={24} color="#FFD670" />
                        <Text style={{ marginLeft: 5 }}>
                            {item.name}
                        </Text>
                    </Box>
                    <Text style={{ backgroundColor: '#0EAD69', paddingHorizontal: 5, color: "white", borderRadius: 5, fontWeight: 'bold' }}>
                        {item.quantity}
                    </Text>
                </View>
                <View style={[styles.flex, { flex: 3, borderBottomWidth: 1, borderBottomColor: 'black' }]}>
                    <View style={[styles.flex, { paddingHorizontal: 2, flexDirection: 'column', borderRightWidth: 1, borderRightColor: 'black' }]}>
                        <View style={[styles.flex, { padding: 5 }]}>
                            <Text>
                                Buy
                            </Text>
                            <Text>
                                Rs. {item.buy}
                            </Text>
                        </View>
                        <View style={[styles.flex, { flexDirection: 'row', paddingHorizontal: 5 }]}>
                            <Text>
                                Date
                            </Text>
                            <Text>
                                {buydate.toLocaleDateString()}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.flex, { padding: 2, flexDirection: 'column' }]}>
                        <Text style={{ flex: 1, marginLeft: 5, fontSize: 15 }}>
                            Sell
                        </Text>
                        <View style={{ flex: 3 }}>
                            {/* Flatlist */}
                            <FlatList showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]} ListHeaderComponent={FlatList_Header} style={[styles.list]}
                                data={item.sell}
                                renderItem={({ index, item }) => {
                                    let d = new Date(item.sdate);
                                    return (
                                        <View key={index} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                            <Text style={{ fontSize: 10 }}>{item.quantity.toFixed(2)}</Text>
                                            <Text style={{ fontSize: 10 }}>{item.price}</Text>
                                            <Text style={{ fontSize: 10 }}>{d.toLocaleDateString()}</Text>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={[styles.flex, { justifyContent: 'space-between', paddingHorizontal: 5, alignItems: 'center' }]}>
                    <Box style={{ flexDirection: 'row', backgroundColor: `${profit >= 0 ? '#0EAD69' : '#FF0000'}`, paddingHorizontal: 5, borderRadius: 5 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>
                            Profit:
                        </Text>
                        <Text style={{ marginLeft: 5, color: 'white' }}>
                            {profit.toFixed(2)}
                        </Text>
                    </Box>
                    <Box style={{ flexDirection: 'row' }}>
                        <TouchableHighlight
                            style={[styles.btnNormal]}
                            underlayColor={'#FF7070'}
                            onPress={() => {
                                setIsModalVisible((prev) => !prev);
                                setIsBuy(false);
                                setId(id);
                            }}>
                            <Text style={{ color: 'white' }}>Sell</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[styles.btnNormal, { marginLeft: 10, backgroundColor: '#FCFAD9', borderColor: '#E10606', width: 35, paddingHorizontal: 5 }]}
                            underlayColor={'white'}
                            onPress={() => { handleDelete(id) }}>
                            <MaterialCommunityIcons name="delete" size={24} color="#E10606" />
                        </TouchableHighlight>
                    </Box>
                </View>
            </Box>
        )
    };

    useEffect(() => {
        getData();
    }, [])

    const logout = async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem('@token');
            setToken("");
        } catch (e) {
            console.log("Error in local storage clearing: ", e);
        }
    }


    return loading ? (
        <Preloader />
    ) : (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }} stickyHeaderIndices={[0]}>
                {/* Heading */}
                <Box style={styles.heading}>
                    <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25, textAlign: 'center' }}>
                            Transactions
                        </Text>
                        <TouchableHighlight
                            style={{ backgroundColor: 'white', shadowColor: 'black', elevation: 5, borderRadius: 10, padding: 10, marginTop: 5, marginRight: 5 }}
                            underlayColor={'white'}
                            onPress={logout}>
                            <Entypo name="log-out" size={24} color="black" />
                        </TouchableHighlight>
                    </Box>
                    <Text style={{ width: 120, margin: 5, color: 'white', borderRadius: 20, backgroundColor: `${profileProfit >= 0 ? '#0EAD69' : '#FF0000'}`, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
                        Profit: {profileProfit}
                    </Text>
                </Box>
                {/* Content */}
                <Box style={{ flex: 12, width: '100%' }}>
                    {data.map((item: data) => {
                        return Card(item._id, item);
                    })}
                </Box>
            </ScrollView>
            <TouchableHighlight
                style={[styles.addBtn]}
                underlayColor={'white'}
                onPress={() => {
                    setIsModalVisible((prev) => !prev);
                    setIsBuy(true);
                }}>
                <AntDesign name="pluscircleo" size={44} color="#06DB06" />
            </TouchableHighlight>
            <ModalCustom isVisible={isModalVisible} onClose={onModalClose}>
                {
                    isBuy ? (
                        // Buy Box
                        <Box style={{ padding: 5 }}>
                            <Text style={{ paddingHorizontal: 18 }}>
                                Coin/Token
                            </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(e) => handleChange("name", e)}
                                placeholder="Name"
                            />
                            <Box style={{ flexDirection: 'row', paddingHorizontal: 18 }}>
                                <Text style={{ flex: 1 }}>
                                    Quantity
                                </Text>
                                <Text style={{ flex: 1, marginLeft: 40 }}>
                                    Price
                                </Text>
                            </Box>
                            <Box style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={[styles.input, { flex: 1 }]}
                                    onChangeText={(e) => handleChange("quantity", e)}
                                    placeholder="Quantity"
                                    keyboardType="numeric"
                                />
                                <TextInput
                                    style={[styles.input, { flex: 1 }]}
                                    onChangeText={(e) => handleChange("buy", e)}
                                    placeholder="Price"
                                    keyboardType="numeric"
                                />
                            </Box>
                            <TouchableHighlight
                                style={[styles.btnNormal, { width: 150, marginHorizontal: '30%', backgroundColor: '#06DB06', borderColor: '#06DB06' }]}
                                underlayColor={'green'}
                                onPress={() => {
                                    handleAdd();
                                    onModalClose();
                                }}>
                                <Text style={{ textAlign: 'center', color: "white" }}>
                                    Add
                                </Text>
                            </TouchableHighlight>
                        </Box>
                    ) : (
                        // Sell Box
                        <Box style={{ padding: 5, marginTop: 30 }}>
                            <Box style={{ flexDirection: 'row', paddingHorizontal: 18 }}>
                                <Text style={{ flex: 1 }}>
                                    Quantity
                                </Text>
                                <Text style={{ flex: 1, marginLeft: 40 }}>
                                    Price
                                </Text>
                            </Box>
                            <Box style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={[styles.input, { flex: 1 }]}
                                    onChangeText={(e) => handleSellChange("quantity", e)}
                                    placeholder="Quantity"
                                    keyboardType="numeric"
                                />
                                <TextInput
                                    style={[styles.input, { flex: 1 }]}
                                    onChangeText={(e) => handleSellChange("sell", e)}
                                    placeholder="Price"
                                    keyboardType="numeric"
                                />
                            </Box>
                            <TouchableHighlight
                                style={[styles.btnNormal, { width: 150, marginHorizontal: '30%' }]}
                                underlayColor={'#FF7070'}
                                onPress={() => {
                                    handleSell(Id);
                                    onModalClose();
                                    setId("");
                                }}>
                                <Text style={{ textAlign: 'center', color: "white" }}>
                                    Sell
                                </Text>
                            </TouchableHighlight>
                        </Box>
                    )
                }

            </ModalCustom>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    box: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        height: 200,
        width: '100%',
        padding: 5,
        marginBottom: 10,
    },
    flex: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    list: {
        width: '100%'
    },
    heading: {
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 50,
        flex: 1
    },
    btnNormal: {
        backgroundColor: '#E10606',
        borderRadius: 100,
        marginTop: 5,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#E10606'
    },
    addBtn: {
        backgroundColor: 'white',
        borderRadius: 100,
        marginTop: 5,
        paddingVertical: 0,
        paddingHorizontal: 0,
        position: 'absolute',
        right: 20,
        bottom: 20,
        shadowColor: 'black',
        elevation: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
});
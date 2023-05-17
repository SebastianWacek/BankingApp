import * as React from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider, useSafeArea, StatusBar } from "native-base";
import { Image, StyleSheet, KeyboardAvoidingView, View, TouchableOpacity } from "react-native";
import {Fontisto, MaterialIcons} from '@expo/vector-icons';
import { useState, useEffect } from "react";
import {LinearGradient} from 'expo-linear-gradient';
import { SafeAreaView } from "react-native";
import NumberPlate from "../Components/NumberPlate";

export default PinScreen = ({navigation}) => {
    const[pinCount, setPinCount] = useState(0);
    const[pin, setPin] = useState('');
    console.log(pin)

    const renderPins = () => {
        const pins = [];
        
        for(let x = 1; x <= 6; x++){
            pins.push(
                x <= pinCount ? (
                    <Box style={styles.pinContainer} key={x}>
                        <Box style={styles.pin} />
                    </Box>
                ) : (
                    <Box style={styles.pinContainer} key={x}/>
                )
            );
        }

        return pins;
    };

    useEffect(() => {
        if(pinCount === 6 & pin==="151119"){
            navigation.navigate("Tab");
    }

    }, [pinCount]);

    const pressKey = (item, index) => {
        setPinCount(prev => {
            if (index === 10) {
                if (prev > 0) {
                    setPin(prevPin => prevPin.slice(0, -1));
                    return prev - 1;
                } else {
                    return prev;
                }
            } else if (prev < 6) {
                setPin(prevPin => prevPin + item);
                return prev + 1;
            } else {
                return prev;
            }
        });
    };
    return (
        <View style={styles.container}>
            <Box w="100%" style={{alignItems: 'center'}}>
                <Image 
                    source={require("../Images/logo.png")}
                    style={styles.logo}
                    alt={"Alt"}
                />
            </Box>
            <Box>
                <Text style={styles.text}>Wprowadź PIN</Text>
            </Box>
            <Box w="80%" style={styles.accessPin}>
                {renderPins()}
            </Box>
            {pinCount <= 6 && <NumberPlate onPress={pressKey}/>}
            <Box 
        style={{padding: 16, flexDirection:'row', alignItems:'center', justifyContent:"center"}}
        
      >
        <MaterialIcons name = "fingerprint" color="#89b6f3" size={25} />
        <Text 
          onPress={()=> navigation.navigate("Touch")} delayPressIn={0}
          style = {[styles.info, {fontFamily: 'sans-serif-thin'}]}
          >
            Zaloguj odciskiem palca</Text>
      </Box>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#534582',
        alignItems: 'center',
    },
    logo: {
        width: 250,
        height: 250, 
        marginTop: 20,
    },
    UseTouchID: {
        marginTop: 32,
        marginBottom: 64,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    accessPin: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 32,
        marginBottom: 64,
    },
    pin: {
        width: 10,
        height: 10,
        borderRadius: 4,
        backgroundColor: '#89b6f3',
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#eaeaea',
        fontSize: 18,
    },
    info: {
        color: '#eaeaea',
        fontWeight: "bold",
        fontSize:16,
        marginLeft:8,
      },
    pinContainer: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor:'#89b6f3',
        alignItems: 'center',
        justifyContent: 'center'
    },

    
})
    
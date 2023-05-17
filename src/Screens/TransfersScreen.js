import * as React from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider, StatusBar } from "native-base";
import { Image, StyleSheet, KeyboardAvoidingView, View, TouchableOpacity } from "react-native";
import {Fontisto, MaterialIcons, FontAwesome5} from '@expo/vector-icons';
import NumberPlate from "../Components/NumberPlate";

export default TransfersScreen = () => {
    const [amount, setAmount] = React.useState("0");

    const pressKey = (item, index) => {
      setAmount((prev) => {
        return index != 10 ? prev + item : prev.slice(0, prev.length-1);
      });
    };

    const convertToPLN = (currentAmount) => {
        const newAmount=currentAmount / 100;

        return newAmount.toLocaleString("pl", { style: "currency", currency: "PLN" });
    };

  return <Box safeArea w="100%" h="100%" bgColor={"#534582"}>
      <Box style = {styles.container}>
        <Box style={{alignItems: 'center'}}>
        <Text style={{alignItems: 'center', fontWeight: 600, fontSize:25, lineHeight:25, marginTop:25, color:'white'}}>Przelew</Text>
        </Box>      
        <Box style = {styles.amount}>
        <Text style={{fontSize:40,lineHeight:40,fontWeight:'bold',color:'white'}}>{convertToPLN(amount)}</Text>
        <Text style={{fontWeight:700, fontSize:20, color: '#D4C9F5', padding:10}}>Wpisz kwotę przelewu</Text>
        </Box>

        <Box style = {styles.receiver}>
        <Image source={require("../Images/pgnig.png")} style={{width: 60,height:60, borderRadius:30, marginLeft:5, marginBottom:6}} />
          <Box style = {styles.receiverDetails}>
            <Text style={{fontSize:18, fontWeight:600, color: 'white'}}>PGNiG</Text>
            <Text style={{fontSize:16, fontWeight:500, color: 'grey'}}>Opłata za gaz</Text>
            </Box>  
            <FontAwesome5 name="user-edit" size={30} color={'#89b6f3'} />
        </Box>
        <Box style={{alignItems: 'center'}}>
        <TouchableOpacity style={styles.send}>
          <Text style={{fontSize:18, fontWeight:'bold'}}>Przelej {convertToPLN(amount)} do PGNiG</Text>
        </TouchableOpacity>
        </Box>

      <NumberPlate onPress={pressKey} />
      </Box>
      </Box>
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    amount: {
      marginTop:64,
      alignItems: 'center',

    },
    receiver: {
      marginTop: 25,
      marginBottom: 16,
      flexDirection:'row',
      alignItems: 'center',
      marginRight:15,
      marginLeft:15,
    },
    receiverDetails:{
      flex: 1,
      marginLeft:15,
    },
    send: {
      marginTop: 8,
      backgroundColor:'#89b6f3',
      padding:16,
      width: '80%',
      alignItems: 'center',
      borderRadius:12,
      marginBottom:14
    }
    
  })
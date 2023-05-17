import * as React from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider, StatusBar } from "native-base";
import { Image, StyleSheet, KeyboardAvoidingView, View, TouchableOpacity } from "react-native";
import {Fontisto, MaterialIcons} from '@expo/vector-icons';

import {LinearGradient} from 'expo-linear-gradient';

export default TouchScreen = ({ navigation }) => {
  return <Center w="100%" h="100%" bgColor={"#534582"}>

<KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <Box safeArea w="100%" maxW="290">
      <Image 
        source={require("../Images/logo.png")}
        style = {styles.logo}
        alt={"Alt"}/>
      </Box>
      <Box style = {styles.touch}>
      <TouchableOpacity>
      <Box 
        style ={styles.fingerprint}
        >
      <Box 
        style ={[styles.fingerprint, {backgroundColor: '#534582'}]}
        >
          <Box
            style ={[styles.fingerprint, {backgroundColor: "#63529a"}]}>
                <Box
              style ={[styles.fingerprint, {backgroundColor: "#7764b8"}]}>
                    <Box
                style ={[styles.fingerprint, {backgroundColor: "#8b75d5"}]}>
                      <TouchableOpacity style={styles.button} onLongPress={() => navigation.navigate("Tab")}>
                      <LinearGradient
          colors={['#8df49b', '#89b6f3' ]}
          start={{ x: 0, y: 0.7 }}
          end={{ x: 0.6, y: 0.6 }}
          style={styles.linearGradient}>
            <MaterialIcons name="fingerprint" size={64} color="white" />
            </LinearGradient>
                      </TouchableOpacity>
                     
                    </Box>
                </Box>
          </Box>
        
      </Box>
      </Box>
      </TouchableOpacity>
      </Box>
      <Box><Text style = {[styles.info, {fontSize: 20}]}>Użyj odcisku palca{"\n"} aby się zalogować</Text></Box>
      <Box 
        style={{marginTop: 16, padding: 16, flexDirection:'row', alignItems:'center', justifyContent:"center"}}
        
      >
        <Fontisto name = "locked" color="#89b6f3" size={16} />
        <Text 
          onPress={()=> navigation.navigate("Pin")} delayPressIn={0}
          style = {[styles.info, {fontFamily: 'sans-serif-thin'}]}
          >
            Lub zamiast tego, użyj kodu pin</Text>
      </Box>
      </KeyboardAvoidingView>
    </Center>
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        width:250,
        height: 250, 
        marginTop:20,
      },
    touch: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:20,
    },
    fingerprint: {
    backgroundColor: '#534582',
    padding: 25,
    borderRadius: 999,

    },
    button: {
      backgroundColor: '#534582',
      borderRadius: 100,
      padding:6,
      },
    info: {
      color: '#eaeaea',
      fontWeight: "bold",
      padding: 10,
      fontSize:16,
    },

    linearGradient: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 999,
      height: 80,
      width: 80,
    },
    

})
    
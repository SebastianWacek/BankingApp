import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {Fontisto, MaterialIcons} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default  NumberPlate = ({onPress}) => {
    const numbers = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        <MaterialIcons name="keyboard-backspace" size={24} />,
    ]
  return (
      <View style = {styles.keyPad}>
            {numbers.map((item, index) => {
                return (
                    <TouchableOpacity style={styles.number} key={index} onPress={() => onPress(item, index)}>
                        <Text style={{fontSize:18, fontWeight:'bold', color:'#eaeaea'}}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                    
                )

            })}
      </View>
  );
};

const styles = StyleSheet.create({
    keyPad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-end',
        color: 'white'
    },
    number: {
        width: 68,
        height: 68,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:2,
        borderColor: '#89b6f3',
        marginTop:15,
        marginRight:48,
    }

})
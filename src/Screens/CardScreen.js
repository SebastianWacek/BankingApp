import { Button } from '@react-native-material/core';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'
const cardsData = [
  {
    id: 1,
    cardType: 'Visa',
    cardNumber: '**** **** **** 1234',
    cardHolderName: 'John Doe',
    cardExpiration: '12/24',
    cardBackground: require('../Images/visa.jpg'),

  },
  {
    id: 2,
    cardType: 'MasterCard',
    cardNumber: '**** **** **** 5678',
    cardHolderName: 'Jane Smith',
    cardExpiration: '06/25',
    cardBackground: require('../Images/visa2.jpg'),
  },
];



const CardItem = ({ card }) => {
  const [isCardSelected, setIsCardSelected] = useState(false);

  return (
    <View>
    <TouchableOpacity
      style={[styles.cardContainer, isCardSelected && styles.cardSelected]}
      onPress={() => setIsCardSelected(!isCardSelected)}
    >
      
      <ImageBackground source={card.cardBackground} style={styles.cardBackground}>
      <View style={styles.cardDetails}>
        <Text style={styles.cardNumber}>{card.cardNumber}</Text>
        <View style={styles.personalDetails}>
        <Text style={styles.cardHolderName}>{card.cardHolderName}</Text>
        <Text style={styles.cardExpiration}>{card.cardExpiration}</Text>
        </View>
      </View>
      </ImageBackground>
    </TouchableOpacity>
    {isCardSelected && (
<View style = {styles.choosenCard}>
  <TouchableOpacity style = {styles.button}>
    <Text style = {{color:'white'}}>
    Zapłać zbliżeniowo
    </Text>
    </TouchableOpacity>
</View>
)}
    </View>
    
  );
};

export default CardScreen = () => {
  return (
    <View style={styles.container}>
      <View style = {styles.Header}>
      <Text style={styles.header}>Moje karty</Text>
      </View>
      <ScrollView>
        {cardsData.map(card => (
          <CardItem key={card.id} card={card} />
        ))}
      </ScrollView>
      <View style = {styles.footer}>
      <Text style = {{color: 'white', fontSize:16, fontWeight:'bold'}}>Wybierz kartę której chcesz użyć lub przytrzymaj aby wyświetlić szczegóły</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#534582',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:10,
    color: "#fff"
  },
  Header: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    height: 200,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop:35
  },
  cardSelected: {
    borderWidth:1,
    borderColor: '#fff',
  },
  cardBackground: {
    flex: 1,
    height: null,
    width:"100%",
    aspectRatio: 1.8,
    resizeMode: 'cover'
  },
  cardDetails: {
    flex: 1,
    padding: 10,
  },
  cardType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  cardNumber: {
    marginTop: 95,
    marginLeft: 50,
    fontSize: 26,
    color: '#fff',
    letterSpacing: 1
  },
  cardHolderName: {
    fontSize: 16,
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  cardExpiration: {
    fontSize: 16,
    color: '#fff',
  },
  personalDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginRight: 30
  }, 
  choosenCard: {
    padding:15
  },
  button: {
    borderWidth:1,
    padding: 10,
    borderRadius:20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#89b6f3',

  }, 
  footer: {
    alignItems: 'center', 
    justifyContent: 'center',
    color: 'white',
  }
});


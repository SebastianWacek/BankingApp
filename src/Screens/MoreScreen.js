import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function MoreScreen({ navigation }) {
  const handleLogout = ({}) => {
    //
  };

  const clickHandler = () => {
    navigation.goBack()
}

  return (
    <View style={styles.container}>
      <TouchableOpacity
                activeOpacity={3}
                onPress={clickHandler}
                style={styles.touchableOpacityStyle}>
                <Image
                    source={require('../Images/arrow.png')}
                    alt="ads"
                    style={styles.floatingButtonStyle}

                />
            </TouchableOpacity>
      <Text style={styles.header}>Dodatkowe funkcje</Text>
      <TouchableOpacity style={styles.tileContainer} onPress={() => navigation.navigate("Map")}>
        <MaterialIcons name="map" size={30} color="#FFFFFF" />
        <Text style={styles.tileText}>Mapa bankomatów</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tileContainer}>
        <MaterialIcons name="attach-money" size={30} color="#FFFFFF" />
        <Text style={styles.tileText}>Kursy walut</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tileContainer} onPress={() => navigation.navigate("Crypto")}>
        <MaterialIcons name="monetization-on" size={30} color="#FFFFFF" />
        <Text style={styles.tileText}>Kryptowaluty</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tileContainer} onPress={() => navigation.navigate("Loan")}>
        <MaterialIcons name="credit-card" size={30} color="#FFFFFF" />
        <Text style={styles.tileText}>Szybka pożyczka</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={()=> navigation.navigate("Touch")}>
        <Text style={styles.logoutButtonText}>Wyloguj</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#534582',
    padding: 30,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    color: 'white',
    textAlign: 'center'
  },
  tileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7368C1',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  tileText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 10,
  },
  logoutButton: {
    marginTop:200,
    backgroundColor: '#b54040',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
    top: 32,
},
floatingButtonStyle: {
    resizeMode: 'contain',
    width: 45,
    height: 45,
}
});

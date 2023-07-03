import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';
import { textAlign } from 'styled-system';

export default function CryptoScreen({navigation}) {

  const [cryptoData, setCryptoData] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [chartData, setChartData] = useState(null);
  
  const clickHandler = () => {
    navigation.goBack()
}

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const fetchCryptoData = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=Bitcoin,ethereum,ripple,cardano&vs_currencies=usd'
      );
      setCryptoData(response.data);
    } catch (error) {
      console.log('Error fetching crypto data:', error);
    }
  };

  const fetchChartData = async (symbol) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${symbol}/market_chart?vs_currency=usd&days=1`
      );
      setChartData(response.data);
    } catch (error) {
      console.log('Error fetching chart data:', error);
    }
  };

  const getChartLabels = () => {
    const dates = [];
    const today = new Date();
    const options = { day: 'numeric' };
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const label = date.toLocaleDateString(undefined, options);
      dates.push(label);
    }
    return dates;
  };

  const handleCryptoPress = (symbol) => {
    setSelectedCrypto(symbol);
    fetchChartData(symbol);
  };

  const renderCryptoTiles = () => {
    if (!cryptoData) {
      return null;
    }

    const symbols = Object.keys(cryptoData);

    return (
      <View style={styles.cryptoTilesContainer}>
        
        {symbols.map((symbol, index) => {
          const crypto = cryptoData[symbol];
          const isSelected = symbol === selectedCrypto;

          let logo = null;
          let name = "";
          if (symbol === 'bitcoin') {
            name="BTC";
            logo = require('../Images/btc.png');
          } else if (symbol === 'ethereum') {
            name="ETH";
            logo = require('../Images/eth.png');
          } else if (symbol === 'ripple') {
            name="XRP";
            logo = require('../Images/xrp.png');
          } else if (symbol === 'cardano') {
            name="ADA";
            logo = require('../Images/ada.png');
          }

          return (
            <TouchableOpacity
              key={symbol}
              style={[styles.cryptoItem, isSelected && styles.selectedCryptoItem]}
              onPress={() => handleCryptoPress(symbol)}
            >
              <Image source={logo} style={styles.cryptoLogo} />
              <View style={styles.cryptoInfoContainer}>
                <Text style={styles.cryptoSymbol}>{name}</Text>
                <Text style={styles.cryptoPrice}>$ {crypto.usd}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderChart = () => {
    if (!selectedCrypto || !chartData) {
      return null;
    }

    const prices = chartData.prices.map((price) => price[1]);

    return (
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: getChartLabels(),
            datasets: [
              {
                data: prices,
              },
            ],
          }}
          width={380}
          height={320}
          marginTop={10}
          yAxisLabel='$ '
          bezier={false}
          chartConfig={{
            ...chartConfig,
          }}
        />
      </View>
    );
  };

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
      <Text style={styles.title}>Kursy kryptowalut</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {renderCryptoTiles()}
      </ScrollView>
      {renderChart()}
      <View style={styles.chartContainer}><Text style={styles.chartInfo}>Wybierz walutę aby zobaczyć jej wykres poglądowy z ostatniego tygodnia</Text></View>
      <TouchableOpacity style={styles.refreshButton} onPress={fetchCryptoData}>
        <Text style={styles.refreshButtonText}>Odśwież</Text>
      </TouchableOpacity>
    </View>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#FFFFFF', // Zmiana koloru tła na biały
  backgroundGradientTo: '#FFFFFF', // Zmiana koloru tła na biały
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Zmiana koloru linii i świec na czarny
  fillShadowGradient: '#DDDDDD', // Zmiana koloru cieniowania świec
  fillShadowGradientOpacity: 1, // Zmiana przezroczystości cieniowania świec
  decimalPlaces: 2,
  propsForBackgroundLines: {
    strokeDasharray: '', // Usunięcie linii tła
  },
  propsForLabels: {
    fontSize: 10, // Zmniejszenie rozmiaru czcionki etykiet
    fontWeight: 'bold',
  },
  style: {
    borderRadius: 8,
  },
  bezier: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#534582',
    padding: 10,
  },
  title: {
    marginTop: 25,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign:'center'
  },
  refreshButton: {
    backgroundColor: '#89b6f3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  cryptoTilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cryptoItem: {
    backgroundColor: '#89b6f3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    width: '48%', // Zmniejszenie szerokości dla układu wierszowego
    flexDirection: 'row',
  },
  selectedCryptoItem: {
    borderColor: 'red',
    borderWidth: 2,
  },
  cryptoLogo: {
    width: 40,
    height: 40,
    marginRight: 25,
  },
  cryptoInfoContainer: {
    flex: 1,
  },
  cryptoSymbol: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cryptoPrice: {
    fontSize: 18,
  },
  chartContainer: {
    width: '100%',
    borderTopWidth: 1,
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 15,
    padding: 10,
  },
  chartInfoContainer: {
    alignItems: 'center',
  },
  chartInfo: {
    fontSize:20,
    fontWeight:'400',
    alignItems: 'center',
    textAlign:'center',
    color:'white',
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


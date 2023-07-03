import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import Geolib from 'geolib';
import atmsData from './atms.json'

export default function MapScreen({navigation}) {
    const [pin, setPin] = useState({
        latitude: 13.332,
        longitude: 123.3753,
      });

    const [distance, setDistance] = useState(0);

    const customMapStyle = [
      {
        elementType: 'geometry',
        stylers: [
          {
            color: '#e1e1e1',
          },
        ],
      },
      {
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#000000',
          },
        ],
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#cfd4db',
          },
        ],
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
      {
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [
          {
            color: '#f5f5f5',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          {
            color: '#e6e6e6',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#000000',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#9acfa5',
          },
        ],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#000000',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          {
            color: '#f6f6f6',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#cfcfcf',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#000000',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
          {
            color: '#e8e8e8',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#cfcfcf',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#000000',
          },
        ],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
          {
            color: '#f2f2f2',
          },
        ],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#000000',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#bbdefb',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#000000',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
    ];
    
    const clickHandler = () => {
      navigation.goBack()
  }

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const calculateDistance = (latitude, longitude, atm, name) => {
    const userLocation = {
      latitude: pin.latitude,
      longitude: pin.longitude,
    };
  
    const atmLocation = {
      latitude,
      longitude,
    };
  
    const toRadians = (value) => {
      return (value * Math.PI) / 180;
    };
  
    const earthRadiusInMeters = 6371000; // Przybliżony promień Ziemi w metrach
  
    const lat1 = toRadians(userLocation.latitude);
    const lon1 = toRadians(userLocation.longitude);
    const lat2 = toRadians(atmLocation.latitude);
    const lon2 = toRadians(atmLocation.longitude);
  
    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;
  
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distanceInMeters = earthRadiusInMeters * c;
  
    const distance = distanceInMeters < 1000 ? distanceInMeters.toFixed(0) + ' metrów' : (distanceInMeters / 1000).toFixed(2) + ' kilometrów';
  
    setDistance(distance);

  };

  return (
    <View style={styles.container}>
       <MapView
        style={styles.map}
        initialRegion={{
          latitude: 52.0744,
          longitude: 19.412,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
        customMapStyle={customMapStyle}
      >
        {atmsData.map((city) =>
  city.ATMs.map((atm) => (
    <Marker
      key={atm.name}
      coordinate={{
        latitude: atm.latitude,
        longitude: atm.longitude,
      }}
      title={atm.name}
      description={atm.street}
      onPress={() => calculateDistance(atm.latitude, atm.longitude)}>
      <Image source={require("../Images/atm.png")} style={{height: 35, width:35, color: 'blue' }} alt="sdsda"/>
      </Marker>
  ))
)}
        <Marker
          coordinate={pin}
          pinColor="gold"
        />
      </MapView>
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
      <View style={styles.distanceContainer}>
        <Text style={styles.distanceText}>Odległość do bankomatu: {distance}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  distanceContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 10,
    left: 10,
    zIndex: 999,
  },
  distanceText: {
    fontSize: 16,
  },
  closestATMContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 8,
  },
  closestATMText: {
    fontSize: 16,
  },
  calloutTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    width: 80,
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

import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const ATMMap = ({ atmCoordinates }) => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 52.2297, // Współrzędne początkowe mapy
          longitude: 21.0122,
          latitudeDelta: 0.0922, // "Zoom" po szerokości
          longitudeDelta: 0.0421, // "Zoom" po długości
        }}
      >
        {atmCoordinates.map((coords, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: coords.latitude,
              longitude: coords.longitude,
            }}
          />
        ))}
      </MapView>
    </View>
  );
};

export default ATMMap;
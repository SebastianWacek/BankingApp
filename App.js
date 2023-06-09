import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider} from 'native-base'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import TouchScreen from './src/Screens/TouchScreen';
import PinScreen from './src/Screens/PinScreen';
import HomeScreen from './src/Screens/HomeScreen';
import CardScreen from './src/Screens/CardScreen';
import TransfersScreen from './src/Screens/TransfersScreen';
import MoreScreen from './src/Screens/MoreScreen';
import CryptoScreen from './src/Screens/CryptoScreen';
import MapScreen from './src/Screens/MapScreen.js';
import LoanScreen from './src/Screens/LoanScreen';

const Stack = createStackNavigator();
const TabStack = createBottomTabNavigator();


const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarActiveTintColor: "#8df49b",
  tabBarInactiveTintColor: "#89b6f3",
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: '#534582',
  },
  tabBarIcon: ({ focused }) => {
    let icon = "";
    const color = focused ? "#8df49b" : "#89b6f3";
    const size = 24;

    switch (route.name) {
      case "Card":
        icon = "credit-card";
        break;

      case "Home":
        icon = "home";
        break;

      case "Transfers":
        icon = "send";
        break;

      case "More":
        icon = "more-horiz";
        break;

      default:
        icon = "dashboard";
    }

    return <MaterialIcons name={icon} size={size} color={color} />;
  },
});

const TabScreens = () => {
  return (
    <TabStack.Navigator
      screenOptions={screenOptions}
      tabBarOptions={{
        
      }}
    >
      <TabStack.Screen name="Home" component={HomeScreen} />
      <TabStack.Screen name="Card" component={CardScreen} />
      <TabStack.Screen name="Transfers" component={TransfersScreen} />
      <TabStack.Screen name="More" component={MoreScreen} />
    </TabStack.Navigator>
  );
};

export default App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Touch" component={TouchScreen} />
          <Stack.Screen name="Pin" component={PinScreen} />
          <Stack.Screen name="Crypto" component={CryptoScreen} />
          <Stack.Screen name="Map"component={MapScreen} />
          <Stack.Screen name="Loan"component={LoanScreen} />
          <Stack.Screen
            name="Tab"
            component={TabScreens}
            options={({ navigation }) => ({
              header: () => <TabHeader navigation={navigation} />,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

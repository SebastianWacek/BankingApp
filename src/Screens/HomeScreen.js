import * as React from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider, StatusBar, FlatList } from "native-base";
import { Image, StyleSheet, KeyboardAvoidingView, View, TouchableOpacity } from "react-native";
import {FontAwesome5, MaterialIcons, AntDesign, SimpleLineIcons} from '@expo/vector-icons';
import { TextInput } from "react-native-gesture-handler";
import operationsData from "../../operations";
import { Dimensions } from "react-native";
import { Popover } from "native-base";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


export default HomeScreen = () => {
  
  const renderOperations = ({ item }) => (
    <Box style={styles.operations}>
      <Box style={styles.operationsInfo}>
        <Text style={{color: "#ffffff", fontSize:18}}>{item.product}</Text>
        <Text style={{color: "#CFCFCF", fontSize:16}}>{item.shop}</Text>
        <Text style={{color: "grey", fontSize:15}}>{item.address}</Text>
      </Box>
      <Text style={[styles.price, item.price < 0 ? {color: '#EE5656'} : {color: '#59F82A'}]}>{item.price} PLN</Text>
    </Box>
  )

  return <Box flex="1" safeArea w="100%" h="100%" bgColor={"#534582"} style={styles.container}>
      <Box style = {styles.header}>
        <Image source={require("../Images/pp.png")} style={{width:60, height:60, borderRadius:10,borderWidth:1, marginRight:8}} />
        <Box style = {styles.welcome}>
          <Text style = {{fontSize:20, fontWeight:'bold', color: 'white'}}>Witaj</Text>
          <Text style = {{fontSize:16, fontWeight:'500', color: '#D4C9F5'}}>Imie i nazwisko</Text>
        </Box>
        <FontAwesome5 name="cog" size={24} color="grey" />
      </Box>
        <Text style={{padding:3,textAlign:'center', fontSize: 36, fontFamily: 'serif', lineHeight:36, fontWeight:'bold', color: 'white'}}>2 614,05 PLN</Text>
        <Text style={{textAlign:'center', fontSize: 16, color: '#D4C9F5'}}>Stan konta</Text>
       
       <FlatList style={styles.flatList} ListHeaderComponent = {
          <>
          <Box style = {styles.transactionsHeader}>
            <Text style = {{color: '#E4DCFC', fontSize:14, fontWeight: '500'}}>Ostatnie Operacje</Text>
          
            <Popover trigger={triggerProps => {
      return <TouchableOpacity {...triggerProps}>
             <SimpleLineIcons name = 'graph' size={24} color="#8df49b" />
            </TouchableOpacity>;
    }}>
        <Popover.Content accessibilityLabel="expenses" w="350" >
          <Popover.Header bgColor="#534582"><Text style={{color:'white'}}>Wykres wydatków</Text></Popover.Header>
          <Popover.Body bgColor="#534582">
          <LineChart
    data={{
      labels: ["23.03", "27.03", "31.03", "04.04", "08.04", "12.04"],
      datasets: [
        {
          data: [
            4200,
            4200-29.00,
            4200-29.00-180.00,
            4200-29.00-180.00-128.95,
            4200-29.00-180.00-128.95-869.00,
            4200-29.00-180.00-128.95-869.00+500.00,
            4200-29.00-180.00-128.95-869.00+500.00-639.00-39.99-200.01,
          ]
        }
      ]
    }}
    width={330}
    height={220}
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#5B479A",
      backgroundGradientFrom: "#5B479A",
      backgroundGradientTo: "#5B479A",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16,
    }}
  />
          </Popover.Body>
        </Popover.Content>
      </Popover>
            <MaterialIcons name = 'sort' size={24} color="#8df49b" />
          </Box>
          <Box style = {styles.searchContainer}>
              <AntDesign name="search1" size={18} color="#8df49b" marginLeft={4}/>
              <TextInput placeholder="Search Transactions" placeholderTextColor={'#D4C9F5'} style = {styles.textInput} />
          </Box>
          </>
        } 
        data={operationsData} renderItem={renderOperations} showsVerticalScrollIndicator={false}
        />
      </Box>
  };


  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
      marginRight:16,
      marginBottom:32,
      marginLeft:16
    },
    text: {
      color: "white",
      fontSize: 35,
    },
    welcome: {
      flex: 1,
    },

  flatList: {
    backgroundColor: "#5B479A",
    padding: 16,
  },

    transactionsHeader: {
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'grey'
    },
    searchContainer: {
      backgroundColor: "#7160A6",
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius:8,
      marginTop: 16,
      marginBottom:10
    },
    textInput: {
      flex:1,
      height:50,
      color: "white",
      marginLeft:8
    },
    operations: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#393939',
      paddingBottom: 12,
      marginBottom: 12,
      marginTop:1,
      },
    operationsInfo: {
    },
    price: {
      fontWeight: "bold",
      fontSize:16,
      fontFamily: "serif"
    }



  })
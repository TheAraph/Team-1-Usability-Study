import { StatusBar } from 'expo-status-bar';
import Header from "../components/Header";
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Button, TextInput, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import Weight from "../src/Weight";
import FoodDrink from "../src/FoodDrink";
import Sleep from "../src/Sleep";
import LogWeight from "../src/LogWeight";
import LogDrink from "../src/LogDrink";
import LogFood from "../src/LogFood";
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const Stack = createStackNavigator();

const Health = () => {
  const navigation = useNavigation()
  return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={() => (
            <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
              <TouchableOpacity style = {styles.card} onPress = {() => navigation.navigate('Weight')}>
                <View style={styles.rightContainer}>
                  <Image  
                    source = {require('../assets/img_245669.png')}
                    style = {styles.image}>
                  </Image>
                </View>
                <View style={styles.leftContainer}>
                  <Text style = {styles.btntext}>Weight</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.card} onPress = {() => navigation.navigate('FoodDrink')}>
              <View style={styles.rightContainer}><Image  
              source = {require('../assets/icone-de-nourriture-noire-symbole-png.png')}
              style = {styles.image}>
              </Image></View>
              <View style={styles.leftContainer}><Text style = {styles.btntext}>Food {'\n'}& Drink</Text></View>
                
              </TouchableOpacity>
            </View>
          )}

          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Weight" 
          component={Weight} 
          options={{
          headerTitle: () => <Header name = "Weight"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#FFFFFF',
          }
        }}
        />
        <Stack.Screen 
          name="Sleep" 
          component={Sleep} 
          options={{
          headerTitle: () => <Header name = "Sleep"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#FFFFFF',
          }
        }}
        />
        <Stack.Screen 
          name="FoodDrink" 
          component={FoodDrink} 
          options={{
          headerTitle: () => <Header name = "Food & Drink"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#FFFFFF',
          }
        }}
        />
        <Stack.Screen 
          name="LogWeight" 
          component={LogWeight} 
          options={{
          headerTitle: () => <Header name = "Log Weight"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#FFFFFF',
          }
        }}
        />
        <Stack.Screen 
          name="LogDrink" 
          component={LogDrink} 
          options={{
          headerTitle: () => <Header name = "Log Drink"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#FFFFFF',
          }
        }}
        />
        <Stack.Screen 
          name="LogFood" 
          component={LogFood} 
          options={{
          headerTitle: () => <Header name = "Log Food"/>,
          headerStyle: {
            height:60,
            backgroundColor: '#FFFFFF',
          }
        }}
        />
      </Stack.Navigator>
  )
}


export default Health

const styles = StyleSheet.create({
  btntext:{
    fontFamily: "AvenirNext-Heavy",
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: "center"
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 344,
    height: 73,
    borderRadius: 73,
    elevation: 3,
    backgroundColor: '#D5342B',
    margin: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  input:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 344,
    height: 73,
    borderRadius:50,
    elevation: 3,
    backgroundColor: '#FFF',
    margin: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 15,
  },
  headline4:{
    fontFamily: "AvenirNext-Heavy",
    fontSize: 34,
    color: "#000",
    margin: 10,
  },
  headline4INPUT:{
    fontFamily: "Helvetica",
    fontSize: 34,
    color: "grey",
    margin: 10,
  },
  headline4DATE:{
    fontFamily: "Helvetica",
    fontSize: 34,
    color: "#000",
    margin: 10,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  headline2BLACK:{
    fontFamily: "Helvetica",
    fontSize: 61,
    color: "#000",
    margin: 10,
    fontWeight: 'bold',
  },
  card:{
      alignItems: 'center',
      justifyContent: 'center',
      width: 341,
      height: 177, 
      borderRadius: 30,
      marginBottom: 25,
      shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 25,
      borderWidth: 2,
    borderColor: 'black',
    position: "relative"
  },
  leftContainer: {
    position: 'absolute',
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    left: 0,
    width: '50%',
    height: '100%',
    backgroundColor: '#D5342B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    position: 'absolute',
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    right: 0,
    width: '50%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    position: 'absolute',
    width: 100,
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  }
})
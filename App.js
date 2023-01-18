import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, {useState, useEffect} from 'react';
import {firebase} from './config';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

import Login from "./src/Login";
import Register from "./src/Register"
import Home from "./src/Home";
import Header from "./components/Header";
import Health from "./src/Health";
import Resources from "./src/Resources";
import PersonalInfo from "./src/PersonalInfo";
import MainContainer from "./src/mainContainer";
import { Button } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ProfileScreen } from "./src/Profile";

const Stack = createStackNavigator();

function App(){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  //Handle user state changes
  function onAuthStateChanged(user){
    setUser(user);
    if (initializing) setInitializing(false);
  }

  //detect state
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  //If user is not logged in, show only login and signup pages
  if (!user){
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={Login} 
          
          options={{
            headerTitle: () => <Header name = "Healthify"></Header>,
            headerStyle: {
            height:98,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowRadius: 10,
            elevation: 25
          }
          }}

          />
        <Stack.Screen 
          name = "Register" 
          component = {Register}

          options={{
            headerTitle: () => <Header name = "Healthify"/>,
            headerStyle: {
            height:98,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowRadius: 10,
            elevation: 25
          }
          }}
          />

      </Stack.Navigator>
    );
  }


  const homeName = 'Home';
  const healthName = 'Health';
  const infoName = 'Info';
  const profileName = 'Account'
  const stackContainer = ' ';

  const Tab = createBottomTabNavigator();

  //When user is signed in
  return (
    <Tab.Navigator
    initialRouteName={homeName}
    screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if(rn === homeName) {
                iconName = focused ? 'home' : 'home-outline'
            } else if (rn === healthName) {
                iconName = focused ? 'heart' : 'heart-outline'
            } else if (rn === infoName) {
                iconName = focused ? 'information' : 'information-circle-outline'
            } else if (rn == profileName){
              iconName = focused ? 'person' : 'person-outline'
            }

            return <Ionicons name={iconName} size={size} color={color}/>
        },
    })}
    tabBarOptions={{
        activeTintColor: '#D5342B',
        inactiveTintColor: 'grey',
        tabBarVisible: false,
        // height: 80,
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        labelStyle: { fontFamily: 'Avenir',
        fontSize: 14,
        color: '#000000',
        }
    }}

    >
    <Tab.Screen 
    name={homeName} 
    component={Home} 
    options={{
          headerTitle: () => <Header name = "Home"/>,
          headerStyle: {
            height:98,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowRadius: 10,
            elevation: 25
          }
        }}
    />
    <Tab.Screen name={healthName} component={Health} options={{
          headerTitle: () => <Header name = "Health"/>,
          headerStyle: {
            height:98,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowRadius: 10,
            elevation: 25
          }
        }}/>
    <Tab.Screen name={infoName} component={Resources} options={{
          headerTitle: () => <Header name = "Resources"/>,
          headerStyle: {
            height:98,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowRadius: 10,
            elevation: 25
          }
        }}/>
    <Tab.Screen name={profileName} component={PersonalInfo}  options={{
          headerTitle: () => <Header name = "Personal Information"/>,
          headerStyle: {
            height:98,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowRadius: 10,
            elevation: 25
          }
        }}/>
    </Tab.Navigator>

  )
  
}

export default () => {
  return(
    <NavigationContainer>
        <App/>
    </NavigationContainer>
    
  )
}

const styles = StyleSheet.create({
  profileBtn:{
    width: 20,
    height: 20,
    borderRadius: 73,
    elevation: 3,
    backgroundColor: '#D5342B',
    margin: 10,
    borderWidth: 1,
    borderColor: "black"
  }}
)
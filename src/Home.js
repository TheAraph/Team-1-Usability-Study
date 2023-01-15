import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView} from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'
import { Pedometer } from 'expo-sensors';
import { ScrollView } from 'react-native-gesture-handler'
import { RefreshControl } from 'react-native';

//date functionality
const CurrentDate = () => {
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const dateString = new Intl.DateTimeFormat('en-US', options).format(today);

  return <Text style={styles.Date}>{dateString}</Text>;
};

const Home = () => {
  const [name, setName] = useState('')
  const [caloriesLost, setCaloriesLost] = useState(0);
  const [steps, setSteps] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
  const [stepCounter, setStepCounter] = useState(0);

  useEffect(() => {
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
    .then((snapshot) => {
      if(snapshot.exists){
        setName(snapshot.data())
        setStepCounter(snapshot.data().stepCounter)
      }
      else{
        console.log('User does not exist')
      }
    })
    // Check if pedometer is available
    Pedometer.isAvailableAsync().then(
      result => {
        setIsPedometerAvailable(result);
        if(result) {
          // Start watching pedometer updates
          const pedometerSubscription = Pedometer.watchStepCount(result => {
            setSteps(result.steps);
          });
          // Retrieve current stepCounter value from Firestore
          firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
            .then((snapshot) => {
              if(snapshot.exists){
                // Increment stepCounter by new steps taken
                const newStepCounter = snapshot.data().stepCounter + steps;
                // Update stepCounter in Firestore
                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({stepCounter: newStepCounter});
              }
              else{
                console.log('User does not exist')
              }
            });
          // Unsubscribe from pedometer updates when component unmounts
          return () => pedometerSubscription.remove();
        }
      },
      error => {
        console.log("The sensor is not available: " + error);
      }
    );
  }, [])

  useEffect(() => {
    //if steps value is below 0 prompt user to start walking
    if (stepCounter && stepCounter > 0) {
      setCaloriesLost(0.04 * stepCounter);
    } else {
      setCaloriesLost("Walk!");
    };
  }, [stepCounter]);

  const resetValues = () => {
    try {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
        stepCounter: 0,
      }).then(() => {
        alert('Values Reset');
        navigation.navigate('Health');
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
    setCaloriesLost(0)
  }


  return (
    <ScrollView>
    
        <View style={styles.container}>
        <Text style={styles.Date}><CurrentDate /></Text>
          <Text style={styles.Healthify}>Welcome,</Text>
          <Text style={styles.HealthifyUserName}>{name.firstName}</Text>

          <View style = {styles.newcontainer}>
        
          <Text style={styles.Headline4Courier}>Total Steps:</Text>
          <Text style={styles.Headline2Black}>{stepCounter}</Text>
        
          <Text style={styles.Headline4Courier}>Calories Lost</Text>
          <Text style={styles.Headline2Black}>{caloriesLost}</Text>
          <TouchableOpacity style = {styles.Button2} onPress =  {resetValues}>
            <Text style = {styles.Button2Text}>Reset Steps and Calories</Text>
          </TouchableOpacity>
          </View>
        </View>
    </ScrollView>
    
    
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
      flex: 1,
      alignItems: "center",
      marginTop:20,
  },
  newcontainer:{
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 341,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: '#FFF',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 25,
    borderWidth: 2,
  borderColor: 'black',
  },
  textInput:{
      alignItems: 'center',
      justifyContent: 'center',
      width: 344,
      height: 73,
      borderRadius:15,
      elevation: 3,
      backgroundColor: '#FFF',
      margin: 10,
      borderWidth: 1,
      borderColor: "black",
      padding: 15,
    },
    Button:{
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
    ButtonText:{
      fontFamily: "Helvetica",
      fontSize: 34,
      fontWeight: 'bold',
      color: '#fff'
    },
    Healthify:{
      fontFamily: "Avenir",
      fontSize: 61,
      color: "#D5342B",
      marginTop: 10,
      fontWeight: 'bold',
    },
    HealthifyUserName:{
      fontFamily: "AvenirNext-Heavy",
      fontSize: 61,
      color: "#E2716B",
      fontWeight: 'bold',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: .2,
      shadowRadius: 5,
      elevation: 25,
    },
    Headline4:{
      fontFamily: "Avenir",
      fontSize: 34,
      color: "#000",
      margin: 10,
      alignItems: "center"
    },
    Headline4Courier:{
      fontFamily: "American Typewriter",
      fontSize: 34,
      color: "#000",
      margin: 10,
      alignItems: "center"
    },
    Button2:{
      marginBottom:20, alignItems:"center",
    },
    Headline2Black:{
      fontFamily: "AvenirNext-Heavy",
      fontSize: 61,
      color: "#000",
      margin: 10,
      fontWeight: 'bold'
    },
    Button2Text:{
      fontWeight:"bold",
      fontSize: 16,
      textDecorationLine: "underline",
      fontFamily: "Avenir"
    },
    Date:{
      fontFamily: "AvenirNext-UltraLightItalic",
      fontSize: 24,
      color: "#000",
      fontStyle: 'italic',
      fontWeight: 'bold'
    }
})
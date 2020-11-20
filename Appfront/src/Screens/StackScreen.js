import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image,ImageBackground } from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import HomeScreen from './HomeScreen';
import Login from './Login';
import SignUp from './SignUp';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import TabScreen from './TabScreen';
 import Home from './Home';


// const AuthStack=createStackNavigator();

// const AuthStackScreen=() => {

//   <AuthStack.navigator>

//     <AuthStack.Screen>


//     </AuthStack.Screen>

//   </AuthStack.navigator>


// }

  
//  const stackscreen=createStackNavigator();


//  StackScreen
// const stackScreen = createStackNavigator();
// const Searchnavigation=()=>{
//   return(
   
//    <stackScreen.Navigator initialRouteName={'Search'}>
//      <stackScreen.Screen name='Search' component={Search} options={{headerShown: false}} ></stackScreen.Screen>
//      <stackScreen.Screen name="Bookresult"   component={Bookresult} options={{headerShown: true}}></stackScreen.Screen>

//    </stackScreen.Navigator>
 
//   )

// }

  const StackScreen = createStackNavigator(
    {
      Log:Login,
      home: Home,  
      Sign:SignUp
  
    },
    {
      initialRouteName: 'Log',
      defaultNavigationOptions: {
        title: 'Kima',
        
        headerTintColor:'#1F7A8C',
        headerStyle: {
          backgroundColor: '#E1E5F2',
          
        },
      
      
      
      
      },
    }
  );
  //  const StackScreen=()=>{return createAppContainer(stackScreen);}
 
  
  export default StackScreen;
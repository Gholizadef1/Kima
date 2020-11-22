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
import { createStackNavigator } from '@react-navigation/stack';
// import { createStackNavigator } from 'react-navigation-stack';
// import TabScreen from './TabScreen';
 import Home from './Home';
import { NavigationContainer } from '@react-navigation/native';


// const AuthStack=createStackNavigator();

// const AuthStackScreen=() => {

//   <AuthStack.navigator>

//     <AuthStack.Screen>


//     </AuthStack.Screen>

//   </AuthStack.navigator>


// }

  
//  const stackscreen=createStackNavigator();


//  StackScreen
const stackScreen = createStackNavigator();
const StackScreen=(prop)=>{
  return(

   <stackScreen.Navigator initialRouteName={'Log'}>
     <stackScreen.Screen name='Log' component={Login} options={{headerTitle:'kima',headerTintColor:'#1F7A8C',headerStyle:{backgroundColor:'#E1E5F2'}}} ></stackScreen.Screen>
     <stackScreen.Screen name="Sign"   component={SignUp} options={{headerTitle:'kima',headerTintColor:'#1F7A8C',headerStyle:{backgroundColor:'#E1E5F2'}}} ></stackScreen.Screen>

   </stackScreen.Navigator>
 
  )

}

  // const StackScreen = createStackNavigator(
  //   {
  //     Log:Login,
  //     Sign:SignUp
  
  //   },
  //   {
  //     initialRouteName: 'Log',
  //     defaultNavigationOptions: {
  //       title: 'Kima',
        
  //       headerTintColor:'#1F7A8C',
  //       headerStyle: {
  //         backgroundColor: '#E1E5F2',
          
  //       },
      
      
      
      
  //     },
  //   }
  // );
  //  const StackScreen=()=>{return createAppContainer(stackScreen);}
 
  
  export default StackScreen;
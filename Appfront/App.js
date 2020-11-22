import { StatusBar } from 'expo-status-bar';
import React, { useState ,useContext} from 'react';
import { StyleSheet, Text, View,Image,ImageBackground } from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './src/Screens/HomeScreen';
import Login from './src/Screens/Login';
import SignUp from './src/Screens/SignUp';
import Home from './src/Screens/Home';
import Profile from './src/Screens/Profile';
import Search from './src/Screens/Search'
import Mybooks from './src/Screens/Mybooks'
import TabScreen from './src/Screens/TabScreen'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { NavigationContainer } from "@react-navigation/native";
import StackScreen from './src/Screens/StackScreen';
import { State } from 'react-native-gesture-handler';
import AuthContext,{AuthProvider} from './src/context/AuthContext';

// import {Authcontext, Provider as AuthProvider } from './src/context/Authcontext';
// import {Context as AuthContext} from './src/context/Authcontext'


// const lala=()=>{
//   return(
//     <TabScreen></TabScreen>
//   )
// }

// const SwitchNavigaor=()=>{
//   return(
//     <NavigationContainer>
          


//     </NavigationContainer>


//   )
// }

// const SwitchNavigator=createSwitchNavigator({
//   mainFlow:TabScreen,
//   loginFlow:StackScreen,
 

 
   
// export default createAppContainer(lala);
    
    

// })
// // const SwitchNavigatorr=createAppContainer(SwitchNavigator);
// // export default createAppContainer(SwitchNavigator);
const a=true;

const SwitchNavigatorr=(prop)=>{
  const value=useContext(AuthContext);
  console.log(value);
  // return (<NavigationContainer><TabScreen></TabScreen></NavigationContainer>)

  // const {logg,changelogg}=useContext(AuthContext);
  return(
    // <TabScreen></TabScreen>
    <NavigationContainer>
     {value.logged ? (<TabScreen/>):(<StackScreen/>)}
     </NavigationContainer>
  )
}


export default()=>{
  return(
   <AuthProvider>

    <SwitchNavigatorr/>
   
  </AuthProvider>
  )
  }

// }

// const Tab = createBottomTabNavigator();

// export default function App(){
//   return(

//     // <NavigationContainer>
//     // <StackScreen />
    
    
    
//     // </NavigationContainer>
  
//   )
// }
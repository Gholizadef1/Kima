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
import Bookresult from './Bookresult';
import Search from './Search';

// import TabScreen from './TabScreen';
 import Home from './Home';
 import {NavigationContainer} from '@react-navigation/native';
 
 const SNavigation = createStackNavigator();
 export default function Snavigation(){
   return(
    <SNavigation.Navigator>
      <SNavigation.Screen name='search' component={Search}></SNavigation.Screen>
      <SNavigation.Screen name="book"   component={Bookresult}></SNavigation.Screen>

    </SNavigation.Navigator>
   )

 }
  
  // export default ()=>
  // (
  //   <NavigationContainer>
  //     <Snavigation></Snavigation>
  //   </NavigationContainer>
  // );
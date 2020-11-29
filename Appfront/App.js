import React, { useState ,useContext} from 'react';
import { StyleSheet, Text, View,Image,ImageBackground } from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button} from 'native-base';
import TabScreen from './src/Screens/TabScreen'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import StackScreen from './src/Screens/StackScreen';
import {Provider as AuthProvider } from './src/context/Authcontext';
import { createStackNavigator } from '@react-navigation/stack';

const SwitchNavigator=createSwitchNavigator({
  mainFlow:TabScreen,
  loginFlow:StackScreen,
})

const App=createAppContainer(SwitchNavigator);

export default()=>{
  return(
  <AuthProvider>

    <App/>
  </AuthProvider>
  )
  }

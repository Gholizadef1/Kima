import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image,ImageBackground } from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button} from 'native-base';
import HomeScreen from './src/Screens/HomeScreen';
import Login from './src/Screens/Login';
import SignUp from './src/Screens/SignUp';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
   Log:Login,
   Sign:SignUp

  },
  {
    initialRouteName: 'Log',
    defaultNavigationOptions: {
      title: 'Kima',
    
    },
  }
);

export default createAppContainer(navigator);





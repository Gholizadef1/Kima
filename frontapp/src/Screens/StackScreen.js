import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image,ImageBackground } from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button} from 'native-base';
import Login from './Login';
import SignUp from './SignUp';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
 import Home from './Home';

  const navigator = createStackNavigator(
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
  export default createAppContainer(navigator);
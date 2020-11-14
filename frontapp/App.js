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
import Profie from './src/Screens/Profile'
import Search from './src/Screens/Search'
import Mybooks from './src/Screens/Mybooks'
import TabScreen from './src/Screens/TabScreen'
import Bookview from './src/Screens/Bookview'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { NavigationContainer } from "@react-navigation/native";
import StackScreen from './src/Screens/StackScreen';
import { State } from 'react-native-gesture-handler';
import {Provider as AuthProvider } from './src/context/Authcontext';
import {Context as AuthContext} from './src/context/Authcontext'

const SwitchNavigator=createSwitchNavigator({
    
    loginflow:StackScreen,
    mainFlow:TabScreen    

})

const App=createAppContainer(SwitchNavigator);

export default()=>{
  return(
  <AuthProvider>

    <App/>
  </AuthProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

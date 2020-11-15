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
import Search from './Search';

// import TabScreen from './TabScreen';
 import Home from './Home';
 import {NavigationContainer} from '@react-navigation/native';


const Stack = createStackNavigator();

const Booknavigation = () => {
  return (
      <NavigationContainer>
                <Stack.Navigator initialRouteName={'Home'}>
                <Stack.Screen name = 'Home' component={Home}></Stack.Screen>
                <Stack.Screen name = 'Showbookview' component={Bookview} />
                </Stack.Navigator>
      </NavigationContainer>
 
  );
}
export default Booknavigation;
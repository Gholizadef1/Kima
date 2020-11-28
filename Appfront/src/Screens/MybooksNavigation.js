import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image,ImageBackground } from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button} from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Bookview from './Bookview';
import Mybooks from './Mybooks';
import WantToRead from './WantToRead';
import IsRead from './IsRead';
import IsReading from './IsReading'

const Stack = createStackNavigator();

const MybooksNavigation = () => {
  return (
      <Stack.Navigator initialRouteName={'Mybooks'}>
      <Stack.Screen name = 'Mybooks' component={Mybooks} options={{headerShown: false}} ></Stack.Screen>
      <Stack.Screen name = 'ShowWantToRead' component={WantToRead} options={{headerShown: false}} />
      <Stack.Screen name = 'ShowIsRead' component={IsRead} options={{headerShown: false}} />
      <Stack.Screen name = 'ShowIsReading' component={IsReading} options={{headerShown: false}} />
      </Stack.Navigator>
  );
}
export default MybooksNavigation;
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image,ImageBackground } from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button} from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Bookview from './Bookview';
import Commentcard from './Commentcard';
import Comment from './Comment';

const Stack = createStackNavigator();

const Booknavigation = () => {
  return (
    // options={({navigation})=>({headerTitle:navigation.getParam()})}
      <Stack.Navigator initialRouteName={'Home'}>
      <Stack.Screen name = 'Home' component={Home} options={{headerShown: false}} ></Stack.Screen>
      <Stack.Screen name = 'Showbookview' component={Bookview} options={{headerShown: false}} />
      <Stack.Screen name = 'comment' component={Comment} options={{headerShown: false}}/>
      </Stack.Navigator>
  );
}
export default Booknavigation;
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image,ImageBackground } from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button} from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Bookview from './Bookview';
import Commentcard from './Commentcard';
import Comment from './Comment';
import Quote from './Quote';
import Allhomepageresults from "./Allhomepageresults";

const Stack = createStackNavigator();

const Booknavigation = () => {
  return (
    // options={({navigation})=>({headerTitle:navigation.getParam()})}
      <Stack.Navigator initialRouteName={'Home'}>
      <Stack.Screen name = 'Home' component={Home} options={{headerShown: false,headerTitleStyle:{fontSize:18,fontWeight:'bold'
      },headerStyle:{backgroundColor:'#EDF2F4'}}} ></Stack.Screen>
       <Stack.Screen name = 'allhomeresults' component={Allhomepageresults} options={{headerShown: false,headerTitleStyle:{fontSize:18,fontWeight:'bold'
      },headerStyle:{backgroundColor:'#EDF2F4'}}} ></Stack.Screen>
      <Stack.Screen name = 'Showbookview' component={Bookview} options={{headerShown: false}} />

      <Stack.Screen name = 'comment' component={Comment}  options={({route}) => ({title: route.params.title,headerTintColor:'#1f7a8c'
      ,headerTitleStyle:{fontSize:18,fontWeight:'bold'
      },headerStyle:{backgroundColor:'#EDF2F4'}
      })}/>
      <Stack.Screen name = 'quote' component={Quote}  options={({route}) => ({title: route.params.title,headerTintColor:'#1f7a8c'
      ,headerTitleStyle:{fontSize:18,fontWeight:'bold'
      },headerStyle:{backgroundColor:'#EDF2F4'}

      })}/>
      </Stack.Navigator>
      

  );
}
export default Booknavigation;
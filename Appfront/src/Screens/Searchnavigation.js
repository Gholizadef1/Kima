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
import Bookresult from './Bookresult';
import Search from './Search';
import Bookview from './Bookview';
import Commentcard from './Commentcard';
import Comment from './Comment';

// import TabScreen from './TabScreen';
 import Home from './Home';
 import {NavigationContainer} from '@react-navigation/native';
 
 const SNavigation = createStackNavigator();
const Searchnavigation=()=>{
   return(
    
    <SNavigation.Navigator initialRouteName={'Search'}>
      <SNavigation.Screen name='Search' component={Search} options={{headerShown: false}} ></SNavigation.Screen>
      <SNavigation.Screen name="Showbookview"   component={Bookview} options={{headerShown: false}}></SNavigation.Screen>
      <SNavigation.Screen name="comment"   component={Comment}  options={({route}) => ({title: route.params.title,headerTintColor:'#1f7a8c'
      ,headerTitleStyle:{fontSize:18,fontWeight:'bold'
      },headerStyle:{backgroundColor:'#EDF2F4'}
      })}></SNavigation.Screen>

    </SNavigation.Navigator>
  
   )

 }
 export default  Searchnavigation;
  
  // export default ()=>
  // (
  //   <NavigationContainer>
  //     <Snavigation></Snavigation>
  //   </NavigationContainer>
  // );
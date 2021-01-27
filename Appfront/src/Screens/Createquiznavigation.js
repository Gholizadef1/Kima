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
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
// import { createStackNavigator } from 'react-navigation-stack';
// import TabScreen from './TabScreen';
 import Home from './Home';
import { NavigationContainer } from '@react-navigation/native';
import Profile from './Profile';
import Editprofile from './Editprofile';
import Activityquote from './Activityquote';
import Eachgroup from './Eachgroup';
import GroupPage from './GroupPage';
import Myquizes from './Myquizes';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Quizes from "./Quizes";
import Eachquiz from "./Eachquiz";
import Createquiz from "./Createquiz";
import Quiznavigation from "./Quiznavigation";





const profilenav = createStackNavigator();
const Createquiznavigation=(prop)=>{
  return(

   <profilenav.Navigator initialRouteName={'Profile'}>
     <profilenav.Screen name='Allquizes' component={Quiznavigation} options={{headerShown:false}} ></profilenav.Screen>
     <profilenav.Screen name="createnewquiz"   component={Createquiz}  options={{headerShown:true,headerStyle:{backgroundColor:'#EDF2F4'},headerTitle:'کیما',headerTintColor:"#1F7A8C",headerTitleStyle:{color:'#1F7A8C',fontWeight:'bold'}}}></profilenav.Screen>
   
   </profilenav.Navigator>
 
  )

}

export default Createquiznavigation;
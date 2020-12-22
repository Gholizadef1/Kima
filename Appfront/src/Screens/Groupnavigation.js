import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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
import EditProfile from './Editprofile';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Groups from './Groups'

const Tab = createMaterialTopTabNavigator();

const Groupnavigation =()=>{
  return (
    <Tab.Navigator style={{marginTop:hp('4.3.9%')}
    }    tabBarOptions={{activeTintColor:'#1f7a8c',pressColor:'#DEF2F8',allowFontScaling:true,labelStyle:{fontWeight:'bold'}, indicatorStyle:{backgroundColor:'#1f7a8c'} ,  style: {backgroundColor:'#EDF2F4',borderBottomRightRadius:10,borderBottomLeftRadius:10},}}  >
      <Tab.Screen name="گروه ها" component={Groups} />
      <Tab.Screen name="گروه های من" component={EditProfile} />
    </Tab.Navigator>
  );
}


export default Groupnavigation;
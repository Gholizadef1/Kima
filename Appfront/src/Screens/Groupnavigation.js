import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import { StyleSheet, Text, View,Image,ImageBackground } from 'react-native';
// import {Container,Header,Title,Form,Item,Input,Button} from 'native-base';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import HomeScreen from './HomeScreen';
// import Login from './Login';
// import SignUp from './SignUp';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
// import { createStackNavigator } from 'react-navigation-stack';
// import TabScreen from './TabScreen';
//  import Home from './Home';
// import { NavigationContainer } from '@react-navigation/native';
// import Profile from './Profile';
// import Editprofile from './Editprofile';
// import Activityquote from './Activityquote';
// import EditProfile from './Editprofile';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Groups from './Groups';
import Mygroups from './Mygroups';
// import { TabBarIndicator } from 'react-native-tab-view';
  // import { SearchBar } from 'react-native-elements';
 import Eachgroup from './Eachgroup';
 import GroupPage from './GroupPage';

const Tab = createMaterialTopTabNavigator();

const Groupnavigation =()=>{
  return (
   
       
    <Tab.Navigator  style={{marginTop:hp('4.3.9%'),backgroundColor:'white',}
    
    } elevation={50}   tabBarOptions={{elevation:50,activeTintColor:'#1f7a8c',pressColor:'#DEF2F8',elevation:50,allowFontScaling:true,
    labelStyle:{fontWeight:'bold',fontSize:wp('3.3%')}, 
    indicatorStyle:{backgroundColor:'#1f7a8c',left:wp('1%'),right:wp('1%'),width:wp('48%')} ,
      style: {backgroundColor:'#EDF2F4',borderBottomRightRadius:10,borderBottomLeftRadius:10},}
      }  >
       {/* <View style={{position:'absolute'}}></View> */}
      <Tab.Screen name="گروه ها" component={Groups} elevation={50} style={{}} />
      <Tab.Screen name="گروه های من" component={Mygroups} />
    
    </Tab.Navigator>
   
  );
}


export default Groupnavigation;

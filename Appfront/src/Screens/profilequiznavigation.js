
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
import Createquiznavigation from "./Createquiznavigation"
const Drawer = createDrawerNavigator();

const Profilequiznavigation=()=>{
  return (
  
 
    <Drawer.Navigator initialRouteName="Profile">
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="createquiznavigation" component={Createquiznavigation} />
    </Drawer.Navigator>
 
  );
}



export default Profilequiznavigation;
import { StatusBar } from 'expo-status-bar';
import React, { useState ,useContext,useEffect} from 'react';
import { StyleSheet, Text, View,Image,ImageBackground } from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button} from 'native-base';
import TabScreen from './src/Screens/TabScreen'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import StackScreen from './src/Screens/StackScreen';
import { State } from 'react-native-gesture-handler';
import AuthContext,{AuthProvider} from './src/context/Authcontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loadingscreen from './src/Screens/Loadingscreen';
import {NavigationContainer} from '@react-navigation/native';
import { I18nManager } from 'react-native';
import { SplashScreen } from 'expo';

// import {Authcontext, Provider as AuthProvider } from './src/context/Authcontext';
// import {Context as AuthContext} from './src/context/Authcontext'


// const lala=()=>{
//   return(
//     <TabScreen></TabScreen>
//   )
// }


// const SwitchNavigaor=()=>{
//   return(
//     <NavigationContainer>
          



//     </NavigationContainer>


//   )
// }

// const SwitchNavigator=createSwitchNavigator({
//   mainFlow:TabScreen,
//   loginFlow:StackScreen,
 

 
   
// export default createAppContainer(lala);
    
    

// })
// // const SwitchNavigatorr=createAppContainer(SwitchNavigator);
// // export default createAppContainer(SwitchNavigator);
const a=true;
const Loadingscreenwaiting=async()=>{
  await setTimeout(() => {  console.log("hello!"); }, 5000);
}
const SwitchNavigatorr=(prop)=>{
  I18nManager.forceRTL(true);
  const value=useContext(AuthContext);
  const [done,setdone]=useState(false);
  console.log(value);
  useEffect(async()=>{
   
    console.log('checkkard1')
  const token=await AsyncStorage.getItem('token');
  console.log(token)
  console.log('checkkard2')
  if(token!=null){
    value.changelogged(token);
    setdone(true);
    console.log('checkkard3')
  }
  else{
  value.changelogged(null);
  setdone(true);
  console.log('checkkard4')
  }
  },[])
  const [wait,setwait]=useState(false);
  // return (<NavigationContainer><TabScreen></TabScreen></NavigationContainer>)
  console.log(wait);
  if(!done||wait===true){
    // async function a(){await setTimeout(() => {  console.log("hello!"); }, 5000);}
    // a();
    //new Promise(()=>setTimeout(() => {  console.log("hello!"); }, 5000))
    //const sleep = ms => new Promise(resolve =>setTimeout(() => {  console.log("hello!"); }, 5000))
    //new Promise(()=>(setTimeout(() => {  console.log("hello!"); }, 5000)))
    // SplashScreen.preventAutoHide()
      // SplashScreen.
      
    return (
     
      <Loadingscreen waitt={setwait}></Loadingscreen>
    )
    
  }
  // const {logg,changelogg}=useContext(AuthContext);
  else{

  return(
    // <SplashScreen></SplashScreen>
    // <TabScreen></TabScreen>
    <NavigationContainer>
    
     {value.logged!=null ? (<TabScreen/>):(<StackScreen/>)}
     
     </NavigationContainer>
  )
}
}


export default()=>{
  I18nManager.forceRTL(true);
 return(
   <AuthProvider>

    <SwitchNavigatorr/>
   
  </AuthProvider>
  )
  
}

// }

// const Tab = createBottomTabNavigator();

// export default function App(){
//   return(

//     // <NavigationContainer>
//     // <StackScreen />
    
    
    
//     // </NavigationContainer>
  
//   )
// }

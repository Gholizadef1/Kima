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

const SwitchNavigatorr=(prop)=>{

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
  // return (<NavigationContainer><TabScreen></TabScreen></NavigationContainer>)
  if(!done){
    return (
    
      <Loadingscreen></Loadingscreen>
    )
  }
  // const {logg,changelogg}=useContext(AuthContext);
  else{
  return(
    // <TabScreen></TabScreen>
    <NavigationContainer>
    
     {value.logged!=null ? (<TabScreen/>):(<StackScreen/>)}
     
     </NavigationContainer>
  )
}
}


export default()=>{
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

import React,{useEffect,useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image,ImageBackground, TouchableOpacity,Alert } from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button, Icon} from 'native-base';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Video } from 'expo-av';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AuthContext from '../context/Authcontext';
// import { View } from 'react-native-animatable';


const Loadingscreen=(prop)=>{

//    const value=useContext(AuthContext);
//   console.log(value);
//   useEffect(async()=>{
   
//     console.log('checkkard1')
//   const token=await AsyncStorage.getItem('token');
//   console.log(token)
//   console.log('checkkard2')
//   if(token!=null){
//     value.changelogged(token);
//     console.log('checkkard3')
//   }
//   else{
//   value.changelogged(null);
//   console.log('checkkard4')
//   }
//   },[])
    // return null;
    // async()=>{
    // setTimeout(async() => {  await console.log("Hi!"); }, 5000);
    // }
    // return (new Promise(async(resolve,reject)=>{
    
    // await setTimeout(async() => { 
    //     return(<View>
    //         <Text>akd;skjf;lsjf</Text>
    //         </View>)
    //   await console.log("hello!");
    //      }, 5000)
    //      resolve();
    //     })
    //     .then(async()=>{
    //        await prop.waitt(false);
    //     //  return(<View><Text>akd;skjf;lsjf</Text></View>)
    //     }).catch(()=>{console.log('Im in loading catch')}))
    return(<View><Text>akd;skjf;lsjf</Text></View>)
  
}
export default Loadingscreen;
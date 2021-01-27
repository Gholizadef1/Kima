import React , {useState , useEffect, version} from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { StyleSheet, Text, View,Image,ImageBackground,Alert ,ScrollView, ImageEditor} from 'react-native';
// import { createStackNavigator } from 'react-navigation-stack';
// import TabScreen from './TabScreen';
 import Home from './Home';
import { NavigationContainer } from '@react-navigation/native';
// import { View } from 'react-native-animatable';


// const AuthStack=createStackNavigator();

// const AuthStackScreen=() => {

//   <AuthStack.navigator>

//     <AuthStack.Screen>


//     </AuthStack.Screen>

//   </AuthStack.navigator>


// }

  
//  const stackscreen=createStackNavigator();


//  StackScreen
const stackScreen = createStackNavigator();
const StackScreen=(prop)=>{
  return(
   
   <stackScreen.Navigator initialRouteName={'Log'}>

     <stackScreen.Screen name='Log' component={Login} 
     options={{
       headerShown:false,
    //    headerTitle:'کیما',headerTintColor:'#1F7A8C',
    //  headerStyle:{backgroundColor:'white'},headerTitleStyle:{color:'#1F7A8C',fontWeight:'bold',position:'absolute',bottom:-15}
  //    ,transitionSpec: {
  //   open: TransitionSpecs.TransitionIOSSpec,
  //   close: TransitionSpecs.TransitionIOSSpec,
  // },gestureDirection: 'horizontal',
  }
  } ></stackScreen.Screen>
  {/* <View><Text>sfk</Text></View> */}
     <stackScreen.Screen name="Sign"   component={SignUp} options={{
           headerShown:false,
      //  headerTitle:'کیما',headerTintColor:'#1F7A8C',headerStyle:{backgroundColor:'#E1E5F2'},headerTitleStyle:{color:'#1F7A8C',fontWeight:'bold'}
       }} ></stackScreen.Screen>

   </stackScreen.Navigator>
 
  )

}

  // const StackScreen = createStackNavigator(
  //   {
  //     Log:Login,
  //     Sign:SignUp
  
  //   },
  //   {
  //     initialRouteName: 'Log',
  //     defaultNavigationOptions: {
  //       title: 'Kima',
        
  //       headerTintColor:'#1F7A8C',
  //       headerStyle: {
  //         backgroundColor: '#E1E5F2',
          
  //       },
      
      
      
      
  //     },
  //   }
  // );
  //  const StackScreen=()=>{return createAppContainer(stackScreen);}
 
  
  export default StackScreen;

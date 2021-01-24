import Quizes from './Quizes';
import Eachquiz from './Eachquiz';
import Groupnavigation from './Groupnavigation'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Groups from './Groups';
import Mygroups from './Mygroups';
// import { TabBarIndicator } from 'react-native-tab-view';
  // import { SearchBar } from 'react-native-elements';
 import Eachgroup from './Eachgroup';
 import GroupPage from './GroupPage';
 
const Tab = createMaterialTopTabNavigator();

const Quiznavigation =()=>{
  return (
   
       
    <Tab.Navigator  style={{marginTop:hp('4.3.9%'),backgroundColor:'white',}
    
    } elevation={50}   tabBarOptions={{elevation:50,activeTintColor:'#1f7a8c',pressColor:'#DEF2F8',elevation:50,allowFontScaling:true,
    labelStyle:{fontWeight:'bold',fontSize:wp('3.3%')}, 
    indicatorStyle:{backgroundColor:'#1f7a8c',left:wp('1%'),right:wp('1%'),width:wp('48%')} ,
      style: {backgroundColor:'#EDF2F4',borderBottomRightRadius:10,borderBottomLeftRadius:10},}
      }  >
       {/* <View style={{position:'absolute'}}></View> */}
      <Tab.Screen name="کوییز ها" component={Quizes} elevation={50} style={{}} />
      <Tab.Screen name="کوییز های من" component={Eachquiz} />
    
    </Tab.Navigator>
   
  );
}


export default Quiznavigation;

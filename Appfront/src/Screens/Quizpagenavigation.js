
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Quiznavigation from "./Quiznavigation";
import Quizpage from "./Quizpage";
import Quizresult from "./Quizresult";

const Quizpagenav = createStackNavigator();

const Quizpagenavigation = () => {

  return (
      <Quizpagenav.Navigator initialRouteName={'Groups'}>
      {/* <Quizpagenav.Screen name = 'Groups' component={Groups} options={{headerShown: false}} ></Quizpagenav.Screen> */}
      <Quizpagenav.Screen name = "quiznavigaiton" component={Quiznavigation} options={{headerShown: false}} />
      <Quizpagenav.Screen name = "quizpage" component={Quizpage} options={({route}) => ({title: "کوییز",headerTintColor:'#1f7a8c'
      ,headerTitleStyle:{fontSize:18,fontWeight:'bold'
      },headerStyle:{backgroundColor:'#EDF2F4',elevation:1}

      })} />
       <Quizpagenav.Screen name = "quizresult" component={Quizresult} options={({route}) => ({title: "کوییز",headerTintColor:'#1f7a8c'
      ,headerTitleStyle:{fontSize:18,fontWeight:'bold'
      },headerStyle:{backgroundColor:'#EDF2F4',elevation:1}

      })} />
   
      </Quizpagenav.Navigator>
  );
}
export default Quizpagenavigation;
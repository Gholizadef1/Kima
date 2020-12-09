import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Mybooks from './Mybooks';
import WantToRead from './WantToRead';
import IsRead from './IsRead';
import IsReading from './IsReading'
import Bookview from './Bookview'
import Commentcard from './Commentcard';
import Comment from './Comment';

const Mybooknav = createStackNavigator();

const MybooksNavigation = () => {

  return (
      <Mybooknav.Navigator initialRouteName={'Mybooks'}>
      <Mybooknav.Screen name = 'Mybooks' component={Mybooks} options={{headerShown: false}} ></Mybooknav.Screen>
      <Mybooknav.Screen name = "ShowToRead" component={WantToRead} options={{headerShown: false}} />
      <Mybooknav.Screen name = "ShowReading" component={IsReading} options={{headerShown: false}} />
      <Mybooknav.Screen name = "ShowRead" component={IsRead} options={{headerShown: false}} />
      <Mybooknav.Screen name="Showbookview"   component={Bookview} options={{headerShown: false}}></Mybooknav.Screen>
      <Mybooknav.Screen name="comment"   component={Comment}  options={({route}) => ({title: route.params.title,headerTintColor:'#1f7a8c'
      ,headerTitleStyle:{fontSize:18,fontWeight:'bold'
      },headerStyle:{backgroundColor:'#EDF2F4'}
      })}></Mybooknav.Screen>

      </Mybooknav.Navigator>
  );
}
export default MybooksNavigation;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Groups from './Groups';
import GroupPage from './GroupPage';
import Groupnavigation from './Groupnavigation'

const GroupPagenav = createStackNavigator();

const GroupPageNavigation = () => {

  return (
      <GroupPagenav.Navigator initialRouteName={'Groups'}>
      {/* <GroupPagenav.Screen name = 'Groups' component={Groups} options={{headerShown: false}} ></GroupPagenav.Screen> */}
      <GroupPagenav.Screen name = "Groupmainpage" component={Groupnavigation} options={{headerShown: false}} />
      <GroupPagenav.Screen name = "ShowGroupPage" component={GroupPage} options={{headerShown: false}} />
   
      </GroupPagenav.Navigator>
  );
}
export default GroupPageNavigation;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Groups from './Groups';
import GroupPage from './GroupPage';
import Groupnavigation from './Groupnavigation'
import DiscussionPage from './DiscussionPage';
import MembersPage from './MembersPage';

const GroupPagenav = createStackNavigator();

const GroupPageNavigation = () => {

  return (
    <GroupPagenav.Navigator initialRouteName={'Groups'}>
      {/* <GroupPagenav.Screen name = 'Groups' component={Groups} options={{headerShown: false}} ></GroupPagenav.Screen> */}
      <GroupPagenav.Screen name="Groupmainpage" component={Groupnavigation} options={{ headerShown: false }} />
      <GroupPagenav.Screen name="ShowGroupPage" component={GroupPage} options={{ headerShown: false }} />

      <GroupPagenav.Screen name="اعضای گروه" component={MembersPage} options={({ route }) => ({
        headerTintColor: '#1f7a8c'
        , headerTitleStyle: {
          fontSize: 18, fontWeight: 'bold'
        }, headerStyle: { backgroundColor: '#EDF2F4', elevation: 1 }
      })} />
      <GroupPagenav.Screen name="ShowDiscussionPage" component={DiscussionPage} options={({ route }) => ({
        title: route.params.title, headerTintColor: '#1f7a8c'
        , headerTitleStyle: {
          fontSize: 18, fontWeight: 'bold'
        }, headerStyle: { backgroundColor: '#EDF2F4', elevation: 1 }
      })} />


    </GroupPagenav.Navigator>
  );
}
export default GroupPageNavigation;

import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { Component } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Home from './Home'
import Profie from './Profile'
import Search from './Search'
import Mybooks from './Mybooks'
import Groups from './Groups';
import Bookresult from './Bookresult';
import Searchnavigation from './Searchnavigation';
import Booknavigation from './Booknavigation'
import Bookview from './Bookview';
import { createSwitchNavigator } from 'react-navigation';
//import App from '../../App';
import Profile from './Profile';
import Editprofile from './Editprofile';
import Profilenavigation from './Profilenavigation';
import MybooksNavigation from './MybooksNavigation';
import Groupnavigation from './Groupnavigation';
import GroupPageNavigation from './GroupPageNavigation';
// const SNavigation = createStackNavigator();
//  Snavigation=()=>{
//    return(
//     <SNavigation>
//       <SNavigation.Screen name='search' component={Search}></SNavigation.Screen>
//       <SNavigation.Screen name="book"   component={Bookresult}></SNavigation.Screen>

//     </SNavigation>
//    )

//  }
// const logout=createSwitchNavigator({
//   mainFlow:TabScreen,
//   loginFlow:StackScreen,
 
// }

// );
const Tab = createBottomTabNavigator();
const TabSreen = () => {
    return (
      // <NavigationContainer options={{}} >

          <Tab.Navigator tabBarOptions={{activeTintColor:'#1f7a8c',activeBackgroundColor:'#EDF2F4'}}
          initialRoute={{
            headerShown: false
          }}
          >

             <Tab.Screen  name="خانه"  component={Booknavigation} options ={{tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" size={size} color={color}  />
              ),
              
              }}/>
               <Tab.Screen name="کتاب های من" component={MybooksNavigation} options={{tabBarIcon: ({ color, size }) => (
                <AntDesign name="book" size={size} color={color} />
              ),
            }}/>
            
            <Tab.Screen name="جستجو" component={Searchnavigation} options={{tabBarIcon: ({ color, size }) => (
                <Feather name="search" size={size} color={color} />
              ),
    
            }}/>
             <Tab.Screen name="گروه ها" component={GroupPageNavigation} options={{tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="people" size={24} color={color} />
              ),
    
            }}/>
          
            <Tab.Screen name="حساب کاربری" component={Profilenavigation} options={{tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="person" size={size} color={color} />
              ),
              }}/>
           
          </Tab.Navigator>
          // {/* </NavigationContainer> */}
      );
}

export default TabSreen ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
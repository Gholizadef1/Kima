
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { Component } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Home from './Home'
import Profie from './Profile'
import Search from './Search'
import Mybooks from './Mybooks'
import Groups from './Groups';

const Tab = createBottomTabNavigator();
const TabSreen = () => {
    return (
        <NavigationContainer>
          <Tab.Navigator
          initialRoute={{
            headerShown: false
          }}
          >
             <Tab.Screen name="Home" component={Home} options ={{tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" size={size} color={color} />
              ),
              }}/>
               <Tab.Screen name="My books" component={Mybooks} options={{tabBarIcon: ({ color, size }) => (
                <AntDesign name="book" size={size} color={color} />
              ),
            }}/>
            
            <Tab.Screen name="Search" component={Search} options={{tabBarIcon: ({ color, size }) => (
                <Feather name="search" size={size} color={color} />
              ),
    
            }}/>
             <Tab.Screen name="Groups" component={Groups} options={{tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="people" size={24} color={color} />
              ),
    
            }}/>
          
            <Tab.Screen name="Profile" component={Profie} options={{tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="person" size={size} color={color} />
              ),
              }}/>
           
          </Tab.Navigator>
        </NavigationContainer>
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
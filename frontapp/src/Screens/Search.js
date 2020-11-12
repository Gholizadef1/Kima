import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import {Container,Header,Title,Form,Item,Input,Button, Icon} from 'native-base';
import { StatusBar } from 'expo-status-bar';
import Searchbar from '../components/Searchbar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Authorresult from './Authorresult';
import Bookresult from './Bookresult';

const Search = () => {
    const [term,setTerm]=useState('');
    const Tab = createMaterialTopTabNavigator();

    return(
    
      <Container>

        <Searchbar term={term} onTermChange={(newterm)=>setTerm(newterm)} onTermsubmit={()=>console.log('hi')}  />
        <Text>{term}</Text>
        <Tab.Navigator>
      <Tab.Screen name="Authorresult" component={Authorresult} />
      <Tab.Screen name="Bookresult" component={Bookresult} />
    </Tab.Navigator>
        </Container>
      
       
   
    );
}

const styles = StyleSheet.create({
   background:{
       backgroundColor:'white',
       height:1000
   }
  });
  export default Search;
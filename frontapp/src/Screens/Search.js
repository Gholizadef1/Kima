import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import {Container,Header,Title,Form,Item,Input,Button, Icon} from 'native-base';
import { StatusBar } from 'expo-status-bar';
import Searchbar from '../components/Searchbar';

const Search = () => {
    const [term,setTerm]=useState('')
    return(
    
      <Container>
        <Searchbar term={term} onTermChange={(newterm)=>setTerm(newterm)} onTermsubmit={()=>console.log('hi')}  />
        <Text>{term}</Text>
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
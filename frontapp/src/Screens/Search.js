import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import {Container,Header,Title,Form,Item,Input,Button, Icon} from 'native-base';
import { StatusBar } from 'expo-status-bar';
import Searchbar from '../components/Searchbar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Authorresult from './Authorresult';
import Bookresult from './Bookresult';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { sub } from 'react-native-reanimated';
import axiosinst from '../api/axiosinst';
const Search = () => {
    const [term,setTerm]=useState('');
    const [results,setResults]=useState([]);
    const Tab = createMaterialTopTabNavigator();
    const [submit,setSubmit]=useState(false);
    // const [errormessage,setErrormessage]=useState('');
    // let sumbit =false;
    const serchitem='';
    const searchapi=async searchTerm=>{
        try{
        // if(term===undefined)
        // searchitem=searchTerm;
        // else
        // serchitem=term;

        
        const response = await axiosinst.get('/dyanmicsearch/',{
            params:{
                search:searchTerm,
                search_fields:'author',
               
            }
        })
        setResults(response.data.results);
    }
    catch(err){
        console.log('error');
        //  setErrormessage('سیمامون به هم گیر کرده صبر داشته باش :)')
        Alert.alert('oops',' حتما اشتباهی شده دوباره امتحان کن :)',[{
            

                Title:'فهمیدم',onPress:()=>console.log('alert closed')
                }])
    }
    }

    useEffect(()=>{
        const tempresponse=searchapi('احمد ')
        .then(
        
        console.log(tempresponse)
        )
        
     
     
        
    },[])
    return(
    
      <Container>
        <Text style={{marginTop:100,position:'absolute'}}>Hiii</Text>
        <Searchbar style={{position:'absoloute'}} term={term} onTermChange={(newterm)=>setTerm(newterm)} onTermsubmit={()=>searchapi(term)} />
        <Text style={{position:'absolute',marginTop:200,marginLeft:200,marginTop:112}}>با اطلاعات شما {results.length} کتاب پیدا شدند</Text>
         {/* {errormessage?<Text style={{position:'absolute',marginTop:50}}>{errormessage}</Text>:null} */}
        </Container>
      
       
   
    );
}


const styles = StyleSheet.create({
//    background:{
//        backgroundColor:'white',
//        height:1000
//    }
  });
  export default Search;
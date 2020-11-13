import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,Alert} from 'react-native';
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
import ResultsList from '../components/ResultsList';

const Search = () => {
    const [term,setTerm]=useState('');
    const [results,setResults]=useState([]);
    const [start,setStart]=useState(false);
    const [authors,setAuthors]=useState([]);
    const[titles,setTitles]=useState([]);
    // const [errormessage,setErrormessage]=useState('');
    // let sumbit =false;
    const serchitem='';
    if(term===undefined)
    setStart(false)
    const searchapi=async (searchTerm)=>{
        try{
        const response = await axiosinst.get('/dyanmicsearch/',{
            params:{
                search:searchTerm,
                //nemidonam chetori ham title va ham author ro behesh bedam
                search_fields:'author',
                
               
            }
        })
        setResults(response.data.results);
    }
    catch(err){
        console.log('error');
        Alert.alert('oops',' حتما اشتباهی شده دوباره امتحان کن :)',[{
            

                Title:'فهمیدم',onPress:()=>console.log('alert closed')
                }])
    }
    }

    const searchauthorapi=async (searchTerm)=>{
        try{
        const response = await axiosinst.get('/dyanmicsearch/',{
            params:{
                search:searchTerm,
                search_fields:'author',
               
               
            }
        })
        setAuthors(response.data.results);
    }
    catch(err){
        console.log('error');
        Alert.alert('oops',' حتما اشتباهی شده دوباره امتحان کن :)',[{
            

                Title:'فهمیدم',onPress:()=>console.log('alert closed')
                }])
    }
    }

    const searchtitleapi=async (searchTerm)=>{
        try{
        const response = await axiosinst.get('/dyanmicsearch/',{
            params:{
                search:searchTerm,
                search_fields:'title',
               
               
            }
        })
        setTitles(response.data.results);
    }
    catch(err){
        console.log('error');
        Alert.alert('oops',' حتما اشتباهی شده دوباره امتحان کن :)',[{
            

                Title:'فهمیدم',onPress:()=>console.log('alert closed')
                }])
    }
    }

    useEffect(()=>{
        try{
            searchapi('احمد');
            searchauthorapi('احمد');
            searchtitleapi('احمد');
        
        }
        catch(err){
            console.log(err);
        }
    },[])
  //mikhastam inja start bashe vali warning midad va nafahmidam chera
    
    return(
    
      <View style={{backgroundColor:'white',height:1000}}>
       
        <Searchbar style={{}} term={term} onStartEditing={(val)=>setStart(val)} onTermChange={(newterm)=>setTerm(newterm)} onTermsubmit={()=>{searchapi(term)&&searchauthorapi(term)&&searchtitleapi(term)&&console.log(term)}} />
        <Text style={{marginTop:200,marginLeft:170,marginTop:20,marginRight:30}}>با اطلاعات شما {results.length} کتاب پیدا شدند</Text>
        <ResultsList 
        listresult={authors}
        stylee={{}} title="جستجو بر اساس نویسنده"></ResultsList>
       
        <ResultsList 
        listresult={titles}
        stylee={{}} title="جستجو بر اساس نام کتاب"></ResultsList>
         {/* {errormessage?<Text style={{position:'absolute',marginTop:50}}>{errormessage}</Text>:null} */}
        </View>
      
       
   
    );
}


const styles = StyleSheet.create({
//    background:{
//        backgroundColor:'white',
//        height:1000
//    }
  });
  export default Search;
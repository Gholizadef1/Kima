import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,Alert,Image,ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import {Container,Header,Title,Form,Item,Input,Button, Icon} from 'native-base';
//searchbar
import { StatusBar } from 'expo-status-bar';
import Searchbar from '../components/Searchbar';
//import { Searchbar } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Authorresult from './Authorresult';
import Bookresult from './Bookresult';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { sub } from 'react-native-reanimated';
import axiosinst from '../api/axiosinst';
import ResultsList from '../components/ResultsList';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';

const Search = ({navigation}) => {
    // const [searchterm,setsearchterm]=useState('');
    // const searching=(term)=>setsearchterm(term);
    //console.log({navigation})
    const [term,setTerm]=useState('');
    const [results,setResults]=useState([]);
    // const [start,setStart]=useState(false);
    const [authors,setAuthors]=useState([]);
    const[titles,setTitles]=useState([]);
    // const [errormessage,setErrormessage]=useState('');
    // let sumbit =false;
    const serchitem='';
    // if(term===undefined)
    // setStart(false)
    const searchapi=async (searchTerm)=>{
        try{
        const response = await axiosinst.get('books',{
            params:{
               // page:1,
                search:searchTerm,
                //nemidonam chetori ham title va ham author ro behesh bedam
                search_fields:'author',
                
               
            }
        })
        console.log(response.data.results);
        setResults(response.data.results);
    }
    catch(err){
        console.log(err);
        Alert.alert('oops',' حتما اشتباهی شده دوباره امتحان کن :)',[{
            

                Title:'فهمیدم',onPress:()=>console.log('alert closed')
                }])
    }
    }

    const searchauthorapi=async (searchTerm)=>{
        try{
        const response = await axiosinst.get('books',{
            params:{
              //  page:1,
                search:searchTerm,
                search_fields:'author',
               
               
            }
        })
        console.log(response.data.results);
        await setAuthors(response.data.results);
    }
    catch(err){
        console.log(err);
        Alert.alert('oops',' حتما اشتباهی شده دوباره امتحان کن :)',[{
            

                Title:'فهمیدم',onPress:()=>console.log('alert closed')
                }])
    }
    }

    const searchtitleapi=async (searchTerm)=>{
        try{
        const response = await axiosinst.get('books',{
            params:{
               // page:1,
                search:searchTerm,
                search_fields:'title',
            
               
               
            }
        })
        console.log(searchTerm);
        console.log("\n d;aklfj;lksjf;lksjfl;k+\n"+response.data.results);
        await setTitles(response.data.results);
    }
    catch(err){
        console.log(err);
        Alert.alert('oops',' حتما اشتباهی شده دوباره امتحان کن :)',[{
            

                Title:'فهمیدم',onPress:()=>console.log('alert closed')
                }])
    }
    }
    const [exitsearch,setExitsearch]=useState([]);
    // useFocusEffect(
    //     React.useCallback(() => {
    //         searchapi('')&&
    //         searchauthorapi('ف')&&
    //         searchtitleapi('نا')  
    //     }, [navigation]))
    useEffect(()=>{
            searchapi('')&&
            searchauthorapi('')&&
            searchtitleapi('')  
    },[])
  //mikhastam inja start bashe vali warning midad va nafahmidam chera
    
    return(
        
    
      <View style={{backgroundColor:'white',flex:1}}>
     
        <Searchbar style={{}} term={term} onTermChange={(newterm)=>setTerm(newterm)} onTermsubmit={()=>{
           // searchapi(term)&&
            searchauthorapi(term)&&searchtitleapi(term)&&console.log(term)}}/>
            {/* <Searchbar
      placeholder="Search"
      onChangeText={searching}
      underlineColorAndroid={'#F1F3F9'}
      value={searchterm}
      onEndEditing={()=>{
            searchauthorapi(searchterm)&&searchtitleapi(searchterm)&&console.log(searchterm)
        }}
      onIconPress={()=>{
        searchauthorapi(searchterm)&&searchtitleapi(searchterm)&&console.log(searchterm)
        }}
      borderTopLeftRadius={hp('20%')}
          borderTopRightRadius={20}
          borderBottomRightRadius={20}
          borderBottomLeftRadius={20}
          placeholder={'نام کتاب نویسنده ...'}
          style={{  borderTopLeftRadius:hp('5%'),
          marginTop:hp('5%'),
          
          // alignSelf:'center',
          marginLeft:wp('5%'),
          borderTopRightRadius:hp('5%'),
          borderBottomRightRadius:hp('5%'),
          borderBottomLeftRadius:hp('5%'),
          
          backgroundColor:'#F1F3F9',height:hp('5%'),width:wp('80%'),marginBottom:hp('-0.5%')}}
          searchIcon={ <Feather name="search" size={24} color="#1f7a8c" style={{left:wp('2.5%'),marginRight:wp('1%'),
        
          }} />} */}
    {/* /> */}
        {/* <AntDesign name="close" size={24}  color="black" style={{marginLeft:10,position:'absolute',marginTop:10}} /> */}
        <Text style={{marginTop:200,marginRight:170,marginTop:20,marginLeft:hp('2%')}}>با اطلاعات شما {authors.length+titles.length} کتاب پیدا شدند</Text>
        <ScrollView>
        <ResultsList 
        navigation={navigation}
        listresult={authors}
        
        stylee={{}} title="جستجو بر اساس نویسنده"></ResultsList>
          <Image
         source={require('../../assets/line3.png')}
         style={{marginTop:20,marginHorizontal:10,width:390,height:1}}
         ></Image>
        <ResultsList 
        navigation={navigation}
        listresult={titles}
        stylee={{}} title="جستجو بر اساس نام کتاب"></ResultsList>
        </ScrollView>
         {/* {errormessage?<Text style={{position:'absolute',marginTop:50}}>{errormessage}</Text>:null} */}
         {/* <Image
         source={require('../../assets/kima6.jpeg')}
         style={{width:100,height:100,marginTop:700,marginLeft:40,position:'absolute'}}
         >
             
         </Image>
         <Text style={{marginHorizontal:50,marginTop:750,width:220,marginLeft:130,position:'absolute',fontWeight:'bold',fontSize:14}} >با کیما کتاب مورد علاقه ات را پیدا کن</Text> */}
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

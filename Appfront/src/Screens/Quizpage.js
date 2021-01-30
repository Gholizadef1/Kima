import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal,FlatList,ActivityIndicator, TextPropTypes,Alert } from 'react-native';
 import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content,SearchBar } from 'native-base';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { useFocusEffect } from '@react-navigation/native';
// import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons'; 
// import { SearchBar } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Eachgroup from './Eachgroup';
import axiosinst from '../api/axiosinst'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import { number } from 'yup';
import { set } from 'react-native-reanimated';
import Createquiz from "./Createquiz";
import { ImageBackground } from 'react-native';
// import { Button } from 'react-native-paper';
const Quizpage = () => {
   


  return (
    <View style={styles.container}>
    <ImageBackground style={{flex:1}} source={require("../../assets/fantezi.jpg")}>
    <ScrollView>
       <Text  style={{color:"black",fontSize:hp("2%"),fontWeight:"bold",alignSelf:"center",width:wp("86%"),marginTop:hp("16%")}}>صورت سوال اول  صورت سوال اول اینه که؟</Text>


       <View style={{backgroundColor:'rgba(237,242,244,0.7)',height:hp("8%"),width:wp("86%"),marginTop:hp("8%"),borderRadius:100,alignSelf:"center",justifyContent:"center"}}>
           <Text style={{fontSize:hp("1.8%"),alignSelf:"flex-start",marginHorizontal:wp("5%")}}> پاسخ اول اینه که این پاسخ اول akfdlfنمتکنکتمنتمنتمکبشکنمتنکتمسنمکتشبنتمکسبنکمتسنبتمسنبتهست</Text>
       </View>
       <View style={{backgroundColor:'rgba(237,242,244,0.7)',height:hp("8%"),width:wp("86%"),marginTop:hp("2.5%"),borderRadius:100,alignSelf:"center",justifyContent:"center"}}>
           <Text style={{fontSize:hp("1.8%"),alignSelf:"flex-start",marginHorizontal:wp("5%")}}> پاسخ اول اینه که این پاسخ اول akfdlfنمتکنکتمنتمنتمکبشکنمتنکتمسنمکتشبنتمکسبنکمتسنبتمسنبتهست</Text>
       </View>
       <View style={{backgroundColor:'rgba(237,242,244,0.7)',height:hp("8%"),width:wp("86%"),marginTop:hp("2.5%"),borderRadius:100,alignSelf:"center",justifyContent:"center"}}>
           <Text style={{fontSize:hp("1.8%"),alignSelf:"flex-start",marginHorizontal:wp("5%")}}> پاسخ اول اینه که این پاسخ اول akfdlfنمتکنکتمنتمنتمکبشکنمتنکتمسنمکتشبنتمکسبنکمتسنبتمسنبتهست</Text>
       </View>
       <View style={{backgroundColor:'rgba(237,242,244,0.7)',height:hp("8%"),width:wp("86%"),marginTop:hp("2.5%"),borderRadius:100,alignSelf:"center",justifyContent:"center"}}>
           <Text style={{fontSize:hp("1.8%"),alignSelf:"flex-start",marginHorizontal:wp("5%")}}> پاسخ اول اینه که این پاسخ اول akfdlfنمتکنکتمنتمنتمکبشکنمتنکتمسنمکتشبنتمکسبنکمتسنبتمسنبتهست</Text>
       </View>
     
       {/* <View style={{height:hp("10%"),width:wp("20%"),backgroundColor:"#1f7a8c"}}> */}
       <View style={{flexDirection:"row"}}>
       <TouchableOpacity style={{height:hp("10%"),width:wp("25%"),backgroundColor:"#1f7a8c",marginTop:hp("10.6.5%"),borderTopRightRadius:50}}>
       <AntDesign style={{marginTop:hp("2.2%"),marginRight:wp("11%"),color:"#Edf2f4"}} name="arrowright" size={24} color="black" />
       <Text style={{marginLeft:wp("4.4%"),marginTop:hp("0.4%"),fontSize:hp("1.5.5%"),fontWeight:"bold",color:"#Edf2f4"}}>سوال بعدی</Text>
       </TouchableOpacity>
       <TouchableOpacity style={{height:hp("10%"),width:wp("25%"),backgroundColor:"#1f7a8c",marginLeft:wp("50%"),marginTop:hp("10.6.5%"),borderTopLeftRadius:50,alignSelf:"flex-end"}}>
       <AntDesign style={{marginTop:hp("2.2%"),marginRight:wp("9%"),color:"#Edf2f4"}} name="arrowleft" size={24} color="black" />
       <Text style={{marginLeft:wp("6.4%"),marginTop:hp("0.4%"),fontSize:hp("1.5.5%"),fontWeight:"bold",color:"#Edf2f4"}}>سوال قبلی</Text>
       </TouchableOpacity>
       </View>
       {/* </View> */}
     
   
      
{/* 
        <Text style={{position:'absolute',marginTop:300}}>   Quiz page  </Text> */}
       
       </ScrollView>
       </ImageBackground>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b5c5e3',
  },
  plus: {

    alignSelf: 'center',
    justifyContent: 'center'

  }, 
  loader:{
    alignItems:'center',
    marginBottom:hp('15%'),
    justifyContent:'center',
    alignSelf:'center',
    marginTop:hp('10%')
  }
});
export default Quizpage;

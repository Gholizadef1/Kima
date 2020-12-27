import React,{useState} from 'react';
import { StyleSheet, Text, View ,Modal,ImageBackground} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect } from '@react-navigation/native';
import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import Eachgroup from './Eachgroup';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import {Formik,formik} from 'formik';
import * as yup from 'yup';


const userschema=yup.object({

  Username:yup.string()
  .required("لطفا نام کاربری جدید خود را وارد کنید")
  .min(4, "نام کاربری نمیتواند کم تر از 4 حرف باشد"),

  Discription:yup.string()
  .required("لطفا نام کاربری جدید خود را وارد کنید")
  .min(4, "نام کاربری نمیتواند کم تر از 4 حرف باشد"),

  // photo:yup.string()
  // .required("لطفا نام کاربری جدید خود را وارد کنید")
  // .min(4, "نام کاربری نمیتواند کم تر از 4 حرف باشد"),

})

const Groups = () => {

    const [modalopen,setmodalopen]=useState(false)
    const [selectedValue, setselectedValue] = useState('none')
    const [information, setinformation] = useState(['as;df']);
    return(
     
     
    
        <View style={styles.container}>
        <View style={{}}>
       <Modal    transparent={true} StatusBar={{backgroundColor:'blue'}} style={{bottom:100,margin:20,position:'absolute'}} visible={modalopen} animationType='fade' >
        
        {/* <StatusBar backgroundColor='#BFDBF7' style='light' /> */}
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
        {/* <View style={{alignSelf:'flex-end',top:hp('1%'),right:hp('1%'),backgroundColor:'blue'}}> */}
        <AntDesign style={{position:'absolute',alignSelf:'flex-end',top:hp('1%'),right:hp('1%')}} onPress={()=>setmodalopen(false)}
         name="close" size={23} color="#D75A5A" />
       {/* </View> */}
        {/* <Text>Hi im in modall :)))))</Text> */}
        <TouchableOpacity style={styles.avatar}
       onPress={() => { }}>
      <ImageBackground borderRadius={20}

         source={require('../../assets/backprof5j.jpeg')}
         style={styles.avatar}

       >

         </ImageBackground>
     </TouchableOpacity>
        </View>
        </View>
        </Modal>
    
        </View>
        <View style={{position:'absolute', justifyContent:'center',height:hp('7%'),width:wp('14%'),borderRadius:1000,backgroundColor:'#1f7a8c',elevation:5,marginTop:hp('77%'),marginLeft:wp('78%')}}>
        <Feather style={styles.plus} onPress={()=>setmodalopen(true)}
         name="plus" size={32} color="#EDF2F4" />
     
         </View>

         <View style={{marginLeft:wp('2%')}}>

         { (information.length>=0) ?    <DropDownPicker
          items={[
            { label: 'معروف ترین گروه ها', value: 'none' },
            { label: 'جدید ترین گروه ها', value: 'like' },
          ]}
          defaultValue={selectedValue}
          labelStyle={{fontSize:wp('3%')}}
          containerStyle={{ height: 40, width: 220, marginBottom: hp('2%') }}
          style={{
          
            borderColor:'#1f7a8c',backgroundColor: '#fafafa', marginTop: hp('2%'), width: wp('50%'), marginBottom: hp('-5%'), position: 'absolute', borderTopLeftRadius: 30, borderTopRightRadius: 30,
            borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginLeft: wp('3%')
          }}
          itemStyle={{
          
            justifyContent: 'flex-start'
          }}
          dropDownStyle={{ backgroundColor: '#fafafa',
            borderBottomLeftRadius: 30, borderBottomRightRadius: 30,marginTop:hp('2%'), marginLeft: wp('3%'), width: wp('50%'), position: 'absolute', marginBottom: hp('10%') }}
          onChangeItem={async (item) => {

            if (item.value === 'none') {
              console.log(item.value + 'VALUE')
              console.log('to none')
              await setlikeotime('/comment-filter-time')
        
            }
            else if (item.value === 'like') {
              console.log('tolike')
              console.log(item.value + 'VALUE')
              await setlikeotime('/comment-filter-like')
         
            }



          }}

        />:null}
        <TouchableOpacity onPress={()=>console.log('aladkki')}>
         <Eachgroup></Eachgroup>
         </TouchableOpacity>
         <Eachgroup></Eachgroup>
         <Eachgroup></Eachgroup>
         <Eachgroup></Eachgroup>
         </View>
            <Text>
                Groups
            </Text>
        </View>
   
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    plus:{
      
      alignSelf:'center',
      justifyContent:'center'
    
    },
    centeredView: {
      flex: 1,
      // justifyContent: "center",
      // alignItems: "center",
      height:hp('85%'),
      marginTop:hp('6%')
    },
    modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 10,
      padding: 35,
      height:hp('85%'),
   
      // shadowColor: "#000",
      // shadowOffset: {
      //   width: 0,
      //   height: 2
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 3.84,
      elevation: 50
    },
    avatar: {
      height: hp('14%'),
      width: wp('28%'),
      margin:hp('1.5%'),
      borderRadius: 5,
      position: 'absolute'
  
    },
  });
  export default Groups;
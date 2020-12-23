import React,{useState} from 'react';
import { StyleSheet, Text, View ,Modal} from 'react-native';
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
        <AntDesign style={{}} onPress={()=>setmodalopen(false)}
         name="close" size={24} color="black" />
        <Text>Hi im in modall :)))))</Text>
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
         <Eachgroup></Eachgroup>
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
      alignItems: "center",
      // shadowColor: "#000",
      // shadowOffset: {
      //   width: 0,
      //   height: 2
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 3.84,
      elevation: 50
    },
  });
  export default Groups;
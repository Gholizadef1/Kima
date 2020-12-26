import React,{useState} from 'react';
import { StyleSheet, Text, View ,Modal,ImageBackground ,Image} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Card } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
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
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';


const GroupPage = () => {

  const [picture,setpicture]=useState(null);

    return(
        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.kima}>کیما</Text>
        <Image

         source={require('../../assets/backprof4.jpeg')}
         style={{   width:wp('100%'),
        height:hp('35%'),
        position:'absolute',
        
       
       }}

         ></Image>
                  <View style={{position:'absolute',backgroundColor:'white',height:100,width:wp('100%'),marginTop:hp('30%'),borderTopStartRadius:30,borderTopEndRadius:30}}>

                    </View>
                    {/* <View style={styles.view}> */}
                    <View style={styles.backpic}>

                    </View>

                    {picture!='http://15cbf5742c3b.ngrok.io/media/default.png'?<Avatar.Image style={styles.avatar} size={105}
                      source={{uri:picture}}
                      ></Avatar.Image>: <Avatar.Image style={styles.avatar} size={105}
                      source={require('../../assets/avatar.png')}
                      ></Avatar.Image>}

                      <Text style={styles.groupname}>نام گروه</Text>

                      <Text style={{fontSize:19 , marginLeft:wp('10%') , marginTop:hp('4%')}}>درباره گروه</Text>

                      <Text style ={{textAlign:'left' , marginLeft:wp('7%') , marginTop:hp('1%') ,marginBottom:hp('2%')}}> 
                      منیتتتتنتنیتتالاتنمنئدذرزبلاتنئدذرزبلاتدذرزذدئنومنتالبفغعهخمنئدذرزبلاتاین گروه درباره کتاب خوانی است
                      </Text>

                    <Button style={{marginLeft:wp('48%') , width:170 , borderRadius:20 , marginTop:hp('2%')
                   , backgroundColor:'#1F7A8C'}}>
                      <Text style={{marginLeft:wp('17%') , fontSize:15 , fontWeight:'bold'}}>عضو شدن</Text>
                    </Button>

                    <Text style ={{fontSize:20 , marginTop:hp('3%') , marginLeft:wp('3%')}}>بحث های انجام شده</Text>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    kima:{
        color:'#1F7A8C',
        marginTop:hp('8%'),
        marginLeft:wp('5%'),
        fontSize:20,
        fontWeight:'bold',
        position:'absolute'       
    },
    backpic:{
       
        width:wp('100%'),
        height:hp('32%'), 
        borderBottomRightRadius:50,
        borderBottomLeftRadius:50
    },
    avatar:{
      marginTop:hp('-10%'),
      marginLeft:wp('10%')
      
  },
  groupname : {
    fontSize:27 ,
    marginLeft:wp('63%') ,
    marginTop:hp('-3%')
  }
  });
export default GroupPage;
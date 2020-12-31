import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Alert, ScrollView,Modal } from 'react-native';
//  import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect } from '@react-navigation/native';
import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native';


const Eachgroup = (prop) => {

 
    return(
      
      <View>
      {/* {prop.discription!='' ? (<View > */}
          <View style={styles.avatarname}>
     
     <TouchableOpacity style={styles.avatar}
       onPress={() => { }}>
       {prop.groupphoto === 'http://3fefbe690991.ngrok.io/media/default.png' ? <ImageBackground borderRadius={100}

         source={require('../../assets/avatar.png')}
         style={styles.avatar}

       >

       </ImageBackground> : <ImageBackground borderRadius={100}

         source={{uri:prop.groupphoto}}
         style={styles.avatar}

       >

         </ImageBackground>}
     </TouchableOpacity>
     {/* <Text style={styles.username}><Text>#</Text>{prop.title}</Text> */}
     <Text style={styles.username}>{prop.title}</Text>
     {prop.isowner?<Text style={styles.yourgroup}>#گروه شما</Text>:null}
     <Text style={styles.date}>{prop.membernumber}<Text style={{color:'gray'}}> عضو</Text></Text>


    
   </View>
  
   <View style={{ flexDirection: 'row' }}>

   <View style={styles.comment}>

        <Text style={{color:'black'}}>{prop.discription}</Text>
 </View>
 
  
   {/* </Card> */}
 </View>
 
 <Image
     source={require('../../assets/line2.png')}
     style={{ width: wp('100%'), height: 1}}
   ></Image>
            {/* <Text>
                Groups
            </Text> */}
        {/* </View>):(<Text style={{ color: 'blue', alignSelf: 'center', marginTop: hp('30%'),
         fontWeight: 'bold' }}>نقل قولی وجود ندارد</Text>)} */}
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
    yourgroup:{
      position:'absolute',
      marginLeft:wp('74%'),
      marginTop:hp('1%'),
      color:'#1f7a8c',
      fontSize:hp('1.5%'),
      // fontWeight:'bold'
    },
    username: {
        position: 'absolute',
        marginTop: '5%',
        left: wp('20%'),
        fontSize: hp('1.7%'),
        fontWeight: 'bold'
    
    
      },
      comment: {
    
        marginBottom:hp('2%'),
        marginTop: hp('2%'),
        marginRight: '5%',
        marginLeft: '5%',
      },
      avatar: {
        height: 65,
        width: 65,
        borderRadius: 100,
        position: 'absolute'
    
      },
      date: {
        position: 'absolute',
        marginTop: '17%',
        left: 80,
        fontSize: 12,
        color: 'gray'
      },
      avatarname: {
        marginTop: '5%',
        marginLeft: '5%',
        flexDirection: 'row',
    
        width: '50%',
        height: 65,
        borderRadius: 100
      },

  });
  export default Eachgroup;
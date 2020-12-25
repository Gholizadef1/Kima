import React,{useState} from 'react';
import { StyleSheet, Text, View ,Modal,ImageBackground ,Image} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content } from 'native-base';
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
      alignSelf:'center'

      
  },
  });
export default GroupPage;
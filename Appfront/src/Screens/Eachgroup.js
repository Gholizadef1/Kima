import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Alert, ScrollView,Modal } from 'react-native';
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
import { TouchableOpacity } from 'react-native';


const Eachgroup = (prop) => {

 
    return(
      
        <View style={styles.container}>
          <View style={styles.avatarname}>
     
     <TouchableOpacity style={styles.avatar}
       onPress={() => { }}>
       {prop.picture === 'http://fc0ce8a13f6f.ngrok.io/media/default.png' ? <ImageBackground borderRadius={100}

         source={require('../../assets/avatar.png')}
         style={styles.avatar}

       >

       </ImageBackground> : <ImageBackground borderRadius={100}

         source={{ uri: prop.picture }}
         style={styles.avatar}

       >

         </ImageBackground>}
     </TouchableOpacity>
     <Text style={styles.username}>luna</Text>
    
   </View>
  
   <View style={{ flexDirection: 'row' }}>

 
   <Image
     source={require('../../assets/line2.png')}
     style={{ width: 1000, height: 1 }}
   ></Image>
   {/* </Card> */}
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
    username: {
        position: 'absolute',
        marginTop: '5%',
        left: 80,
        fontSize: 15,
        fontWeight: 'bold'
    
    
      },
      comment: {
    
    
        marginTop: 20,
        marginRight: '5%',
        marginLeft: '5%',
      },
      avatar: {
        height: 65,
        width: 65,
        borderRadius: 100,
        position: 'absolute'
    
      },

  });
  export default Eachgroup;
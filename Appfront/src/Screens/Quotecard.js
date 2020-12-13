import React, { useState } from 'react';
import { StyleSheet, Text, View,Image,ImageBackground,Alert ,ScrollView} from 'react-native';
import { Container, Header, Left, Body, Right, Title, CardItem, Card } from 'native-base';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
import axiosinst from '../api/axiosinst';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const Quotecard = (prop) => {
    const hieght=prop.height
    const [like,setlike]=useState('gray')
    const [dislike,setdislike]=useState('lightblue')
    const [heart, setheart]= useState(false);

    console.log('comment')
    return(
        <View style={styles.container}>
        
        <Card style={{ marginLeft:wp('5%'),marginTop:hp('3.3%'),height:prop.height,marginRight:wp('5%'),borderRadius:10,elevation:4 ,backgroundColor:'#EDF2F4'}}>
        <View style={{flex:1,
        flexDirection:'row',
        alignItems:'center',
       }}>
        <Text style={{  
        // textAlignVertical:'center',
        // alignContent:'center',
        // alignItems:'center',

        color:'black',
        //flexDirection:'row-reverse',
        //alignSelf:'center',
       // textAlign:'right',
        // alignSelf:'center',
     
      
        marginBottom:hp('6.5%'),
        marginTop:hp('3.5%'),
        marginHorizontal:hp('3%'),
        fontSize:hp('1.7%')
        }}>{prop.naghlghol}</Text>
        </View>
        <View style={{position:'absolute',marginTop:prop.height-hp('7.8%'),alignSelf:'center'}}>
      <Text style={{marginBottom:hp('0.9%'),alignSelf:'center',color:'gray'}}>{prop.name}</Text>
      <View style={{}}>
       
     
       <TouchableOpacity  style={styles.avatar}
         onPress={()=>{}}>
      
      <TouchableOpacity style={styles.avatar}
              onPress={()=>{}}>
           {prop.picture==='http://e80ca9693f07.ngrok.io/media/default.png'?<ImageBackground borderRadius={100}
      
             source={require('../../assets/avatar.png')}
            style={styles.avatar}
      
            >

            </ImageBackground>:<ImageBackground borderRadius={100}
    
          source={{uri:prop.picture}}
            style={styles.avatar}
    
            >

    </ImageBackground>}
        </TouchableOpacity>
   </TouchableOpacity>
   </View>
           
   
   </View>
            </Card>
          <View style={{marginBottom:hp('9%')}}>
          
   
     <Text style={styles.date}>{prop.date}</Text>
    
    
           
     </View>
 
        </View>
  
      
    );
}

const styles = StyleSheet.create({
    container: {
    
      backgroundColor: '#ffff',
     marginTop:hp('1%')
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    avatar:{
        height:hp('7.8%'),
        width:hp('7.8%'),
        borderRadius:100,
        alignSelf:'center',
        position:'absolute',
        shadowColor:'black',shadowOpacity:10,
        elevation:3,
        
        
    
    
    },
  
    date:{
      position:'absolute',
        top:'4%',
        left:'6%',
        fontSize:12,
        color:'gray'
    },
    avatarname:{
   marginHorizontal:119,marginBottom:50
    },
    heart:{
      position:'absolute',
    
      right:wp('14%')     
      
    },
    heartnumber:{   
      position:'absolute',
    
        left:wp('88%'),  
        fontSize:wp('1%'),
        color:'gray'
    },
    naghlghol:{
    
      
        // textAlignVertical:'center',
        // alignContent:'center',
        // alignItems:'center',
        // textAlignVertical:
        marginHorizontal:wp('6%'),
        fontSize:14,
        
    }

  });
  export default Quotecard;
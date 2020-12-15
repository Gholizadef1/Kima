import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View,Image,ImageBackground,Alert ,ScrollView} from 'react-native';
import { Container, Header, Left, Body, Right, Title, CardItem, Card } from 'native-base';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { set } from 'react-native-reanimated';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const Quotecard = (prop) => {

    const hieght=prop.height
     const [like,setlike]=useState('gray')
    const [heart, setheart]= useState(false);
    console.log('quotecard')
    return(
        <View style={styles.container}>
        
        <Card style={{ marginLeft:wp('5%'),marginTop:hp('3.3%'),height:prop.height,marginRight:wp('5%'),borderRadius:10,elevation:4 ,backgroundColor:'#EDF2F4'}}>
        
        <View style={{flex:1,
        flexDirection:'row',
        alignItems:'center',
       }}>
        <Text style={{  
        color:'black',      
        marginBottom:hp('6.5%'),
        marginTop:hp('3.5%'),
        marginHorizontal:hp('3%'),
        fontSize:hp('1.7%')
        }}>salamm</Text>
        </View>
        <View style={{position:'absolute',marginTop:prop.height-hp('7.8%'),alignSelf:'center'}}>
      <Text style={{marginBottom:hp('0.9%'),alignSelf:'center',color:'gray'}}>{prop.name}</Text>
      <View style={{}}>
       
     
       <TouchableOpacity  style={styles.avatar}
         onPress={()=>{}}>
      
      <TouchableOpacity style={styles.avatar}
              onPress={()=>{}}>
           {prop.picture==='http://253541b1c0cd.ngrok.io/media/default.png'?<ImageBackground borderRadius={100}
      
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
          
       
 
   <AntDesign  style={styles.heart} name="heart"  onPress={async()=>{
      //  console.log(item.account.id)
      // setSelectedIndex(item.id)
     if(like==='gray')
     setlike('#1f7a8c')
     else
     setlike('gray')
     
      // console.log((await AsyncStorage.getItem('token')).toString());
      // alert(prop.quoteid)
      console.log((await AsyncStorage.getItem('token')).toString())
    console.log(prop.quoteid +'PROP QUOTE ID');
      // // console.log(item.account.id);
      axiosinst.post('http://253541b1c0cd.ngrok.io/api/quotes/like/'+prop.quoteid,{"headers":
         {
          "Content-Type":"application/json",
          "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()
         }})
        .then(async function(response){
             console.log(response);
  
          })
        .catch(function(error){
        console.log(error);
        console.log('like error ||||||||||||')
  
         })
        }} size={20} color={like} />
     <Text style={styles.date}>today</Text>        
     </View>
        </View>      
    );
}

const styles = StyleSheet.create({
    container: {
    
      backgroundColor: '#ffff',
     marginTop:hp('1%')
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
 
      right:wp('6.5%')     
      
    },
    heartnumber:{   
      position:'absolute',
    
        left:wp('88%'),  
        fontSize:wp('1%'),
        color:'gray'
    },
    naghlghol:{
        marginHorizontal:wp('6%'),
        fontSize:14,   
    }
  });
  export default Quotecard;


import React, { useState } from 'react';
import { StyleSheet, Text, View,Image,ImageBackground,Alert ,ScrollView} from 'react-native';
import { Container, Header, Left, Body, Right, Title, CardItem, Card } from 'native-base';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';

const Quotecard = (prop) => {
    const hieght=prop.height
    const [like,setlike]=useState('gray')
    const [dislike,setdislike]=useState('lightblue')

    console.log('comment')
    return(
        <View style={styles.container}>
        
        <Card style={{marginLeft:'4%',marginTop:'7%',height:prop.height,justifyContent:'center',marginRight:'4%',borderRadius:10 ,backgroundColor:'#EDF2F4'}}>
      
        <Text style={{  
        // textAlignVertical:'center',
        // alignContent:'center',
        // alignItems:'center',
        marginBottom:'5%',
      
        marginHorizontal:'6%',
        fontSize:14,
        }}>{'سلام'+'\n'+'خوبی'+'\n'+'سلام'+'\n'+'خوبی'+'\n'+'سلام'+'\n'+'خوبی'+'\n'+'سلام'+'\n'+'خوبی'+'\n'+'سلام'+'\n'+'خوبی'+'\n'+'سلام'+'\n'+'خوبی'}</Text>
     
      <View style={{}}>
       
  
       <TouchableOpacity  style={styles.avatar}
         onPress={()=>{}}>

        <ImageBackground borderRadius={100}

          source={require('../../assets/avatar.png')}
          style={styles.avatar}
            >
       </ImageBackground>
   </TouchableOpacity>
   </View>
           
   
        
            </Card>
          <View style={{marginBottom:'15%'}}>
          
   
     <Text style={styles.date}>1/1/99</Text>
    
     <AntDesign  style={styles.heart} name="heart"  onPress={()=>{if(like==='gray'){setlike('#1F7A8C')}else{setlike('gray')}}} size={20} color={like} />
     <Text style={styles.heartnumber}>100</Text>
           
     </View>
          <View style={{backgroundColor:'green',alignItems:'center',justifyContent:'center',height:100,width:400}}><Text style={{}}>adsfaf</Text></View>
        </View>
  
      
    );
}

const styles = StyleSheet.create({
    container: {
    
      backgroundColor: '#fff',
     marginTop:'2%'
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    avatar:{
        height:65,
        width:65,
        borderRadius:100,
        position:'absolute',
        left:'35%',
         
    
    
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
    
      right:'14%'     
      
    },
    heartnumber:{   
      position:'absolute',
    
        right:'6%',
        fontSize:12,
        color:'gray'
    },
    naghlghol:{
    
      
        // textAlignVertical:'center',
        // alignContent:'center',
        // alignItems:'center',
        // textAlignVertical:
        marginHorizontal:'6%',
        fontSize:14,
        
    }

  });
  export default Quotecard;
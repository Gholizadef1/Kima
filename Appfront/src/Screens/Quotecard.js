import React, { useState } from 'react';
import { StyleSheet, Text, View,Image,ImageBackground,Alert ,ScrollView} from 'react-native';
import { Container, Header, Left, Body, Right, Title, CardItem, Card } from 'native-base';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';

const Quotecard = (prop) => {

    const [like,setlike]=useState('gray')
    const [dislike,setdislike]=useState('lightblue')

    console.log('comment')
    return(
        <View style={styles.container}>
        
        <Card style={{marginLeft:'4%',marginTop:'7%',height:prop.height,marginRight:'4%',borderRadius:10,marginBottom:'13%' ,backgroundColor:'#EDF2F4'}}>
     
        <View style={{}}>
       
      
         <TouchableOpacity  style={styles.avatar}
           onPress={()=>{}}>

          <ImageBackground borderRadius={100}

            source={require('../../assets/avatar.png')}
            style={styles.avatar}
              >
         </ImageBackground>
     </TouchableOpacity>
     <Text style={styles.date}>1/1/99</Text>
    
      
       
         </View>
            </Card>
            
            <Text style={styles.heartnumber}>100</Text>
            <AntDesign  style={styles.heart} name="heart"  onPress={()=>{if(like==='gray'){setlike('#1F7A8C')}else{setlike('gray')}}} size={20} color={like} />
           
          
          
        </View>
      
    );
}

const styles = StyleSheet.create({
    container: {
    
      backgroundColor: '#fff',
     
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    avatar:{
        height:65,
        width:65,
        borderRadius:100,
      marginTop:'60%',
        left:'35%'
    
    
    },
  
    date:{
        position:'absolute',
        marginTop:'81%',
        left:'2%',
        fontSize:12,
        color:'gray'
    },
    avatarname:{
        position:'absolute',marginTop:'73%',marginHorizontal:119,marginBottom:50
    },
    heart:{
        position:'absolute',
        marginTop:'81%',
        left:'82%'
    },
    heartnumber:{
        position:'absolute',
        marginTop:'81.5%',
        left:'88%',
        fontSize:12,
        color:'gray'
    }

  });
  export default Quotecard;
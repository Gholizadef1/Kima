




import React, { useState } from 'react';
import { StyleSheet, Text, View,Image,ImageBackground,Alert ,ScrollView} from 'react-native';
import { Container, Header, Left, Body, Right, Title, CardItem, Card } from 'native-base';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Quotecard = (prop) => {

    const [like,setlike]=useState('lightblue')
    const [dislike,setdislike]=useState('lightblue')
    console.log('comment')
    return(
        <View style={styles.container}>
        
        <Card style={{marginLeft:'4%',marginTop:'7%',height:prop.height,marginRight:'4%',borderRadius:10,marginBottom:'13%' ,backgroundColor:'#EDF2F4'}}>
     
        <View style={{}}>
       
        <Text style={styles.date}>1/1/99</Text>
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
    }

  });
  export default Quotecard;
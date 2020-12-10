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
        
        <Card style={{marginLeft:'4%',height:prop.height,marginRight:'4%',borderRadius:10,marginBottom:'15%' ,backgroundColor:'#EDF2F4'}}>

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
        position:'absolute',marginTop:'60%',
        left:'35%'
    
    
    },
  
    date:{
        position:'absolute',
        marginTop:'16%',
        left:80,
        fontSize:12,
    },
    avatarname:{
        position:'absolute',marginTop:'73%',marginHorizontal:119,marginBottom:50
    }

  });
  export default Quotecard;
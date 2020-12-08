import React, { useState } from 'react';
import { StyleSheet, Text, View,Image,ImageBackground,Alert ,ScrollView} from 'react-native';
import { Container, Header, Left, Body, Right, Title, CardItem, Card } from 'native-base';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Commentcard = () => {
    const [like,setlike]=useState('lightblue')
    console.log('comment')
    return(
        <View style={styles.container}>
        <LinearGradient
        // Background Linear Gradient
        //'#E9E9E9','#d8d8d8'
        // '#EDF5FD','#EEF9FB','#F1F3F9','#E2E7F3','#E1E5F2'
        //'#EFF9FB','#E2E7F3'
        colors={['#EDF5FD','#E1E5F2']}
        style={{
         position:'absolute',
          height:'100%',
          width:'100%',
        
        }}
      />
        {/* <ImageBackground source={require('../../assets/commentbackground.jpeg')} style={{width:'100%',height:'100%',position:'absolute'}}></ImageBackground> */}
            <View style={styles.avatarname}>
            {/* <Avatar.Image size={30} style={styles.avatar}></Avatar.Image> */}
            <TouchableOpacity style={styles.avatar}
              onPress={()=>{}}>
             <ImageBackground borderRadius={100}
      
               source={require('../../assets/avatar.png')}
               
               style={styles.avatar}
        
                 >

            </ImageBackground>
        </TouchableOpacity>
            <Text style={styles.username}>سلام </Text>
            <Text style={styles.date}>1/1/99</Text>
            </View>
            <View style={styles.comment}>

                <Text>نظررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررر</Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <AntDesign onPress={()=>{if(like==='lightblue'){setlike('#1F7A8C')}else{setlike('lightblue')}}} name="like1" size={20} color={like} style={styles.like} />
            <Text style={styles.likenumber}>100</Text>
            </View>
        
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
        position:'absolute'    
    
    },
    avatarname:{
       marginTop:'5%',
       marginLeft:'5%',
        flexDirection:'row',
      
        width:'50%',
        height:65,
        borderRadius:100
    },
    username:{
        position:'absolute',
        marginTop:'5%',
        left:80,
        fontSize:15,
        fontWeight:'bold'
        
     
    },
    comment:{
       
        
        marginTop:20,
        marginRight:'5%',
        marginLeft:'5%',
    },
    like:{
        marginLeft:'5%',
        marginTop:'5%',
        marginBottom:'5%',
       
    },
    date:{
        position:'absolute',
        marginTop:'16%',
        left:80,
        fontSize:12,
    },
    likenumber:{
    
    marginLeft:50,
    marginTop:'5%',
    position:'absolute'
     
    },
  });
  export default Commentcard;
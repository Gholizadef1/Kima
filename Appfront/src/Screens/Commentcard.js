import React from 'react';
import { StyleSheet, Text, View,Image,ImageBackground,Alert ,ScrollView} from 'react-native';
import { Container, Header, Left, Body, Right, Title, CardItem, Card } from 'native-base';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

const Commentcard = () => {
    return(
        <View style={styles.container}>
        
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
            <Text style={styles.username}>salam </Text>
            </View>
        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      marginTop:40,

      backgroundColor: '#fff',
    
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    avatar:{
        height:'100%',
        width:'68%',
        borderRadius:100,
        marginRight:'0%'
    
    },
    avatarname:{
        flexDirection:'row',
        marginTop:'5%',
        marginLeft:'5%',
       
        width:'50%',
        height:'27%',
        borderRadius:100
    },
    username:{
        position:'absolute',
        marginTop:'5%',
        left:80
     
    }
  });
  export default Commentcard;
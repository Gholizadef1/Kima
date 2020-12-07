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
            <Text style={styles.username}>سلام </Text>
            </View>
            <View style={styles.comment}>

                <Text>نظررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررررر</Text>
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
        
     
    },
    comment:{
       
        
        marginTop:20,
        marginRight:'5%',
        marginLeft:'5%',
    }
  });
  export default Commentcard;
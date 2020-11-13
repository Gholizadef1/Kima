import React from 'react';
import { StyleSheet, Text, View ,TextInput} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import {Container,Header,Title,Form,Item,Input,Button, Icon, Content} from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Searchbar = ({term,onTermChange,onTermsubmit,onStartEditing}) => {
    return(

       <View>
         <Item rounded style={styles.backgroundd}>
             <Feather name="search" size={24} color="black"style={styles.Icon} />
            <Input 
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='نام کتاب نویسنده ...'style={styles.Icontext}
            value={term}
            onChangeText={newterm=>onTermChange(newterm)}
            onEndEditing={onTermsubmit&&onStartEditing(false)}
            onTouchStart={onStartEditing(true)}
            />
           
            <AntDesign name="close" size={24} onPress={()=>{onStartEditing(false)}} color="black" style={{position:'absolute',marginLeft:10}} />
         


            </Item>
            <StatusBar backgroundColor='#BFDBF7' style='light' />

       </View>
    );
}

const styles = StyleSheet.create({
    backgroundd: {
     
      backgroundColor:'#F0EEEE',
      height:50,
      marginTop:45,
      marginRight:30,
      marginLeft:15,
      width:382,
    
      
    },
    Icon:{
        position:'absolute',
        marginLeft:345,
    },
    Icontext:{
     marginRight:40,
   
    
    },
    // background:{
    //     backgroundColor:'white',
    //     height:1000,
    //     marginTop:0,
        
       
    //     width:10000
      
    // },
  });
  export default Searchbar;
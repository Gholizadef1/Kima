import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button, Icon} from 'native-base';
import { color } from 'react-native-reanimated';

const ResultsDetail = ({result}) => {
    return(
        <View style={styles.container} >
        <Image
        style={styles.image}
        source={{uri:result.imgurl}}
        />

     
            <Text style={styles.title}>
               {result.title}
            </Text>
            <Text style={{fontSize:11,marginHorizontal:23,marginTop:15,marginBottom:10}}>{result.author}</Text>
            
          </View> 
    );
}

const styles = StyleSheet.create({
    container: {
       
        marginLeft:10
        },
    title:{
        marginLeft:0,
        marginRight:20,
        marginTop:220,
        fontSize:12,
        fontWeight:'bold',
        width:130,
        position:'absolute'
    },
    image:{
        marginTop:20,
        width:120,
        height:180,
        marginBottom:40,
        borderRadius:10,marginLeft:10
    }
  });
  export default ResultsDetail;
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button, Icon} from 'native-base';

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
            <Text style={{fontSize:11,marginHorizontal:23}}>({result.author})</Text>
            
          </View> 
    );
}

const styles = StyleSheet.create({
    container: {
       
        marginLeft:10
        },
    title:{
        marginLeft:0,
        marginTop:10,
        fontSize:12,
        fontWeight:'bold',
        width:130
    },
    image:{
        marginTop:35,
        width:120,
        height:180,
        borderRadius:10,marginLeft:10
    }
  });
  export default ResultsDetail;
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button, Icon} from 'native-base';
import { color } from 'react-native-reanimated';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
       
        marginLeft:wp('0.8%')
        },
    title:{
        marginLeft:hp('2%'),
        marginRight:0,
        
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
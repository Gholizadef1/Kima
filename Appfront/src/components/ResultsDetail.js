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
            <Text style={{fontSize:hp("1.3%"),alignSelf:"flex-start",marginLeft:wp("4%"),marginTop:hp("1%"),marginBottom:hp("1.1%")}}>{result.author}</Text>
            
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
        
        marginTop:hp("26.3%"),
        fontSize:hp("1.5.5%"),
        fontWeight:'bold',
        //width:130,
        position:'absolute'
    },
    image:{
        marginTop:hp("2.5%"),
        width:wp("29.2%"),
        height:hp("21.7%"),
        marginBottom:hp("4.8%"),
        borderRadius:10,
      //  elevation:10,
       marginHorizontal:wp("1.4%")
    }
  });
  export default ResultsDetail;
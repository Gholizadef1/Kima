import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button, Icon} from 'native-base';

const ResultsDetail = ({result}) => {
    return(
        <View >
        <Image
        style={styles.image}
        source={{uri:result.imgurl}}
        >

        </Image>
            <Text style={styles.title}>
               {result.title}
            </Text>
            
            
        </View>
    );
}

const styles = StyleSheet.create({
    title:{
        marginRight:30,
        marginTop:10,
        fontSize:13,
        fontWeight:'bold',
        width:130
    },
    image:{
        marginTop:50,
        width:120,
        height:180,
        borderRadius:10,marginLeft:10
    }
  });
  export default ResultsDetail;
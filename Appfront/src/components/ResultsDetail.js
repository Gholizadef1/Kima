import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button, Icon} from 'native-base';
import { color } from 'react-native-reanimated';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const ResultsDetail = ({result}) => {
    const [senoghte,setsenoghte]=useState(false)
    const[kamshodde,setkamshodde]=useState();
    const[kamshodde2,setkamshodde2]=useState();

    var kamshode="";
    useEffect(()=>{
    console.log(result.title.toString().split(''))
    
    var a=result.title.toString();
    var b=a.lenght;
    for(var i=0;i<=14;i++){
        if(a[i]!=undefined){
        kamshode+=a[i]
        console.log(kamshode);
        }
    }
 
    if(a===kamshode){
      //  setsenoghte(false)
    }
    else{
        //setsenoghte(true);
        kamshode+="..."
    }
    setkamshodde(kamshode);  

   var kamshode2="";
    var c=result.author.toString();
    var d=a.lenght;
    for(var i=0;i<=12;i++){
        if(c[i]!=undefined){
        kamshode2+=c[i]
        console.log(kamshode2);
        }
    }
 
    if(c===kamshode2){
      //  setsenoghte(false)
    }
    else{
        //setsenoghte(true);
        kamshode2+="..."
    }
    setkamshodde2(kamshode2);  
 }, [])
   // console.log(b)
    return(
        <View style={styles.container} >
        <Image
        style={styles.image}
        source={{uri:result.imgurl}}
        />

     
            <Text style={styles.title}>
               {kamshodde}
            </Text>
            <Text style={{fontSize:hp("1.3%"),alignSelf:"flex-start",marginLeft:wp("4%"),marginTop:hp("1%"),marginBottom:hp("1.1%")}}>{kamshodde2}</Text>
            
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
      // elevation:100,
       marginHorizontal:wp("1.4%")
    }
  });
  export default ResultsDetail;
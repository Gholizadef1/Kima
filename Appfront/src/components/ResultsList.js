
import React from 'react';
import { StyleSheet, Text, View ,FlatList,TouchableOpacity} from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button, Icon, Left} from 'native-base';
import ResultsDetail from './ResultsDetail';
import Bookresult from '../Screens/Bookresult';
import {withNavigation} from 'react-navigation';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ResultsList = ({stylee,title,listresult,navigation,countt,numofcolums,horizantall,showtitle}) => {
   // console.log(listresult)
    return(
        <View>
        <Text style={{top:hp("3.7%"),position:"absolute",left:wp("44%"),color:"gray",fontSize:hp("1.4%")}}>  ( <Text style={{fontWeight:"500"}}>{countt} </Text>نتیجه)</Text>
            {showtitle?<Text style={styles.title}>
                {title}
            </Text>:null}
    
            {listresult.length===0?<View style={{height:hp("33%")}}>
             </View>:null}
            {/* <View style={{backgroundColor:"lightblue",height:hp("30%"),width:wp("4%"),marginBottom:hp("-30%"),marginLeft:hp("4%")}}></View> */}
            <FlatList  style={styles.flastlist}
                horizontal={horizantall}
                numColumns={numofcolums}
                showsHorizontalScrollIndicator={false}
                data={listresult}
                keyExtractor={(listresult)=>listresult.id}
                renderItem={({item})=>{
                    return(
                    <TouchableOpacity onPress={()=>navigation.navigate('Showbookview',{id:item.id})}>
                    {/* //,{id: item.id}) */}
                    <ResultsDetail
                        result={item}
                    />
                    </TouchableOpacity>
                    
                    
                    )

                
                }}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
       
    marginLeft:0
    },
    title:{
        marginLeft:wp("4%"),
        marginTop:hp("3.5%"),
        fontSize:hp("1.6%"),
        fontWeight:'bold',
        color:"#1f7a8c"
    },
    flastlist:{
        marginHorizontal:wp("0%"),
        
        //حل مشکل شروع شدن از چپ
        alignSelf:"flex-start",
        marginTop:0
    }
    
  });
  export default ResultsList;
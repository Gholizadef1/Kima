
import React from 'react';
import { StyleSheet, Text, View ,FlatList,TouchableOpacity} from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button, Icon} from 'native-base';
import ResultsDetail from './ResultsDetail';
import Bookresult from '../Screens/Bookresult';
import {withNavigation} from 'react-navigation';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ResultsList = ({stylee,title,listresult,navigation}) => {
    return(
        <View>
            <Text style={styles.title}>
                {title}
            </Text>
    
            {listresult.length===0?<View style={{height:200}}>

            </View>:null}

            <FlatList  style={styles.flastlist}
                horizontal={true}
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
        marginLeft:heightPercentageToDP('2%'),
        marginTop:30,
        fontSize:15,
        fontWeight:'bold'
    },
    flastlist:{
        marginHorizontal:5,
       
        marginTop:0
    }
    
  });
  export default ResultsList;
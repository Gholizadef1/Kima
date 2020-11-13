
import React from 'react';
import { StyleSheet, Text, View ,FlatList} from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button, Icon} from 'native-base';
import ResultsDetail from './ResultsDetail';

const ResultsList = ({stylee,title,listresult}) => {
    return(
        <View>
            <Text style={styles.title}>
                {title}
            </Text>
            {listresult.length===0?<View style={{height:200}}>

            </View>:null}
            <FlatList  style={styles.flastlist}
                horizontal={true}
                
                data={listresult}
                keyExtractor={(listresult)=>listresult.id}
                renderItem={({item})=>{
                    return(<ResultsDetail
                        result={item}
                    />)

                
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
        marginRight:30,
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
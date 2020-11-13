import React from 'react';
import { StyleSheet, Text, View ,FlatList} from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button, Icon} from 'native-base';
import ResultsDetail from './ResultsDetail';

const ResultsList = ({stylee,title,listresult}) => {
    return(
        <View >
            <Text style={styles.title}>
                {title}
            </Text>
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
    // container: {
    //     marginTop:200,
    //   position:'absolute',
    //   backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    title:{
        marginRight:30,
        marginTop:40,
        fontSize:15,
        fontWeight:'bold'
    },
    flastlist:{
        marginHorizontal:5
    }
    
  });
  export default ResultsList;
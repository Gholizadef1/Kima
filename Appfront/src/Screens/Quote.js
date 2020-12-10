import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Quotecrad from './Quotecard';

const Quote = (prop) => {
    return(
        <View style={styles.container}>
        <ScrollView>
           <Quotecrad hieght={300}></Quotecrad>
           <Quotecrad></Quotecrad>
          
        
      
           </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    
        flex: 1,
        // backgroundColor: '#B8B8B8',
        backgroundColor:'#ffff',
        marginTop:1
    },
  });
  export default Quote;
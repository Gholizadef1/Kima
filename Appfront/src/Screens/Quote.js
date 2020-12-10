import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Quotecrad from './Quotecard';

const Quote = (prop) => {
    return(
        <View style={styles.container}>
           <Quotecrad></Quotecrad>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  export default Quote;
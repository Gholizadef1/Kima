import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Commentcard from './Commentcard';

const Groups = () => {
    return(
        <View style={styles.container}>
           <Commentcard></Commentcard>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop:38
    }, 
  });
  export default Groups;
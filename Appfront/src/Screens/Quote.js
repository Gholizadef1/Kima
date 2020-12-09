import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Quote = () => {
    return(
        <View style={styles.container}>
            <Text>
                Quotes
            </Text>
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
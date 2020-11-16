import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Bookresult = ({navigation}) => {
// const id=navigation.getPram(id);
// console.log(id);
    return(
        <View style={styles.container}>
            <Text>
                This is My books
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
  export default Bookresult;
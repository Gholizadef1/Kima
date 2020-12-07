import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Body, Right, Title, CardItem, Card } from 'native-base';
import { Avatar } from 'react-native-paper';

const Commentcard = () => {
    return(
        <View style={styles.container}>
            {/* <Text>
                Comment
            </Text>
            <Card><Text>hi</Text></Card> */}
            
            <Avatar.Image style={styles.avatar}></Avatar.Image>
            <Text>name</Text>
        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      marginTop:40,
      backgroundColor: '#fff',
    
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    avatar:{
        marginRight:'50%',
        marginTop:'5%'
    
    }
  });
  export default Commentcard;
import React, { Component } from 'react';
import { StyleSheet, View , Image , ImageBackground , ScrollView , 
    TouchableOpacity , FlatList , TextInput } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

const Mybooks = ({navigation}) => {

    return (
      <Container>
        <Header style={{backgroundColor:'#1F7A8C' }} />
        <Content>
            <Text style={styles.textShow}>دسته بندی ها</Text>
            <View
                    style={{
                      top:40,
                      width:240,
                      right:50,
                      left:60,
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      fontWeight:'bold'
                    }}
                    />
          <List  style={{marginTop:'35%'}}>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail square source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpZz6LmJahWgHdjXYy0uCuz8DTzJzCYPqtYA&usqp=CAU' }} />
                  </Left>
                  <Body>
                    <Text>می خواهم این کتاب را بخوانم</Text>
                  </Body>
                  <Right>
                    <Button transparent onPress={() => navigation.navigate('ShowToRead')}>
                      <Text>مشاهده</Text>
                    </Button>
                  </Right>
                </ListItem>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail square source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2eaKKSlvGpTQSsYM7k400fPWpCnoNXeUwjg&usqp=CAU' }} />
                  </Left>
                  <Body>
                    <Text>در حال خواندن </Text>
                  </Body>
                  <Right>
                    <Button transparent onPress={() => navigation.navigate('ShowReading')}>
                      <Text>مشاهده</Text>
                    </Button>
                  </Right>
                </ListItem>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail square source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3j6eTFWS7e-4PN3rJxCX2ZJ7a86ZwAWVV0g&usqp=CAU' }} />
                  </Left>
                  <Body>
                    <Text>قبلا خوانده ام </Text>
                  </Body>
                  <Right>
                    <Button transparent onPress={()=> navigation.navigate('ShowRead')}>
                      <Text>مشاهده</Text>
                    </Button>
                  </Right>
                </ListItem>
            
          </List>
        </Content>
      </Container>
    );

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textShow:{
        top:30,
        right:10,
        left:130,
        fontSize:20,
        fontWeight:'bold'
    }
    });
    export default Mybooks;
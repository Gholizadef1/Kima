import React, { Component } from 'react';
import { StyleSheet, View , Image , ImageBackground , ScrollView , 
    TouchableOpacity , FlatList , TextInput } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const Mybooks = ({navigation}) => {

    return (
      <Container style={{marginTop:hp('3%')}}>
        <Header style={{backgroundColor:'#1F7A8C' ,marginTop:hp('3%')}} />
        <Content>
            <Text style={{marginLeft:wp('36%'),marginTop:hp('5%'),marginBottom:hp('3%') 
              ,fontWeight:'bold' , fontSize:20}} >دسته بندی ها</Text>
          
            <View
                    style={{
                      width:240,
                      marginLeft:wp('17%'),
                      borderBottomColor: 'black',
                      borderBottomWidth: 2,
                      fontWeight:'bold'
                    }}
                    />
          <List  style={{marginTop:hp('9%')}}>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail style={{borderRadius:10}} square source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpZz6LmJahWgHdjXYy0uCuz8DTzJzCYPqtYA&usqp=CAU' }} />
                  </Left>
                  <Body>
                    <Text>می خواهم بخوانم</Text>
                  </Body>
                  <Right>
                    <Button transparent onPress={() => navigation.navigate('ShowToRead')}>
                      <Text>مشاهده</Text>
                    </Button>
                  </Right>
                </ListItem>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail style={{borderRadius:10}} square source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2eaKKSlvGpTQSsYM7k400fPWpCnoNXeUwjg&usqp=CAU' }} />
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
                    <Thumbnail style={{borderRadius:10}} square source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3j6eTFWS7e-4PN3rJxCX2ZJ7a86ZwAWVV0g&usqp=CAU' }} />
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
        <StatusBar backgroundColor='#BFDBF7' style='light' />
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
        
        right:10,
        left:130,
        fontSize:20,
        fontWeight:'bold',
        
    }
    });
    export default Mybooks;
import React , {useState , useEffect} from 'react';
import { StyleSheet, View , Image , ImageBackground , ScrollView , 
TouchableOpacity , FlatList , TextInput } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Button, Icon, Body,
   Right, Left , Picker, Form } from 'native-base';

import Home from './Home';
import PickerShow from './PickerShow'
import axiosinst from '../api/axiosinst'
import ActionButton from 'react-native-action-button';
import { HeaderBackground } from '@react-navigation/stack';
import { HeaderHeightContext } from 'react-navigation-stack';
import { StatusBar } from 'expo-status-bar';

const Bookview = (prop) => {

  const [result , setResult] = useState(null);
  const id = prop.route.params.id;
  const getResult = async (id) => {
  const response = await axiosinst.get('/bookdetail/'+id);
  setResult(response.data);
  console.log(response.data.description)
  console.log(id);
  };
  useEffect(() =>{
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }
  
    return(
      <Container>
            <Header style={{backgroundColor:'#1F7A8C' ,marginTop:35}}/>
            <Body style={{marginTop:35}}>
                  <Image source={{uri : result.imgurl}} style={{marginTop:5, height:180 ,
                     width:120 , borderRadius:10}} />

                  <Text style={{marginTop:10 , fontWeight:'bold',
                      fontSize:25 }}>{result.title}</Text>

                  <Text style={{marginTop:5}}>{result.author}</Text>

                  <PickerShow style={{}} bookid={id} /> 
                  <Text style={{fontWeight:'bold' , fontSize:20 ,marginLeft:240 , marginBottom:5}}>
                    درباره کتاب :</Text>
                  <Content style={{}}>
                    <Card style={{}}>
                    
                 
                    <Text style={{marginTop:15 , marginHorizontal:15}}>{result.description}</Text>
                    </Card>
                  </Content>
            </Body>
            <Button onPress={()=>{prop.navigation.navigate('comment',{title:result.title,imgurl:result.imgurl})&& prop.navigation.setOptions({
      title: response.data.title,
    });}}><Text>صفحه نظرات</Text></Button>
            <StatusBar backgroundColor='#BFDBF7' style='light' />
      </Container>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    // image:{
    //   height:220,

    //   }
    // bookname: {
    //   alignContent:'center',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   marginRight:10,
    //   marginLeft:350,
    //   fontSize:20,
    //   width:500,
    //   fontWeight:'bold'
    // },
    // author: {
    //   right:20,
    //   marginRight:20,
    //   marginLeft:30,
    //   color:'#1F7A8C',
    //   fontSize:17
    // },
    // publisher:{
    //   marginRight:105,
    //   color:'#1F7A8C',
    //   fontSize:15
    // },
    // description:{
    //   marginRight:20,
    //   fontSize:15
    // },
    //    Picker: {
    //   top:'100 px !important',
    //   right:20,
    //   marginRight:20,
    //   color:'#1F7A8C',
    //   fontSize:15
    // }
    });

export default Bookview;
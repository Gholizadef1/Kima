
import React , {useState , useEffect} from 'react';
import { StyleSheet, View , Image , ImageBackground , ScrollView , 
TouchableOpacity , FlatList , TextInput } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Button, Icon, Body,
   Right, Left , Picker, Form } from 'native-base';
import {withNavigation} from 'react-navigation'
import Home from './Home';
import PickerShow from './PickerShow'
import axiosinst from '../api/axiosinst'
import ActionButton from 'react-native-action-button';
import { HeaderBackground } from '@react-navigation/stack';
import { HeaderHeightContext } from 'react-navigation-stack';



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
            <Header style={{backgroundColor:'#1F7A8C' ,marginTop:15}}/>
            <Body>
              <CardItem>
                  <Image source={{uri : result.imgurl}} style={styles.image}/>
              </CardItem>
              <CardItem>
                  <Text style={styles.bookname}>نام کتاب:{result.title}</Text>
              </CardItem>
              <CardItem>
                  <Text style={styles.author}>نویسنده:{result.author}</Text>
              </CardItem>
              <CardItem>
                  <Text style={styles.publisher}>انتشارات {result.publisher}</Text>
              </CardItem>
              <Body>
                <CardItem>
                  <PickerShow style={styles.Picker}/>
                </CardItem>
              </Body>
            </Body>
            <Body>
              <Content style={{bottom:-300}}>
                <CardItem>
                   <Text style={styles.description}>{result.description}</Text>
                </CardItem>
              </Content>
            </Body>
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
    image:{
      alignItems: 'center',
      justifyContent: 'center', 
      bottom:'2%',
      right:15,
      width:180,
      height:220,
      marginBottom:0,
      borderRadius:5,
      marginHorizontal:100
      },
    bookname: {
      alignContent:'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight:10,
      marginLeft:350,
      marginBottom:0,
      bottom:'10%',
      fontSize:20,
      width:500,
      fontWeight:'bold'
    },
    author: {
      right:20,
      bottom:'12%',
      marginRight:20,
      marginLeft:30,
      marginBottom:0,
      color:'#1F7A8C',
      fontSize:17,
      marginHorizontal:100
    },
    publisher:{
      bottom:'18%',
      marginRight:105,
      color:'#1F7A8C',
      fontSize:15,
      marginHorizontal:100,
      marginBottom:0
    },
    description:{
      bottom:'10%',
      marginRight:20,
      fontSize:15,
      marginHorizontal:100,
      marginBottom:0
    }
    });

export default Bookview;
import React , {useState , useEffect} from 'react';
import { StyleSheet, View , Image , ImageBackground , ScrollView , 
TouchableOpacity , FlatList , TextInput } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Button, Icon, Body,
   Right, Left , Picker, Form, Item } from 'native-base';
import {withNavigation} from 'react-navigation'
import axiosinst from '../api/axiosinst'
import { StatusBar } from 'expo-status-bar';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios'

const Bookview = (prop) => {

  const [rate , setrate] = useState(true);
  const [test , settest] = useState(null);
  const [ratenum , setratenum] = useState(null);
  const [result , setResult] = useState(null);
  const [selectedValue, setSelectedValue] = useState('none');
  const id = prop.route.params.id;
  const getResult = async (id) => {
  const response = await axiosinst.get('/bookdetail/'+id);
  setResult(response.data);
  };
  useEffect(() =>{
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  const getPicker = async () => {
    axios.get('http://359016142cdc.ngrok.io/bookdetail/'+id +'/getstate/', {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
      }
    })
    .then(function(response){
      console.log('Pickerr'+response.data.book_state)
      setSelectedValue(response.data.book_state)   
  })
  .catch(function(error){
      console.log(error)
  })
  };
  getPicker();

  const PostPicker = async (value) => {
        if (value != "") {
          const payload = {
            "book_state": value,
          }
          const back = JSON.stringify(payload);
          axios.post('http://359016142cdc.ngrok.io/bookdetail/' +id, back, {
            "headers": {
              "content-type": "application/json",
              "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
            }
          })
            .then(async function (response) {
              console.log(response.data)
              getPicker();
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }


  const getRate = async()=>{
    axios.get('http://359016142cdc.ngrok.io/api/bookrating/'+id, {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
      }
    })
    .then(function(response){
      console.log('response data : ', response.data)
      console.log(response.message)
      console.log('$$$$'+response.data.data)
      setratenum(response.data.data)   
  })
  .catch(function(error){
      console.log(error)
  })
  }
  getRate();

  console.log('**' +rate)

  const postRate = async(rate)=>{
    if(rate!=""){
    const payload={
        "rate": rate,
    }
    const back= JSON.stringify(payload);
    axios.post('http://359016142cdc.ngrok.io/api/bookrating/'+id ,back,{
      "headers":{"content-type":"application/json",
      "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()
              }
              })
    .then(async function(response){
      console.log(response.data)
      console.log('\n'+'++++++++'+'\n')
      setratenum(rate);
      console.log('&&'+rate);
      getRate();
    })
    .catch(function (error) {
       console.log(error);
    });
  }
}
//this.state = {}
  
    return(
      <Container>
            <Header style={{backgroundColor:'#1F7A8C' ,marginTop:90}}/>
            <Body style={{marginTop:35}}>
                  <Image source={{uri : result.imgurl}} style={{marginTop:-100, height:220 ,
                     width:160 , borderRadius:10 }} />

                  <Text style={{marginTop:10 , fontWeight:'bold',
                      fontSize:25 }}>{result.title}</Text>

                  <Text style={{marginTop:5}}>{result.author}</Text>
                  
                  <AirbnbRating style={{marginBottom:5 , marginTop:20}}
                  count={5}
                  showRating={false}
                  defaultRating={ratenum}
                  ratingBackgroundColor='red'
                  onFinishRating={(rating) => postRate(rating)}
                  size={25}
                  />

                  <DropDownPicker
                      items={[
                          {label: 'اضافه کنید', value: 'none'},
                          {label: 'میخواهم بخوانم', value: 'ToRead'},
                          {label: 'در حال خواندن', value: 'Reading'},
                          {label: 'قبلا خوانده ام', value: 'Read'},
                      ]}
                      defaultValue={selectedValue}
                      containerStyle={{height: 40 , width:220}}
                      style={{backgroundColor: '#fafafa'}}
                      itemStyle={{
                          justifyContent: 'flex-start'
                      }}
                      dropDownStyle={{backgroundColor: '#fafafa'}}
                      onChangeItem={(item) => PostPicker(item.value)}
                      
                  />
 

                  <Text style={{fontWeight:'bold' , fontSize:20 ,marginRight:230 , marginBottom:5}}>
                    درباره کتاب :</Text>
                  <Content style={{}}>
                    <Card style={{}}>
                    
                 
                    <Text style={{marginTop:10 , marginRight:20 , 
                      textAlign:'right' , alignSelf:'stretch' }}>{result.description}</Text>
                    </Card>
                  </Content>
            </Body>
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
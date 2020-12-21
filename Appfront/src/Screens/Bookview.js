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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios'





const Bookview = (prop) => {
    console.log('BOOKVIEW')
  const [rate , setrate] = useState(true);

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
    axios.get('http://7895db46b776.ngrok.io/bookdetail/'+id +'/getstate', {
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
          axios.post('http://7895db46b776.ngrok.io/bookdetail/' +id, back, {
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
    axios.get('http://7895db46b776.ngrok.io/api/bookrating/'+id, {
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
      console.log(response.data.code+'NEMIAD')
     
  })
  
    .catch( async function (error) {
      console.log(error);
      console.log(error.code+'ERROR CODE')
      
      
    });
  }
  getRate();

  console.log('**' +rate)

  const postRate = async(rate)=>{
    if(rate!=""){
    const payload={
        "rate": rate,
    }
    const back= JSON.stringify(payload);
    axios.post('http://7895db46b776.ngrok.io/api/bookrating/'+id ,back,{
      "headers":{"content-type":"application/json",
      "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()
              }
              })
    .then(async function(response){
      console.log(response.data)
      console.log('\n'+'++++++++'+'\n')
      setratenum(rate);
      console.log('&&'+rate);
      if(response.data.message==="You rated this book already!!"){
        console.log('TOYE PUTTTTT')
        axios.put('http://7895db46b776.ngrok.io/api/bookrating/'+id, back, {
          "headers": {
            "content-type": "application/json",
            "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
          }
        })
          .then(async function (response) {
            console.log(response.data)
              getRate()
          })
          .catch(function (error) {
            console.log(error)})}

//      getRate();
    })
    .catch(function (error) {
       console.log(error);


   





    });
  }
}
//this.state = {}
  
    return(
      <Container>

            <Header style={{backgroundColor:'#1F7A8C' ,marginTop:hp('20%')}}/>
            <Body style={{}}>
                  <Image source={{uri : result.imgurl}} style={{marginTop:hp('-10%'), height:198 ,marginBottom:hp('1.5%'),
                     width:132 , borderRadius:10 }} />


                  <Text style={{marginTop:hp('1.5%') , fontWeight:'bold',
                      fontSize:25 }}>{result.title}</Text>

                  <Text style={{marginTop:hp('0.5%')}}>{result.author}</Text>

                  <Text style={{marginTop:hp('0.5%')}}>به این کتاب امتیاز دهید</Text>
                  <AirbnbRating style={{marginTop:hp('4%')}}
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
                      style={{backgroundColor: '#fafafa' , marginTop:hp('1%') , marginBottom:hp('-1%')}}
                      itemStyle={{
                          justifyContent: 'flex-start'
                      }}
                      dropDownStyle={{backgroundColor: '#fafafa'}}
                      onChangeItem={(item) => PostPicker(item.value)}
                      
                  />
 

                  <Text style={{fontWeight:'bold' , fontSize:20 , marginTop:hp('2%') ,marginRight:wp('70%') , marginBottom:hp('0.7%')}}>
                    درباره کتاب :</Text>
                  <Content style={{}}>
                    <Card style={{}}>
                    
                 
                    <Text style={{marginTop:hp('2%') , marginLeft:wp('2%') , 
                      textAlign:'left' , alignSelf:'stretch' }}>{result.description}</Text>
                    </Card>
                  </Content>
            </Body>

            <Button style={{borderRadius:16,backgroundColor:'#1f7a8c'}}  onPress={()=>{prop.navigation.navigate('comment',{title:result.title,imgurl:result.imgurl,id:id})&& prop.navigation.setOptions({
      title: response.data.title,
    });}}><Text>صفحه نظرات</Text></Button>

           <Button  style={{borderRadius:16,backgroundColor:'#1f7a8c'}} onPress={()=>{prop.navigation.navigate('quote',{title:result.title,imgurl:result.imgurl,id:prop.route.params.id})&& prop.navigation.setOptions({
      title: response.data.title,
    });}}><Text>صفحه نقل قول ها</Text></Button>
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
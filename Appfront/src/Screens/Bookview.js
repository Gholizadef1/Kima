import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Image, ImageBackground, ScrollView,TouchableOpacity, FlatList, TextInput, ActivityIndicator
} from 'react-native';
import {Container, Header, Content, Card, CardItem, Text, Button, Icon, Body,Right, Left, Picker, Form, Item} from 'native-base';
import { withNavigation } from 'react-navigation'
import axiosinst from '../api/axiosinst'
import { StatusBar } from 'expo-status-bar';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Bookview = (prop) => {
  const [rate, setrate] = useState(true);
  const [ratenum, setratenum] = useState(null);
  const [comments, setComments] = useState(null);
  const [loading, setloading] = useState(true);
  const [loading2, setloading2] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [result, setResult] = useState(null);
  const [selectedValue, setSelectedValue] = useState('none');
  const id = prop.route.params.id;

  
  useEffect(() => {
    getResult(id);
    getComments()
  }, [refresh]);


  const getResult = async () => {
    axiosinst.get('/book/' + id, {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
      }
    })
      .then(function (response) {
        setloading(false)
        setResult(response.data.data);
        setSelectedValue(response.data.book_state)
        console.log('SELECTED VALUEE ==' + selectedValue)
      })
      .catch(function (error) {
        console.log('ERRORE RESULT')
        console.log(error)
      })
  };

  const getComments = async () => {
    axiosinst.get('/book/' + id + '/comment', {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
      }
    })
      .then(function (response) {
        console.log('response data ===== ', response.data.message)
        if (response.data.message === "No Comment!"){
          setComments("No Comment!")
        }
        else{
          setComments(response.data)
        }
        setloading2(false)
      })

      .catch(async function (error) {
        console.log(error);
        console.log(error.code + 'ERROR CODE')


      });
  }

  if (!result) {
    return null;
  }

  const PostPicker = async (value) => {
    const userid = await AsyncStorage.getItem('id');
    if (value === "none") {
      const payload = {
        "book_id": id,
      }
      const back = JSON.stringify(payload);
      axiosinst.post('/user/' + userid + '/collection', back, {
        "headers": {
          "content-type": "application/json"
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

    else if (value != "") {
      const payload = {
        "book_id": id,
      }
      const back = JSON.stringify(payload);
      axiosinst.post('/user/' + userid + '/collection?type=' + value, back, {
        "headers": {
          "content-type": "application/json"
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


  const getRate = async () => {
    axiosinst.get('/book/' + id + '/rate', {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
      }
    })
      .then(function (response) {
        if (response.data.message === "No User Rating!") {
          setratenum(0)
        }
        else {
          setratenum(response.data.data)
        }
      })

      .catch(async function (error) {
        console.log(error);
        console.log(error.code + 'ERROR CODE')


      });
  }
  getRate();

  console.log('**' + rate)

  const postRate = async (rate) => {
    if (rate != "") {
      const payload = {
        "rate": rate,
      }
      const back = JSON.stringify(payload);
      axiosinst.post('/book/' + id + '/rate', back, {
        "headers": {
          "content-type": "application/json",
          "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
        }
      })
        .then(async function (response) {
          //console.log(response.data)
          //console.log('\n' + '++++++++' + '\n')
          setratenum(rate);
          //console.log('&&' + rate);
          if (response.data.message === "You rated this book already!!") {
            console.log('TOYE PUTTTTT')
            axiosinst.put('/book/' + id + '/rate', back, {
              "headers": {
                "content-type": "application/json",
                "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
              }
            })
              .then(async function (response) {
                //console.log(response.data)
                getRate()
              })
              .catch(function (error) {
                console.log(error)
              })
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }



  if (loading === false && loading2 === false) {
    return (
      <Container>
        <ScrollView>
          <Header style={{ backgroundColor: '#1F7A8C', marginTop: hp('20%') }} />
          <Body style={{}}>
            <Image source={{ uri: result.imgurl }} style={{
              marginTop: hp('-15%'), height: 220,
              width: 160, borderRadius: 10
            }} />

            <Text style={{
              marginTop: hp('1.5%'), fontWeight: 'bold',
              fontSize: 27
            }}>{result.title}</Text>

            <Text style={{ marginTop: hp('0.5%'), fontSize: 17, color: '#1F7A8C' }}>{result.author}</Text>
            <Text style={{ marginTop: hp('1%') }}>امتیاز کتاب {result.average_rating}</Text>

            <Text style={{ marginTop: hp('0.5%'), marginBottom: hp('1%') }}>به این کتاب امتیاز دهید</Text>
            <AirbnbRating style={{ marginTop: hp('5%'), borderColor: '#f1c40f' }}
              count={5}
              showRating={false}
              defaultRating={ratenum}
              onFinishRating={(rating) => postRate(rating)}
              size={25}
            />

            <DropDownPicker
              items={[
                { label: 'اضافه کنید', value: 'none' },
                { label: 'میخواهم بخوانم', value: 'ToRead' },
                { label: 'در حال خواندن', value: 'Reading' },
                { label: 'قبلا خوانده ام', value: 'Read' },
              ]}
              defaultValue={selectedValue}
              containerStyle={{ height: 40, width: 220, marginBottom: hp('4%') }}
              style={{ backgroundColor: '#fafafa', marginTop: hp('1%'), marginBottom: hp('-1%') }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={(item) => PostPicker(item.value)}
            />


            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: hp('2%'), marginRight: wp('70%'), marginBottom: hp('0.7%') }}>
              درباره کتاب :</Text>
            <Content style={{}}>
              <Card style={{}}>

                <Text style={{
                  marginTop: hp('2%'), marginLeft: wp('2%'),
                  textAlign: 'left', alignSelf: 'stretch'
                }}>{result.description}</Text>
              </Card>
            </Content>
          </Body>

          {comments === "No Comment!" ?
          <Text>نظری در مورد این کتاب ثبت نشده ...</Text> : null}

          {/* <Button style={{
            marginTop: hp('4%'), marginBottom: hp('1%'), backgroundColor: '#1F7A8C',
            width: 200, alignSelf: 'center', borderRadius: 15
          }}
            onPress={() => {
              prop.navigation.navigate('comment', { title: result.title, imgurl: result.imgurl, id: id }) && prop.navigation.setOptions({
                title: response.data.title,
              });
            }}><Text style={{ marginLeft: wp('12%') }}>صفحه نظرات</Text></Button> */}

          {/* <Button style={{
            alignSelf: 'center', backgroundColor: '#1F7A8C',
            width: 200, borderRadius: 15, marginBottom: hp('3%')
          }}
            onPress={() => {
              prop.navigation.navigate('quote', { title: result.title, imgurl: result.imgurl, id: prop.route.params.id }) && prop.navigation.setOptions({
                title: response.data.title,
              });
            }}><Text style={{ marginLeft: wp('10%') }}>صفحه نقل قول ها</Text></Button> */}
        </ScrollView>
        <StatusBar backgroundColor='#BFDBF7' style='light' />
      </Container>
    );
  }
  else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating color={'gray'} size={"large"}></ActivityIndicator>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Bookview;



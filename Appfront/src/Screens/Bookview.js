import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Image, ImageBackground, ScrollView, TouchableOpacity, FlatList, TextInput, ActivityIndicator
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Button, Icon, Body, Right, Left, Picker, Form, Item } from 'native-base';
import { withNavigation } from 'react-navigation'
import axiosinst from '../api/axiosinst'
import { StatusBar } from 'expo-status-bar';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker';
import { Avatar } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Bookview = (prop) => {
  const [rate, setrate] = useState(true);
  const [ratenum, setratenum] = useState(null);
  const [comments, setComments] = useState(null);
  const [quotes, setQuotes] = useState(null);
  const [loading, setloading] = useState(true);
  const [loading2, setloading2] = useState(true);
  const [loading3, setloading3] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [result, setResult] = useState(null);
  const [picture, setpicture] = useState(null);
  const [more, setmore] = useState(false);
  const [showmore, setshowmore] = useState('بیشتر...');
  const [refreshcomments, setrefreshcomments] = useState(false)
  const [refreshquotes, setRefreshquotes] = useState(false);
  const [selectedValue, setSelectedValue] = useState('none');
  const id = prop.route.params.id;
  // const commentt = `${prop.comment}`.toString();
  // const linenumber = (commentt.split('\n').length)
  // const commenttt = `${quotes}`.toString().split('\n');

  // let comment4 = '';
  // if (linenumber > 5) {
  //   for (let i = 0; i < 4; i++)
  //     comment4 += commenttt[i] + '\n'
  //   comment4 += commenttt[4]
  // }
  // else {
  //   comment4 = prop.comment
  // }


  useEffect(() => {
    getResult(id);
    getComments()
    getQoutes()
  }, [refresh]);

  // const commentt = `${}`.toString();
  // const linenumber = (commentt.split('\n').length)
  // const commenttt = `${prop.comment}`.toString().split('\n');


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
        if (response.data.message === "No Comment!") {
          setComments("No Comment!")
        }
        else {
          setComments(response.data)
        }
        setloading2(false)
      })
      .catch(async function (error) {
        console.log(error);
        console.log(error.code + 'ERROR CODE')
      });
  }
  const getQoutes = async () => {
    axiosinst.get('/book/' + id + '/quote', {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
      }
    })
      .then(function (response) {
        if (response.data.message === "No Quote!") {
          setQuotes("No Quote!")
        }
        else {
          setQuotes(response.data)
        }
        setloading3(false)
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



  if (loading === false && loading2 === false && loading3 === false) {
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


            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: hp('2%'), marginRight: wp('67%'), marginBottom: hp('0.7%') }}>
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
            <Text style={{ color: '#1F7A8C', marginLeft: wp('20%'), marginTop: hp('3%') }}>نظری در مورد این کتاب ثبت نشده ...</Text> : null}

          {comments === "No Comment!" ?
            <Button style={{
              marginTop: hp('4%'), marginBottom: hp('1%'), backgroundColor: '#1F7A8C',
              width: 200, alignSelf: 'center', borderRadius: 15
            }}
              onPress={() => {
                prop.navigation.navigate('comment', { title: result.title, imgurl: result.imgurl, id: id }) && prop.navigation.setOptions({
                  title: response.data.title,
                });
              }}><Text style={{ marginLeft: wp('12%') }}>ثبت اولین نظر </Text></Button> : null}

          {comments != "No Comment!" ?
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: hp('2%'), marginBottom: hp('0.7%'), marginLeft: wp('3%') }}>نظرات کاربران :</Text>
            : null}

          {comments != "No Comment!" && comments.length >= 3 ?
            <Button style={{ marginLeft: wp('83%'), marginTop: hp('-5%'), marginBottom: hp('-3%') }} transparent
              onPress={() => {
                prop.navigation.navigate('comment', { title: result.title, imgurl: result.imgurl, id: id }) && prop.navigation.setOptions({
                  title: response.data.title,
                });
              }}>
              <Text style={{ color: '#1F7A8C' }}>بیشتر</Text>
            </Button >
            : null}

          {comments != "No Comment!" ?
            <FlatList
              style={{ marginBottom: hp('5%') }}
              showsVerticalScrollIndicator={false}
              horizontal={true}
              onEndReached={() => {
                //            console.log('-----AKHAR LIST')
              }}
              onEndReachedThreshold={0.5}
              keyExtractor={(item) => item.id}
              refreshing={refreshcomments}
              onRefresh={async () => {
                console.log('refresh')
              }}
              data={comments}
              renderItem={({ item }) => <>
                <View style={{}}>
                  <Card style={styles.cardChat}>
                    {item.account.profile_photo != 'http://c4e2a698ddac.ngrok.io/media/default.png' ? <Avatar.Image 
                      source={{ uri: "http://c4e2a698ddac.ngrok.io" + item.account.profile_photo }}
                    ></Avatar.Image> : <Avatar.Image style={{}} style={styles.avatar} size={50}
                      source={require('../../assets/group.jpg')}
                    ></Avatar.Image>}
                    <Text style={{ color: '#a9a9a9', alignSelf: 'flex-start', fontSize: 14, marginLeft: wp('18%'), marginTop: hp('-9%') }}>{item.account.username}</Text>
                    <Text style={{ marginLeft: wp('4%'), marginTop: hp('5%'), marginBottom: hp('6%') }}>{item.comment_text}</Text>
                  </Card>
                </View>
              </>
              }
            >
            </FlatList> : null}

          {comments != "No Comment!" ?
            <View
              style={{
                width: 320,
                color: '#dcdcdc',
                marginLeft: wp('5%'),
                marginTop: hp('-3%'),
                marginBottom: hp('1%'),
                borderBottomColor: '#a9a9a9',
                borderBottomWidth: 1
              }}
            />
            : null}
          {quotes === "No Quote!" ?
            <Text style={{ color: '#1F7A8C', marginLeft: wp('20%'), marginTop: hp('3%'), marginBottom: hp('2%') }}>نقل قولی برای این کتاب وجود ندارد ...</Text> : null}

          {quotes === "No Quote!" ?
            <Button style={{
              alignSelf: 'center', backgroundColor: '#1F7A8C',
              width: 200, borderRadius: 15, marginBottom: hp('3%')
            }}
              onPress={() => {
                prop.navigation.navigate('quote', { title: result.title, imgurl: result.imgurl, id: prop.route.params.id }) && prop.navigation.setOptions({
                  title: response.data.title,
                });
              }}><Text style={{ marginLeft: wp('10%') }}> ثبت اولین نقل قول</Text></Button>
            : null}

          {quotes != "No Quote!" ?
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: hp('2%'), marginBottom: hp('0.7%'), marginLeft: wp('3%') }}>نقل قول های کاربران :</Text>
            : null}

          {quotes != "No Quote!" && quotes.length >= 3 ?
            <Button style={{ marginLeft: wp('83%'), marginTop: hp('-5%'), marginBottom: hp('-3%') }} transparent
              onPress={() => {
                prop.navigation.navigate('quote', { title: result.title, imgurl: result.imgurl, id: prop.route.params.id }) && prop.navigation.setOptions({
                  title: response.data.title,
                });
              }}>
              <Text style={{ color: '#1F7A8C' }}>بیشتر</Text>
            </Button >
            : null}

          {quotes != "No Quote!" ?
            <FlatList
              style={{ marginBottom: hp('5%') }}
              showsVerticalScrollIndicator={false}
              horizontal={true}
              onEndReached={() => {
                //            console.log('-----AKHAR LIST')
              }}
              onEndReachedThreshold={0.5}
              keyExtractor={(item) => item.id}
              refreshing={refreshquotes}
              onRefresh={async () => {
                console.log('refresh')
              }}
              data={quotes}
              renderItem={({ item }) => <>
                <View style={{}}>
                  <Card style={styles.cardChat2}>
                    <Text style={{ alignSelf: 'flex-start', color: '#a9a9a9', fontSize: 14, marginLeft: wp('4%'), marginTop: hp('1%') }}>{item.account.username}</Text>
                    {(item.quote_text.toString().length) <= 100 ?
                      <Text style={{ marginLeft: wp('4%'), top: hp('1%'), marginTop: hp('2%'), marginBottom: hp('7%') }}>{item.quote_text}</Text> :
                      <Text style={{ marginLeft: wp('4%'), top: hp('1%'), marginTop: hp('2%') }}>{item.quote_text.toString()}</Text>}
                    {picture != 'http://699170b6d987.ngrok.io/media/default.png' ? <Avatar.Image style={styles.avatar2} size={90}
                      source={{ uri: item.account.profile_photo }}
                    ></Avatar.Image> : <Avatar.Image style={{}} size={10}
                      source={require('../../assets/group.jpg')}
                    ></Avatar.Image>}
                  </Card>

                </View>
              </>
              }
            >
            </FlatList> : null}
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
  },
  cardChat: {
    height: hp('22%'),
    width: wp('50%'),
    marginLeft: wp('5%'),
    marginTop: hp('8%'),
    top: hp('-6%'),
    marginBottom: hp('-2%'),
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: '#EDF2F4',

  },
  cardChat2: {
    height: hp('32%'),
    width: wp('55%'),
    marginLeft: wp('5%'),
    marginTop: hp('8%'),
    top: hp('-6%'),
    marginBottom: hp('-1%'),
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    backgroundColor: '#EDF2F4',

  },
  avatar: {
    marginLeft: wp('2%'),
    top: hp('-3.5%'),
    marginTop: hp('5%')
  },
  avatar2: {
    top: hp('1%'),
    marginLeft: wp('20%'),
    //    marginBottom:hp('3%'),
    width: wp('14%'),
    height: hp('8%'),
    //    marginTop: hp('5%')
  }
});

export default Bookview;



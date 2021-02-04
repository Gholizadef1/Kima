import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ImageBackground, ScrollView, TouchableOpacity, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Button, Icon, Body, Right, Left, Picker, Form, Item } from 'native-base';
import { withNavigation } from 'react-navigation'
import axiosinst from '../api/axiosinst'
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { Avatar } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Bookview = (prop) => {
  const [rate, setrate] = useState(true);
  const [ratenum, setratenum] = useState(null);
  const [comments, setComments] = useState(null);
  const [quotes, setQuotes] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  const [loading2, setloading2] = useState(true);
  const [loading3, setloading3] = useState(true);
  const [loading4, setloading4] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [result, setResult] = useState(null);
  const [average, setAverage] = useState(null);
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
  // for (let i = 0; i < 4; i++)
  // comment4 += commenttt[i] + '\n'
  // comment4 += commenttt[4]
  // }
  // else {
  // comment4 = prop.comment
  // }


  useEffect(() => {
    getResult(id);
    getComments()
    getQoutes()
    getUsername()
  }, [average]);

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
        setAverage(response.data.average_rating)
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
        console.log('RESPONSE COMMENTSS')
        //console.log('**********' + response.data.comments[0].comment_text)
        if (response.data.message === "No Comment!") {

          setComments("No Comment!")
        }
        else {
          setComments(response.data.comments)
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
        console.log('RESPONSE QUOT')
        if (response.data.message === "No Quote!") {
          setQuotes("No Quote!")
        }
        else {
          setQuotes(response.data.quotes)
        }
        setloading3(false)
      })
      .catch(async function (error) {
        console.log(error);
        console.log(error.code + 'ERROR CODE')
      });
  }

  const getUsername = async () => {
    const id = await AsyncStorage.getItem('id');
    const response = axiosinst.get('/user/' + id)
      .then(function (response) {
        setUser(response.data)
        setloading4(false)
      })
  };

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
          getResult(id)
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



  if (loading === false && loading2 === false && loading3 === false && loading4 === false) {
    return (
      <Container>
        <ScrollView>
          <Header style={{ backgroundColor: '#1F7A8C', marginTop: hp('20%') }} />
          <Body style={{}}>
            <Image source={{ uri: result.imgurl }} style={{
              marginTop: hp('-15%'), height: hp('35%'),
              width: wp('45%'), borderRadius: 15
            }} />

            <Text style={{
              marginTop: hp('1.5%'), fontWeight: 'bold',
              fontSize: hp('3.8%')
            }}>{result.title}</Text>

            <Text style={{ marginTop: hp('0.5%'), fontSize: hp('2.6%'), color: '#1F7A8C' }}>{result.author}</Text>
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
              containerStyle={{ height: hp('7%'), width: wp('53%'), marginBottom: hp('4%') }}
              style={{ backgroundColor: '#fafafa', marginTop: hp('1%'), marginBottom: hp('-1%') }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={(item) => PostPicker(item.value)}
            />


            <Text style={{ fontWeight: 'bold', fontSize: hp('3.2%'), marginTop: hp('2%'), marginRight: wp('67%'), marginBottom: hp('0.7%') }}>
              درباره کتاب :</Text>
            <Content style={{}}>
              <Card style={{}}>

                <Text style={{
                  marginTop: hp('2%'), marginLeft: wp('2%'),
                  textAlign: 'left', alignSelf: 'stretch', marginBottom: hp('2%')
                }}>{result.description}</Text>
              </Card>
            </Content>
          </Body>

          {comments === "No Comment!" ?
            <Text style={{ color: '#1F7A8C', marginLeft: wp('24%'), marginTop: hp('3%') }}>نظری در مورد این کتاب ثبت نشده </Text> : null}

          {comments === "No Comment!" ?
            <AntDesign name="exception1" size={23} color="#1F7A8C" style={{ marginRight: wp('78%'), top: hp('-3.5%') }} /> : null}

          {comments != "No Comment!" ?
            <Text style={{ fontWeight: 'bold', fontSize: 19, marginTop: hp('2%'), marginBottom: hp('0.7%'), marginLeft: wp('5%') }}>نظرات کاربران :</Text>
            : null}

          {comments != "No Comment!" && comments.length >= 3 ?
            <Button style={{ marginLeft: wp('80%'), marginTop: hp('-6%'), marginBottom: hp('-1%') }} transparent
              onPress={() => {
                prop.navigation.navigate('comment', { title: result.title, imgurl: result.imgurl, id: id }) && prop.navigation.setOptions({
                  title: response.data.title,
                });
              }}>
              <Text style={{ color: '#1F7A8C' }}>بیشتر...</Text>
            </Button >
            : null}

          {comments != "No Comment!" ?
            <FlatList
              style={{ marginBottom: hp('5%') }}
              showsVerticalScrollIndicator={false}
              horizontal={true}
              onEndReached={() => {
                // console.log('-----AKHAR LIST')
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
                    {item.account.profile_photo != 'http://f93932c7825e.ngrok.io/media/default.png' ? <Avatar.Image
                      source={{ uri: "http://f93932c7825e.ngrok.io" + item.account.profile_photo }}
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
                marginLeft: wp('7%'),
                marginTop: hp('-3%'),
                marginBottom: hp('1%'),
                borderBottomColor: '#a9a9a9',
                borderBottomWidth: 1
              }}
            />
            : null}
          {quotes === "No Quote!" ?
            <Text style={{ color: '#1F7A8C', marginLeft: wp('22%'), marginTop: hp('2%'), marginBottom: hp('2%') }}>نقل قولی برای این کتاب وجود ندارد </Text> : null}

          {quotes === "No Quote!" ?
            <AntDesign name="exception1" size={23} color="#1F7A8C" style={{ marginRight: wp('80%'), top: hp('-6%') }} /> : null}

          {quotes != "No Quote!" ?
            <Text style={{ fontWeight: 'bold', fontSize: 19, marginTop: hp('2%'), marginBottom: hp('0.7%'), marginLeft: wp('5.5%') }}>نقل قول های کاربران :</Text>
            : null}

          {quotes != "No Quote!" && quotes.length >= 3 ?
            <Button style={{ marginLeft: wp('80%'), marginTop: hp('-6%'), marginBottom: hp('-1%') }} transparent
              onPress={() => {
                prop.navigation.navigate('quote', { title: result.title, imgurl: result.imgurl, id: prop.route.params.id }) && prop.navigation.setOptions({
                  title: response.data.title,
                });
              }}>
              <Text style={{ color: '#1F7A8C' }}>بیشتر...</Text>
            </Button >
            : null}

          {quotes != "No Quote!" ?
            <FlatList
              style={{ marginBottom: hp('5%') }}
              showsVerticalScrollIndicator={false}
              horizontal={true}
              onEndReached={() => {
                // console.log('-----AKHAR LIST')
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
                    {item.account.profile_photo != 'http://f93932c7825e.ngrok.io/media/default.png' ? <Avatar.Image
                      source={{ uri: "http://f93932c7825e.ngrok.io" + item.account.profile_photo }}
                    ></Avatar.Image> : <Avatar.Image style={styles.avatar2} size={50}
                      source={require('../../assets/group.jpg')}
                    ></Avatar.Image>}
                  </Card>

                </View>
              </>
              }
            >
            </FlatList> : null}

          {quotes != "No Quote!" ?
            <View
              style={{
                width: 320,
                color: '#dcdcdc',
                marginLeft: wp('7%'),
                marginTop: hp('-3%'),
                marginBottom: hp('1%'),
                borderBottomColor: '#a9a9a9',
                borderBottomWidth: 1
              }}
            />
            : null}


          <Card style={styles.cardChat3}>
            {user.profile_photo != '/media/default.png' ? <Avatar.Image
              source={{ uri: "http://e7e864967156.ngrok.io" + user.profile_photo }}
            ></Avatar.Image> : <Avatar.Image style={styles.avatar3} size={70}
              source={require('../../assets/group.jpg')}
            ></Avatar.Image>}
            <Text style={{ top: hp('-7%'), marginRight: wp('32%') }}>{user.username}</Text>
            <Button style={styles.button} bordered onPress={() => {
              prop.navigation.navigate('comment', { title: result.title, imgurl: result.imgurl, id: id }) && prop.navigation.setOptions({
                title: response.data.title,
              });
            }}>
              <Text style={{ color: '#1F7A8C', marginLeft: wp('4%'), fontWeight: 'bold' }}>نوشتن نظر</Text>
              <MaterialCommunityIcons name="fountain-pen" size={20} color={'#1F7A8C'} style={{ left: wp('-8%') }} />
            </Button>
            <Button style={styles.button2} bordered onPress={() => {
              prop.navigation.navigate('quote', { title: result.title, imgurl: result.imgurl, id: prop.route.params.id }) && prop.navigation.setOptions({
                title: response.data.title,
              });
            }}>
              <Text style={{ color: '#1F7A8C', marginLeft: wp('2%'), fontWeight: 'bold' }}>نوشتن نقل قول</Text>
              <MaterialCommunityIcons name="fountain-pen" size={20} color={'#1F7A8C'} style={{ left: wp('-6%') }} />
            </Button>
          </Card>
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
  cardChat3: {
    height: hp('33%'),
    width: wp('75%'),
    marginLeft: wp('13%'),
    marginTop: hp('13%'),
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
    marginLeft: wp('20%')
  },
  avatar3: {
    marginTop: hp('3%'),
    top: hp('-8%'),
    marginLeft: wp('28%')
  },
  button: {
    borderRadius: 30,
    height: hp('7%'),
    width: wp('43%'),
    marginLeft: wp('16%'),
    borderColor: '#1F7A8C',
    top: hp('-5%')
  },
  button2: {
    borderRadius: 30,
    height: hp('7%'),
    width: wp('43%'),
    marginLeft: wp('16%'),
    borderColor: '#1F7A8C',
    top: hp('-3%')
  },
});

export default Bookview;


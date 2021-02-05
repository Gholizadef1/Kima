import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, ImageBackground, Image, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Card, List, ListItem, Thumbnail, Item, Input, Textarea } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import axiosinst from '../api/axiosinst';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import { Formik, formik } from 'formik';
import * as yup from 'yup';
import { not } from 'react-native-reanimated';


const userschema = yup.object({

  Username: yup.string()
    .required(" موضوع بحث نمیتواند خالی باشد")
    .min(3, " موضوع بحث نمیتواند کم تر از 3 حرف باشد"),

  Discription: yup.string()
    .required("توضیحات بحث نمیتواند خالی باشد")

})

const GroupPage = (prop) => {

  console.log('STARTTTTT')

  const [refreshmembers, setrefreshmembers] = useState(false)
  const [refreshdiscussions, setrefreshdiscussions] = useState(false)
  const [loading1, setloading1] = useState(true)
  const [loading2, setloading2] = useState(true)
  const [loading3, setloading3] = useState(true)
  const [loading4, setloading4] = useState(true)
  const [picture, setpicture] = useState(undefined);
  const [username, setusername] = useState(null);
  const [groupinfo, setgroupinfo] = useState([]);
  const [owner, setowner] = useState(undefined);
  const [join, setjoin] = useState(undefined);
  const [joinedUser, setjoinedUser] = useState(undefined);
  const [notjoinedUser, setnotjoinedUser] = useState(undefined);
  const [members, setmembers] = useState([]);
  const [groupphoto, setgroupphoto] = useState(null)
  const [reload, setreload] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [membernumber, setmembernumber] = useState();
  const [discussion, setdiscussion] = useState(undefined);
  const [notjoinedloading, setnotjoinedloading] = useState(true);

  useEffect(() => {
    // setjoinedUser(false)
    // setowner(false)
    // setnotjoinedUser(false)
    //getUsername();
    getDiscussion();
  }, [join]);

  const getUsername = async () => {
    const id = await AsyncStorage.getItem('id');
    const response = axiosinst.get('/user/' + id)
      .then(function (response) {
        console.log('USERNAME' + response.data.username)
        setusername(response.data.username)
        setloading4(false)
      })
  };

  useEffect((async) => {
    async function getgroupDetails() {
      const response = axiosinst.get('/group/' + prop.route.params.id)
        .then(async function (response) {
          await setgroupinfo(response.data);
          await setmembernumber(groupinfo.members_count);
          console.log('PHOTOOO' + response.data.group_photo)
          setgroupphoto(response.data.group_photo)
          const id = await AsyncStorage.getItem("id");
          console.log(id + "id")
          console.log(response.data.owner.id + "  back id")
          console.log((id.toString() === response.data.owner.id.toString()) + "  ownefi;wejf;lksd;lfkj;lasfj")
          if (id.toString() === response.data.owner.id.toString()) {
            console.log('@@@@@@@@@@owner')
            await setowner("owner")
          }
          //  setloading2(false)
        })
    }
    getgroupDetails()
  }, [join , membernumber])

  useEffect((async) => {
    async function getMembers() {

      // const [a,seta]=useState(undefined);
      const response = axiosinst.get('/group/' + prop.route.params.id + '/member')
        .then(async function (response) {
          setmembers(response.data.members)
          const id = await AsyncStorage.getItem("id");
          console.log(response.data.members[0].user.profile_photo + " PROFILE PHOTOOOOO")

          console.log(id + " id user khodemoon")
          console.log(response.data.members.length + " lenght member ha")

          for (let i = 0; i < response.data.members.length; i++) {
            console.log((response.data.members[i].user.id.toString()) + " user id back");
            console.log(id.toString() + " id khodemoon toye for")
            console.log(response.data.members[i].user.id.toString() === id.toString() + "  mosavi member ba ma yeki")
            if (response.data.members[i].user.id.toString() === id.toString() && id.toString() != response.data.owner.id.toString()) {
              setjoinedUser("joinedUser")

              console.log('%%%%%%%%%%%%%%%%%%%joineduser')
              break;
              // await seta(true)
            }

          }
          setnotjoinedloading(false);
          //if(joinedUser===undefined)
          // if(a===false){
          //     if (joinedUser === undefined && id.toString()!= response.data.owner.id.toString() ) {
          //       setnotjoinedUser("notjoinedUser")
          //       console.log("###############notjoineduser")
          //     }
          //  // }
          setloading1(false)
        })
    }
    getMembers()
  }, [join])


  console.log('J===' + joinedUser)
  console.log('N===' + notjoinedUser)
  console.log('O===' + owner)



  if (!groupinfo) {
    return null;
  }


  const JoinGroup = async () => {
    //    console.log(' OMAD TO JOIN GROUP')
    const back = {}
    const backk = JSON.stringify(back);
    axiosinst.post('/group/' + prop.route.params.id + '/member', backk, {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
      }
    })
      .then(async function (response) {
        Alert.alert('', 'شما عضو گروه شدید ', [
          {
            text: 'فهمیدم', style: 'default', onPress: () => console.log('alert closed')
          }
        ], { cancelable: false }, { style: { height: hp('40%') } })
        await setjoin(true)
        await getMembers()
      })

      .catch(function (error) {
        console.log(error);
      });
  }
  console.log('groupiddd' + prop.route.params.id)
  const LeaveGroup = async () => {
    const id = await AsyncStorage.getItem('id');
    axiosinst.delete('/group/' + prop.route.params.id + '/member/' + id, {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
      }
    })
      .then(async function (response) {
        Alert.alert('', 'شما گروه را ترک کردید', [
          {
            text: 'فهمیدم', style: 'default', onPress: () => console.log('alert closed')
          }
        ], { cancelable: false }, { style: { height: hp('40%') } })

        prop.navigation.navigate('Groupmainpage')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const getDiscussion = async () => {

    axiosinst.get('/group/' + prop.route.params.id + '/discussion', {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
      }
    })
      .then(function (response) {
        setdiscussion(response.data.discussions)
        setloading3(false)
      })

      .catch(async function (error) {
        console.log(error);
        console.log(error.code + 'ERROR CODE')
      });
  }

  if (owner != undefined || joinedUser != undefined || (owner === undefined && joinedUser === undefined)) {
    return (
      <View style={styles.container}>
        <View>
          <Modal transparent={true} StatusBar={{ backgroundColor: 'blue' }} style={{ bottom: hp('8%'), margin: wp('20%'), position: 'absolute' }} visible={modalVisible} animationType='fade' >

            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity style={{ position: 'absolute', alignSelf: 'flex-end', top: hp('1%'), right: hp('1%'), height: hp('5%'), width: wp('8%'), backgroundColor: 'white', position: 'absolute' }} onPress={() => setModalVisible(false)}>
                  <AntDesign style={{ position: 'absolute', alignSelf: 'flex-end', top: hp('1%'), right: hp('1%') }} onPress={() => setModalVisible(false)}
                    name="close" size={23} color="#D75A5A" />
                </TouchableOpacity>
                <Formik style={{ borderStyle: 'dashed', justifyContent: 'space-around' }}
                  initialValues={{ Username: '', Discription: '' }}
                  validationSchema={userschema}

                  onSubmit={async (values, actions) => {
                    //                    console.log('ON SUBMIT')
                    const formdata = new FormData();
                    formdata.append('title', values.Username)
                    formdata.append('description', values.Discription)

                    //                  console.log(formdata.data+'formdata')

                    const response = await axiosinst.post('/group/' + prop.route.params.id + '/discussion', formdata, {
                      headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
                      }
                    }
                    )
                      .then(function (response) {
                        Alert.alert('', 'بحث با موفقیت ساخته شد ', [
                          {
                            text: 'فهمیدم', style: 'default', onPress: () => console.log('alert closed')
                          }
                        ], { cancelable: false }, { style: { height: hp('40%') } })
                        getDiscussion();
                      })
                      .catch(function (error) {
                        {
                          console.log(error)

                          Alert.alert('', ' مشکلی پیش اومده لطفا دوباره امتحان کن  ', [{


                            text: 'فهمیدم', onPress: () => console.log('alert closed'), style: 'default'
                          }], { cancelable: false }, { style: { height: hp('40%') } })
                        }
                      })

                  }}
                >
                  {(props) => (
                    <View style={{ marginTop: hp('5%') }}>
                      <View style={{ borderColor: 'blue' }}>

                        <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold', color: '#1f7a8c', marginBottom: hp('2%'), marginLeft: wp('1%'), marginTop: hp('-2%') }}>موضوع بحث</Text>
                        <Item style={styles.item} rounded >

                          <Input style={styles.Input} autoCapitalize='words' autoCorrect={true}
                            onChangeText={props.handleChange('Username')}
                            onBlur={props.handleBlur('Username')}
                            value={props.values.Username}
                            placeholder={'موضوع بحث ...'} placeholderTextColor='gray' >
                          </Input>
                          <MaterialCommunityIcons name="account-group" size={hp('2.8%')} style={{ left: wp('2%') }} color="#BFDBF7" />

                          <Text style={{ fontSize: hp('1.2%'), marginLeft: wp('-3.5%'), marginTop: hp('7%'), color: 'red' }}>{props.touched.Username && props.errors.Username}</Text>
                        </Item>

                      </View>
                      <View>
                        <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold', color: '#1f7a8c', marginBottom: hp('-5%'), marginTop: hp('5%'), marginLeft: wp('1%') }}>توضیحات</Text>
                        <TouchableOpacity>
                          <Textarea rowSpan={hp('1%')} bordered borderRadius={8}
                            borderColor={'lightgray'}
                            onChangeText={props.handleChange('Discription')}
                            onBlur={props.handleBlur('Discription')}
                            value={props.values.Discription}
                            placeholder={'توضیحات بحث ...'} placeholderTextColor='gray' fontSize={hp('1.8%')} style={styles.item2}>
                          </Textarea>
                        </TouchableOpacity>
                        <Text style={{ fontSize: hp('1.2%'), marginTop: hp('0.5%'), color: 'red' }}>{props.touched.Discription && props.errors.Discription}</Text>
                      </View>
                      <Button bordered rounded style={styles.button}
                        onPress={props.handleSubmit}
                      >
                        <Text style={{ color: '#E1E5F2', fontSize: hp('1.8%'), fontWeight: 'bold', left: wp('11%'), width: wp('40%') }}>ساخت بحث</Text>
                      </Button>
                    </View>
                  )}
                </Formik>
              </View>
            </View>
          </Modal>
        </View>
        <ScrollView>
          <Text style={styles.kima}>کیما</Text>
          <Image

            source={require('../../assets/kiddy_book.jpg')}
            style={{
              width: wp('100%'),
              height: hp('35%'),
              position: 'absolute',

            }}

          ></Image>
          <View style={{ position: 'absolute', backgroundColor: 'white', height: hp('60%'), width: wp('100%'), marginTop: hp('30%'), borderTopStartRadius: 30, borderTopEndRadius: 30 }}>

          </View>
          {/* <View style={styles.view}> */}
          <View style={styles.backpic}>

          </View>


          {groupinfo.group_photo != '/media/default.png' ? <Avatar.Image
          style={{marginLeft:wp('15%'),marginTop:hp('-9%')}} size={90}
            source={{ uri: "http://e7ae29f4056b.ngrok.io" + groupinfo.group_photo }}
          ></Avatar.Image> : <Avatar.Image style={{marginLeft:wp('15%'),marginTop:hp('-9%')}} size={90}
            source={require('../../assets/group.jpg')}
          ></Avatar.Image>}
          <View style={{width:wp("50%"),marginTop:hp("0.5%"),height:hp("4%"),marginLeft:wp("2%"),backgroundColor:"white"}}>
          <Text style={styles.groupname}>{groupinfo.title}</Text>
          </View>
          <Text style={{ color: '#a9a9a9', marginLeft: wp('19'), marginTop: hp('1') }}>تعداد اعضا :{groupinfo.members_count}</Text>
          {/* {joinedUser!=undefined&&owner!=undefined && notjoinedUser!=undefined<View> */}
          {joinedUser === "joinedUser" && notjoinedUser === undefined && owner === undefined ?
            <Button style={{
              marginLeft: wp('60%'), width: wp('30%'), borderRadius: 15, marginTop: hp('-8%')
              , backgroundColor: '#1F7A8C'
            }} onPress={() => LeaveGroup()}>
              <Text style={{ marginLeft: wp('6.8%'), fontSize: hp('2%'), fontWeight: 'bold', color: 'white' }}>ترک گروه</Text>
            </Button> : null}

          {owner === undefined && joinedUser === undefined ?
            <Button style={{
              marginLeft: wp('60%'), width: wp('30%'), borderRadius: 15, marginTop: hp('-8%')
              , backgroundColor: '#1F7A8C'
            }} onPress={() => JoinGroup()}>
              <Text style={{ marginLeft: wp('5.4%'), fontSize: hp('2%'), fontWeight: 'bold', color: 'white' }}> عضو شدن</Text>
            </Button> : null}

          {owner === "owner" ?
            <Button style={{
              marginLeft: wp('60%'), width: wp('30%'), borderRadius: 15, marginTop: hp('-7%')
              , backgroundColor: '#1F7A8C'
            }} onPress={async () => {
              await Alert.alert(
                'از حذف این گروه اطمینان دارید؟',
                '',
                [
                  {
                    text: 'انصراف',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'default'
                  },
                  {
                    text: 'حذف', onPress: async () => {
                      axiosinst.delete('/group/' + prop.route.params.id, {
                        "headers":
                        {
                          "Content-Type": "application/json",
                          "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
                        }
                      })
                        .then(async function (response) {
                          Alert.alert('', 'گروه با موفقیت حذف شد  ', [
                            {
                              text: 'فهمیدم', style: 'default', onPress: () => console.log('alert closed')
                            }
                          ], { cancelable: false }, { style: { height: hp('40%') } })
                          prop.navigation.navigate('Groupmainpage')
                        })
                        .catch(function (error) {
                          console.log(error);
                          console.log('delete error ||||||||||||')

                        })
                    }
                  }
                ],
                { cancelable: false }
              );

              //  response();
            }}>
              <Text style={{ marginLeft: wp('5%'), fontSize: hp('2%'), fontWeight: 'bold', color: 'white' }}>حذف گروه</Text>
            </Button> : null}

          {/* {owner != undefined && joinedUser != undefined && notjoinedUser != undefined&&notjoinedUser==="notjoinedUser" && loading1 === false && loading2 === false && loading3 === false && loading4 === false ?
              <Button style={{
                marginLeft: wp('60%'), width: 110, borderRadius: 15, marginTop: hp('-8%')
                , backgroundColor: '#1F7A8C'
              }} onPress={() => JoinGroup()}>
                <Text style={{ marginLeft: wp('5.5%'), fontSize: 15, fontWeight: 'bold', color: 'white' }}> عضو شدن</Text>
              </Button> : null} */}
          <Text style={{ fontSize: hp('2.7%'), marginLeft: wp('4%'), marginTop: hp('10%'), color: '#1F7A8C', fontWeight: 'bold' }}>درباره گروه :</Text>

          <Text style={{ textAlign: 'left', marginTop: hp('2'), marginLeft: wp('10%'), marginRight: wp('1%') }}>
            {groupinfo.summary}
          </Text>

          <Text style={{ fontSize: hp('2.7%'), marginTop: hp('3%'), marginLeft: wp('4%'), color: '#1F7A8C', fontWeight: 'bold' }}>بحث های انجام شده :</Text>

          {discussion != undefined && discussion.length === 0 ?
            <Text style={{ color: '#1F7A8C', marginLeft: wp('18%'), marginTop: hp('4%'),marginBottom:hp('-4%'),top:hp('-0.5%') }}>بحثی برای نمایش وجود ندارد...</Text> : null}

          {discussion != undefined && discussion.length === 0 ?
            <AntDesign name="exception1" size={23} color="#1F7A8C" style={{ marginRight: wp('83.5%'), top: hp('0.3%') }} /> : null}

          <ScrollView>
            <View>
              <FlatList
                style={{ marginBottom: hp('5%') }}
                showsVerticalScrollIndicator={true}
                onEndReached={() => {
                  //            console.log('-----AKHAR LIST')
                }}
                onEndReachedThreshold={0.5}
                keyExtractor={(item) => item.id}
                refreshing={refreshdiscussions}
                onRefresh={async () => {
                  //            console.log('refresh')
                }}
                data={discussion}
                renderItem={({ item }) => <>
                  <View style={{ maginLeft: wp('5%'), marginTop: hp('2%') }}>
                    <Text style={{ alignSelf: 'flex-start', left: wp('5%'), fontSize: hp('2.7%') }}>{item.title}</Text>
                    <Text style={{ color: '#a9a9a9', marginLeft: wp('4%'), marginTop: hp('1%') }}>{item.description}</Text>
                    {joinedUser === 'joinedUser' || owner === 'owner' ?
                      <Button style={{ marginLeft: wp('80%'), marginTop: wp('-11%') }} transparent
                        onPress={() => prop.navigation.navigate('ShowDiscussionPage', { id: item.id, id2: prop.route.params.id, title: item.title })}>
                        <Text style={{ color: '#1F7A8C' }}>مشاهده</Text>
                      </Button>
                      : <Button style={{ marginLeft: wp('80%'), marginTop: wp('-11%') }} transparent
                        onPress={() => Alert.alert('', ' برای دیدن بحث های انجام شده باید عضو گروه باشید', [{
                          text: 'فهمیدم', onPress: () => console.log('alert closed'), style: 'default'
                        }], { cancelable: false }, { style: { height: hp('40%') } })}>
                        <Text style={{ color: '#1F7A8C' }}>مشاهده</Text>
                      </Button>}
                    <View
                      style={{
                        width: wp('90%'),
                        color: '#a9a9a9',
                        marginLeft: wp('5%'),
                        marginTop: hp('2%'),
                        borderBottomColor: '#a9a9a9',
                        borderBottomWidth: wp('0.3%')
                      }}
                    />
                  </View>
                </>
                }
              >
              </FlatList>
            </View>
          </ScrollView>


          {joinedUser === 'joinedUser' || owner === 'owner' ?
            <Button onPress={() => setModalVisible(true)} style={{
              marginLeft: wp('20%'), width: wp('65%'), borderRadius: 20, marginTop: hp('1.5%')
              , backgroundColor: '#1F7A8C'
            }}>
              <Text style={{ marginLeft: wp('18%'), fontSize: hp('2%'), fontWeight: 'bold', color: 'white' }}>ایجاد بحث جدید</Text>
            </Button>
            : <Button onPress={() => Alert.alert('', ' برای ایجاد یک بحث جدید باید عضو گروه باشید', [{
              text: 'فهمیدم', onPress: () => console.log('alert closed'), style: 'default'
            }], { cancelable: false }, { style: { height: hp('40%') } })} style={{
              marginLeft: wp('21%'), width: wp('65%'), borderRadius: 20, marginTop: hp('3%')
              , backgroundColor: '#1F7A8C'
            }}>
              <Text style={{ marginLeft: wp('18%'), fontSize: hp('2.5%'), fontWeight: 'bold', color: 'white' }}>ایجاد بحث جدید</Text>
            </Button>}


          <ScrollView>
            <View style ={{alignItems:'flex-start'}}>
              <Text style={{ fontSize: hp('2.3%'), marginTop: hp('4%'), marginLeft: wp('4%'), color: '#1F7A8C', fontWeight: 'bold', marginBottom: hp('-4%') }}> اعضای گروه :</Text>

              <Button style={{ marginLeft: wp('90%'), top: hp('-1%') }} transparent
                onPress={() => prop.navigation.navigate('ShowMembersPage', { id: prop.route.params.id })}>
                <Text style={{ color: '#1F7A8C' }}>بیشتر</Text>
              </Button>
              <ScrollView>
                <View>
                <FlatList style={styles.flastlist}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                onEndReached={() => {
                  //          console.log('-----AKHAR LIST')
                }}
                onEndReachedThreshold={0.5}
                refreshing={refreshmembers}
                onRefresh={async () => {
                  //            console.log('refresh')
                }}
                data={members}
                renderItem={({ item}) => <>
                  <View>
                    {item.user.profile_photo != '/media/default.png' ? <Avatar.Image
                    style={{ alignSelf: 'flex-start', marginLeft: wp('5%'),marginTop:hp("2%") }}
                    size={70}
                      source={{ uri: "http://e7ae29f4056b.ngrok.io" + item.user.profile_photo }}
                    ></Avatar.Image> : <Avatar.Image size={70} style={{ alignSelf: 'flex-start', marginLeft: wp('5%'),marginTop:hp("2%") }}
                      source={require('../../assets/group.jpg')}
                    ></Avatar.Image>}
                    {/* <View style={{width:wp("20%"),marginLeft:wp("2.7%"),height:hp("2%"),backgroundColor:"lightblue",marginBottom:hp("5%")}}> */}
                    <Text style={{ alignSelf: 'flex-start',fontSize:hp("1.3.5%"), marginLeft: wp('7%'),marginRight:wp("7%"), marginTop: hp('1%'),marginBottom:hp("5%") }}>{item.user.username}</Text>
                    {/* </View> */}
                  </View>
                </>
                }
              >

              </FlatList>
                </View>
              </ScrollView>
              {/* :<ActivityIndicator  animating color={'gray'} size={"large"} style={{ marginTop: hp('5%'),marginBottom:hp("5%"),height:hp("5%"),width:wp("10%"),color:"black",alignSelf:"center"}} anim></ActivityIndicator>} */}

            </View>
          </ScrollView>



          {/* {groupinfo.members_count>4 ?         
          <Button style={{ marginLeft: wp('90%') }} transparent 
          onPress={() => prop.navigation.navigate('ShowMembersPage')}>
           <Text style={{ color: '#1F7A8C' }}>بیشتر</Text>
         </Button > : null} */}



        </ScrollView>

      </View>
    );
  }
  else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating color={'gray'} size={"large"}></ActivityIndicator>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kima: {
    color: '#1F7A8C',
    marginTop: hp('8%'),
    marginLeft: wp('5%'),
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute'
  },
  backpic: {

    width: wp('100%'),
    height: hp('32%')
  },
  flastlist: {
    marginHorizontal: wp("0%"),
    alignSelf: "flex-start",
    marginTop: 0,
    start: 2
  },
  groupname: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    alignSelf:"center"
    // marginLeft: wp('5%'),
    // marginTop: hp('3%'),
  },
  centeredView: {
    height: hp('40%'),
    marginTop: hp('15%'),
  },
  button: {
    marginTop: hp('1%'),
    alignSelf: 'center',
    width: wp('41%'),
    backgroundColor: '#1f7a8c',
    borderColor: '#BFDBF7',
    borderRadius: 50

  },
  modalView: {
    margin: 13,
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    height: hp('65%'),
    elevation: 300
  },
  avatar: {
    marginTop: hp('-9%'),
    marginVertical:wp('5%')
  },
  loader: {
    alignItems: 'center',
    marginBottom: hp('5%'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('10%')
  },
  Input: {
    left: wp('8%'),
    fontSize: hp('1.5%'),
    fontWeight: 'bold',
    marginRight: wp('10%'),
    position: 'absolute',
    height: wp('9.5%'),
    width: wp('31.5%')
  },
  item2: {
    marginLeft: wp('-2%'),
    marginRight: wp('-1%'),
    marginTop: hp('6%'),
    fontSize: hp('2.5%')
  },
  item: {
    marginLeft: wp('-2%'),
    marginRight: wp('45%'),
    height: wp('9.5%')
  }
});
export default GroupPage;

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, ImageBackground, Image, FlatList } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Card, List, ListItem, Thumbnail } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import { CONTACTS } from 'expo-permissions';
import { not } from 'react-native-reanimated';



const GroupPage = (prop) => {
  const [refreshmembers, setrefreshmembers] = useState(false)
  const [picture, setpicture] = useState(null);
  const [username, setusername] = useState(null);
  const [groupinfo, setgroupinfo] = useState(null);
  const [message, setmessage] = useState(null);
  const [owner, setowner] = useState(false);
  const [joind, setjoined] = useState(false);
  const [notjoined, setnotjoined] = useState(false);
  const [members, setmembers] = useState(null);
  const [groupphoto, setgroupphoto] = useState(null)
  const [reload, setreload] = useState(false)
  const [membernumber, setmembernumber] = useState();
  // if(owner===true)
  // {
  //   if(reload===false)
  //   setreload(true)
  //   else
  //   setreload(false)
  // }
  // useEffect(() => {
  //   setjoined(false)
  //   setowner(false)
  //   setnotjoined(false)
  //   const response = axiosinst.get('/api/group/details/' + prop.route.params.id)
  //     .then(async function (response) {
  //       if(username===response.data.members.owner.username)
  //       setowner(true)

  //       await setgroupinfo(response.data);
  //       setmembernumber(groupinfo.members_count);
  //       console.log('GROUP PAGE4')
  //       // console.log(response.data)
  //       console.log(response.data.group_photo + 'group photo')
  //       console.log(groupinfo + '*****')
  //       setgroupphoto(`http://505a2dd8d5cc.ngrok.io${response.data.group_photo}`)
  //       console.log(groupphoto + '------')
  //       // console.log(groupinfo.group_photo)
  //       //      console.log('**'+response.data.title)
  //     })
     
  //   getMembers();
  //   getUsername();
  // }, [joind]);
    useEffect(() =>{
      setjoined(false)
      setowner(false)
      setnotjoined(false)
      getInfo();
      getMembers();
      getUsername();
  },[]);
  // useEffect(() =>{
  //   // setjoined(false)
  //   setowner(false)
  //   // setnotjoined(false)
  //   getInfo();
  //   getMembers();
  //   getUsername();
  // },[owner]);
  // useEffect(() =>{
  //   // setjoined(false)
  //   // setowner(false)
  //   setnotjoined(false)
  //   getInfo();
  //   getMembers();
  //   getUsername();
  // },[notjoined]);

  // useFocusEffect(
  //   React.useCallback(async() => {
  //      getInfo();
  //     getMembers();
  //     getUsername();
  //   },[]))

  const getInfo = async () => {
    const response = axiosinst.get('/api/group/details/' + prop.route.params.id)
      .then(async function (response) {

        await setgroupinfo(response.data);
        setmembernumber(groupinfo.members_count);
        console.log('GROUP PAGE4')
        // console.log(response.data)
        console.log(response.data.group_photo + 'group photo')
        console.log(groupinfo + '*****')
        setgroupphoto(`http://505a2dd8d5cc.ngrok.io${response.data.group_photo}`)
        console.log(groupphoto + '------')
        // console.log(groupinfo.group_photo)
        //      console.log('**'+response.data.title)
      })
  };

  const getMembers = async () => {
    console.log('GETMEMBERS')
    const response = axiosinst.get('/api/group/members/' + prop.route.params.id)
      .then(async function (response) {
        console.log(response.data.members.lenght + '^^^^^^^^^^^^^^^^^^^^')
        console.log(membernumber + 'MEMBER NUM')
        console.log(response.data)
        setmembers(response.data.members)
        console.log('member 0' + response.data.members[0].user.username)
        console.log('ownerrr ' + response.data.owner.username)
        console.log('count   ' + response.data.count)
        //  console.log('member 0'+response.data.members[0].user.username)
        if (username === response.data.owner.username) {
          await setowner(true)
        }
        // getInfo();
        // navigation.navigate('')
        // for (var i =0 ; i<response.data.members.length ; i++){
        //   if (response.data.members[i].user.username === username ){
        //     console.log('((((((((((')
        //     if ( response.data.members[i].user.username === response.data.owner.username ){
        //       setowner(true)
        //     }
        //   }
        // }
        console.log('INJA HAMM')
        console.log(response.data.members.count + 'LENGG********GGGGGGGGGGTH')
        // console.log(groupinfo.members_count +' GROUP INFO .MEMBER_COUNTTTTTT')
        console.log(membernumber + '  MEMBER NUMBERRRR')
        for (let i = 0; i < membernumber; i++) {
          console.log(response.data.members.lenght + 'LENGGGGGGGGGGGGTH')
          console.log('&&&&&&&&&')

          if (response.data.members[i].user.username === username && owner != true) {
            //  if (response.data.members[i].user.username != response.data.owner.username){
            console.log('ghable joined')
            setjoined(true)
            console.log('baade join')
          }
          console.log('_______')
        }

        if (joind === false && owner === false)
          setnotjoined(true)

        // }
        // if ( owner === false && joind === false ){
        //   setnotjoined(true)
        // }
        // for(var i =0 ; i<response.data.count ; i++){
        //   if(response.data.members[i].user.username != username || response.data.count === 0){
        //     setnotjoined(true)
        //   }
        // }

      })
  };

  console.log('joinedd' + joind)

  const getUsername = async () => {
    const id = await AsyncStorage.getItem('id');
    console.log('ID' + id)

    const response = axiosinst.get('/api/user-profile/' + id)
      .then(function (response) {
        console.log('ID' + id)
        setusername(response.data.username)
        console.log('USERR' + response.data.username)
        console.log('hhhkll')
        console.log('hhh' + prop.route.params.id)
      })
  };

  if (!groupinfo) {
    return null;
  }


  const JoinGroup = async () => {

    console.log(' OMAD TO JOIN GROUP')
    const back = {}
    const backk = JSON.stringify(back);
    axiosinst.post('/api/group/members/' + prop.route.params.id, backk, {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
      }
    })
      .then(async function (response) {
        //          console.log(await AsyncStorage.getItem('token')).toString()
        console.log('response' + response.data.message)
        // setjoined(true)
        getMembers()
      })
     
      .catch(function (error) {
        console.log(error);
      });
  }
  const LeaveGroup = async () => {
    console.log(' OMAD TO LEAVE GROUP')
    const back = {}
    const backk = JSON.stringify(back);
    axiosinst.post('/api/group/members/' + prop.route.params.id, backk, {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
      }
    })
      .then(async function (response) {
        //          console.log(await AsyncStorage.getItem('token')).toString()
        console.log('response' + response.data.message)
        // setnotjoined(true)
        getMembers()
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const deleteGroup = async () => {
    console.log('delete')
    axiosinst.delete('/api/group/details/' + prop.route.params.id, {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
      }
    })
      .then(async function (response) {
        prop.navigation.navigate('Groupmainpage')
        console.log('delete')
        console.log('%%%%%%%%%%')
      })
      .catch(function (error) {
        console.log(error);
        console.log('//////////////////')
      });

  }



  return (
    <View style={styles.container}>
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
        <View style={{ position: 'absolute', backgroundColor: 'white', height: 100, width: wp('100%'), marginTop: hp('30%'), borderTopStartRadius: 30, borderTopEndRadius: 30 }}>

        </View>
        {/* <View style={styles.view}> */}
        <View style={styles.backpic}>

        </View>

        {picture != 'http://505a2dd8d5cc.ngrok.io/media/default.png' ? <Avatar.Image style={styles.avatar} size={105}
          source={{ uri: groupphoto }}
        ></Avatar.Image> : <Avatar.Image style={styles.avatar} size={105}
          source={require('../../assets/group.jpg')}
        ></Avatar.Image>}

        <Text style={styles.groupname}>{groupinfo.title}</Text>
        <Text style={{ color: '#a9a9a9', marginLeft: wp('19'), marginTop: hp('1') }}>تعداد اعضا :{groupinfo.members_count}</Text>

        {joind === true ? <Button style={{
          marginLeft: wp('60%'), width: 110, borderRadius: 15, marginTop: hp('-8%')
          , backgroundColor: '#1F7A8C'
        }} onPress={() => LeaveGroup()}>
          <Text style={{ marginLeft: wp('5.5%'), fontSize: 15, fontWeight: 'bold', color: 'white' }}>ترک گروه</Text>
        </Button> : null}

        {notjoined === true ?
          <Button style={{
            marginLeft: wp('60%'), width: 110, borderRadius: 15, marginTop: hp('-8%')
            , backgroundColor: '#1F7A8C'
          }} onPress={() => JoinGroup()}>
            <Text style={{ marginLeft: wp('5.5%'), fontSize: 15, fontWeight: 'bold', color: 'white' }}> عضو شدن</Text>
          </Button> : null}

        {owner === true ? <Button style={{
          marginLeft: wp('60%'), width: 110, borderRadius: 15, marginTop: hp('-8%')
          , backgroundColor: '#1F7A8C'
        }} onPress={() => deleteGroup()}>
          <Text style={{ marginLeft: wp('5.5%'), fontSize: 15, fontWeight: 'bold', color: 'white' }}>حذف گروه</Text>
        </Button> : null}

        <Text style={{ fontSize: 21, marginLeft: wp('7%'), marginTop: hp('10%'), color: '#1F7A8C', fontWeight: 'bold' }}>درباره گروه :</Text>

        <Text style={{ textAlign: 'left', marginTop: hp('2'), marginLeft: wp('6%'), marginRight: wp('1%') }}>
          {groupinfo.summary}
        </Text>

        <Text style={{ fontSize: 20, marginTop: hp('3%'), marginLeft: wp('7%'), color: '#1F7A8C', fontWeight: 'bold' }}>بحث های انجام شده :</Text>
        <List style={{ marginTop: '8%' }}>
          <ListItem thumbnail>
            <Left>
              <Thumbnail style={{ borderRadius: 6 }} square source={require('../../assets/girl.jpg')} />
            </Left>
            <Body style={{ top: hp('0.5%'), marginLeft: wp('6%') }} >
              <Text>بحث اول</Text>
            </Body>
            <Right style={{ marginRight: wp('6%') }}>
              <Button transparent >
                <Text>مشاهده</Text>
              </Button>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail style={{ borderRadius: 6 }} square source={require('../../assets/index.jpg')} />
            </Left>
            <Body style={{ top: hp('0.5%') }}>
              <Text>بحث سوم</Text>
            </Body>
            <Right style={{ marginRight: wp('6%') }}>
              <Button transparent >
                <Text>مشاهده</Text>
              </Button>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={require('../../assets/tea.jpg')} />
            </Left>
            <Body style={{ top: hp('0.5%') }}>
              <Text>بحث سوم </Text>
            </Body>
            <Right style={{ marginRight: wp('6%') }}>
              <Button transparent >
                <Text>مشاهده</Text>
              </Button>
            </Right>
          </ListItem>

        </List>

        <Button style={{
          marginLeft: wp('21%'), width: 220, borderRadius: 20, marginTop: hp('3%')
          , backgroundColor: '#1F7A8C'
        }}>
          <Text style={{ marginLeft: wp('17%'), fontSize: 15, fontWeight: 'bold', color: 'white' }}>ایجاد بحث جدید</Text>
        </Button>

        <Text style={{ fontSize: 20, marginTop: hp('2%'), marginLeft: wp('7%'), color: '#1F7A8C', fontWeight: 'bold' }}> اعضای گروه :</Text>

        {/* <List>
            <ListItem  style={{marginTop:hp('1%')}} avatar>
              <Left>
                <Thumbnail source={require('../../assets/sea.jpg')} />
              </Left>
              <Body style={{marginTop:hp('8%') , marginLeft:wp('6%') , marginRight:wp('7%')}}>
                <Text style={{marginTop:hp('-4%')}}>مرضیه</Text>
              </Body>
            </ListItem>
            <ListItem avatar >
              <Left>
                <Thumbnail source={require('../../assets/sea.jpg')} />
              </Left>
              <Body style={{marginTop:hp('8%') , marginLeft:wp('6%') , marginRight:wp('7%')}}>
                <Text style={{marginTop:hp('-4%')}}>مرضیه</Text>
              </Body>
            </ListItem>
          </List> */}



          <FlatList
            horizontal={true}
            style={{ marginBottom: hp('5%') }}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {

              console.log('-----AKHAR LIST')
            }}
            onEndReachedThreshold={0.5}
            keyExtractor={(item) => item.id}
            refreshing={refreshmembers}
            onRefresh={async () => {
             console.log('refresh')
            }}

            data={members}
            renderItem={({ item }) =><>

              <View style={{maginLeft:wp('5%'),right:wp('5%'),marginTop:hp('2%')}}>
                     {picture!='http://cc4552eb4e3a.ngrok.io/media/default.png'?<Avatar.Image style={{}} size={90}
                      source={{uri:groupphoto}}
                      ></Avatar.Image>: <Avatar.Image style={styles.avatar} size={90}
                      source={require('../../assets/group.jpg')}
                      ></Avatar.Image>}
                       <Text style={{alignSelf:'flex-start',left:wp('5%')}}>{item.user.username}</Text>
              </View>
              {/* <Body style={{marginTop:hp('8%') , marginLeft:wp('6%') , marginRight:wp('7%')}}>
        <FlatList
          // horizontal={true}s
          style={{ marginBottom: hp('5%') }}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {

            console.log('-----AKHAR LIST')
          }}
          onEndReachedThreshold={0.5}
          keyExtractor={(item) => item.id}
          refreshing={refreshmembers}
          onRefresh={async () => {
            console.log('refresh')
          }}

          data={members}
          renderItem={({ item }) => <>

            <View style={{ maginLeft: wp('5%'), marginTop: hp('2%') }}>
              {picture != 'http://505a2dd8d5cc.ngrok.io/media/default.png' ? <Avatar.Image style={{}} size={90}
                source={{ uri: groupphoto }}
              ></Avatar.Image> : <Avatar.Image style={styles.avatar} size={90}
                source={require('../../assets/group.jpg')}
              ></Avatar.Image>}
              <Text style={{ alignSelf: 'flex-start', left: wp('5%') }}>{item.user.username}</Text>
            </View>
            {/* <Body style={{marginTop:hp('8%') , marginLeft:wp('6%') , marginRight:wp('7%')}}>
                <Text style={{marginTop:hp('-4%')}}>{item.user.username}</Text>
              </Body> */}
          </>
          }
        // extraData={finfo}
        >
        </FlatList>






        <Button style={{ marginLeft: wp('90%') }} transparent>
          <Text style={{ color: '#1F7A8C' }}>بیشتر</Text>
        </Button>

      </ScrollView>

    </View>
  );
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
  avatar: {
    elevation: 5,
    marginTop: hp('-10%'),
    marginLeft: wp('15%')

  },
  groupname: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: wp('19%'),
    marginTop: hp('3%'),

  }
});
export default GroupPage;
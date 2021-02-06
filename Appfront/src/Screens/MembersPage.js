import React, { useState, useEffect, useDebugValue } from 'react';
import { StyleSheet, Text, View, Modal, ImageBackground, Image, FlatList } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Card, List, ListItem, Thumbnail, Item, Input, Textarea } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axiosinst from '../api/axiosinst';
import { Avatar } from 'react-native-paper';

const MembersPage = (prop) => {

  const [members, setmembers] = useState();
  const [refreshmembers, setrefreshmembers] = useState(false)
  const [picture, setpicture] = useState(null);
  const [profilephoto, setprofilephoto] = useState();
  const id = prop.route.params.id;

  useEffect(() => {
    getMembers();
  }, []);

  const getMembers = async () => {

    const response = axiosinst.get('/group/' + id + '/member')
      .then(async function (response) {
        setmembers(response.data.members)
        console.log('IDD' + id)
      })
      .catch(async function (error) {
        console.log(error);
        console.log(error.code + 'ERROR CODE')
      });
  }

  return (

    <View style={{flex:1}}>
      {/* <Header style={{ backgroundColor: '#EDF2F4', height: hp('13%'), width: wp('100%'), borderEndColor: '#EDF2F4' }} />
      <Title style={{ fontSize: 22, fontWeight: 'bold', color: '#1F7A8C', marginTop: hp('-7%'), marginLeft: 10, marginBottom: hp('3%') }}>اعضای گروه</Title> */}
      <FlatList
        style={{ marginBottom: hp('5%') }}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          //          console.log('-----AKHAR LIST')
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
            {item.user.profile_photo != '/media/default.png' ? <Avatar.Image
            style={styles.avatar} size={75}
            source={{ uri: "http://e7ae29f4056b.ngrok.io" + item.user.profile_photo }}
            ></Avatar.Image> : <Avatar.Image size={70} style={{ alignSelf: 'flex-start', marginLeft: wp('5%'),marginTop:hp("2%") }}
              source={require('../../assets/avatar.png')}
            ></Avatar.Image>}
            <Text style={{ alignSelf: 'flex-start', marginLeft: wp('30%'), top: hp('-6%') }}>{item.user.username}</Text>
            <View
              style={{
                width: 320,
                color: '#a9a9a9',
                marginLeft: wp('5%'),
                marginTop: hp('2%'),
                borderBottomColor: '#a9a9a9',
                borderBottomWidth: 1
              }}
            />
          </View>
        </>
        }
      >
      </FlatList>
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
  avatar: {
    marginLeft:wp('5%')
  }
});

export default MembersPage;
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, ImageBackground, Image, FlatList , Alert , ActivityIndicator } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Card, List, ListItem, Thumbnail , Item, Input, Textarea } from 'native-base';
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
import {Formik,formik} from 'formik';
import * as yup from 'yup';
import { not } from 'react-native-reanimated';


const userschema=yup.object({

  Username:yup.string()
  .required(" موضوع بحث نمیتواند خالی باشد")
  .min(3, " موضوع بحث نمیتواند کم تر از 3 حرف باشد"),

  Discription:yup.string()
  .required("توضیحات بحث نمیتواند خالی باشد")

})

const GroupPage = (prop) => {
  const [refreshmembers, setrefreshmembers] = useState(false)
  const [refreshdiscussions, setrefreshdiscussions] = useState(false)
  const [loading1 , setloading1] = useState(true)
  const [loading2 , setloading2] = useState(true)
  const [loading3 , setloading3] = useState(true)
  const [picture, setpicture] = useState(null);
  const [username, setusername] = useState(null);
  const [groupinfo, setgroupinfo] = useState([]);
  const [owner, setowner] = useState("");
  const [join, setjoin] = useState(false);
  const [joinedUser, setjoinedUser] = useState("");
  const [notjoinedUser, setnotjoinedUser] = useState("");
  const [members, setmembers] = useState([]);
  const [groupphoto, setgroupphoto] = useState(null)
  const [reload, setreload] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [membernumber, setmembernumber] = useState();
  const [discussion, setdiscussion] = useState();

  useEffect(() =>{
    setjoinedUser(false)
    setowner(false)
    setnotjoinedUser(false)
    getUsername();
    getDiscussion(); 
}, [join]);

  useEffect((async) => { 
    const response = axiosinst.get('/group/' + prop.route.params.id+'/member')
      .then(async function (response) {    
        setmembers(response.data.members)
        
        for (let i = 0; i < membernumber; i++) {
          if (response.data.members[i].user.username === username && owner != "owner") {
            setjoinedUser("joinedUser")
            console.log('%%%%%%%%%%%%%%%%%%%joineduser')
          }
        }
        if (joinedUser != "joinedUser" && username != response.data.owner.username){
          setnotjoinedUser("notjoinedUser")
          console.log("###############notjoineduser")
        }
        setloading1(false)
      })
  } , [join , owner , joinedUser , notjoinedUser])




  useEffect((async) => {
        const response = axiosinst.get('/group/' + prop.route.params.id)
        .then(async function (response) {
          setloading2(false)
          await setgroupinfo(response.data);
          setmembernumber(groupinfo.members_count);
          setgroupphoto(`http://2e7bd654174c.ngrok.io${response.data.group_photo}`)
          console.log(groupphoto + '------')
          if (username === response.data.owner.username) {
            console.log('@@@@@@@@@@owner')
            await setowner("owner")
          }
        })
  },[join , owner , joinedUser , notjoinedUser])

  console.log('j' + joinedUser)
  console.log('n ' + notjoinedUser)
  console.log('o ' + owner)

  const getUsername = async () => {
    const id = await AsyncStorage.getItem('id');
    const response = axiosinst.get('/user/' + id)
      .then(function (response) {
        setusername(response.data.username)
      })
  };

  if (!groupinfo) {
    return null;
  }


  const JoinGroup = async () => {
    console.log(' OMAD TO JOIN GROUP')
    const back = {}
    const backk = JSON.stringify(back);
    axiosinst.post('/group/'+ prop.route.params.id +'/member', backk, {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
      }
    })
      .then(async function (response) {
        setjoin(true)
        getMembers()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const LeaveGroup = async () => {
    const id = await AsyncStorage.getItem('id');
    const back = {}
    const backk = JSON.stringify(back);
    axiosinst.delete('/group/' + prop.route.params.id+'/member/'+id, backk, {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
      }
    })
      .then(async function (response) {
        console.log('response' + response.data.message)
        getMembers()
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const deleteGroup = async () => {
    console.log('delete')
    axiosinst.delete('/group/' + prop.route.params.id, {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
      }
    })
      .then(async function (response) {
        prop.navigation.navigate('Groupmainpage')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const getDiscussion = async () => {

    axiosinst.get('/group/'+ prop.route.params.id +'/discussion', {
        "headers": {
        "content-type": "application/json",
        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
        }
        })
      .then(function(response){
          setdiscussion(response.data.discussions)
          setloading3(false)
      })
      
      .catch( async function (error) {
          console.log(error);
          console.log(error.code+'ERROR CODE')      
      });
  }

  if (loading1 === false && loading2 === false && loading3 === false) {
    return (
      <View style={styles.container}>
        <View>
                  <Modal transparent={true} StatusBar={{backgroundColor:'blue'}} style={{bottom:100,margin:20,position:'absolute'}} visible={modalVisible} animationType='fade' >
  
                  <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                <TouchableOpacity  style={{position:'absolute',alignSelf:'flex-end',top:hp('1%'),right:hp('1%'),height:hp('5%'),width:wp('8%'),backgroundColor:'white',position:'absolute'}} onPress={()=>setModalVisible(false)}>
                  <AntDesign style={{position:'absolute',alignSelf:'flex-end',top:hp('1%'),right:hp('1%')}} onPress={()=>setModalVisible(false)}
                   name="close" size={23} color="#D75A5A" />
                   </TouchableOpacity>       
               <Formik style={{borderStyle:'dashed',justifyContent:'space-around'}}
                initialValues={{Username:'',Discription:''}}
                validationSchema={userschema}  
        
                onSubmit={async(values,actions)=>{
                    console.log('ON SUBMIT')
                    const formdata = new FormData();
                     formdata.append('title',values.Username)
                     formdata.append('description',values.Discription)
          
                  console.log(formdata.data+'formdata')
          
                  const response=await axiosinst.post('/group/'+ prop.route.params.id +'/discussion',formdata,{
                    headers:{
                      "Content-Type":"application/json",
                      "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()}
                    }
                       )
                  .then( function(response){
                    console.log(picture+' PICTURE POST')
                  
                    console.log(response)
                    Alert.alert('','بحث با موفقیت ساخته شد ',[
                      {
                   text:'فهمیدم',style:'default',onPress:()=>console.log('alert closed')
                      }
                      ],{cancelable:false},{style:{height:50}})
        
                    getDiscussion();
                    
                  })
                  .catch( function(error){  
                      {
                        console.log(error)
                      
                        Alert.alert('','مشکلی پیش اومده اینترنتت رو چک کن ما هم سرورامون رو چک میکنیم',[{
                      
          
                      text:'فهمیدم',onPress:()=>console.log('alert closed'),style:'default'
                      }],{cancelable:false},{style:{height:50}})
                      }     
                  })
          
                }}
               >
                {(props)=>(
               <View style={{ marginTop:hp('5%')}}>
               <View style={{borderColor:'blue'}}>
              
               <Text style={{fontSize:hp('2.5%'),fontWeight:'bold', color:'#1f7a8c',marginBottom:hp('2%'),marginLeft:wp('1%') , marginTop:hp('-2%')}}>موضوع بحث</Text>
               <Item style={styles.item} rounded >
               
               <Input  style={styles.Input} autoCapitalize='words' autoCorrect={true}
                   onChangeText={props.handleChange('Username')}
                   onBlur={props.handleBlur('Username')}
                   value={props.values.Username}
                   placeholder={'موضوع بحث ...'} placeholderTextColor='gray' >
                   </Input>
                   <MaterialCommunityIcons name="account-group" size={hp('2.8%')} style={{left:wp('2%')}} color="#BFDBF7" />
                 
            <Text style={{fontSize:hp('1.2%'),marginLeft:wp('-3.5%'),marginTop:hp('7%'), color:'red'}}>{props.touched.Username&&props.errors.Username}</Text>
                </Item>
              
                </View>
               <View>
                  <Text style={{fontSize:hp('2.5%'),fontWeight:'bold', color:'#1f7a8c',marginBottom:hp('-5%'),marginTop:hp('5%'),marginLeft:wp('1%')}}>توضیحات</Text>
                  <TouchableOpacity>
                          <Textarea rowSpan={hp('1%')} bordered borderRadius={8}
                            borderColor={'lightgray'}
                            onChangeText={props.handleChange('Discription')}
                            onBlur={props.handleBlur('Discription')}
                            value={props.values.Discription}                 
                            placeholder={'توضیحات بحث ...'}  placeholderTextColor='gray' fontSize={hp('1.8%')}  style={styles.item2}>
                          </Textarea>
                          </TouchableOpacity>
                          <Text style={{fontSize:hp('1.2%'),marginTop:hp('0.5%'), color:'red'}}>{props.touched.Discription&&props.errors.Discription}</Text>
                        </View>     
                   <Button bordered rounded style={styles.button}
                 onPress={props.handleSubmit}
                 >
                   <Text style={{color:'#E1E5F2', fontSize:hp('1.8%'),fontWeight:'bold',left:wp('11%'),width:wp('40%')}}>ساخت بحث</Text>
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
          <View style={{ position: 'absolute', backgroundColor: 'white', height: 100, width: wp('100%'), marginTop: hp('30%'), borderTopStartRadius: 30, borderTopEndRadius: 30 }}>
  
          </View>
          {/* <View style={styles.view}> */}
          <View style={styles.backpic}>
  
          </View>
  
  
          {picture != 'http://1799ec2e488e.ngrok.io/media/default.png' ? <Avatar.Image style={styles.avatar} size={105}
            source={{ uri: groupphoto }}
          ></Avatar.Image> : <Avatar.Image style={styles.avatar} size={105}
            source={require('../../assets/group.jpg')}
          ></Avatar.Image>}
  
          <Text style={styles.groupname}>{groupinfo.title}</Text>
          <Text style={{ color: '#a9a9a9', marginLeft: wp('19'), marginTop: hp('1') }}>تعداد اعضا :{groupinfo.members_count}</Text>
  
          {joinedUser === "joinedUser" && notjoinedUser === false && owner === false ? 
          <Button style={{
            marginLeft: wp('60%'), width: 110, borderRadius: 15, marginTop: hp('-8%')
            , backgroundColor: '#1F7A8C'
          }} onPress={() => LeaveGroup()}>
            <Text style={{ marginLeft: wp('5.5%'), fontSize: 15, fontWeight: 'bold', color: 'white' }}>ترک گروه</Text>
          </Button> : null}
  
          {notjoinedUser === "notjoinedUser" ?
            <Button style={{
              marginLeft: wp('60%'), width: 110, borderRadius: 15, marginTop: hp('-8%')
              , backgroundColor: '#1F7A8C'
            }} onPress={() => JoinGroup()}>
              <Text style={{ marginLeft: wp('5.5%'), fontSize: 15, fontWeight: 'bold', color: 'white' }}> عضو شدن</Text>
            </Button> : null}
  
          {owner === "owner"  ? 
          <Button style={{
            marginLeft: wp('60%'), width: 110, borderRadius: 15, marginTop: hp('-8%')
            , backgroundColor: '#1F7A8C'
          }} onPress={() => deleteGroup()}>
            <Text style={{ marginLeft: wp('5.5%'), fontSize: 15, fontWeight: 'bold', color: 'white' }}>حذف گروه</Text>
          </Button> : null}
  
          {owner=== "" && joinedUser=== "" && notjoinedUser=== "" ?          
           <Button style={{
              marginLeft: wp('60%'), width: 110, borderRadius: 15, marginTop: hp('-8%')
              , backgroundColor: '#1F7A8C'
            }} onPress={() => JoinGroup()}>
              <Text style={{ marginLeft: wp('5.5%'), fontSize: 15, fontWeight: 'bold', color: 'white' }}> عضو شدن</Text>
            </Button> : null } 
  
          <Text style={{ fontSize: 21, marginLeft: wp('7%'), marginTop: hp('10%'), color: '#1F7A8C', fontWeight: 'bold' }}>درباره گروه :</Text>
  
          <Text style={{ textAlign: 'left', marginTop: hp('2'), marginLeft: wp('10%'), marginRight: wp('1%') }}>
            {groupinfo.summary}
          </Text>
  
          <Text style={{ fontSize: 20, marginTop: hp('3%'), marginLeft: wp('7%'), color: '#1F7A8C', fontWeight: 'bold' }}>بحث های انجام شده :</Text>
  
          {discussion.length === 0 ? 
          <Text style ={{marginLeft:wp('10%') , marginTop:hp('2%')}}>بحثی برای نمایش وحود ندارد...</Text> : null }
  
          <FlatList
            style={{ marginBottom: hp('5%') }}
            showsVerticalScrollIndicator={true}
            onEndReached={() => {
            console.log('-----AKHAR LIST')
            }}
            onEndReachedThreshold={0.5}
            keyExtractor={(item) => item.id}
            refreshing={refreshdiscussions}
            onRefresh={async () => {
            console.log('refresh')
            }}
            data={discussion}
            renderItem={({ item }) => <>
              <View style={{ maginLeft: wp('5%'), marginTop: hp('2%') }}>
                <Text style={{ alignSelf: 'flex-start', left: wp('5%') , fontSize: 18 }}>{item.title}</Text>
                <Text style={{color: '#a9a9a9' , marginLeft:wp('4%') , marginTop:hp('1%')}}>{item.description}</Text>
                <Button style={{ marginLeft: wp('80%') , marginTop:wp('-11%') }} transparent 
                  onPress={() => prop.navigation.navigate('ShowMembersPage')}>
                  <Text style={{ color: '#1F7A8C' }}>مشاهده</Text>
                </Button >
                <View
                      style={{
                        width:320,
                        marginLeft:wp('5%'),
                        marginTop:hp('2%'),
                        borderBottomColor: 'black',
                        borderBottomWidth: 1
                      }}
                      />
              </View>
            </>
            }
          >
          </FlatList>

          {notjoinedUser != "notjoinedUser" ?
            <Button onPress={() => setModalVisible(true)} style={{
              marginLeft: wp('21%'), width: 220, borderRadius: 20, marginTop: hp('3%')
                , backgroundColor: '#1F7A8C'
                }}>
              <Text style={{ marginLeft: wp('17%'), fontSize: 15, fontWeight: 'bold', color: 'white' }}>ایجاد بحث جدید</Text>
            </Button>
             : <Button onPress={() => Alert.alert('',' برای ایجاد یک بحث جدید باید عضو گروه باشید',[{          
              text:'فهمیدم',onPress:()=>console.log('alert closed'),style:'default'
              }],{cancelable:false},{style:{height:50}})} style={{
                marginLeft: wp('21%'), width: 220, borderRadius: 20, marginTop: hp('3%')
                  , backgroundColor: '#1F7A8C'
                  }}>
                 <Text style={{ marginLeft: wp('17%'), fontSize: 15, fontWeight: 'bold', color: 'white' }}>ایجاد بحث جدید</Text>
               </Button>}
  
  

  
          <Text style={{ fontSize: 20, marginTop: hp('2%'), marginLeft: wp('7%'), color: '#1F7A8C', fontWeight: 'bold' }}> اعضای گروه :</Text>
  
          <FlatList
            style={{ marginBottom: hp('5%') }}
            showsVerticalScrollIndicator={true}
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
                {picture != 'http://1799ec2e488e.ngrok.io/media/default.png' ? <Avatar.Image style={{marginLeft:wp('2%')}} size={90}
                  source={{ uri: item.user.profile_photo }}
                ></Avatar.Image> : <Avatar.Image style={styles.avatar} size={10}
                  source={require('../../assets/group.jpg')}
                ></Avatar.Image>}
                <Text style={{ alignSelf: 'flex-start', marginLeft: wp('10%'), marginTop:hp('1%') }}>{item.user.username}</Text>
                <View
                      style={{
                        width:320,
                        color: '#a9a9a9',
                        marginLeft:wp('5%'),
                        marginTop:hp('2%'),
                        borderBottomColor:'#a9a9a9',
                        borderBottomWidth: 1
                      }}
                      />
              </View>
            </>
            }
          >
          </FlatList>
  
          {/* {groupinfo.members_count>4 ?         
          <Button style={{ marginLeft: wp('90%') }} transparent 
          onPress={() => prop.navigation.navigate('ShowMembersPage')}>
           <Text style={{ color: '#1F7A8C' }}>بیشتر</Text>
         </Button > : null} */}

         <Button style={{ marginLeft: wp('90%') }} transparent 
          onPress={() => prop.navigation.navigate('ShowMembersPage' , {id : prop.route.params.id})}>
           <Text style={{ color: '#1F7A8C' }}>بیشتر</Text>
         </Button >
  
        </ScrollView>
  
      </View>
    );
  }
  else {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
  avatar: {
    elevation: 20,
    marginTop: hp('-10%'),
    marginLeft: wp('20%')

  },
  groupname: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: wp('19%'),
    marginTop: hp('3%'),
  },
  centeredView: {
    height:hp('40%'),
    marginTop:hp('15%'),
  },
  button:{
    marginTop:hp('1%'),
    alignSelf:'center',
    width:wp('41%'),
    backgroundColor:'#1f7a8c',
    borderColor:'#BFDBF7',
    borderRadius:50
    
  },
  modalView: {
    margin: 13,
    marginTop:20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    height:hp('65%'),
    elevation: 300
  },
  // avatar: {
  //   height: hp('14%'),
  //   marginTop:hp('-1.5%'),
  //   width: wp('28%'),
  //   marginLeft:wp('-1%'),
  //   borderRadius: 20,
  //   position:'absolute'
  // },
  loader:{
  alignItems:'center',
  marginBottom:hp('5%'),
  justifyContent:'center',
  alignSelf:'center',
  marginTop:hp('10%')
},
Input:{
  left:wp('8%'),
  fontSize:hp('1.5%'),
  fontWeight:'bold',
  marginRight:wp('10%'),
  position:'absolute',
  height:wp('9.5%'),
  width:wp('31.5%')
},
item2:{
  marginLeft:wp('-2%'),
  marginRight:wp('-1%'),
  marginTop:hp('6%'),
  fontSize:hp('2.5%')
},
item:{
  marginLeft:wp('-2%'),
  marginRight:wp('45%'),
  height:wp('9.5%') 
}
});
export default GroupPage;
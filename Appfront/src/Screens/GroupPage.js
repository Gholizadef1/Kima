import React,{useState , useEffect} from 'react';
import { StyleSheet, Text, View ,Modal,ImageBackground ,Image} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Card , List ,ListItem, Thumbnail } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import Eachgroup from './Eachgroup';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import { getIn } from 'formik';


const GroupPage = () => {

  const [picture,setpicture]=useState(null);
  const [userid, setuserid] = useState('');
  const [groupinfo,setgroupinfo]=useState(null);

  useEffect(() =>{
    getInfo()
},[])

  const getInfo = async()=>{
    axiosinst.get('/api/group/details/1', {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
      }
    })
    .then(function(response){
      console.log('response data : ', response.data)
      console.log(response.message)
      console.log('$$$$'+response.data.title)
      setgroupinfo(response.data)   
  }) 
    .catch( async function (error) {
      console.log(error);
      console.log(error.code+'ERROR CODE')      
    });
  }
  console.log('GROUPPP' +groupinfo.title)
  console.log('^^^^^^^' +groupinfo.members_count)

  // const PostJoin = async () => {

  //     axiosinst.post('/api/' +id, back, {
  //       "headers": {
  //         "content-type": "application/json",
  //         "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
  //       }
  //     })
  //       .then(async function (response) {
  //         console.log(response.data)
  //         getPicker();
  //       })
  //       .catch(function (error) {
  //         console.log(error);
          
          
  //       });

  // }

    return(
        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.kima}>کیما</Text>
        <Image

         source={require('../../assets/kiddy_book.jpg')}
         style={{width:wp('100%'),
         height:hp('35%'),
         position:'absolute',
        
       }}

         ></Image>
                  <View style={{position:'absolute',backgroundColor:'white',height:100,width:wp('100%'),marginTop:hp('30%'),borderTopStartRadius:30,borderTopEndRadius:30}}>

                    </View>
                    {/* <View style={styles.view}> */}
                    <View style={styles.backpic}>

                    </View>

                    {picture!='http://15cbf5742c3b.ngrok.io/media/default.png'?<Avatar.Image style={styles.avatar} size={105}
                      source={{uri:picture}}
                      ></Avatar.Image>: <Avatar.Image style={styles.avatar} size={105}
                      source={require('../../assets/avatar.png')}
                      ></Avatar.Image>}

                      <Text style={styles.groupname}>{groupinfo.title}</Text>
                      <Text style={{color:'#a9a9a9' , marginLeft:wp('19') , marginTop:hp('1')}}>تعداد اعضا :{groupinfo.members_count}</Text>

                      <Button style={{marginLeft:wp('60%') , width:110 , borderRadius:15 , marginTop:hp('-8%')
                      , backgroundColor:'#1F7A8C'}}>
                      <Text style={{marginLeft:wp('7.5%') , fontSize:15 , fontWeight:'bold' , color:'white'}}>عضو شدن</Text>
                    </Button>

                      <Text style={{fontSize:21 , marginLeft:wp('7%') , marginTop:hp('10%') ,color:'#1F7A8C' , fontWeight:'bold'}}>درباره گروه :</Text>

                      <Text style ={{textAlign:'left' ,marginTop:hp('2') , marginLeft:wp('6%') , marginRight:wp('1%')}}> 
                      {groupinfo.summary}
                      </Text>

                    <Text style ={{fontSize:20 , marginTop:hp('3%') , marginLeft:wp('7%'),color:'#1F7A8C' ,fontWeight:'bold'}}>بحث های انجام شده :</Text>

                    <List  style={{marginTop:'8%'}}>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail style={{borderRadius:6}} square source={require ('../../assets/girl.jpg')} />
                  </Left>
                  <Body style={{top:hp('0.5%') , marginLeft:wp('6%')}} >
                    <Text>بحث اول</Text>
                  </Body>
                  <Right style={{marginRight:wp('6%')}}>
                    <Button transparent >
                      <Text>مشاهده</Text>
                    </Button>
                  </Right>
                </ListItem>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail style={{borderRadius:6}} square source={require ('../../assets/index.jpg')} />
                  </Left>
                  <Body style={{top:hp('0.5%')}}>
                    <Text>بحث سوم</Text>
                  </Body>
                  <Right style={{marginRight:wp('6%')}}>
                    <Button transparent >
                      <Text>مشاهده</Text>
                    </Button>
                  </Right>
                </ListItem>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail square source={require ('../../assets/tea.jpg')} />
                  </Left>
                  <Body style={{top:hp('0.5%')}}>
                    <Text>بحث سوم </Text>
                  </Body>
                  <Right style={{marginRight:wp('6%')}}>
                    <Button transparent >
                      <Text>مشاهده</Text>
                    </Button>
                  </Right>
                </ListItem>
            
          </List>

          <Button style={{marginLeft:wp('21%') , width:220 , borderRadius:20 , marginTop:hp('3%')
                   , backgroundColor:'#1F7A8C'}}>
                      <Text style={{marginLeft:wp('17%') , fontSize:15 , fontWeight:'bold' , color:'white'}}>ایجاد بحث جدید</Text>
          </Button>

          <Text style ={{fontSize:20 , marginTop:hp('2%') , marginLeft:wp('7%'),color:'#1F7A8C' , fontWeight:'bold'}}> اعضای گروه :</Text>

          <List>
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
          </List>
          <Button style={{marginLeft:wp('90%')}} transparent>
            <Text style={{color:'#1F7A8C'}}>بیشتر</Text>
          </Button>

          <Button style={{marginLeft:wp('21%') , width:220 , borderRadius:20 , marginTop:hp('3%')
                   , backgroundColor:'#1F7A8C' , marginBottom:hp('2%')}}>
                      <Text style={{marginLeft:wp('25%') , fontSize:15 , fontWeight:'bold' , color:'white'}}>ترک گروه</Text>
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
    kima:{
        color:'#1F7A8C',
        marginTop:hp('8%'),
        marginLeft:wp('5%'),
        fontSize:20,
        fontWeight:'bold',
        position:'absolute'       
    },
    backpic:{
       
        width:wp('100%'),
        height:hp('32%')
    },
    avatar:{
      marginTop:hp('-10%'),
      marginLeft:wp('15%')
      
  },
  groupname : {
    fontSize:27 ,
    fontWeight:'bold',
    marginLeft:wp('19%') ,
    marginTop:hp('3%')
  }
  });
export default GroupPage;
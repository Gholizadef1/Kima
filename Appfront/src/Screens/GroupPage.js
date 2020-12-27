import React,{useState} from 'react';
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


const GroupPage = () => {

  const [picture,setpicture]=useState(null);

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

                      <Text style={styles.groupname}>نام گروه</Text>
                      <Text style={{color:'#a9a9a9' , marginLeft:wp('19') , marginTop:hp('1')}}>تعداد اعضا :20</Text>

                      <Button style={{marginLeft:wp('60%') , width:110 , borderRadius:15 , marginTop:hp('-20%')
                   , backgroundColor:'#1F7A8C'}}>
                      <Text style={{marginLeft:wp('7.5%') , fontSize:15 , fontWeight:'bold' , color:'white'}}>عضو شدن</Text>
                    </Button>

                      <Text style={{fontSize:21 , marginLeft:wp('7%') , marginTop:hp('15%') ,color:'#1F7A8C' , fontWeight:'bold'}}>درباره گروه :</Text>

                      <Text style ={{textAlign:'left' ,marginTop:hp('1') , marginLeft:wp('6%') , marginRight:wp('1%')}}> 
                      منیتتتتنتنیتتالاتنمنئدذرزبلاتنئدذرزبلاتدذرزذدئنومنتالبفغعهخمنئدذرزبلاتاین گروه درباره کتاب خوانی است
                      </Text>

                    <Text style ={{fontSize:20 , marginTop:hp('3%') , marginLeft:wp('7%'),color:'#1F7A8C' ,fontWeight:'bold'}}>بحث های انجام شده :</Text>

                    <List  style={{marginTop:'8%'}}>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail style={{borderRadius:10}} square source={require ('../../assets/girl.jpg')} />
                  </Left>
                  <Body>
                    <Text>بحث اول</Text>
                  </Body>
                  <Right>
                    <Button transparent >
                      <Text>مشاهده</Text>
                    </Button>
                  </Right>
                </ListItem>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail style={{borderRadius:10}} square source={require ('../../assets/index.jpg')} />
                  </Left>
                  <Body>
                    <Text>بحث سوم</Text>
                  </Body>
                  <Right>
                    <Button transparent >
                      <Text>مشاهده</Text>
                    </Button>
                  </Right>
                </ListItem>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail square source={require ('../../assets/tea.jpg')} />
                  </Left>
                  <Body>
                    <Text>بحث سوم </Text>
                  </Body>
                  <Right>
                    <Button transparent >
                      <Text>مشاهده</Text>
                    </Button>
                  </Right>
                </ListItem>
            
          </List>

          <Button style={{marginLeft:wp('17%') , width:220 , borderRadius:20 , marginTop:hp('2%')
                   , backgroundColor:'#1F7A8C'}}>
                      <Text style={{marginLeft:wp('17%') , fontSize:15 , fontWeight:'bold' , color:'white'}}>ایجاد بحث جدید</Text>
          </Button>

          <Text style ={{fontSize:20 , marginTop:hp('2%') , marginLeft:wp('7%'),color:'#1F7A8C'}}> اعضای گروه :</Text>

          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../../assets/sea.jpg')} />
              </Left>
              <Body>
                <Text>مرضیه</Text>
              </Body>
              <Right>
              </Right>
            </ListItem>
          </List>

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
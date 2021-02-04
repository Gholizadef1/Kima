import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Alert, ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Title, CardItem, Card } from 'native-base';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const Quotecard = (prop) => {
  const bookid=prop.bookid;
  const quoteid=prop.quoteid
  // const getlike=async()=>{
  //   const back2 = {
  
  //   }
  //     const backk2 = JSON.stringify(back2);
  //     console.log((await AsyncStorage.getItem('token')).toString())
  //     // await setTimeout(() => {  console.log("World!"); }, 5000);
  //       axiosinst.get('http://505a2dd8d5cc.ngrok.io/api/quotes/like/' + prop.quoteid , {
  //         "headers":
  //         {
  //           "Content-Type": "application/json",
  //           "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
  //         }
  //       })
  //         .then(async function (response) {
            
  //           console.log(response)
  //           // setnumlike(response.data.LikeCount)
  //           if (response.data.message === 'True')
  //           setheart('#1f7a8c')
  //         else
  //           setheart('lightblue')
  //         //   console.log(response);
  
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //           console.log('like error ||||||||||||')
  
  //         })
  // }
  
  // console.log(prop.IDD + 'PROP IDD')
  // console.log(prop.id + 'PROP ACCOUNT ID')
  // const[IDD,setIDD]=useState('');

  // const equal=async(item)=>{
  //   setIDD(await AsyncStorage.getItem('id').toString());
  //   console.log('useEFFECTQUOTECARD')
  //   console.log(IDD)
  // }

  const hieght = prop.height
  const [like, setlike] = useState('gray')
  const [numheart, setnumheart] = useState(prop.heartnumber);

  // const [dislike,setdislike]=useState('lightblue')
  const [heart, setheart] = useState('lightblue');
  // useEffect(()=>{
  //   getlike();
  // },[])
  useFocusEffect(
    React.useCallback(() => {
      if(prop.isliked)
      setheart('#1f7a8c')
      else
      setheart('lightblue')
      // getlike();
    }, [])

  )
  // useEffect(()=>{
  //    equal();
  //    console.log(prop.id+'propaccountid')
  //    console.log(prop.quoteid+'propquoteid')
  //    console.log(IDD);
  //   },[])
  // setdele(prop.delet)
  // console.log('quotecard')
  return (
    <View style={styles.container}>

      <Card style={{ marginLeft: wp('5%'), marginTop: hp('3%'), height: prop.height, marginRight: wp('5%'), borderRadius: 10, elevation: 4, backgroundColor: '#EDF2F4' }}>

        {prop.IDD.toString() === prop.id.toString() ? <AntDesign name="delete"
          size={hp('2.2%')} style={{ position: 'absolute', marginTop: hp('1.5%'), right: wp('3%') }}
          onPress={async () => {
            await Alert.alert(
              'از حذف این نقل قول اطمینان دارید؟',
              
              '',
              [
                {
                  text: 'انصراف',
                  onPress: () => console.log('Cancel Pressed'),
                  style:'default'
                },
                {
                  
                  text: 'حذف', onPress: async() => {
                    console.log(prop.lastinfo);
                    prop.INFO(quoteid)
                    console.log(prop.INFO)
                    console.log(prop.lastinfo);
                    // await setTimeout(() => {  console.log("World!"); }, 5000);
                    axiosinst.delete('book/'+bookid +"/quote/"+ quoteid, {
                      "headers":
                      {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
                      }
                    })
                      .then(async function (response) {
                        
                        console.log(response);
                        prop.INFO(quoteid);
                        await(prop.DELETE(true))
                     

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
          }}
          color="#e56b6f" /> : null}
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Text style={{
            // textAlignVertical:'center',
            // alignContent:'center',
            // alignItems:'center',

            color: 'black',
            //flexDirection:'row-reverse',
            //alignSelf:'center',
            // textAlign:'right',
            // alignSelf:'center',


            marginBottom: hp('6.5%'),
            marginTop: hp('3.5%'),
            marginHorizontal: hp('3%'),
            fontSize: hp('1.7%')
          }}>{prop.naghlghol}</Text>
        </View>
        <View style={{ position: 'absolute', marginTop: prop.height - hp('7.8%'), alignSelf: 'center' }}>
          <Text style={{ marginBottom: hp('0.9%'), alignSelf: 'center', color: 'gray' }}>{prop.name}</Text>
          <View style={{}}>


            <TouchableOpacity style={styles.avatar}
              onPress={() => { }}>

              <TouchableOpacity style={styles.avatar}
                onPress={() => { }}>
                {prop.picture === '/media/default.png' ? <ImageBackground borderRadius={100}

                  source={require('../../assets/avatar.png')}
                  style={styles.avatar}

                >

                </ImageBackground> : <ImageBackground borderRadius={100}

                  source={{ uri: prop.picture }}
                  style={styles.avatar}

                >

                  </ImageBackground>}
              </TouchableOpacity>
            </TouchableOpacity>
          </View>


        </View>
      </Card>
      <View style={{ marginBottom: hp('9%') }}>



        <AntDesign style={styles.heart} name="heart" onPress={async () => {
          //  console.log(item.account.id)
          // setSelectedIndex(item.id)
          if (like === 'gray')
            setlike('#1f7a8c')
          else
            setlike('gray')
        
          // console.log((await AsyncStorage.getItem('token')).toString());
          // alert(prop.quoteid)
          console.log((await AsyncStorage.getItem('token')).toString())
          console.log(quoteid + 'PROP QUOTE ID');
          // // console.log(item.account.id);
          const back={
                 
        
                }
                
              
            const backk=JSON.stringify(back);
            // await setTimeout(() => {  console.log("World!"); }, 5000);
            if(heart==='lightblue'){
          axiosinst.post('book/'+bookid +"/quote/"+ quoteid,backk, {
            params:{
              feedback:"like"
            },
            "headers":
            {
              "Content-Type": "application/json",
              "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
            }
          })
            .then(async function (response) {
              
              console.log(response);
              console.log(response.date)
              console.log(response.data.data+'.DATA .DATA')
           
              setheart('#1f7a8c')
             
              setnumheart(response.data.data)

            })
            .catch(function (error) {
              console.log(error);
              console.log('like error ||||||||||||')

            })
            }
            else{
              axiosinst.delete('book/'+bookid +"/quote/"+ quoteid, {
            params:{
              feedback:"like"
            },
            "headers":
            {
              "Content-Type": "application/json",
              "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
            }
          })
            .then(async function (response) {
              
              console.log(response);
              console.log(response.date)
              console.log(response.data.data+'.DATA .DATA')
            
              setheart('lightblue')
              setnumheart(response.data.data)

            })
            .catch(function (error) {
              console.log(error);
              console.log('like error ||||||||||||')

            })
            }
              
            
          //  getlike(item);


          //  response();
        }} size={20} color={heart} />
        <Text style={styles.heartnumber}>{numheart}</Text>
        <Text style={styles.date}>{prop.date}</Text>



      </View>

    </View>


  );
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#ffff',
    marginTop: hp('1%')
    //   alignItems: 'center',
    //   justifyContent: 'center',
  },
  avatar: {
    height: hp('7.8%'),
    width: hp('7.8%'),
    borderRadius: 100,
    alignSelf: 'center',
    position: 'absolute',
    shadowColor: 'black', shadowOpacity: 10,
    elevation: 3,




  },
  
  date: {
    position: 'absolute',
    top: '4%',
    left: '6%',
    fontSize: 12,
    color: 'gray'
  },
  avatarname: {
    marginHorizontal: 119, marginBottom: 50
  },
  heart: {
    position: 'absolute',
    right: wp('6.5%')

  },
  heartnumber: {
    position: 'absolute',
    right: wp('14%'),
    color:'gray',
    fontSize:hp('1.5%'),
   
  },
  naghlghol: {


    // textAlignVertical:'center',
    // alignContent:'center',
    // alignItems:'center',
    // textAlignVertical:
    marginHorizontal: wp('6%'),
    fontSize: 14,

  }

});
export default Quotecard;
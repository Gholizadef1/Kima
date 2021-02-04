import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, ImageBackground, Alert, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Item, Segment, Content, Input, Label, Textarea } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect } from '@react-navigation/native';
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
import { Formik, formik } from 'formik';
import * as yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { EvilIcons } from '@expo/vector-icons';
import Quizcard from "./Quizcard";
import { Octicons } from '@expo/vector-icons';
// import { TextInput } from 'react-native-paper';




const Myquizes = (prop) => {
  const [numberofgp, setnumberofgp] = useState(0);
  const [picture, setpicture] = useState({ uri: '../../assets/group.jpg', name: '', type: '' });
  const [inforamtionchange, setinfromationchange] = useState(false)

  const checkisowner = async (ID) => {
    console.log(ID + "akdfj;slkf;lksajf;lkaf;lkj;slakj;lksjaf;lkjsf;lkjsaf")
    const id = await (AsyncStorage.getItem('id'))
    if (id === ID) {
      return true;
    }
    else
      return false
  }
  const [selectedValue, setselectedValue] = useState('none')
  const [information, setinformation] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [likeotime, setlikeotime] = useState('time');
  const [theend, settheend] = useState(false);
  const [page, setpage] = useState(1);
  const [numberofpage, setnumberofpage] = useState(0);
  const [count, setcount] = useState(1);
  const [seeresult, setseeresult] = useState(false);
  const[owner,setowner]=useState();
  // let count=0;
  const response = async (page) => {

    // await setinformation(null)
    await (console.log(await (AsyncStorage.getItem('token'))))

    await setpage(page);
    console.log(page + ' PAGEEEEEEEEEEEEEEEEPAGEEEEEEEEEE')

    await settheend(false)
    console.log(theend + '  THE END RESOPONSE AVAL')
    if (page === 1) {
      await settheend(false)
      await setinformation([])
      console.log(information + 'BAYAN KHALI BASHEEEEEEEEEE')
      console.log('----------------------PGAE 11111111---------------')

    }
    console.log('DOVOM')
    console.log(page + 'PAGEeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
    console.log('ALAIK ALIAKDALFKJASFKJAKSFKLJSFH')
    try {
      console.log('  omad to response')
      console.log('api/group' + likeotime)

      const id = await (AsyncStorage.getItem('id'))
      console.log(id + "idf;lkadf;kjf;lkjf")
      const response = await axiosinst.get("user/" + id + "/quiz", {
        params: {
          page: page
        },
        "headers":
        {
          "Content-Type": "application/json",
          "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
        }

      })
      console.log(numberofgp / 10 + 'number of group ////////10')
      console.log(numberofgp + '   !!!!!!!!!  ' + numberofgp)
      console.log(JSON.stringify(response.data.Quiz)+"  response.data.quiz")
      console.log(page + 'PAGEeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeWWWW')
      console.log(response.data + 'RESPONSE.DATA')
      console.log(response.data.Quiz + 'RESPONSE.DATA.GROUPS')
      await setcount(response.data.count);
      console.log(count + '  COUNT')
      console.log(page + ' PAGE BAD COUNT')
      console.log((page === count) + ' PAGE===COUNT')
      if(response.data.Quiz===[]){
        await settheend(true)
        await setrefresh(false)
         console.log('#########')
         await setinformation(undefined);
         }
      settheend(false)
      //console.log('omade inja')
      console.log('++++INFOGHABLESET++++' + information + "++++INFOGHABLESET++++")
     // console.log(response.data.groups)
      //console.log(response.data.Quiz.lenght+" lenght")
      if (response.data.Quiz!="Array[]") {
        await setinformation(information => [...information, ...response.data.Quiz])
        //wait page===1?setinformation(response.data.groups):setinformation(information=>[...information,...response.data.groups])
      }
      else {
        await setinformation(undefined);
        console.log(" KHALIIIII;KAJF;LKJ;LKJ")
      }
      setrefresh(false)
      // console.log(response.data.groups.id+'  INFORMATION.ID')

      console.log('++++INFO++++' + information + "++++INFO++++")

    }
    // }
    //  }
    catch (err) {
      Alert.alert('', 'مشکلی پیش اومده اینترنتت رو چک کن ما هم سرورامون رو چک میکنیم', [{


        text: 'فهمیدم', onPress: () => console.log('alert closed'), style: 'default'
      }], { cancelable: false }, { style: { height: 50 } })

      console.log(err.response + '   error response')
      setrefresh(false)
      console.log(err.toString().split('\n')[0])
      if (err.toString().split('\n')[0].toString() === 'Error: Request failed with status code 404')
        settheend(true);
      console.log(theend + 'THE END')
      console.log(err);

    }

  }
  const handleLoadMore = async () => {
    console.log('END OF THE LIST')
    //  if(page<numberofgp/10+1){
    if (page < count) {
      if (theend === false)
        response(page + 1);
    }
    else {
      settheend(true)
    }

  };

  useFocusEffect(
    React.useCallback(() => {
      const a = new Promise(async (resolve, reject) => {
        await setinformation([]);
        await setpage(1);
        //await setselecttime(true)
        //با این ظاهرا درست شد :/
        await setselectedValue('like')
        //تاثیری نداشتن :/
        // await setlikelable('فیلتر بر اساس تعداد پسند ها ')
        // await settimelable("فیلتر بر اساس تاریخ")
        if (selectedValue === "none")
          await setlikeotime("time");
        else
          await setlikeotime("like");
        await setselectedValue('none')

        resolve()
      }).then(() => {
        console.log('++++++++++' + information + '**********')
        response(1);
        console.log('++++++++++' + information + '**********')
      })
    }, [prop.navigation]))
  return (



    <View style={styles.container}>
      <View style={{ marginLeft: wp('2%') }}>

        {/* <View style={{height:hp('2%')}}></View> */}

        {/* {(information != undefined) ? */}
         <FlatList
          ListFooterComponent={(theend === false ? <View style={styles.loader}><ActivityIndicator animating color={'gray'} size={"large"}></ActivityIndicator></View> :
            <View style={styles.loader}><Text style={{ color: 'gray', alignSelf: 'center', marginBottom: hp('3%') }}>کوییز دیگری وجود ندارد</Text></View>)}
          style={{ marginBottom: hp('-2%') }}
          showsVerticalScrollIndicator={false}
          onEndReached={() => handleLoadMore()}
          onEndReachedThreshold={0}
          keyExtractor={(item) => item.id}
          refreshing={refresh}
          onRefresh={async () => {
            //await setinformation()
            await setrefresh(true)
            response(1)
          }}

          data={information}
          onEndReachedThreshold={0.5}

          renderItem={({ item }) => {

            return (<>
              

              <TouchableOpacity
                activeOpacity={0}
                style={{ backgroundColor: 'white', marginBottom: 0 }}
                onPress={async () => {
                  if (seeresult === true) {

                    prop.navigation.navigate("کوییز ها")
                  }
                }
                }>
                <Quizcard quizphoto={item.quiz_photo} seeresul={setseeresult} membernumber={item.question_count} discription={item.description} creator={item.creator} title={item.title} ></Quizcard>
                {/* :null} */}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  const userid=await AsyncStorage.getItem("id")
                 
                  console.log(userid+" user iddfak;ljdf;lskjf;")
                  await console.log(item.creator.id+" item idakfdj;klaskjl;sfkl;jakjl;fskl;jasfdkjlasfk;jldd;lkj")
                  console.log((item.creator.id-userid)===0+" a;dlfj;lskajdf;lkjsadf;lkjadf;lkjsf")
                  if((item.creator.id-userid===0))
                  {
                    prop.navigation.navigate("quizresult",{id:item.id,ownerr:true,title:item.title})
                  }
                  else{
                    prop.navigation.navigate("quizresult",{id:item.id,ownerr:false,title:item.title})
                  }
                  // if(owner!=undefined){
                
                  // }
                  // await prop.seeresul(true);
                  // setTimeout(() => prop.seeresul(false), 2000)
                }}
                style={{ backgroundColor: "#B7E4C7",position:"absolute", height: hp("4.5%"), bottom: hp("11.8%"), marginTop: hp("0%"), width: wp("18%"), borderRadius: 50, left: wp("68.5%"), marginBottom: hp("0%"), alignSelf: "flex-end" }}
              >
                <Text style={{ fontSize: hp("1.5.5%"), color: "#1f7a8c", fontWeight: "bold", alignSelf: "center", marginTop: hp("1.1%") }}>پاسخ ها</Text>
              </TouchableOpacity>
            </>
            )
          }}

        >
        </FlatList>
         {/* : <Text style={{ color: 'gray', alignSelf: 'center', marginTop: hp('30%'), fontWeight: 'bold' }}>اولین کوییز خود را بسازید</Text>} */}
        {/* : <Text style={{ color: 'gray', alignSelf: 'center', marginTop: hp('30%'), fontWeight: 'bold' }}>نقل قولی وجود ندارد</Text>} */}
        {/* <View style={{height:hp('10%'),width:wp('14%'),borderRadius:1000}} >
        <Button style={{justifyContent:'center',height:hp('7%'),width:wp('14%'),borderRadius:1000,
        backgroundColor:'#1f7a8c',elevation:5,marginTop:hp('77%'),marginLeft:wp('78%')}} onPress={()=>{
          console.log('PLUS PRESSED')
           prop.navigation.navigate("createnewquiz")
          }} >
        <Feather style={styles.plus} 
         name="plus" size={32} color="#EDF2F4" />
     
         </Button>
         </View> */}
        <View style={{ height: hp('10%'), width: wp('14%'), borderRadius: 1000, position: 'absolute' }} >
          <Button style={{
            justifyContent: 'center', height: hp('7%'), width: wp('14%'), borderRadius: 1000,
            backgroundColor: '#1f7a8c', elevation: 5, marginTop: hp('77%'), marginLeft: wp('78%')
          }} onPress={() => {
            console.log('PLUS PRESSED')
            prop.navigation.navigate("createnewquiz")
          }} >
            <Feather style={styles.plus}
              name="plus" size={32} color="#EDF2F4" />

          </Button>
        </View>
      </View>
      {/* <View style={{marginBottom:hp("-5%")}}></View> */}

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
  item2: {
    marginLeft: wp('-2%'),
    marginRight: wp('-1%'),
    marginTop: hp('6%'),
    fontSize: hp('2.5%'),

  },
  item: {
    marginLeft: wp('31%'),
    marginRight: wp('5%'),
    // marginTop:hp('1%'),
    height: wp('9.5%')

  },
  Input: {

    left: wp('8%'),
    fontSize: hp('1.5%'),
    fontWeight: 'bold',
    marginRight: wp('10%'),
    // marginTop:hp('1%'),
    position: 'absolute',
    height: wp('9.5%'),
    //  backgroundColor:'green',
    width: wp('31.5%')
  },
  button: {
    marginTop: hp('3%'),
    alignSelf: 'center',
    width: wp('41%'),
    backgroundColor: '#1f7a8c',
    borderColor: '#BFDBF7',
    // marginLeft:wp('18%'),
    borderRadius: 50

  },
  plus: {
    alignSelf: 'center',
    justifyContent: 'center'

  },
  centeredView: {
    height: hp('40%'),
    marginTop: hp('15%'),
  },
  avatar: {
    height: hp('14%'),
    marginTop: hp('-1.5%'),
    width: wp('28%'),
    marginLeft: wp('-1%'),
    borderRadius: 20,
    position: 'absolute'
  },
  loader: {
    alignItems: 'center',
    marginBottom: hp('5%'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('10%')
  }
});
export default Myquizes;
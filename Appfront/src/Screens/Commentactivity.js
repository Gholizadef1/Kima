import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import Commentcard from './Commentcard';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { Container, Header, Title, Form, Item, Input, Button, Icon, CheckBox, Body, ActionSheet, Textarea, Content } from 'native-base';
import { TextInput } from 'react-native-paper';
import { Formik, formik } from 'formik';
import * as yup from 'yup';
import { useFocusEffect } from '@react-navigation/native';
import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';

const Commentactivity = (prop) => {
  const [selectedValue, setselectedValue] = useState('none')
  console.log('COMMENT')
  const callbackFunction = async (childData) => {
    if (childData === true) {
      console.log('TRUE')
      await response(1)
     
    }
  }
 
  const [refresh, setrefresh] = useState(false);
  const [count,setcount]=useState(1);
  const [IDD, setIDD] = useState('');
  const equal = async (item) => {
    setIDD(await AsyncStorage.getItem('id').toString());
  }
  const [closed, setclosed] = useState(false);
  const [information, setinformation] = useState([]);
  const[selecttime,setselecttime]=useState(true)
  const [likeotime, setlikeotime] = useState('time');
  const [timelable,settimelable]=useState('فیلتر بر اساس تاریخ')
  const [likelable,setlikelable]=useState('فیلتر بر اساس تعداد پسند ها')
  const [theend, settheend] = useState(false)
  const [delet, setdelet] = useState(false)
  const [page, setpage] = useState(1);

  console.log('AVAL')
  const response = async(page) => {
    console.log('PAGEEEE'+ page)
    console.log('DOVOM')
    await setpage(page)
    console.log('PAGEEEE'+ page)
    if (page === 1) {
      console.log('PAGE 111')
      await settheend(false)
      await setinformation([])

      console.log('IT IS HEAR SET INFO []')
      console.log(information)

    }
    // await settheend(false)
    // await setinformation([])
    //const id = prop.route.params.id
   // console.log(id)
    console.log(await (await AsyncStorage.getItem('token')).toString())
    console.log(await (await AsyncStorage.getItem('id')).toString())

    try {
      // await setTimeout(() => {  console.log("World!"); }, 5000);
      setIDD(await (await AsyncStorage.getItem('id')).toString())
      const response = await axiosinst.get("user/" +await AsyncStorage.getItem('id')+'/comment' , {
        params: {
          filter:likeotime,
          page: page
        },
        "headers":
        {
          "Content-Type": "application/json",
          "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
        }

      })
      console.log(count+'  count   dfajd;lfkjs;lkfj')
       console.log(response.data.comments)
      await setcount(response.data.count);
      //console.log(response)
      console.log(count+' COUNT COUNT COUNT COUNT COUTN')
      console.log(response.data.count+' COUNTTTTTTTTTTTT')
      if (response.data.detail === 'Invalid page.')
        settheend(true);
      else {
        settheend(false)
        console.log(IDD + 'IDDresponse');
        //  console.log(response.data)
         console.log('++++INFO++++' + information + "++++INFO++++"+'11111')
        // console.log(information)
         console.log('RESPONSE DATE')
         //console.log(response.date)
         console.log(response.data.comments+' RESPONSE DATA COMMENTS')
         //page===1?setinformation(response.data):setinformation(information.concat(response.data))
         if(response.data.message!="No Comment!"){
          await setinformation(information=>[...information,...response.data.comments])
          }
          else{
            setinformation(undefined)
          }
       
        console.log('++++INFO++++' + information + "++++INFO++++"+'22222')
        //console.log(information)
        setrefresh(false)
         //     setloading(false);
      }
      //  console.log(information[0])
    }
    catch (err) {
      setrefresh(false)
      console.log(err.toString().split('\n')[0])
      if (err.toString().split('\n')[0].toString() === 'Error: Request failed with status code 404')
        settheend(true);
      console.log(theend + 'THE ENDDD')
      console.log(err);

    }
  }
  useFocusEffect(
    React.useCallback(() => {
      const a=new Promise(async(resolve,reject)=>{
        await setinformation([]);
        await setpage(1);
        await setselecttime(true)
        //با این ظاهرا درست شد :/
        //await setselectedValue('like')
        //تاثیری نداشتن :/
        // await setlikelable('فیلتر بر اساس تعداد پسند ها ')
        // await settimelable("فیلتر بر اساس تاریخ")
      //   if(selectedValue==="none")
      //  await setlikeotime("time");
      //  else
      //  await setlikeotime("like");
      //  await setselectedValue('none')

        resolve()
      }).then(()=>{
      console.log('++++++++++' + information + '**********')
      response(1);
      console.log('++++++++++' + information + '**********')
      })
    
    }, [prop.navigation,delet])

  )
  const handleLoadMore = async() => {
    console.log('END OF THE LIST')
    if(page<count){
      console.log(page+'PAGEDEEFFDHASKDFJLSKFH')
      console.log(count+'C OUNT ASKDFJ;LKSFJ')
     if(theend===false)
     response(page+1);
    }
    else{
      settheend(true)
    }
    };
  const [showbutton, setshowbutton] = useState(true);
  //console.log(prop.route.params.title+' TILTE BOOK TO HEADER COMMENTT')
  const [reset, setreset] = useState(false);
  const bs = React.createRef()
  const fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
     
      <Animated.View style={{

        opacity: Animated.add(0.5, Animated.multiply(fall, 1.0)),
      }}>
      { (information!=undefined) ? <FlatList
          style={{ marginBottom: '0%' }}
          removeClippedSubviews={true} 
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          data={information}
          refreshing={refresh}
          onEndReached={() => handleLoadMore()}
          onEndReachedThreshold={0.7}
          ListFooterComponent={(theend === false ? <View style={styles.loader}><ActivityIndicator animating color={'gray'} size={"large"}></ActivityIndicator></View> :
           <View style={styles.loader}><Text style={{ color: 'gray', alignSelf: 'center' }}>نظر دیگری وجود ندارد</Text></View>)}
          // style={{ bottom: hp('5.5%') }}
          onRefresh={async () => {
            await setrefresh(true)

            response(1);

          }}
          renderItem={({ item }) => (<Commentcard name={item.current_book.title}
            isitactivity={false}
            pictureborder={8}
             picutrehieght={90}
             picturewidth={60}
             commentmargintop={hp("5.5%")}
            avatar={styles.avatar}

            isliked={item.isliked}
            isdisliked={item.isdisliked}
            date={item.sendtime.toString().split('T')[0]} bookid={item.current_book.id} accountid={item.account.id}
             dislikenumber={item.DislikeCount} fromcommentactivity={true} kdelete={delet} DELETE={setdelet} commentid={item.id} IDD={IDD} likenumber={item.LikeCount} 
            picture={`${item.current_book.imgurl}`} likedisable={true} comment={item.comment_text} ></Commentcard>)}
        >

        </FlatList>:<Text style={{color:'gray',alignSelf:'center',marginTop:hp('40%'),fontWeight:'bold'}}> اولین نظر خود را ثبت کنید</Text>}


      </Animated.View>
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#B8B8B8',
    backgroundColor: '#ffff',
   // marginTop: 2
  },
  nazar: {
    marginLeft: '33%',
    fontWeight: 'bold',
    color: '#EDF2F4'
  },
  loader: {

    alignItems: 'center',
    marginBottom: hp('5%'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('10%')
  },
  avatar: {
    height: hp("5%"),
    width: wp("3%"),
    borderRadius: 20,
    position: 'absolute'

  },
});
export default Commentactivity;

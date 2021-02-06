import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ImageBackground, Alert, ActivityIndicator, Keyboard } from 'react-native';
import { RotationGestureHandler, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Quotecrad from './Quotecard';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated, { set } from 'react-native-reanimated';
import { Container, Header, Title, Form, Item, Input, Button, Icon, CheckBox, Body, ActionSheet, Textarea, Content, Fab } from 'native-base';
import * as yup from 'yup';
import { Formik, formik } from 'formik';
import { useFocusEffect } from '@react-navigation/native';
import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { FAB } from 'react-native-paper';
import { getPendingResultAsync } from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';



const commentschema = yup.object({

  comment: yup.string()
    .required("نقل قول شما نمیتواند خالی باشد")
    .max(500, "متن نوشته شده برای اشتراک طولانی تر از حد مجاز است")
  // .test('line',"متن نوشته شده برای اشتراک طولانی تر از حد مجاز است",(val=>(val.toString().split().length<=500)))
})


const Quote = (prop) => {
console.log(selectedValue+"selected Value")
  const callbackFunction = async (childData) => {
    if (childData === true) {
      // await setrefresh(childData)
      // console.log('TRUE')
      // await response(1)
  
      // if(finfo===true)
      // await setfinfo(false);
      // else
      // await setfinfo(true);
    }
    // console.log(refresh)
    //  await setrefresh(childData)
    //  console.log(yup.refresh)
    //  if(refresh===true)
    //  await response(1);
  }

  // const getlike=async(item)=>{
  //   // await setTimeout(() => {  console.log("World!"); }, 5000);
  //   axiosinst.get('http://505a2dd8d5cc.ngrok.io/api/quotes/like/'+item.id,{"headers":
  //   {
  //    "Content-Type":"application/json",
  //    "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()
  //   }})
  //  .then(async function(response){

  //       console.log(response);
  //       if(response.data.message==='true'){setlike('#1F7A8C')}else{setlike('gray')}
  //    })
  //  .catch(function(error){
  //  console.log(error);

  //   })
  // }
  const handleLoadMore = async () => {
    console.log('END OF THE LIST')
    if (page < count) {
      if (theend === false)
        response(page + 1);
    }
    else {
      settheend(true)
    }
  };
  const [theend, settheend] = useState(false)
  const [count, setcount] = useState(1);
  const [likeotime, setlikeotime] = useState('time');
  const [selectedValue, setselectedValue] = useState('none')
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const [liked, setliked] = useState(false);
  
  const [like, setlike] = useState('gray')
  const [close, setclose] = useState(false);
  const [information, setinformation] = useState([]);
  const [IDD, setIDD] = useState('');
  const [delet, setdelet] = useState(false)
  const [finfo, setfinfo] = useState(true)
  const [refresh, setrefresh] = useState(false);
  const [forrefresh, setforrefresh] = useState(false);
  const [com,setcom]=useState(true);
  const maxnumber = 500;
  const [numcolor, setnumcolor] = useState('green');
  const [currentnumber, setcurrentnumber] = useState(0);
  const[selecttime,setselecttime]=useState("none")
  const equal = async (item) => {

    setIDD(await AsyncStorage.getItem('id').toString());

  }
  const changecolor = (val) => {
    console.log("adfksahf")
    if (val < 50) {
      return ("green")
    }
    else if (val >= 50 && val <= 400) {
      console.log("adfksahflkjshflkjhafslkjhsalkjfhlkasjhfdlkjhaslkfjhsalkfjhlskjfhdlkjsahf")
      // setnumcolor('#2a9d8f')
      return ('#2a9d8f')
    }
    // else if (val >= 300 && val <= 350) {
    //   return ("#3ECCBB")
    // }
    // else if (val >= 350 && val < 400) {
    //   return ("#BFEEE8")
    // }
    else if (val > 400 && val <= 420) {
      return ("#F7BC8D")
    }
    else if (val > 420 && val <= 440) {
      return ("#F0852D")
    }
    else if (val > 440 && val <= 480) {
      return ("#EB886F")
    }
    else {
      return ("red")
    }

  }
  const response = async (page) => {
    //توی پست کردن توی باتم شیت انگار مهمه که بگم ریسپانس چه صفحه ای توی اینکه کجا کوت جدید بیاد
    await setpage(page)
    if (page === 1) {
      console.log('PAGE 111')
      await settheend(false)
      await setinformation([])
      console.log(information + 'BAYAN KHALI BASHEEEEEEEEEE')

      console.log('IT IS HEAR SET INFO []')
      // console.log(information)

    }

    console.log('DOVOM')
    const id = prop.route.params.id
    console.log(id)
    console.log(page + 'PAGE')
    var a=""
    if(selecttime==="none")
    a="time";
    else
    a="like"
    try {
      setIDD(await (await AsyncStorage.getItem('id')).toString())
      const response = await axiosinst.get('book/' + id + "/quote", {
        params: {
          filter: a,
          page: page
        },
        "headers":
        {
          "Content-Type": "application/json",
          "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
        }
      })
      await setcount(response.data.count);
      setrefresh(false)
      if (response.data.detail === 'Invalid page.')
        settheend(true);
      else {
        settheend(false)
        //  console.log(IDD+'IDDresponse');
        //  console.log(response.data)
        //page===1?setinformation(response.data.quotes):setinformation(information.concat(response.data.quotes))
        if (response.data.message != "No Quote!") {
          await setinformation(information => [...information, ...response.data.quotes])
        }
        else {
          setinformation(undefined)
        }
        console.log('++++INFO++++' + information + "++++INFO++++")

        //     setloading(false);
      }
      //  console.log(information[0])
    }
    catch (err) {
      setrefresh(false)
      console.log(err.toString().split('\n')[0])
      if (err.toString().split('\n')[0].toString() === 'Error: Request failed with status code 404')
        settheend(true);
      // else if(theend===true)
      // settheend(false)
      console.log(theend + 'THE END')
      console.log(err);

    }

  }

  useFocusEffect(
    React.useCallback(() => {
      const a=new Promise(async(resolve,reject)=>{
        await setinformation([]);
        await setpage(1);
        await settheend(false);
        console.log("toye use focus effectt ")
        if(selecttime==="none"){
          setlikeotime("time")
        }
        else{
          setlikeotime("like")
        }
        //await setselecttime(true)
        //با این ظاهرا درست شد :/
      //   await setselectedValue('like')
      //   //تاثیری نداشتن :/
      //   // await setlikelable('فیلتر بر اساس تعداد پسند ها ')
      //   // await settimelable("فیلتر بر اساس تاریخ")
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
      // //   console.log('Listenn')
      // alert('in')
      //   return() => alert('lost')
    }, [prop.navigation,selecttime,delet,com])

  )
  const renderInner = () => {
    return (
      // console.log('inner');
      <View style={{ backgroundColor: '#EDF2F4' }}>


        <Formik style={{}}
          initialValues={{ comment: '' }}
          validationSchema={commentschema}
          onSubmit={async (values, actions) => {

            console.log('sumbit')
            const back = {
              textquote: values.comment,

            }

            console.log((await AsyncStorage.getItem('token')).toString())
            const backk = JSON.stringify(back);
            const params = JSON.stringify({ username: 'Hi' });
            // await setTimeout(() => {  console.log("World!"); }, 5000);
            axiosinst.post('book/' + prop.route.params.id + "/quote", backk, {
              "headers":
              {
                "Content-Type": "application/json",
                "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
              }
            })
              .then(async function (response) {
                console.log(response);

                // await bs.current.snapTo(1)

                // await Keyboard.dismiss();

                setclose(true);
                actions.resetForm();

              })
              .catch(function (error) {
                console.log(error);

              })

          }}
        >
          {(props) => (
            <View>


              <View style={{ marginHorizontal: wp('7%'), borderColor: 'red', marginTop: hp('1%') }}>
                <Textarea rowSpan={7.5} bordered borderRadius={8}
                  onChangeText={props.handleChange('comment')}
                  onBlur={props.handleBlur('comment')}
                  value={props.values.comment}
                  onChangeItem={
                    //setnumcolor("orange")
                    //() => {
                    // console.log("adfksahflkjshflkjhafslkjhsalkjfhlkasjhfdlkjhaslkfjhsalkfjhlskjfhdlkjsahf")
                    // if (val >= 50 && val < 300) {
                    //   console.log("adfksahflkjshflkjhafslkjhsalkjfhlkasjhfdlkjhaslkfjhsalkfjhlskjfhdlkjsahf")
                    //   setnumcolor('#2a9d8f')
                    // }
                    // else { }
                    // }
                    changecolor(props.values.comment.length, setnumcolor)
                    // function changecolor(props.values.comment.length){

                    // console.log("adfksahf")
                    // if (val >= 50 && val < 300) {
                    //   console.log("adfksahflkjshflkjhafslkjhsalkjfhlkasjhfdlkjhaslkfjhsalkfjhlskjfhdlkjsahf")
                    //   setnumcolor('#2a9d8f')
                    // }
                    // changecolor();

                    // changecolor(props.values.comment.length)

                  }
                  placeholder={'  نقل قول شما ...    '} placeholderTextColor='lightgray' fontSize={hp('1.8%')} style={{ backgroundColor: 'white' }}>

                </Textarea>
              </View>


              <Text style={{ fontSize: wp('2%'), color: 'red', marginLeft: ('10%') }}>{props.touched.comment && props.errors.comment}</Text>
              <Text style={{ position: 'absolute', marginTop: hp('26.5%'), marginLeft: wp('10%'), color: changecolor(props.values.comment.length) }}><Text>{props.values.comment.length}</Text>/{maxnumber}</Text>
              <View style={{ flexDirection: 'row', width: '100%', marginRight: wp('3%'), marginLeft: wp('3%') }}>




                <Button bordered rounded style={{ backgroundColor: '#1F7A8C', borderRadius: 18, height: hp('4%'), width: wp('40%'), marginLeft: wp('28%'), marginBottom: hp('2%') }}
                  onPress={props.handleSubmit}
                >
                  <Text style={{ color: '#ffff', fontSize: 15, fontWeight: 'bold', marginLeft: wp('32%'), width: '100%' }}>ثبت</Text>
                </Button>

              </View>
            </View>

          )}

        </Formik>
      </View>
    )
  }


  const bs = React.createRef()
  const fall = new Animated.Value(1);
  const [showbutton, setshowbutton] = useState(true);
  const renderHeader = () => {
    console.log('header')
    return (
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} >
          <View style={{backgroundColor:"lightgray",width:wp("25%"),height:hp("0.5%"),marginBottom:hp("0%"),borderRadius:100,alignSelf:"center"}}>

</View>
            {/* <View style={{borderRadius:100}}> */}
            {/* <ImageBackground borderRadius={100}
              source={require('../../assets/line5.png')}
              style={{ width: wp('21%'), height: hp('0.3%'), alignSelf: 'center', borderRadius: 100 }}
            ></ImageBackground> */}
            {/* </View> */}
            <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: '#1f7a8c', marginTop: hp('1.3%'), marginBottom: hp('1.3%'), fontSize: wp('4%') }}>نقل قول شما چیست؟</Text>
          </View>
        </View>
      </View>

    )
  }
  return (

    <View style={styles.container}>

      <BottomSheet style={{ position: '' }}

        snapPoints={[hp('40%'), 0, 0]}
        ref={bs}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false}
        onCloseEnd={() => {
        if(com===true){
          setcom(false)
        }
        else{
          setcom(true)
        }
          setshowbutton(true)
          // response(1)
          // if(theend===true)

          // response(page-1)
        }}
        renderContent={renderInner}
        renderHeader={renderHeader}
        backgroundColor={'#edf2f4'}

      />

      <Animated.View style={{

        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
      }}>
        {(information != undefined) ? <DropDownPicker
          items={[
            { label: 'فیلتر بر اساس تاریخ', value: 'none' },
            { label: 'فیلتر بر اساس تعداد پسند ها', value: 'like' },
          ]}
          defaultValue={selectedValue}
          containerStyle={{ height: 40, width: wp('50%'), marginBottom: hp('4%') }}
          style={{

            borderColor: '#1f7a8c', backgroundColor: '#fafafa', marginTop: hp('2%'), width: wp('50%'),
            marginBottom: hp('-5%'), position: 'absolute', borderTopLeftRadius: 30, borderTopRightRadius: 30,
            borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginLeft: wp('5%')
          }}
          itemStyle={{

            justifyContent: 'flex-start'
          }}
          dropDownStyle={{
            backgroundColor: '#fafafa',
            borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginTop: hp('2%'), marginLeft: wp('5%'),
            width: wp('50%'), position: 'absolute', marginBottom: hp('10%')
          }}
          onChangeItem={async (item) => {

            if (item.value === 'none') {
              console.log(item.value + 'VALUE')
              console.log('to none')
              await setlikeotime('time')
              await setselecttime('none');

            }
            else if (item.value === 'like') {
              console.log('tolike')
              console.log(item.value + 'VALUE')
              await setlikeotime('like')
              await setselecttime('like');

            }



          }}

        /> : null}
        {(information != undefined) ?

          <FlatList
            //  ListHeaderComponent={ <DropDownPicker
            //       items={[
            //         { label: 'فیلتر بر اساس تاریخ', value: 'none' },
            //         { label: 'فیلتر بر اساس تعداد پسند ها', value: 'like' },
            //       ]}
            //       defaultValue={selectedValue}
            //       containerStyle={{ height: 40, width: 220, marginBottom: hp('4%') }}
            //       style={{

            //         borderColor:'#1f7a8c',backgroundColor: '#fafafa', marginTop: hp('2.7%'), width: wp('45%'), marginBottom:-300, position: 'absolute', borderTopLeftRadius: 17, borderTopRightRadius: 17,
            //         borderBottomLeftRadius: 17, borderBottomRightRadius: 17, marginLeft: wp('5%')
            //       }}
            //       itemStyle={{

            //         justifyContent: 'flex-start'
            //       }}
            //       dropDownStyle={{ backgroundColor: '#fafafa', marginLeft: wp('5%'), width: wp('45%'), position: 'absolute', marginBottom: hp('10%') }}
            //       onChangeItem={async (item) => {

            //         if (item.value === 'none') {
            //           console.log(item.value + 'VALUE')
            //           console.log('to none')
            //           await setlikeotime('time')
            //           response(1)

            //         }
            //         else if (item.value === 'like') {
            //           console.log('tolike')
            //           console.log(item.value + 'VALUE')
            //           await setlikeotime('like')
            //           response(1)

            //         }



            //       }}

            //     />}
            ListFooterComponent={(theend === false ? <View style={styles.loader}><ActivityIndicator animating color={'gray'} size={"large"}></ActivityIndicator></View> : <View style={styles.loader}><Text style={{ color: 'gray', alignSelf: 'center' }}>نقل قول دیگری وجود ندارد</Text></View>)}
            style={{ marginBottom: hp('18%') }}
            showsVerticalScrollIndicator={false}
            onEndReached={() => handleLoadMore()}
            onEndReachedThreshold={0}
            keyExtractor={(item) => item.id}
            refreshing={refresh}
            onRefresh={async () => {
              await setrefresh(true)

              response(1)

            }}

            data={information}
            onEndReachedThreshold={0.5}

            renderItem={({ item }) => (<><Quotecrad name={item.account.username}
              isliked={item.isliked}
              date={item.sendtime.toString().split('T')[0]} lastinfo={finfo} selectt={selecttime} bookid={prop.route.params.id} heartnumber={item.Likes} DELETE={setdelet} RESPONSE={response} page={setpage} INFO={setfinfo} IDD={IDD} quoteid={item.id} id={item.account.id} height={hp('42.5%')}
              picture={`${item.account.profile_photo}`} naghlghol={item.quote_text} ></Quotecrad>



            </>
            )}
          // extraData={finfo}
          >
          </FlatList> : <Text style={{ color: 'gray', alignSelf: 'center', marginTop: hp('30%'), fontWeight: 'bold' }}>برای این کتاب نقل قولی وجود ندارد</Text>}
      </Animated.View>

      {showbutton ? <Button style={styles.addcomment}
        onPress={() => {
          setshowbutton(false)
          bs.current.snapTo(0)
        }}
      >

        <Text style={styles.nazar}>نقل قول شما چیست؟</Text>

      </Button>
        : null}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {


    flex: 1,
    // backgroundColor: '#B8B8B8',
    backgroundColor: '#ffff',
    marginTop: hp('0%')
  },
  nazar: {
    marginLeft: wp('20%'),
    fontWeight: 'bold',
    color: '#EDF2F4'
  },
  header: {
    backgroundColor: '#EDF2F4',
    shadowColor: 'black',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 20,
    shadowOpacity: 0.5,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopColor: 'black',
    borderTopRightRadius: 20,
  },
  panelHeader: {
    borderTopColor: 'black',

  },
  addcomment: {

    width: wp('70%'),
    marginHorizontal: '15%',
    marginTop: hp('80.1%'),
    position: 'absolute',
    borderRadius: 17,
    backgroundColor: '#1F7A8C'
  },
  heart: {
    position: 'absolute',
    marginTop: hp('47.5%'),
    right: wp('6.5%')

  },
  heartnumber: {
    position: 'absolute',
    marginTop: hp('47.6%'),
    left: wp('85%'),
    fontSize: hp('1.5%'),
    color: 'gray'
  },

  loader: {

    alignItems: 'center',
    marginBottom: hp('5%'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('10%')
  }

});
export default Quote;
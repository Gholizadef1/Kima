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


const commentschema = yup.object({

  comment: yup.string()
    .required("نظر شما نمیتواند خالی باشد")
})


const Comment = (prop) => {
  const [selectedValue, setselectedValue] = useState('none')
  console.log('COMMENT')
  const callbackFunction = async (childData) => {
    if (childData === true) {
      // await setrefresh(childData)
      console.log('TRUE')
      await response(1)
      // if(finfo===true)
      // await setfinfo(false);
      // else
      // await setfinfo(true);
    }
  }
  const [delet, setdelet] = useState(false)
  const [refresh, setrefresh] = useState(false);
  const [count,setcount]=useState(1);
  const [IDD, setIDD] = useState('');
  const equal = async (item) => {

    setIDD(await AsyncStorage.getItem('id').toString());

  }
  const [closed, setclosed] = useState(false);
  const [information, setinformation] = useState([]);
  const [likeotime, setlikeotime] = useState('/time');
  const [theend, settheend] = useState(false)
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
    const id = prop.route.params.id
    console.log(id)
    console.log(await (await AsyncStorage.getItem('token')).toString())
    console.log(await (await AsyncStorage.getItem('id')).toString())

    try {
      // await setTimeout(() => {  console.log("World!"); }, 5000);
      setIDD(await (await AsyncStorage.getItem('id')).toString())
      const response = await axiosinst.get("book/" + prop.route.params.id+'/comment' , {
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
         await setinformation(information=>[...information,...response.data])
        console.log('++++INFO++++' + information + "++++INFO++++"+'22222')
        //console.log(information)
        setrefresh(false)
         //     setloading(false);
      }
      //  console.log(information[0])
    }
    catch (err) {

      // else if(theend===true)
      // settheend(false)
      setrefresh(false)
      console.log(err.toString().split('\n')[0])
      if (err.toString().split('\n')[0].toString() === 'Error: Request failed with status code 404')
        settheend(true);
      // else if(theend===true)
      // settheend(false)
      console.log(theend + 'THE ENDDD')
      console.log(err);

    }
  }
  useFocusEffect(
    React.useCallback(() => {

      console.log('++++++++++' + information + '**********')
      response(1);
      console.log('++++++++++' + information + '**********')
      // //   console.log('Listenn')
      // alert('in')
      //   return() => alert('lost')
    }, [])

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
  console.log(prop.route.params.title+' TILTE BOOK TO HEADER COMMENTT')
  const [reset, setreset] = useState(false);
  const bs = React.createRef()
  const fall = new Animated.Value(1);
  const renderHeader = () => {
    console.log('header')
    return (
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} >
            <Image
              source={require('../../assets/line3.png')}
              style={{ width: 100, height: 4, marginLeft: 155 }}
            ></Image>
            <Text style={{ marginLeft: '36%', fontWeight: 'bold', color: '#1f7a8c', marginTop: '3%', fontSize: 16 }}>نظر شما چیست؟</Text>
          </View>
        </View>
      </View>



    )
  }
  const renderInner = () => {
    return (
      // console.log('inner');
      <View style={{ backgroundColor: '#EDF2F4' }}>

        <Formik style={{}}
          initialValues={{ comment: '' }}
          validationSchema={commentschema}
          onSubmit={async (values, actions) => {
            console.log(await AsyncStorage.getItem('token'));
            actions.resetForm();
            console.log('sumbit')
            const back = {
              textcomment: values.comment,

            }
            const backk = JSON.stringify(back);

            axiosinst.post("book/" + prop.route.params.id + '/comment', backk, {
              "headers":
              {
                "Content-Type": "application/json",
                "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
              }
            })
              .then(async function (response) {
                // console.log(response);

              })
              .catch(function (error) {
                console.log(error);

              })

            const params = JSON.stringify({ username: 'Hi' });

          }}
        >
          {(props) => (
            <View>


              <View style={{ marginHorizontal: 30, borderColor: 'red', marginTop: 10 }}>
                <Textarea rowSpan={7.5} bordered borderRadius={8}
                  onChangeText={props.handleChange('comment')}
                  onBlur={props.handleBlur('comment')}
                  value={props.values.comment}
                  placeholder={'  نظر شما ...    '} placeholderTextColor='black' fontSize={16} style={{ backgroundColor: 'white' }}>

                </Textarea>
              </View>


              <Text style={{ fontSize: 10, color: 'red', marginLeft: '10%' }}>{props.touched.comment && props.errors.comment}</Text>

              <View style={{ flexDirection: 'row', width: '100%', marginRight: 20, marginLeft: 10 }}>




                <Button bordered rounded style={{ backgroundColor: '#1F7A8C', borderRadius: 18, height: '50%', width: '40%',
                 marginLeft: '28%', marginBottom: '8%', marginTop: '0.5%' }}
                  onPress={props.handleSubmit}
                >
                  <Text style={{ color: '#ffff', fontSize: 15, fontWeight: 'bold', marginLeft: '85%', width: '100%' }}>ثبت</Text>
                </Button>

              </View>

            </View>


          )}

        </Formik>


      </View>
    )
  }
  return (
    <View style={styles.container}>
      <BottomSheet style={{ position: '' }}

        snapPoints={['40%', 0, 0]}
        ref={bs}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false}
        onCloseEnd={() => {
          setshowbutton(true)
          // if(closed===true)
          // setclosed(false)
          // else
          // setclosed(true)
          response(1)

        }}
        //  isBackDropDismisByPress={true}
        renderContent={renderInner}
        renderHeader={renderHeader}
        // style={{position:'absolute',height:200,width:250,marginTop:400}}
        backgroundColor={'#edf2f4'}

      />
      <Animated.View style={{

        opacity: Animated.add(0.5, Animated.multiply(fall, 1.0)),
      }}>
      { (information!=undefined) ?    <DropDownPicker
          items={[
            { label: 'فیلتر بر اساس تاریخ', value: 'none' },
            { label: 'فیلتر بر اساس تعداد پسند ها', value: 'like' },
          ]}
          defaultValue={selectedValue}
          containerStyle={{ height: 40, width: 220, marginBottom: hp('2%') }}
          style={{
            backgroundColor: '#fafafa', marginTop: hp('1%'), width: 220, marginBottom: hp('-3%'), position: 'absolute', borderTopLeftRadius: 17, borderTopRightRadius: 17,
            borderBottomLeftRadius: 17, borderBottomRightRadius: 17, marginLeft: wp('1%')
          }}
          itemStyle={{
            justifyContent: 'flex-start'
          }}
          dropDownStyle={{ backgroundColor: '#fafafa', marginLeft: wp('1%'), width: 220, position: 'absolute', marginBottom: hp('10%') }}
          onChangeItem={async (item) => {

            if (item.value === 'none') {
              console.log(item.value + 'VALUE')
              console.log('to none')
              await setlikeotime('/time')
              // await response(1);
              // try {
              //   setIDD(await(await AsyncStorage.getItem('id')).toString())
              //   const response = await axiosinst.get("bookdetail/" + prop.route.params.id + '/like')
              //   console.log(response.data)

              //   setrefresh(false)
              //   setinformation(response.data)
              //   console.log(information[0])
              //   console.log('FILETER LIKE')
              // }
              // catch (err) {
              //   setrefresh(false)
              //   console.log(err);

              // }
            }
            else if (item.value === 'like') {
              console.log('tolike')
              console.log(item.value + 'VALUE')
              await setlikeotime('/like')
              // await response(1);
              // try {
              //   setIDD(await(await AsyncStorage.getItem('id')).toString())
              //   const response = await axiosinst.get("bookdetail/" + prop.route.params.id + '/time')
              //   console.log(response.data)
              //   console.log('FILTER TIME')
              //   setrefresh(false)
              //   setinformation(response.data)
              //   console.log(information[0])
              // }
              // catch (err) {
              //   setrefresh(false)
              //   console.log(err);

              // }
            }



          }}

        />:null}
         { (information!=undefined) ? <FlatList
          style={{ marginBottom: '17%' }}
          removeClippedSubviews={true} 
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          data={information}
          refreshing={refresh}
          onEndReached={() => handleLoadMore()}
          onEndReachedThreshold={0.7}
          ListFooterComponent={(theend === false ? <View style={styles.loader}><ActivityIndicator animating color={'gray'} size={"large"}></ActivityIndicator></View> :
           <View style={styles.loader}><Text style={{ color: 'gray', alignSelf: 'center' }}>نظر دیگری وجود ندارد</Text></View>)}
          style={{ marginBottom: hp('15.5%') }}
          onRefresh={async () => {
            await setrefresh(true)

            response(1);

          }}
          renderItem={({ item }) => (<Commentcard name={item.account.username}
            isliked={item.isliked}
            isdisliked={item.isdisliked}
            date={item.sendtime.toString().split('T')[0]} bookid={prop.route.params.id} accountid={item.account.id} dislikenumber={item.DislikeCount} DELETE={callbackFunction} commentid={item.id} IDD={IDD} likenumber={item.LikeCount} 
            picture={`${item.account.profile_photo}`} comment={item.comment_text} ></Commentcard>)}
        >

        </FlatList>:<Text style={{color:'gray',alignSelf:'center',marginTop:hp('40%'),fontWeight:'bold'}}>برای این کتاب نظری وجود ندارد</Text>}


        {/* <View style={{position:'absolute',marginTop:'160%',width:'100%'}}></View> */}

      </Animated.View>

      {/* <View style={{ width:wp('70%'),
    marginHorizontal:'15%',
    marginTop:hp('80.1%'),
    position:'absolute',
    borderRadius:17,
    backgroundColor:'white'}}> */}
      {showbutton ? <Button style={styles.addcomment}
        onPress={() => {
          setshowbutton(false)
          bs.current.snapTo(0)
        }}
      >

        <Text style={styles.nazar}>نظر شما چیست؟</Text>

      </Button>
        : null}
      {/* // </View> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#B8B8B8',
    backgroundColor: '#ffff',
    marginTop: 2
  },
  addcomment: {

    width: wp('70%'),
    marginHorizontal: '15%',
    marginTop: hp('80.1%'),
    position: 'absolute',
    borderRadius: 17,
    backgroundColor: '#1F7A8C'
  },
  nazar: {
    marginLeft: '33%',
    fontWeight: 'bold',
    color: '#EDF2F4'
  },
  panel: {
    padding: 20,
    backgroundColor: '#edf2f4',
    paddingTop: 20,
    shadowColor: 'black',
    borderTopColor: 'black',
    shadowOpacity: 0.5,

  },
  header: {
    backgroundColor: '#EDF2F4',
    shadowColor: 'black',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 20,
    shadowOpacity: 0.5,
    // elevation: 5
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopColor: 'black',
    borderTopRightRadius: 20,
  },
  panelHeader: {
    borderTopColor: 'black',

  },
  loader: {

    alignItems: 'center',
    marginBottom: hp('5%'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('10%')
  }
});
export default Comment;
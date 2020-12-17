import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ImageBackground, Alert, ActivityIndicator, Keyboard } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Activityquotecard from './Activityquotecard';
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
import { FAB } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';





const Activityquote = (prop) => {

    const callbackFunction = async (childData) => {
        if (childData === true) {
            // await setrefresh(childData)
            console.log('TRUE')
            await response(1)

        }
    }

    const getlike = async (item) => {
        axiosinst.get('http://a6cf0ecdd61a.ngrok.io/api/quotes/like/' + item.id, {
            "headers":
            {
                "Content-Type": "application/json",
                "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
            }
        })
            .then(async function (response) {
                console.log(response);
                if (response.data.message === 'true') { setlike('#1F7A8C') } else { setlike('gray') }
            })
            .catch(function (error) {
                console.log(error);

            })
    }
    const handleLoadMore = async () => {
        console.log('END OF THE LIST')
        if (theend === false)
            response(page + 1);
    };
    const [theend, settheend] = useState(false)
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
    const equal = async (item) => {

        setIDD(await AsyncStorage.getItem('id').toString());

    }

    const response = async (page) => {

            const id=await(AsyncStorage.getItem('id'))
            console.log(id)
                 try{
                 const response = await axiosinst.get('api/user-profile/' + id+'/MyQuotes')
                 if(response.data+'RESPONSE'==='RESPONSE'){
                 console.log('quote nadare')
                 setinformation()
                 }
                 else{
                 console.log(response+'RESPONSE')
                 console.log(response.data+'RESPONSE.DATA')
                  setrefresh(false)
                  if(response.data.detail==='Invalid page.')
                  settheend(true);
                  else{
                    settheend(false)
                     console.log(IDD+'IDDresponse');
                      //  console.log(response.data)
                    setinformation(response.data)
                      console.log('++++INFO++++'+information+"++++INFO++++")

                  //     setloading(false);
                     }
                    }
                    //  console.log(information[0])
                     }
                    
                   catch(err){
                     setrefresh(false)
                     console.log(err.toString().split('\n')[0])
                    if(err.toString().split('\n')[0].toString()==='Error: Request failed with status code 404')
                    settheend(true);
                    // else if(theend===true)
                    // settheend(false)
                    console.log(theend+'THE END')
                      console.log(err);

                   }




                //توی پست کردن توی باتم شیت انگار مهمه که بگم ریسپانس چه صفحه ای توی اینکه کجا کوت جدید بیاد
                //     await setpage(page)
                //     if(page===1){
                //       console.log('PAGE 111')
                //     await settheend(false)
                //     await setinformation([])

                //     console.log('IT IS HEAR SET INFO []')
                //     console.log(information)

                //     }

                //     console.log('DOVOM')
                //      const id=prop.route.params.id
                //      console.log(id) 
                //      console.log(page+'PAGE')
                //      try{
                //       setIDD(await (await AsyncStorage.getItem('id')).toString())
                //      const response = await axiosinst.get('api/quotes/'+id,{ params:{
                //      page:page
                //      }
                //   })
                //   setrefresh(false)
                //   if(response.data.detail==='Invalid page.')
                //   settheend(true);
                //   else{
                //     settheend(false)
                //      console.log(IDD+'IDDresponse');
                //       //  console.log(response.data)
                //       page===1?setinformation(response.data):setinformation(information.concat(response.data))
                //       console.log('++++INFO++++'+information+"++++INFO++++")

                //   //     setloading(false);
                //      }
                //     //  console.log(information[0])
                //      }
                //    catch(err){
                //      setrefresh(false)
                //      console.log(err.toString().split('\n')[0])
                //     if(err.toString().split('\n')[0].toString()==='Error: Request failed with status code 404')
                //     settheend(true);
                //     // else if(theend===true)
                //     // settheend(false)
                //     console.log(theend+'THE END')
                //       console.log(err);

                //    }

            }

    useFocusEffect(
                React.useCallback(() => {
                    // setpage(1);
                    // setloading(false)
                    // settheend(false);

                    // getlike()

                    response(1)
                    console.log(IDD + 'IDD');

                }, []))
        const [showbutton, setshowbutton] = useState(true);

        return (


            <View style={styles.container}>

                <DropDownPicker
                    items={[
                        { label: 'مرتب شده بر اساس:', value: 'none' },
                        { label: 'جدیدترین ها', value: 'history' },
                        { label: 'بیشترین پسند ها', value: 'like' },
                    ]}
                    defaultValue={'none'}
                    containerStyle={{ height: 40 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={(item) => console.log(item.value)}
                />


                <View>
                   {!information===[]? <FlatList
                        ListFooterComponent={(theend === false ? <View style={styles.loader}><ActivityIndicator animating color={'gray'} size={"large"}></ActivityIndicator></View> : <View style={styles.loader}><Text style={{ color: 'gray', alignSelf: 'center' }}>نقل قول دیگری وجود ندارد</Text></View>)}
                        style={{ marginBottom: '17%' }}
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

                        renderItem={({ item }) => (<><Activityquotecard name={item.account.username}

                            date={item.sendtime.toString().split('T')[0]} lastinfo={finfo} DELETE={callbackFunction} RESPONSE={response} page={setpage} INFO={setfinfo} IDD={IDD} quoteid={item.id} id={item.account.id} height={hp('42.5%')} picture={`http://1c53ec0001dc.ngrok.io${item.account.profile_photo}`} naghlghol={item.quote_text} ></Activityquotecard>

                            <Text style={styles.heartnumber}>{item.Likes}</Text>

                        </>
                        )}
                    // extraData={finfo}
                    >
                    </FlatList>:<Text >نقل قولی ندارید</Text>}
                </View>


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
    export default Activityquote;
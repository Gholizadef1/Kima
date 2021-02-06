import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, FlatList, ActivityIndicator, TextPropTypes, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, SearchBar, Spinner } from 'native-base';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { useFocusEffect } from '@react-navigation/native';
// import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons'; 
// import { SearchBar } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Eachgroup from './Eachgroup';
import axiosinst from '../api/axiosinst'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import { number } from 'yup';
import { set } from 'react-native-reanimated';
import Createquiz from "./Createquiz";
import { ImageBackground } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import { Dimensions } from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { StackActions } from '@react-navigation/native';
// import { Button } from 'react-native-paper';

const Quizpage = (prop) => {

    console.log(prop.route.params.id)
    //     useEffect(async()=>{
    //         try{
    //            await setquestions( axiosinst.get('quiz/1'))
    //                  //setquestions(response);
    //                  console.log(questions+"    QUESTIONS");  
    //                  setthisquestion(questions.Questions[0])
    //            }    
    //            catch(err){

    //                console.log(err)
    //                Alert.alert('','مشکلی پیش اومده اینترنتت رو چک کن ما هم سرورامون رو چک میکنیم',[{


    //                 text:'فهمیدم',onPress:()=>console.log('alert closed'),style:'default'
    //                 }],{cancelable:false},{style:{height:50}})
    //                 }              
    // },[])


    // {
    //     Quiz: {
    //         id: 15,
    //         title: " ;slakfj",
    //         description: "راجب یه برنامه ایه که توش  ین نتی ن بمشکیتب مکتنیب ن تبنت نیتبک شنیتب نم بنتیب ن تب نیتثخت بحخه وی ضهقخهردشنکاعثب که خکهضابد نحخضه خه خهع خ میتونی بری بایه kima پروژه",
    //         creator: {
    //             username: "setaysehm",
    //             profile_photo: "/media/profile",
    //             email: "setayeshm@ss.com",
    //             id: 2
    //         },
    //         quiz_photo: "/media/default.png",
    //         create_time: "2021-01-29"
    //     },
    //     Questions: [
    //         {
    //             question_num: 2,
    //             question_text: "در کتاب فلان صفحه ی فلان بی تو مهتاب شبی باز از آن کوچه گذشتم؟",
    //             a_text: "نگذشتم",
    //             b_text: "آری بی تو مهتاب شبی باز از آن کوچه گذشتم",
    //             c_text: "خانه ی دوست کجاست در فلق بود",
    //             d_text: "که پرسیدش سوار خونش کجاست",
    //             dey: "a"
    //         },
    //         {
    //             question_num: 2,
    //             question_text: "سوال دو اینه که ...?",
    //             a_text: "جواب اول سوال دو",
    //             b_text: "جواب دوم سوال د و اینه که ",
    //             c_text: "third",
    //             d_text: "جوب آخر سوال شنبکتی",
    //             dey: "a"
    //         }
    //     ]
    // }
    // const getquiz=async()=>{
    //         try {
    //             const response =axiosinst.get('quiz/' + prop.route.params.id)
    //            console.log(response+" RESPONSE")
    //             await setquestions(response.data)
    //             await console.log(questions+" QUESTIONSS")
    //        }
    //         catch {
    //             console.log(err)
    //             Alert.alert('', 'مشکلی پیش اومده ', [{


    //                 text: 'فهمیدم', onPress: () => console.log('alert closed'), style: 'default'
    //             }], { cancelable: false }, { style: { height: 50 } })


    //        }
    // }
    const [questions, setquestions] = useState(undefined);
    const getquiz = (async () => {
        try {
            const response = await axiosinst.get('quiz/' + prop.route.params.id)
            console.log(response.data.Quiz.quiz_photo.toString()+"  THISSSS THISSS");
            if (response.data.Quiz.quiz_photo.toString().split(":")[0] === "http") {
                setphotoo(response.data.Quiz.quiz_photo)
            }
            else {
                setphotoo("http://e7e864967156.ngrok.io" + response.data.Quiz.quiz_photo)
            }
            //console.log(JSON.stringify( response.data)+" RESPONSE")
            //console.log(response.data+"      response.data")
            //  console.log(JSON.stringify(response)+"    response")
            // await setquestions(response.data)
            setquestions(response.data)
            await console.log(questions + " QUESTIONSS")

            // if(questions!=undefined){
            //     setthisquestion(questions.Questions[0])
            // }
        }
        catch (err) {
            console.log(err)
            Alert.alert('', 'مشکلی پیش اومده لطفا دوباره امتحان کن ', [{


                text: 'فهمیدم', onPress: () => console.log('alert closed'), style: 'default'
            }], { cancelable: false }, { style: { height: 50 } })


        }
    })

    const postquiz = async () => {
        console.log("here")
        console.log(JSON.stringify(answers))
        const back = {
            user_answer: answers
        }
        console.log(back);
        const response = await axiosinst.post('quiz/' + prop.route.params.id, JSON.stringify(back), {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
            }
        }
        )
            .then(async function (response) {
                const popAction = StackActions.pop(1);

                await prop.navigation.dispatch(popAction);
                await prop.navigation.navigate("quizresult", { id: prop.route.params.id, title: questions.Quiz.title, ownerr: false })
                console.log(response)
                Alert.alert('', 'جواب شما با موفقیت ثبت شد ', [
                    {
                        text: 'فهمیدم', style: 'default', onPress: () => console.log('alert closed')
                    }
                ], { cancelable: false }, { style: { height: 50 } })


            })
            .catch(function (error) {
                {
                    console.log(error)

                    Alert.alert('', 'مشکلی پیش اومده لطفا دوباره امتحان کن', [{


                        text: 'فهمیدم', onPress: () => console.log('alert closed'), style: 'default'
                    }], { cancelable: false }, { style: { height: 50 } })
                }
            })

    }
    const [numofquesiton, setnumofquestion] = useState(-1);
    const [answers, setanswers] = useState([""]);
    const [thisquestion, setthisquestion] = useState()
    const [buttoncolor, setbuttoncolor] = useState("rgba(40,160,184,1)")
    const [cansubmit, setcansubmit] = useState("سوال بعدی")
    const [seedisc, setseedis] = useState("سوال قبلی")
    const [oneofthem, setoneofthem] = useState("")
    const [answersc, setannswersc] = useState(['rgba(237,242,244,0.9)', "rgba(237,242,244,0.9)",
        "rgba(237,242,244,0.9)", "rgba(237,242,244,0.9)"])
    const [colora, setcolora] = useState("rgba(237,242,244,0.9)")
    const [colorb, setcolorb] = useState("rgba(237,242,244,0.9)")
    const [colorc, setcolorc] = useState("rgba(237,242,244,0.9)")
    const [colord, setcolord] = useState("rgba(237,242,244,0.9)")
    const [photoo, setphotoo] = useState(undefined);
    // useFocusEffect(
    //     React.useCallback(() => {   

    useEffect(() => {

        console.log(photoo + "photoo")

        getquiz();
    }, [prop.navigation])
    // const a = new Promise(async (resolve, reject) => {
    //     try {
    //         const response = await axiosinst.get('quiz/' + prop.route.params.id)
    //         console.log(response.data + " RESPONSE")
    //         await setquestions(response.data)
    //         await console.log(questions + " QUESTIONSS")
    //     }
    //     catch {
    //         console.log(err)
    //         Alert.alert('', 'مشکلی پیش اومده ', [{


    //             text: 'فهمیدم', onPress: () => console.log('alert closed'), style: 'default'
    //         }], { cancelable: false }, { style: { height: 50 } })


    //     }

    // }).then()


    return (<View style={styles.container}>
        <ImageBackground style={{ flex: 1 }} source={require("../../assets/fantezi4.jpg")}>
            {questions != undefined ? (<ScrollView>
                <View style={{ marginBottom: hp("17%") }}>
                    <>
                        {numofquesiton > -1 ? <Text style={{ position: "absolute", alignSelf: "center", fontSize: hp("1.9%"), color: "#1f7a8c", fontWeight: "bold", marginTop: hp("3.5%") }}>({numofquesiton + 1}/{questions.Quiz.question_count})</Text> : null}
                        {numofquesiton > -1 ? <ProgressBar style={{ top: hp("7%"), marginHorizontal: wp("0%"), borderRadius: 20, height: hp("1%"), elevation: 3 }} progress={(numofquesiton + 1) / questions.Quiz.question_count} color={"#1f7a8c"} /> : null}

                        {numofquesiton > -1 ? <Text style={{
                            color: "black", fontSize: hp("2%"), fontWeight: "bold", alignSelf: "center", width: wp("86%"), marginTop: hp("15%"), elevation: 5,
                            //  textShadowOffset: { width: 1, height: 1 },
                            // textShadowRadius: 10,
                            // textShadowColor: 'gray',
                            marginRight: wp("1%")
                        }}>{thisquestion.question_text}</Text> : null}


                        {numofquesiton > -1 ?
                            <View style={{ marginTop: hp("8%") }}>
                                <TouchableOpacity
                                    onPress={async () => {
                                        await new Promise(async () => {
                                            if (colora === "rgba(237,242,244,0.9)") {
                                                //var a = answersc;
                                                //const b = parseInt(oneofthem.numberofq)
                                                //a[0] = "rgba(40,160,184,1)"
                                                await setannswersc(["rgba(40,160,184,1)", "rgba(237,242,244,0.9)", "rgba(237,242,244,0.9)", "rgba(237,242,244,0.9)"])
                                                await setcolora("rgba(40,160,184,1)")
                                                await setoneofthem("a")
                                                console.log(colora + " rangi")
                                            }

                                            // if (oneofthem.key != "") {
                                            var a = answersc;

                                            const b = parseInt(oneofthem) - 1
                                            console.log(b + "  b")


                                            if (colora === "rgba(40,160,184,1)") {
                                                // await setoneofthem("")
                                                console.log("a uncolor")
                                                await setcolora("rgba(237,242,244,0.9)")
                                                console.log(colora)
                                            }
                                            if (colorb === "rgba(40,160,184,1)") {
                                                await setcolorb("rgba(237,242,244,0.9)")
                                            }
                                            if (colorc === "rgba(40,160,184,1)") {
                                                await setcolorc("rgba(237,242,244,0.9)")
                                            }
                                            if (colord === "rgba(40,160,184,1)") {
                                                await setcolord("rgba(237,242,244,0.9)")
                                            }
                                            a[b] = "rgba(40,160,184,1)"
                                            await setannswersc(a)


                                            //   }

                                        })


                                    }}
                                    activeOpacity={0.5} style={{
                                        backgroundColor: colora, height: hp("8%"), width: wp("86%"),
                                        borderRadius: 100, alignSelf: "center", justifyContent: "center"
                                    }}>
                                    <Text style={{ fontSize: hp("1.8%"), alignSelf: "flex-start", marginHorizontal: wp("5%") }}>{thisquestion.a_text}</Text>
                                </TouchableOpacity>
                            </View> : null}
                        {numofquesiton > -1 ? <TouchableOpacity
                            onPress={async () => {
                                await new Promise(async () => {
                                    if (colorb === "rgba(237,242,244,0.9)") {
                                        //var a = answersc;
                                        //const b = parseInt(oneofthem.numberofq)
                                        //a[0] = "rgba(40,160,184,1)"
                                        await setannswersc(["rgba(40,160,184,1)", "rgba(237,242,244,0.9)", "rgba(237,242,244,0.9)", "rgba(237,242,244,0.9)"])
                                        await setcolorb("rgba(40,160,184,1)")
                                        await setoneofthem("b")
                                        console.log(colorb + " rangi")
                                    }

                                    // if (oneofthem.key != "") {
                                    var a = answersc;

                                    const b = parseInt(oneofthem.key) - 1
                                    console.log(b + "  b")

                                    if (colora === "rgba(40,160,184,1)") {
                                        console.log("a uncolor")
                                        await setcolora("rgba(237,242,244,0.9)")
                                        console.log(colora)
                                    }
                                    if (colorb === "rgba(40,160,184,1)") {
                                        await setcolorb("rgba(237,242,244,0.9)")
                                    }
                                    if (colorc === "rgba(40,160,184,1)") {
                                        await setcolorc("rgba(237,242,244,0.9)")
                                    }
                                    if (colord === "rgba(40,160,184,1)") {
                                        await setcolord("rgba(237,242,244,0.9)")
                                    }
                                    a[b] = "rgba(40,160,184,1)"
                                    await setannswersc(a)
                                })


                            }}
                            activeOpacity={0.5} style={{
                                backgroundColor: colorb, height: hp("8%"), width: wp("86%"), marginTop: hp("2.5%"),
                                borderRadius: 100, elevation: 5, alignSelf: "center", justifyContent: "center"
                            }}>
                            <Text style={{ fontSize: hp("1.8%"), alignSelf: "flex-start", marginHorizontal: wp("5%") }}> {thisquestion.b_text}</Text>
                        </TouchableOpacity> : null}
                        {numofquesiton > -1 ? <TouchableOpacity
                            onPress={async () => {
                                await new Promise(async () => {
                                    if (colorc === "rgba(237,242,244,0.9)") {
                                        //var a = answersc;
                                        //const b = parseInt(oneofthem.numberofq)
                                        //a[0] = "rgba(40,160,184,1)"
                                        await setannswersc(["rgba(40,160,184,1)", "rgba(237,242,244,0.9)", "rgba(237,242,244,0.9)", "rgba(237,242,244,0.9)"])
                                        await setcolorc("rgba(40,160,184,1)")
                                        await setoneofthem("c")
                                        console.log(colorc + " rangi")
                                    }

                                    // if (oneofthem.key != "") {
                                    var a = answersc;

                                    const b = parseInt(oneofthem.key) - 1
                                    console.log(b + "  b")

                                    if (colora === "rgba(40,160,184,1)") {
                                        console.log("a uncolor")
                                        await setcolora("rgba(237,242,244,0.9)")
                                        console.log(colora)
                                    }
                                    if (colorb === "rgba(40,160,184,1)") {
                                        await setcolorb("rgba(237,242,244,0.9)")
                                    }
                                    if (colorc === "rgba(40,160,184,1)") {
                                        await setcolorc("rgba(237,242,244,0.9)")
                                    }
                                    if (colord === "rgba(40,160,184,1)") {
                                        await setcolord("rgba(237,242,244,0.9)")
                                    }
                                    a[b] = "rgba(40,160,184,1)"
                                    await setannswersc(a)

                                    //   }

                                })


                            }}
                            activeOpacity={0.5} style={{
                                backgroundColor: colorc, height: hp("8%"), width: wp("86%"), marginTop: hp("2.5%"),
                                borderRadius: 100, alignSelf: "center", elevation: 5, justifyContent: "center"
                            }}>
                            <Text style={{ fontSize: hp("1.8%"), alignSelf: "flex-start", marginHorizontal: wp("5%") }}> {thisquestion.c_text}</Text>
                        </TouchableOpacity> : null}
                        {numofquesiton > -1 ? <TouchableOpacity
                            onPress={async () => {
                                await new Promise(async () => {
                                    if (colord === "rgba(237,242,244,0.9)") {
                                        //var a = answersc;
                                        //const b = parseInt(oneofthem.numberofq)
                                        //a[0] = "rgba(40,160,184,1)"
                                        await setannswersc(["rgba(40,160,184,1)", "rgba(237,242,244,0.9)", "rgba(237,242,244,0.9)", "rgba(237,242,244,0.9)"])
                                        await setcolord("rgba(40,160,184,1)")

                                        console.log(colord + " rangi")
                                        await setoneofthem("d")
                                    }

                                    // if (oneofthem.key != "") {
                                    var a = answersc;

                                    const b = parseInt(oneofthem.key) - 1
                                    console.log(b + "  b")

                                    if (colora === "rgba(40,160,184,1)") {
                                        console.log("a uncolor")
                                        await setcolora("rgba(237,242,244,0.9)")
                                        console.log(colora)
                                    }
                                    if (colorb === "rgba(40,160,184,1)") {
                                        await setcolorb("rgba(237,242,244,0.9)")
                                    }
                                    if (colorc === "rgba(40,160,184,1)") {
                                        await setcolorc("rgba(237,242,244,0.9)")
                                    }
                                    if (colord === "rgba(40,160,184,1)") {
                                        await setcolord("rgba(237,242,244,0.9)")
                                    }
                                    a[b] = "rgba(40,160,184,1)"
                                    await setannswersc(a)

                                    //   }

                                })


                            }}
                            activeOpacity={0.5} style={{
                                backgroundColor: colord, height: hp("8%"), width: wp("86%"), marginTop: hp("2.5%"),
                                borderRadius: 100, alignSelf: "center", elevation: 5, justifyContent: "center"
                            }}>
                            <Text style={{ fontSize: hp("1.8%"), alignSelf: "flex-start", marginHorizontal: wp("5%") }}> {thisquestion.d_text}</Text>
                        </TouchableOpacity> : null}
                    </>


                    {/* <View style={{height:hp("10%"),width:wp("20%"),backgroundColor:"#1f7a8c"}}> */}

                    {numofquesiton === -1 ?
                        <View style={{ justifyContent: "center" }}>
                            <TouchableOpacity activeOpacity={0.5} style={{
                                //  height:hp("40%"),width:200,
                                //  position:"absolute",
                                backgroundColor: 'rgba(237,242,244,1)', alignself: "center", width: wp("90%"), marginHorizontal: wp("5%"),
                                borderRadius: 10, elevation: 5, marginBottom: hp("0%"), marginVertical: hp("5%")
                            }}>
                                {photoo === "http://e7e864967156.ngrok.io/media/default.png" ? <TouchableOpacity style={{
                                    height: hp('14%'),
                                    marginTop: hp('5%'),
                                    width: wp('28%'),
                                    marginLeft: wp('8%'),
                                    borderRadius: 100,
                                    // position: 'absolute',
                                    borderColor: 'blue',
                                    backgroundColor: "lightgreen"
                                }}
                                >
                                    <ImageBackground borderRadius={100}

                                        source={require("../../assets/quizz.png")}

                                        style={{
                                            height: hp('14%'),

                                            marginTop: hp('0%'),
                                            width: wp('28%'),
                                            marginLeft: wp('0%'),
                                            borderRadius: 20,
                                            position: 'absolute',
                                            //borderColor:'#1f7a8c',
                                            //borderWidth:wp('0.2%')
                                        }}
                                    //  onBlur={props.handleBlur('photo')}


                                    >

                                    </ImageBackground>

                                </TouchableOpacity> : <TouchableOpacity style={{
                                    height: hp('14%'),
                                    marginTop: hp('5%'),
                                    width: wp('28%'),
                                    marginLeft: wp('8%'),
                                    borderRadius: 100,
                                    // position: 'absolute',
                                    borderColor: 'blue',
                                    backgroundColor: "lightgreen"
                                }}
                                >
                                        <ImageBackground borderRadius={100}
                                            source={{ uri: photoo }}

                                            style={{
                                                height: hp('14%'),

                                                marginTop: hp('0%'),
                                                width: wp('28%'),
                                                marginLeft: wp('0%'),
                                                borderRadius: 20,
                                                position: 'absolute',
                                                //borderColor:'#1f7a8c',
                                                //borderWidth:wp('0.2%')
                                            }}
                                        //  onBlur={props.handleBlur('photo')}


                                        >

                                        </ImageBackground>
                                    </TouchableOpacity>}


                                <Text style={{ fontSize: hp('1.7%'), fontWeight: 'bold', color: '#1f7a8c', alignSelf: "flex-start", left: wp("40%"), top: hp("-10.3%") }}
                                >
                                    {questions.Quiz.title}
                                </Text>
                                <Text style={{ fontSize: hp('1.5%'), color: 'gray', alignSelf: "flex-start", left: wp("40%"), top: hp("-8.3%") }}>
                                    {questions.Quiz.create_time.toString().split('T')[0]} (تاریخ ساخت)
                        </Text>

                                <Text style={{ fontSize: hp('1.7%'), fontWeight: 'bold', color: 'lightblue', marginBottom: hp('-6%'), alignSelf: "flex-start", marginTop: hp('-1%'), marginHorizontal: wp("5%") }}>#<Text style={{ color: "#1f7a8c" }}> سازنده : {questions.Quiz.creator.username}</Text>  </Text>
                                <Text style={{ fontSize: hp('1.7%'), fontWeight: 'bold', color: '#1f7a8c', marginBottom: hp('-5%'), marginTop: hp('8%'), marginHorizontal: wp("5%") }}>تعداد سوال<Text style={{ color: "lightblue" }}> -- <Text style={{ color: "#1f7a8c" }}> {questions.Quiz.question_count}</Text></Text></Text>

                                {/* <View> */}
                                <Text style={{ fontSize: hp('1.7%'), fontWeight: 'bold', color: '#1f7a8c', marginBottom: hp('-5%'), marginTop: hp('8%'), marginHorizontal: wp("5%") }}>توضیحات:</Text>
                                <Text style={{ fontSize: hp('1.6.5%'), color: 'black', marginBottom: hp('5%'), marginTop: hp('7%'), marginHorizontal: wp("5%") }}>    {questions.Quiz.description}</Text>


                                {/* <TouchableOpacity>
                                <Text rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                                    borderColor={'#EDF2F4'}
                                    fontSize={hp('1.6.5%')} style={styles.item2}>
                                    {questions.Quiz.description}
                                </Text>
                            </TouchableOpacity>
                        </View> */}
                            </TouchableOpacity>
                            {/* <View style={{
                    //   alignItems:"flex-end",alignContent:"center"
                      }}> */}
                            <TouchableOpacity
                                onPress={async () => {

                                    setthisquestion(questions.Questions[0])

                                    // new Promise(async(resolve,reject)=>{
                                    //     await setnumofquestion(numofquesiton+1);
                                    //    resolve();
                                    // }).then(async()=>{
                                    //ننن await setnumofquestion(0);
                                    console.log(numofquesiton);
                                    await setseedis(" توضیحات")
                                    if (questions.Quiz.question_count === 1) {
                                        setcansubmit("ثبت پاسخ")
                                    }

                                    console.log(" rang negah ghabli")
                                    //  setcolor{answers[numofquesiton-1]}()
                                    if (answers[numofquesiton + 1] === "a") {
                                        await setcolora("rgba(40,160,184,1)")
                                        setoneofthem("a")
                                    }
                                    if (answers[numofquesiton + 1] === "b") {
                                        await setcolorb("rgba(40,160,184,1)")
                                        setoneofthem("b")
                                    }
                                    if (answers[numofquesiton + 1] === "c") {
                                        await setcolorc("rgba(40,160,184,1)")
                                        setoneofthem("c")
                                    }
                                    if (answers[numofquesiton + 1] === "d") {
                                        await setcolord("rgba(40,160,184,1)")
                                        setoneofthem("d")
                                    }
                                    await setnumofquestion(0);
                                    // })
                                }}
                                style={{ height: hp("7.5%"), elevation: 5, width: wp("60%"), backgroundColor: "rgba(31,122,140,1)", borderRadius: 50, marginTop: hp("11%"), alignSelf: "center" }}>
                                {/* <AntDesign style={{ marginTop: hp("2.2%"), marginRight: wp("9%"), color: "#Edf2f4" }} name="arrowleft" size={24} color="black" /> */}
                                <Text style={{ marginTop: hp("2.4%"), fontSize: hp("1.8%"), fontWeight: "bold", color: "#Edf2f4", alignSelf: "center" }}>مشاهده ی سوالات</Text>
                            </TouchableOpacity>
                            {/* </View> */}

                        </View>
                        : null}



                    {/* 
        <Text style={{position:'absolute',marginTop:300}}>   Quiz page  </Text> */}
                </View>
            </ScrollView>) : <Spinner size={"large"} style={{ alignSelf: "center", marginTop: hp("30%") }} color={"#1f7a8c"}></Spinner>}
            {numofquesiton > -1 ?
                <View style={{ flexDirection: "row", position: "absolute", marginTop: hp("66.7%") }}>
                    <View style={{ marginTop: hp("10.7") }}>
                        <TouchableOpacity
                            onPress={async () => {

                                var a = answers;
                                a[numofquesiton] = oneofthem;
                                console.log(a);
                                setoneofthem("")
                                setanswers(a);
                                await setcolora("rgba(237,242,244,0.9)")
                                await setcolorb("rgba(237,242,244,0.9)")
                                await setcolorc("rgba(237,242,244,0.9)")
                                await setcolord("rgba(237,242,244,0.9)")
                                await setcansubmit("سوال بعدی")
                                if (numofquesiton - 1 >= 0) {
                                    console.log(numofquesiton + "ndfkj;kj")
                                    if (answers[numofquesiton - 1] != "") {
                                        console.log(" rang negah ghabli")
                                        //  setcolor{answers[numofquesiton-1]}()
                                        if (answers[numofquesiton - 1] === "a") {
                                            await setcolora("rgba(40,160,184,1)")
                                            setoneofthem("a")
                                        }
                                        if (answers[numofquesiton - 1] === "b") {
                                            await setcolorb("rgba(40,160,184,1)")
                                            setoneofthem("b")
                                        }
                                        if (answers[numofquesiton - 1] === "c") {
                                            await setcolorc("rgba(40,160,184,1)")
                                            setoneofthem("c")
                                        }
                                        if (answers[numofquesiton - 1] === "d") {
                                            await setcolord("rgba(40,160,184,1)")
                                            setoneofthem("d")
                                        }
                                    }
                                }
                                console.log(numofquesiton + " numofquestion");
                                if (numofquesiton - 1 >= 1) {

                                    console.log("here ghabli b tar az 1")
                                    await setseedis("سوال قبلی")
                                    await setnumofquestion(numofquesiton - 1)
                                    await setbuttoncolor("rgba(31,122,140,1)")

                                    setthisquestion(questions.Questions[numofquesiton - 1]);


                                    console.log("next pressed")
                                }
                                // if(numofquesiton===1){

                                // }
                                //update nemishe chon :\
                                if ((numofquesiton - 1) === 0) {
                                    console.log("here too")
                                    await setnumofquestion(numofquesiton - 1)
                                    await setbuttoncolor("rgba(40,160,184,1)")
                                    setthisquestion(questions.Questions[0]);
                                    // await setseedis(" توضیحات")

                                }
                                if (numofquesiton === 0 || numofquesiton === 1) {
                                    // await setnumofquestion(-1);
                                    await setseedis(" توضیحات")
                                }
                                if (numofquesiton === 0) {
                                    await setnumofquestion(-1);
                                }
                            }}
                            style={{ height: hp("10%"), margin: 0, elevation: 5, width: wp("25%"), backgroundColor: buttoncolor, top: hp("0%"), borderTopRightRadius: 50 }}>
                            <AntDesign style={{ marginTop: hp("2.2%"), marginRight: wp("11%"), color: "#Edf2f4" }} name="arrowright" size={24} color="black" />
                            <Text style={{ marginLeft: wp("4.4%"), marginTop: hp("0.4%"), fontSize: hp("1.5.5%"), fontWeight: "bold", color: "#Edf2f4" }}>{seedisc}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: wp("50%"), marginTop: hp("10.7") }}>
                        <TouchableOpacity
                            onPress={async () => {
                                if (questions.Quiz.question_count != 1 || cansubmit != "ثبت پاسخ") {

                                    await setseedis(" سوال قبلی")

                                    var a = answers;
                                    a[numofquesiton] = oneofthem;
                                    setoneofthem("")
                                    console.log(a);
                                    setanswers(a);
                                    await setcolora("rgba(237,242,244,0.9)")
                                    await setcolorb("rgba(237,242,244,0.9)")
                                    await setcolorc("rgba(237,242,244,0.9)")
                                    await setcolord("rgba(237,242,244,0.9)")
                                    if (numofquesiton + 1 <= questions.Quiz.question_count) {
                                        console.log(numofquesiton + "ndfkj;kj")
                                        if (answers[numofquesiton + 1] != "") {
                                            console.log(" rang negah ghabli")
                                            //  setcolor{answers[numofquesiton-1]}()
                                            if (answers[numofquesiton + 1] === "a") {
                                                await setcolora("rgba(40,160,184,1)")
                                                setoneofthem("a")
                                            }
                                            if (answers[numofquesiton + 1] === "b") {
                                                await setcolorb("rgba(40,160,184,1)")
                                                setoneofthem("b")
                                            }
                                            if (answers[numofquesiton + 1] === "c") {
                                                await setcolorc("rgba(40,160,184,1)")
                                                setoneofthem("c")
                                            }
                                            if (answers[numofquesiton + 1] === "d") {
                                                await setcolord("rgba(40,160,184,1)")
                                                setoneofthem("d")
                                            }
                                        }
                                    }
                                    await setseedis("سوال قبلی")
                                    // new Promise(async(resolve,reject)=>{
                                    //     await setnumofquestion(numofquesiton+1);
                                    //    resolve();
                                    // }).then(async()=>{

                                    await setbuttoncolor("rgba(31,122,140,1)")
                                    console.log(numofquesiton + " num of question");
                                    if (numofquesiton + 1 < questions.Quiz.question_count) {
                                        await setnumofquestion(numofquesiton + 1);
                                        await setcansubmit("سوال بعدی")
                                        setthisquestion(questions.Questions[numofquesiton + 1]);

                                        console.log("next pressed")
                                    }
                                    if (cansubmit === "ثبت پاسخ") {
                                        await postquiz();
                                    }
                                    if (numofquesiton + 1 === questions.Quiz.question_count - 1) {
                                        await setnumofquestion(numofquesiton + 1);
                                        await setcansubmit("ثبت پاسخ")
                                    }
                                    console.log(numofquesiton);
                                }
                                else {
                                    console.log("کوییز یه سوال دارههههههه")
                                    var a = answers;
                                    a[numofquesiton] = oneofthem;
                                    setoneofthem("")
                                    console.log(a);
                                    setanswers(a);
                                    await postquiz();

                                }

                                // })
                            }}
                            style={{ height: hp("10%"), elevation: 5, margin: 0, width: wp("25%"), backgroundColor: "rgba(31,122,140,1)", left: wp("0%"), top: hp("0%"), borderTopLeftRadius: 50, alignSelf: "flex-end" }}>
                            <AntDesign style={{ marginTop: hp("2.2%"), marginRight: wp("9%"), color: "#Edf2f4" }} name="arrowleft" size={24} color="black" />
                            <Text style={{ marginLeft: wp("6.4%"), marginTop: hp("0.4%"), fontSize: hp("1.5.5%"), fontWeight: "bold", color: "#Edf2f4" }}>{cansubmit}</Text>
                        </TouchableOpacity>
                    </View>
                </View> : null}
            {/* </View> */}


        </ImageBackground>

    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b5c5e3',
    },
    item2: {
        // marginLeft:wp('-2%'),
        // marginRight:wp('-1%'),
        marginHorizontal: wp("5%"),
        marginTop: hp('6%'),
        fontSize: hp('2.5%'),
    },
    item: {
        marginLeft: wp('37%'),
        marginRight: wp('9%'),
        height: wp('9.5%'),
        borderColor: "lightblue",
        borderWidth: hp("0.1%")
    },
    Input: {
        left: wp('8%'),
        fontSize: hp('1.5%'),
        fontWeight: 'bold',
        marginRight: wp('10%'),
        position: 'absolute',
        height: wp('9.5%'),
        width: wp('28.5%')
    },
    plus: {

        alignSelf: 'center',
        justifyContent: 'center'

    },
    loader: {
        alignItems: 'center',
        marginBottom: hp('15%'),
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: hp('10%')
    }
});
export default Quizpage;

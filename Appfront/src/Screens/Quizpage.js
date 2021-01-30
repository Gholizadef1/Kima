import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, FlatList, ActivityIndicator, TextPropTypes, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, SearchBar } from 'native-base';
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
// import { Button } from 'react-native-paper';
const Quizpage = () => {
    const questions = {
        Quiz: {
            id: 15,
            title: "my first quiz",
            description: "kima project",
            creator: {
                username: "setaysehm",
                profile_photo: "/media/profile",
                email: "setayeshm@ss.com",
                id: 2
            },
            quiz_photo: "/media/default.png",
            create_time: "2021-01-29"
        },
        Questions: [
            {
                question_num: 2,
                question_text: "در کتاب فلان صفحه ی فلان بی تو مهتاب شبی باز از آن کوچه گذشتم؟",
                a_text: "نگذشتم",
                b_text: "آری بی تو مهتاب شبی باز از آن کوچه گذشتم",
                c_text: "خانه ی دوست کجاست در فلق بود",
                d_text: "که پرسیدش سوار خونش کجاست",
                dey: "a"
            },
            {
                question_num: 2,
                question_text: "سوال دو اینه که ...?",
                a_text: "جواب اول سوال دو",
                b_text: "جواب دوم سوال د و اینه که ",
                c_text: "third",
                d_text: "جوب آخر سوال شنبکتی",
                dey: "a"
            }
        ]
    }
    const [numofquesiton, setnumofquestion] = useState(-1);
    const [answers, setanswers] = useState([]);
    const [thisquesiton, setthisquestion] = useState(questions.Questions[0])
    const [buttoncolor, setbuttoncolor] = useState("rgba(40,160,184,1)")
    const [cansubmit, setcansubmit] = useState("سوال بعدی")
    const [seedisc, setseedis] = useState("سوال قبلی")

    return (
        <View style={styles.container}>
            <ImageBackground style={{ flex: 1 }} source={require("../../assets/fantezi4.jpg")}>
                <ScrollView>
                    <>
                        {numofquesiton > -1 ? <Text style={{ position: "absolute", alignSelf: "center", fontSize: hp("1.9%"), color: "#1f7a8c", fontWeight: "bold", marginTop: hp("3.5%") }}>({numofquesiton}/{questions.Questions[0].question_num})</Text> : null}
                        {numofquesiton > -1 ? <ProgressBar style={{ top: hp("7%"), marginHorizontal: wp("0%"), borderRadius: 20, height: hp("1%"), elevation: 3 }} progress={(numofquesiton + 1) / questions.Questions[0].question_num} color={"#1f7a8c"} /> : null}

                        {numofquesiton > -1 ? <Text style={{
                            color: "black", fontSize: hp("2%"), fontWeight: "bold", alignSelf: "center", width: wp("86%"), marginTop: hp("15%"), elevation: 5,
                            //  textShadowOffset: { width: 1, height: 1 },
                            // textShadowRadius: 10,
                            // textShadowColor: 'gray',
                            marginRight: wp("1%")
                        }}>{thisquesiton.question_text}</Text> : null}


                        {numofquesiton > -1 ? <TouchableOpacity activeOpacity={0.5} style={{
                            backgroundColor: 'rgba(237,242,244,0.7)', height: hp("8%"), width: wp("86%"), marginTop: hp("8%"),
                            borderRadius: 100, alignSelf: "center", justifyContent: "center"
                        }}>
                            <Text style={{ fontSize: hp("1.8%"), alignSelf: "flex-start", marginHorizontal: wp("5%") }}>{thisquesiton.a_text}</Text>
                        </TouchableOpacity> : null}
                        {numofquesiton > -1 ? <TouchableOpacity activeOpacity={0.5} style={{
                            backgroundColor: 'rgba(237,242,244,0.7)', height: hp("8%"), width: wp("86%"), marginTop: hp("2.5%"),
                            borderRadius: 100, elevation: 5, alignSelf: "center", justifyContent: "center"
                        }}>
                            <Text style={{ fontSize: hp("1.8%"), alignSelf: "flex-start", marginHorizontal: wp("5%") }}> {thisquesiton.b_text}</Text>
                        </TouchableOpacity> : null}
                        {numofquesiton > -1 ? <TouchableOpacity activeOpacity={0.5} style={{
                            backgroundColor: 'rgba(237,242,244,0.7)', height: hp("8%"), width: wp("86%"), marginTop: hp("2.5%"),
                            borderRadius: 100, alignSelf: "center", elevation: 5, justifyContent: "center"
                        }}>
                            <Text style={{ fontSize: hp("1.8%"), alignSelf: "flex-start", marginHorizontal: wp("5%") }}> {thisquesiton.c_text}</Text>
                        </TouchableOpacity> : null}
                        {numofquesiton > -1 ? <TouchableOpacity activeOpacity={0.5} style={{
                            backgroundColor: 'rgba(237,242,244,0.7)', height: hp("8%"), width: wp("86%"), marginTop: hp("2.5%"),
                            borderRadius: 100, alignSelf: "center", elevation: 5, justifyContent: "center"
                        }}>
                            <Text style={{ fontSize: hp("1.8%"), alignSelf: "flex-start", marginHorizontal: wp("5%") }}> {thisquesiton.d_text}</Text>
                        </TouchableOpacity> : null}
                    </>


                    {/* <View style={{height:hp("10%"),width:wp("20%"),backgroundColor:"#1f7a8c"}}> */}
                    {numofquesiton > -1 ? <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={async () => {
                                await setcansubmit("سوال بعدی")

                                console.log(numofquesiton);
                                if (numofquesiton - 1 >= 0) {
                                    await setnumofquestion(numofquesiton - 1)
                                    await setbuttoncolor("rgba(40,160,184,1)")
                                    setthisquestion(questions.Questions[numofquesiton - 1]);


                                    console.log("next pressed")
                                }
                                //update nemishe chon :\
                                if ((numofquesiton - 1) === 1) {
                                    await setnumofquestion(numofquesiton - 1)
                                    await setbuttoncolor("rgba(31,122,140,1)")
                                    //    await setseedis("دیدن توضیحات")
                                }
                            }}
                            style={{ height: hp("10%"), elevation: 5, width: wp("25%"), backgroundColor: buttoncolor, marginTop: hp("10.6.5%"), borderTopRightRadius: 50 }}>
                            <AntDesign style={{ marginTop: hp("2.2%"), marginRight: wp("11%"), color: "#Edf2f4" }} name="arrowright" size={24} color="black" />
                            <Text style={{ marginLeft: wp("4.4%"), marginTop: hp("0.4%"), fontSize: hp("1.5.5%"), fontWeight: "bold", color: "#Edf2f4" }}>سوال قبلی</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={async () => {
                                // new Promise(async(resolve,reject)=>{
                                //     await setnumofquestion(numofquesiton+1);
                                //    resolve();
                                // }).then(async()=>{

                                await setbuttoncolor("rgba(31,122,140,1)")
                                console.log(numofquesiton);
                                if (numofquesiton + 1 < questions.Questions[0].question_num) {
                                    await setnumofquestion(numofquesiton + 1);
                                    await setcansubmit("سوال بعدی")
                                    setthisquestion(questions.Questions[numofquesiton + 1]);

                                    console.log("next pressed")
                                }
                                if (numofquesiton + 1 === questions.Questions[0].question_num - 1) {
                                    await setnumofquestion(numofquesiton + 1);
                                    await setcansubmit("ثبت پاسخ")
                                }
                                console.log(numofquesiton);
                                // })
                            }}
                            style={{ height: hp("10%"), elevation: 5, width: wp("25%"), backgroundColor: "rgba(31,122,140,1)", marginLeft: wp("50%"), marginTop: hp("10.6.5%"), borderTopLeftRadius: 50, alignSelf: "flex-end" }}>
                            <AntDesign style={{ marginTop: hp("2.2%"), marginRight: wp("9%"), color: "#Edf2f4" }} name="arrowleft" size={24} color="black" />
                            <Text style={{ marginLeft: wp("6.4%"), marginTop: hp("0.4%"), fontSize: hp("1.5.5%"), fontWeight: "bold", color: "#Edf2f4" }}>{cansubmit}</Text>
                        </TouchableOpacity>
                    </View> : null}
                    {/* </View> */}


                    {numofquesiton === -1?<TouchableOpacity activeOpacity={0.5} style={{
                        backgroundColor: 'rgba(237,242,244,0.9)', height: hp("70%"), width: wp("90%"), marginTop: hp("5%"),marginHorizontal:wp("5%"),
                        borderRadius: 10, elevation: 5
                    }}>
                    {questions.Quiz.quiz_photo === "/media/default.png" ? <TouchableOpacity style={{
                        height: hp('14%'),
                        marginTop: hp('7%'),
                        width: wp('28%'),
                        marginLeft: wp('10%'),
                        borderRadius: 100,
                        // position: 'absolute',
                        borderColor: 'blue',
                        backgroundColor: "lightgreen"
                    }}
                    >
                        <ImageBackground borderRadius={100}

                            source={require("../../assets/tea.jpg")}

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
                        marginTop: hp('0%'),
                        width: wp('28%'),
                        marginLeft: wp('5%'),
                        borderRadius: 100,
                        // position: 'absolute',
                        borderColor: 'blue',
                        backgroundColor: "lightgreen"
                    }}
                    >
                            <ImageBackground borderRadius={100}
                                source={{ uri: `${question.Quiz.quiz_photo}` }}

                                style={{
                                    height: hp('14%'),

                                    marginTop: hp('0%'),
                                    width: wp('28%'),
                                    marginLeft: wp('0%'),
                                    borderRadius: 20,
                                    position: 'absolute',
                                }}
                            //  onBlur={props.handleBlur('photo')}


                            >

                            </ImageBackground>
                        </TouchableOpacity>}

                   
                      
                        </TouchableOpacity>:null}



                        {/* 
        <Text style={{position:'absolute',marginTop:300}}>   Quiz page  </Text> */}

                </ScrollView>
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

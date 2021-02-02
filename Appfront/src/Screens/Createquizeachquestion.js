import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, ScrollView, Modal, ImageBackground, Alert, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Item, Segment, Content, Input, Label, Textarea } from 'native-base';
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import { number } from 'yup';
import { set } from 'react-native-reanimated';
import { Formik, formik, Field, getIn } from 'formik';
import * as yup from 'yup';
import * as permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { EvilIcons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
const Createquizeachquestion = (prop) => {
    const [value, setValue] = React.useState("1");
    const questionerror = getIn(prop.pr.errors, `questions[${prop.itemidd-1}].question_text`)
    //console.log(JSON.stringify(questionerror) + "     questionerror")
    //-1 :) :|
    const aerror = getIn(prop.pr.errors, `questions[${prop.itemidd-1}].a_text`)
    const berror = getIn(prop.pr.errors, `questions[${prop.itemidd-1}].b_text`)
    const cerror = getIn(prop.pr.errors, `questions[${prop.itemidd-1}].c_text`)
    const derror = getIn(prop.pr.errors, `questions[${prop.itemidd-1}].d_text`)
    const correcterror = getIn(prop.pr.errors, `questions[${prop.itemidd-1}].c_textorrect`)
    const questointouched = getIn(prop.pr.touched, `questions[${prop.itemidd-1}].question_text`)
    console.log(prop.pr.values);
    console.log("VALUES")

    console.log(prop.pr.errors);
    console.log("ERRORS")
    //console.log(prop.showallerr+" show all error");
    //console.log(questionerror+" question error")
    //console.log(JSON.stringify(prop.pr.values)+" VALUES");
    //console.log(JSON.stringify(prop.pr.errors)+" ERRORS");
   // const [a,seta]=useState(false);
    //console.log(getIn(prop.pr.values, `questions[${prop.itemidd}].question_text`)+" quesition value")
    // if(prop.showallerr){
    //     seta(true)
    // }
    // if(prop.showallerr&&a){
    
    //     prop.pr.setFieldTouched(`questions[${prop.itemidd}].question_text`, true)
    //     prop.pr.setFieldTouched(`questions[${prop.itemidd}].a_text`, true)
    //     prop.pr.setFieldTouched(`questions[${prop.itemidd}].b_text`, true)
    //     prop.pr.setFieldTouched(`questions[${prop.itemidd}].c_text`, true)
    //     prop.pr.setFieldTouched(`questions[${prop.itemidd}].d_text`, true)
    //     prop.setshowallerr(false);
    //     setTimeout(() => {
    //         seta(false);
    //     }, 500);
    //    // prop.setshowallerr(false);
    // }
    // if(prop.showallerr){
    //     if( getIn(prop.pr.values, `questions[${prop.itemidd}].question_text`)===undefined){
    //    // questointouched=true;
    //    prop.pr.handleChange( `questions[${prop.itemidd}].question_text`)(" ")
    //    prop.pr.handleChange( `questions[${prop.itemidd}].a_text`)("")
    //    prop.pr.handleChange( `questions[${prop.itemidd}].b_text`)("")
    //    prop.pr.handleChange( `questions[${prop.itemidd}].c_text`)("")
    //    prop.pr.handleChange( `questions[${prop.itemidd}].d_text`)("")
    //     }
    // }
  //  console.log(JSON.stringify(getIn(prop.pr.values,`questions[${prop.itemidd}].c_textorrect`))+" correcjhgkjhgttttt");
    // console.log(JSON.stringify(questointouched)+" question touched")
    // console.log(typeof JSON.stringify(aerror)+" aerror typeof")
    // console.log(JSON.stringify(aerror));
  //  console.log(questointouched + "question touchecc")
   // console.log(JSON.stringify(prop.pr.touched) + "  TOUCHED")
//    if(prop.pr.touched.questions!=undefined){
//      console.log(typeof prop.pr.touched.questions[prop.itemidd].a_text +"atouchedtype")
//      // console.log(typeof prop.pr.errors.questions[prop.itemidd].a_text +"aerrortype")
//       console.log(typeof prop.pr.touched.questions[prop.itemidd].d_text +"   dtouchedtype")
//    }
 //  console.log(JSON.stringify(prop.pr.errors.questions[prop.itemidd].question_text))
//    if(prop.pr.errors.questions!=undefined){
  
//     console.log(typeof  questionerror+"  questionerror typeof");
//     console.log(questionerror);
    // console.log(JSON.stringify(prop.pr.errors));
//    }
   // console.log(prop.pr.touched.questions[prop.itemidd].question_text === undefined + "unsefj;slkj")

  //  console.log(JSON.stringify(prop.pr.touched.questions[prop.itemidd].question_text)+"  TOUCHEddddD")
   // console.log(prop.itemidd + "  itemidd")
    //  console.log(JSON.stringify(prop.pr.errors.questions[prop.itemidd].question_text));

    return (<View style={{ marginBottom: hp("1.5%") }}>

        <TouchableOpacity activeOpacity={1}>
            <Textarea rowSpan={hp('0.9.1%')} bordered borderRadius={20}
                borderColor={'lightblue'}
               // elevation={0}
                //onChangeText={prop.pr.handleChange(questions[itemidd].question_text)}
                onChangeText={prop.pr.handleChange(`questions[${prop.itemidd-1}].question_text`)}
                //name...
                onBlur={prop.pr.handleBlur(`questions[${prop.itemidd-1}].question_text`)}
                value={prop.pr.values.questions.question_text}
                placeholder={'سوال ' + prop.itemidd + " ... "} placeholderTextColor='gray' fontSize={hp('1.6.5%')} style={{
                    marginTop: hp("0%"), marginHorizontal: wp("5%"), height: hp("8%"), backgroundColor: "#f2f5f7",elevation:3,marginBottom:hp("1%")
                }}>


            </Textarea>

        </TouchableOpacity>
  
        {/* <Text style={{fontSize:hp('1.2%'),marginLeft:wp('-3.5%'),marginTop:hp('7%'), color:'red'}}>{prop.error}</Text>     getIn(prop.touched,`questions[${prop.itemidd}].question_text`) */}
        {/* {prop.errors.Username!=undefined? <Text style={{fontSize:hp('1.2%'),marginLeft:wp('-3.5%'),marginTop:hp('7%'), color:'red'}}>{prop.errors.Username}</Text>:null} */}
        {/* {typeof prop.error.questions === 'string' */}
        {/* {!(prop.pr.touched.questions===undefined)&& prop.pr.touched.questions[prop.itemidd].question_text===true&& typeof questionerror==="string" ?<Text style={{fontSize:hp('1.2%'),marginLeft:wp('15%'),marginTop:hp('7%'), color:'red'}}>{questionerror}</Text>:null} */}
        {/* {!(prop.pr.touched.questions[prop.itemidd].question_text === undefined) && typeof prop.pr.touched.questions[prop.itemidd].question_text === "boolean" && typeof prop.pr.errors.questions[prop.itemidd].question_text === "boolean" ? <Text style={{ fontSize: hp('1.2%'), marginLeft: wp('15%'), marginTop: hp('7%'), color: 'red' }}>{prop.pr.errors.questions[prop.itemidd].question_text}</Text> : null} */}
          {/* {prop.pr.touched.questions!=undefined &&( prop.pr.errors.questions!=undefined && typeof questionerror!=undefined)? <Text style={{ fontSize: hp('1.2%'), marginLeft: wp('15%'), marginTop: hp('7%'), color: 'red' }}>{questionerror}</Text> : null} 
           */}
           {typeof questionerror==="string"?<Text style={{   fontSize: hp('1.2%'), marginLeft: wp('5.5%'), top: hp('-0.5%'), marginBottom:hp("-2.1%"), color: '#FC4A68'}}>{getIn(prop.pr.touched, `questions[${prop.itemidd-1}].question_text`)&&questionerror}</Text>:null}
           {/* { prop.showallerr===true && prop.pr.values.questions[prop.itemidd].question_text===""&&questionerror===undefined?<Text style={styles.error}>".متن سوال نمیتواند خالی باشد</Text>:null} */}
        {/* <Field> */}
    
        <RadioButton.Group name={`questions[${prop.itemidd-1}].c_textorrect`}  onValueChange={newValue => {

            setValue(newValue)
            if(getIn(prop.pr.values,`questions[${prop.itemidd-1}].c_textorrect`)===undefined){
                prop.pr.values.questions[prop.itemidd-1].c_textorrect="1"
            }
            else{

             prop.pr.values.questions[prop.itemidd-1].c_textorrect = newValue;
            }
            //prop.pr(`questions[${prop.itemidd}].c_textorrect`);

        }} value={value}
        //()=>{
        // value=prop.pr.values.questions.c_textorrect;
        // return(value)
        >

            {/* <Text>First</Text> */}
            <View style={{ marginTop: hp("3%"), marginRight: wp("5%"), marginHorizontal: wp("5%"), borderColor: "lightgray", backgroundColor: "white", borderRadius: 20, borderWidth: hp("0.1%") }}>
                <TouchableOpacity>

                    <Item rounded style={{ marginLeft: wp("14%"), borderColor: "white", backgroundColor: "white" }}>
                        <Input rounded rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                            borderColor={'white'}
                            onChangeText={prop.pr.handleChange(`questions[${prop.itemidd-1}].a_text`)}
                            onBlur={prop.pr.handleBlur(`questions[${prop.itemidd-1}].a_text`)}
                            value={prop.pr.values.questions.a_text}
                            placeholder={'گزینه اول ...'} placeholderTextColor='gray' fontSize={hp('1%')} style={{
                                marginTop: hp("0%"), marginLeft: wp("1%"), height: hp("4%"), fontSize: hp("1.4%")
                            }}>
                            {/* <RadioButton value="5" /> */}
                        </Input>

                    </Item>
                </TouchableOpacity>
            
                <View style={{ position: 'absolute', marginTop: hp("0%"), marginLeft: wp("0%"), width: wp("15%"), borderRadius: 20, height: hp("4%"), backgroundColor: "#EDF2F4" }}>
                    <RadioButton color={"#1f7a8c"} value="1" />
                </View>
            </View>
            {typeof aerror==="string"?<Text style={styles.error}>{getIn(prop.pr.touched, `questions[${prop.itemidd-1}].a_text`)&&aerror}</Text>:null}
            <View style={{ marginTop: hp("3%"), marginRight: wp("5%"), marginHorizontal: wp("5%"), borderColor: "lightgray", backgroundColor: "white", borderRadius: 20, borderWidth: hp("0.1%") }}>
                <TouchableOpacity>

                    <Item rounded style={{ marginLeft: wp("14%"), borderColor: "white" }}>
                        <Input rounded rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                            borderColor={'white'}
                            onChangeText={prop.pr.handleChange(`questions[${prop.itemidd-1}].b_text`)}
                            onBlur={prop.pr.handleBlur(`questions[${prop.itemidd-1}].b_text`)}
                            value={prop.pr.values.questions.b_text}
                            placeholder={'گزینه دوم ...'} placeholderTextColor='gray' fontSize={hp('1%')} style={{
                                marginTop: hp("0%"), marginLeft: wp("1%"), height: hp("4%"), fontSize: hp("1.4%")
                            }}>
                            {/* <RadioButton value="5" /> */}
                        </Input>

                    </Item>
                </TouchableOpacity>
                <View style={{ position: 'absolute', marginTop: hp("0%"), marginLeft: wp("0%"), width: wp("15%"), borderRadius: 20, height: hp("4%"), backgroundColor: "#EDF2F4" }}>
                    <RadioButton color={"#1f7a8c"} value="2" />
                </View>
            </View>
            {typeof berror==="string"?<Text style={styles.error}>{getIn(prop.pr.touched, `questions[${prop.itemidd-1}].b_text`)&&berror}</Text>:null}
            <View style={{ marginTop: hp("3%"), marginHorizontal: wp("5%"), marginRight: wp("5%"), borderColor: "lightgray", backgroundColor: "white", borderRadius: 20, borderWidth: hp("0.1%") }}>
                <TouchableOpacity>

                    <Item rounded style={{ marginLeft: wp("14%"), borderColor: "white" }}>
                        <Input rounded rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                            borderColor={'white'}
                            onChangeText={prop.pr.handleChange(`questions[${prop.itemidd-1}].c_text`)}
                            onBlur={prop.pr.handleBlur(`questions[${prop.itemidd-1}].c_text`)}
                            value={prop.pr.values.questions.c_text}
                            placeholder={'گزینه سوم ...'} placeholderTextColor='gray' fontSize={hp('1%')} style={{
                                marginTop: hp("0%"), marginLeft: wp("1%"), height: hp("4%"), fontSize: hp("1.4%")
                            }}>
                            {/* <RadioButton value="5" /> */}
                        </Input>

                    </Item>
                </TouchableOpacity>
                <View style={{
                    position: 'absolute', marginTop: hp("0%"), marginLeft: wp("0%"), width: wp("15%"), borderRadius: 20, height: hp("4%"),
                    // backgroundColor: "#e0fbfc" 
                    backgroundColor: "#EDF2F4"
                }}>
                    <RadioButton color={"#1f7a8c"} value="3" />
                </View>
            </View>
            {typeof cerror==="string"?<Text style={styles.error}>{getIn(prop.pr.touched, `questions[${prop.itemidd-1}].c_text`)&&cerror}</Text>:null}
            <View style={{ marginTop: hp("3%"),marginBottom:hp("4%"), marginRight: wp("5%"), marginHorizontal: wp("5%"), borderColor: "lightgray", backgroundColor: "white", borderRadius: 20, borderWidth: hp("0.1%") }}>
                <TouchableOpacity>

                    <Item rounded style={{ marginLeft: wp("14%"), borderColor: "white" }}>
                        <Input rounded rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                            borderColor={'white'}
                            onChangeText={prop.pr.handleChange(`questions[${prop.itemidd-1}].d_text`)}
                            onBlur={prop.pr.handleBlur(`questions[${prop.itemidd-1}].d_text`)}
                            value={prop.pr.values.questions.d_text}
                            placeholder={'گزینه چهارم ...'} placeholderTextColor='gray' fontSize={hp('1%')} style={{
                                marginTop: hp("0%"), marginLeft: wp("1%"), height: hp("4%"), fontSize: hp("1.4%")
                            }}>
                            {/* <RadioButton value="5" /> */}
                        </Input>

                    </Item>
                </TouchableOpacity>
                <View style={{ position: 'absolute', marginTop: hp("0%"), left: wp("0%"), width: wp("15%"), borderRadius: 20, height: hp("4%"), backgroundColor: "#EDF2F4" }}>
                    <RadioButton color={"#1f7a8c"} value="4" />
                </View>
            </View>
            {typeof derror==="string"?<Text style={{   fontSize: hp('1.2%'), marginLeft: wp('5.5%'), top: hp('-3%'), marginBottom:hp("-1%"), color: '#FC4A68'}}>{getIn(prop.pr.touched, `questions[${prop.itemidd-1}].d_text`)&&derror}</Text>:null}
        </RadioButton.Group>
        {/* </Field> */}
    </View>
    )
}
const styles = StyleSheet.create({
    error:{
        fontSize: hp('1.2%'),
         marginLeft: wp('5.5%'),
          marginTop: hp('0.6%'),
          marginBottom:hp("-1%"),
           color: '#FC4A68',
          marginBottom:hp("-2.4%")
    }
  
});
export default Createquizeachquestion;
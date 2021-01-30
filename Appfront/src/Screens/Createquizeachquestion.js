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
    const questionerror = getIn(prop.pr.errors, `soalha[${prop.itemidd}].question`)
    //console.log(JSON.stringify(questionerror) + "     questionerror")
    const aerror = getIn(prop.pr.errors, `soalha[${prop.itemidd}].a`)
    const berror = getIn(prop.pr.errors, `soalha[${prop.itemidd}].b`)
    const cerror = getIn(prop.pr.errors, `soalha[${prop.itemidd}].c`)
    const derror = getIn(prop.pr.errors, `soalha[${prop.itemidd}].d`)
    const correcterror = getIn(prop.pr.errors, `soalha[${prop.itemidd}].correct`)
    const questointouched = getIn(prop.pr.touched, `soalha[${prop.itemidd}].question`)
    //console.log(prop.showallerr+" show all error");
  //  console.log(JSON.stringify(getIn(prop.pr.values,`soalha[${prop.itemidd}].correct`))+" correcjhgkjhgttttt");
    // console.log(JSON.stringify(questointouched)+" question touched")
    // console.log(typeof JSON.stringify(aerror)+" aerror typeof")
    // console.log(JSON.stringify(aerror));
  //  console.log(questointouched + "question touchecc")
   // console.log(JSON.stringify(prop.pr.touched) + "  TOUCHED")
//    if(prop.pr.touched.soalha!=undefined){
//      console.log(typeof prop.pr.touched.soalha[prop.itemidd].a +"atouchedtype")
//      // console.log(typeof prop.pr.errors.soalha[prop.itemidd].a +"aerrortype")
//       console.log(typeof prop.pr.touched.soalha[prop.itemidd].d +"   dtouchedtype")
//    }
 //  console.log(JSON.stringify(prop.pr.errors.soalha[prop.itemidd].question))
//    if(prop.pr.errors.soalha!=undefined){
  
//     console.log(typeof  questionerror+"  questionerror typeof");
//     console.log(questionerror);
    // console.log(JSON.stringify(prop.pr.errors));
//    }
   // console.log(prop.pr.touched.soalha[prop.itemidd].question === undefined + "unsefj;slkj")

  //  console.log(JSON.stringify(prop.pr.touched.soalha[prop.itemidd].question)+"  TOUCHEddddD")
   // console.log(prop.itemidd + "  itemidd")
    //  console.log(JSON.stringify(prop.pr.errors.soalha[prop.itemidd].question));

    return (<View style={{ marginBottom: hp("1.5%") }}>

        <TouchableOpacity>
            <Textarea rowSpan={hp('0.9.1%')} bordered borderRadius={20}
                borderColor={'lightblue'}
                elevation={0}
                //onChangeText={prop.pr.handleChange(soalha[itemidd].question)}
                onChangeText={prop.pr.handleChange(`soalha[${prop.itemidd}].question`)}
                //name...
                onBlur={prop.pr.handleBlur(`soalha[${prop.itemidd}].question`)}
                value={prop.pr.values.soalha.question}
                placeholder={'سوال ' + prop.itemidd + " ... "} placeholderTextColor='gray' fontSize={hp('1.6.5%')} style={{
                    marginTop: hp("0%"), marginHorizontal: wp("5%"), height: hp("8%"), backgroundColor: "white"
                }}>

            </Textarea>

        </TouchableOpacity>
  
        {/* <Text style={{fontSize:hp('1.2%'),marginLeft:wp('-3.5%'),marginTop:hp('7%'), color:'red'}}>{prop.error}</Text>     getIn(prop.touched,`soalha[${prop.itemidd}].question`) */}
        {/* {prop.errors.Username!=undefined? <Text style={{fontSize:hp('1.2%'),marginLeft:wp('-3.5%'),marginTop:hp('7%'), color:'red'}}>{prop.errors.Username}</Text>:null} */}
        {/* {typeof prop.error.soalha === 'string' */}
        {/* {!(prop.pr.touched.soalha===undefined)&& prop.pr.touched.soalha[prop.itemidd].question===true&& typeof questionerror==="string" ?<Text style={{fontSize:hp('1.2%'),marginLeft:wp('15%'),marginTop:hp('7%'), color:'red'}}>{questionerror}</Text>:null} */}
        {/* {!(prop.pr.touched.soalha[prop.itemidd].question === undefined) && typeof prop.pr.touched.soalha[prop.itemidd].question === "boolean" && typeof prop.pr.errors.soalha[prop.itemidd].question === "boolean" ? <Text style={{ fontSize: hp('1.2%'), marginLeft: wp('15%'), marginTop: hp('7%'), color: 'red' }}>{prop.pr.errors.soalha[prop.itemidd].question}</Text> : null} */}
          {/* {prop.pr.touched.soalha!=undefined &&( prop.pr.errors.soalha!=undefined && typeof questionerror!=undefined)? <Text style={{ fontSize: hp('1.2%'), marginLeft: wp('15%'), marginTop: hp('7%'), color: 'red' }}>{questionerror}</Text> : null} 
           */}
           {typeof questionerror==="string"?<Text style={styles.error}>{getIn(prop.pr.touched, `soalha[${prop.itemidd}].question`)&&questionerror}</Text>:null}
        {/* <Field> */}
        <RadioButton.Group name={`soalha[${prop.itemidd}].correct`}  onValueChange={newValue => {

            setValue(newValue)
            if(getIn(prop.pr.values,`soalha[${prop.itemidd}].correct`)===undefined){
                prop.pr.values.soalha[prop.itemidd].correct="1"
            }
            else{

             prop.pr.values.soalha[prop.itemidd].correct = newValue;
            }
            //prop.pr(`soalha[${prop.itemidd}].correct`);

        }} value={value}
        //()=>{
        // value=prop.pr.values.soalha.correct;
        // return(value)
        >

            {/* <Text>First</Text> */}
            <View style={{ marginTop: hp("3%"), marginRight: wp("12%"), marginHorizontal: wp("5%"), borderColor: "lightgray", backgroundColor: "white", borderRadius: 20, borderWidth: hp("0.1%") }}>
                <TouchableOpacity>

                    <Item rounded style={{ marginLeft: wp("14%"), borderColor: "white", backgroundColor: "white" }}>
                        <Input rounded rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                            borderColor={'white'}
                            onChangeText={prop.pr.handleChange(`soalha[${prop.itemidd}].a`)}
                            onBlur={prop.pr.handleBlur(`soalha[${prop.itemidd}].a`)}
                            value={prop.pr.values.soalha.a}
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
            {typeof aerror==="string"?<Text style={styles.error}>{getIn(prop.pr.touched, `soalha[${prop.itemidd}].a`)&&aerror}</Text>:null}
            <View style={{ marginTop: hp("3%"), marginRight: wp("12%"), marginHorizontal: wp("5%"), borderColor: "lightgray", backgroundColor: "white", borderRadius: 20, borderWidth: hp("0.1%") }}>
                <TouchableOpacity>

                    <Item rounded style={{ marginLeft: wp("14%"), borderColor: "white" }}>
                        <Input rounded rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                            borderColor={'white'}
                            onChangeText={prop.pr.handleChange(`soalha[${prop.itemidd}].b`)}
                            onBlur={prop.pr.handleBlur(`soalha[${prop.itemidd}].b`)}
                            value={prop.pr.values.soalha.b}
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
            {typeof berror==="string"?<Text style={styles.error}>{getIn(prop.pr.touched, `soalha[${prop.itemidd}].b`)&&berror}</Text>:null}
            <View style={{ marginTop: hp("3%"), marginHorizontal: wp("5%"), marginRight: wp("12%"), borderColor: "lightgray", backgroundColor: "white", borderRadius: 20, borderWidth: hp("0.1%") }}>
                <TouchableOpacity>

                    <Item rounded style={{ marginLeft: wp("14%"), borderColor: "white" }}>
                        <Input rounded rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                            borderColor={'white'}
                            onChangeText={prop.pr.handleChange(`soalha[${prop.itemidd}].c`)}
                            onBlur={prop.pr.handleBlur(`soalha[${prop.itemidd}].c`)}
                            value={prop.pr.values.soalha.c}
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
            {typeof cerror==="string"?<Text style={styles.error}>{getIn(prop.pr.touched, `soalha[${prop.itemidd}].c`)&&cerror}</Text>:null}
            <View style={{ marginTop: hp("3%"),marginBottom:hp("5%"), marginRight: wp("12%"), marginHorizontal: wp("5%"), borderColor: "lightgray", backgroundColor: "white", borderRadius: 20, borderWidth: hp("0.1%") }}>
                <TouchableOpacity>

                    <Item rounded style={{ marginLeft: wp("14%"), borderColor: "white" }}>
                        <Input rounded rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                            borderColor={'white'}
                            onChangeText={prop.pr.handleChange(`soalha[${prop.itemidd}].d`)}
                            onBlur={prop.pr.handleBlur(`soalha[${prop.itemidd}].d`)}
                            value={prop.pr.values.soalha.d}
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
            {typeof derror==="string"?<Text style={{   fontSize: hp('1.2%'), marginLeft: wp('5.5%'), top: hp('-3%'), marginBottom:hp("-1%"), color: 'red'}}>{getIn(prop.pr.touched, `soalha[${prop.itemidd}].d`)&&derror}</Text>:null}
        </RadioButton.Group>
        {/* </Field> */}
    </View>
    )
}
const styles = StyleSheet.create({
    error:{
        fontSize: hp('1.2%'),
         marginLeft: wp('5.5%'),
          marginTop: hp('1%'),
          marginBottom:hp("-1%"),
           color: 'red'
    }
  
});
export default Createquizeachquestion;
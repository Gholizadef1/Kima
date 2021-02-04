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
import { FastField, Formik, formik, Form, FieldArray, getIn } from 'formik';
import * as yup from 'yup';
import * as permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { EvilIcons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import Createquizeachquestion from "./Createquizeachquestion"
// import { Button } from 'react-native-paper';
const Createquiz = () => {

    // useFocusEffect(
    //   React.useCallback(() => {   

    //   },[]))
    const pickfromgallery = async (props, change) => {
        await console.log(await AsyncStorage.getItem('token'));
        console.log('gallery')
        const { granted } = await permissions.askAsync(permissions.CAMERA_ROLL)
        if (granted) {
            console.log(granted)
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            })
            console.log(data);
            console.log(data.uri)
            const formdata = new FormData();

            const newfile = {
                uri: data.uri,
                type: `test/${data.uri.split(".")[3]}`,
                name: `test.${data.uri.split(".")[3]}`
            }
            console.log(newfile)

            formdata.append('quiz_photo', newfile)

            if (data.cancelled === false) {
                const back = {
                    quiz_photo: data
                }
                const backk = JSON.stringify(back);
                console.log(props.values.quiz_photo + 'formik quiz_photo1')
                props.values.quiz_photo = data.uri
                //baraye in ke rerender beshe va quiz_photo formik form taghir kone

                props.handleChange('quiz_photo')
                setpicture(newfile)

                console.log(picture + '  PICTURE')
                // change(data.uri)
                console.log(props.values.quiz_photo + 'formik quiz_photo2')
            }
        }
        else {
            Alert.alert('oops', ' برای انتخاب از گالری باید اجازه دسترسی به گالریتون رو به ما بدید', [{
                Title: 'فهمیدم', onPress: () => console.log('alert closed')
            }])
        }

    }
    const [value, setValue] = React.useState('1');
    const [itemid, setitemid] = useState(1);
    const [values, setvalues] = useState(["1"])
    const [questionss, setquestionss] = useState([{ id: 1, name: "اول" }])
    const [numofquestion, setnumofquestion] = useState(2)
    const [minnumquestion, setminnumquestion] = useState(false);
    const [maxnumquestion, setmaxnumquestion] = useState(false);
    const [picture, setpicture] = useState({ uri: '../../assets/tea.jpg', name: '', type: '' });
    const [showallerror, setshowallerror] = useState(false);
    const [stillhaveerror, setstillhaveerror] = useState(false);
    const [lasttouch, setlasttouch] = useState(0);

    const validationSchema = yup.object().shape({
        questions: yup.array().of(
            yup.object().shape({
                question_text: yup.string().required("صورت سوال نمیتواند خالی باشد")
                    .min(10, "متن سوال باید حداقل 10 کاراکتر باشد")
                    .max(300, "متن سوال شما بیشتر از حداکثر مقدار قابل قبول است."),
                a_text: yup.string().required("گزینه ی اول نمیتواند خالی باشد").min(3, "هر گزینه باید حداقل 3 کاراکتر داشته باشد").max(100, "هر گزینه نمیتواند بیشتر از 100 کاراکتر باشد"),
                b_text: yup.string().required("گزینه ی دوم نمیتواند خالی باشد").min(3, "هر گزینه باید حداقل 3 کاراکتر داشته باشد").max(100, "هر گزینه نمیتواند بیشتر از 100 کاراکتر باشد"),
                c_text: yup.string().required("گزینه ی سوم نمیتواند خالی باشد").min(3, "هر گزینه باید حداقل 3 کاراکتر داشته باشد").max(100, "هر گزینه نمیتواند بیشتر از 100 کاراکتر باشد"),
                d_text: yup.string().required("گزینه ی چهارم نمیتواند خالی باشد").min(3, "هر گزینه باید حداقل 3 کاراکتر داشته باشد").max(100, "هر گزینه نمیتواند بیشتر از 100 کاراکتر باشد"),
                //مشخص نکنه گزینه ی 1 میشه جواب
                // key: yup.string().required(),
            })
        ),
        title: yup.string()
            .required("اسم گروه نمیتواند خالی باشد")
            .min(3, "اسم گروه نمیتواند کم تر از 3 حرف باشد"),

        description: yup.string()
            .required("توضیحات گروه نمیتواند خالی باشد"),
    });
    //  const [questions,setquestions]=[{question:"",a:"",b:"",c:"",d:"",key:""}];
    return (
        <View style={styles.container}>
            <ScrollView>

                {/* <TouchableOpacity style={{ position: 'absolute', alignSelf: 'flex-end', top: hp('1%'), right: hp('1%'), height: hp('5%'), width: wp('8%'), backgroundColor: 'white', position: 'absolute' }} onPress={() => setmodalopen(false)}>
                <AntDesign style={{ position: 'absolute', alignSelf: 'flex-end', top: hp('1%'), right: hp('1%') }} onPress={() => setmodalopen(false)}
                    name="close" size={23} color="#D75A5A" />
            </TouchableOpacity> */}

                <Formik
                    //  validateOnChange={false} 
                    style={{ borderStyle: 'dashed', justifyContent: 'space-around' }}
                    validationSchema={validationSchema}
                    initialValues={{
                        title: '', description: '', quiz_photo: require('../../assets/tea.jpg'), questions: [{ question_text: "", a_text: "", b_text: "", c_text: "", d_text: "", key: "1" }]
                        // soal:questions 
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, actions) => {

                        console.log('ON SUBMITTTTTTTTTTTTTT')
                        const formdata = new FormData();
                         formdata.append('title', values.title)
                         formdata.append('description', values.description)
                        // formdata.append("question_count",1);
                        console.log(picture.uri + "pictureee")
                        if (picture.uri === '../../assets/tea.jpg') {
                            console.log("defualt toye picture")
                        }
                        else
                           await formdata.append( "quiz_photo",picture)
                        console.log((await AsyncStorage.getItem('token')).toString()+"  token");
                        console.log(formdata.data + 'formdata')
                        var all = values;

                     //   all["quiz_photo"] = formdata;
                        
                        all["question_count"]=numofquestion-1;
                        for(var i=0;i<numofquestion-1;i++){
                            formdata.append(`questions[${i}]question_text`,all.questions[i].question_text)
                            formdata.append(`questions[${i}]a_text`,all.questions[i].a_text)
                            formdata.append(`questions[${i}]b_text`,all.questions[i].b_text)
                            formdata.append(`questions[${i}]c_text`,all.questions[i].c_text)
                            formdata.append(`questions[${i}]d_text`,all.questions[i].d_text)
                            formdata.append(`questions[${i}]key`,all.questions[i].key)
                        }
                       // console.log(all)
                        // var alll=json.stringify({
                        //     title:all.title,
                        //     description:all.description,
                        //     question_count:all.question_count,
                            
                        // })
                       formdata.append("question_count",numofquestion-1);
                      //  formdata.append("questions",all.questions)
                      //  formdata.append(all)
                     // console.log(JSON.stringify({"part":all,"quiz_photo":formdata})+"  innnnnnnn")
                      console.log(JSON.stringify(formdata)+" FORM DATA")
                        console.log(numofquestion+"num of questk;kj");

                        const response = await axiosinst.post('quiz', formdata, {
                            headers: {
                                 "Content-Type": "Application/json",
                                "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
                            }
                        }
                        )
                            .then(async function (response) {
                                console.log(JSON.stringify(response.data.Quiz)+" RESPONSE DATA")
                                const id=response.data.Quiz.id;
                              
                            


                            })
                            .catch(function (error) {
                                {
                                    console.log(error)

                                    Alert.alert('', 'مشکلی پیش اومده اینترنتت رو چک کن ما هم سرورامون رو چک میکنیم', [{


                                        text: 'فهمیدم', onPress: () => console.log('alert closed'), style: 'default'
                                    }], { cancelable: false }, { style: { height: 50 } })
                                }
                            })


                    }}
                >
                    {(props) => (

                        /* <Form onSubmit={props.handleSubmit}> */
                        <View style={{ marginTop: hp('5%') }}>
                            <View style={{ borderColor: 'blue' }}>

                                <View style={{ backgroundColor: "white", marginRight: wp("65%"), borderRadius: 100 }}>

                                    {/* // {props.values.quiz_photo === require('../../assets/quizicon.png') ?  */}
                                    {/* bedoone view nemishod in barr */}
                                    {props.values.quiz_photo === require('../../assets/tea.jpg') ? <TouchableOpacity style={{
                                        height: hp('14%'),
                                        //marginTop: hp('0%'),
                                        width: wp('28%'),
                                        left: wp('5%'),
                                        marginLeft: wp("0%"),
                                        //marginRight:wp("-90%"),
                                        borderRadius: 100,
                                        margin: 0,
                                        elevation: 10,
                                        // position: 'absolute',
                                        borderColor: 'blue',
                                        backgroundColor: "lightgreen"
                                    }}
                                        onPress={() => { pickfromgallery(props) }}>
                                        <ImageBackground borderRadius={100}

                                            source={props.values.quiz_photo}

                                            style={{
                                                height: hp('14%'),

                                                marginTop: hp('0%'),
                                                width: wp('28%'),
                                                left: wp('0%'),
                                                borderRadius: 20,
                                                margin: 0,
                                                position: 'absolute',
                                                //borderColor:'#1f7a8c',
                                                //borderWidth:wp('0.2%')
                                            }}
                                        //  onBlur={props.handleBlur('quiz_photo')}


                                        >

                                        </ImageBackground>

                                    </TouchableOpacity> : <TouchableOpacity style={{
                                        height: hp('14%'),
                                        marginTop: hp('0%'),
                                        width: wp('28%'),
                                        left: wp('5%'),
                                        borderRadius: 100,
                                        // position: 'absolute',
                                        borderColor: 'blue',
                                        backgroundColor: "lightgreen"
                                    }}
                                        onPress={() => { pickfromgallery(props, props.handleChange) }}>
                                            <ImageBackground borderRadius={100}
                                                source={{ uri: `${props.values.quiz_photo}` }}
                                                onChangeItem={props.handleChange('quiz_photo')}
                                                style={{
                                                    height: hp('14%'),

                                                    marginTop: hp('0%'),
                                                    width: wp('28%'),
                                                    marginLeft: wp('0%'),
                                                    borderRadius: 20,
                                                    position: 'absolute',
                                                }}
                                            //  onBlur={props.handleBlur('quiz_photo')}


                                            >

                                            </ImageBackground>
                                        </TouchableOpacity>}
                                </View>

                                <Text style={{ fontSize: hp('1.5%'), fontWeight: 'bold', color: '#1f7a8c', marginBottom: hp('1%'), marginLeft: wp('38%'), marginTop: hp("-11.3%") }}>نام کوییز</Text>
                                <Item style={styles.item} rounded >
                                    <Image source={require("../../assets/quizicon.png")} style={{ height: hp("3.5%"), width: wp("7%"), marginTop: hp("-5.7%"), marginBottom: hp("-5.5%"), marginLeft: wp("1%") }}></Image>

                                    {/* <Label style={{fontWeight:'bold'}}>نام گروه</Label> */}

                                    <Input style={styles.Input} autoCapitalize='words' autoCorrect={true}
                                        onChangeText={props.handleChange('title')}
                                        onBlur={props.handleBlur('title')}
                                        value={props.values.title}

                                        placeholder={'نام کوییز ...'} placeholderTextColor='gray' >
                                    </Input>

                                    <Text style={{ fontSize: hp('1.2%'), marginLeft: wp("0%"), marginTop: hp('8%'), color: '#FC4A68' }}>{props.touched.title && props.errors.title}</Text>

                                </Item>


                                <TouchableOpacity onPress={() => { pickfromgallery(props, props.handleChange) }} style={{ backgroundColor: '#EDF2F4', elevation: 1, height: hp('4.2%'), width: wp('8.5%'), top: hp('8%'), left: wp('-3%'), position: 'absolute', borderRadius: 100 }}>
                                    <EvilIcons onPress={() => { pickfromgallery(props, props.handleChange) }} name="camera" size={25} style={{ alignSelf: 'center', top: hp('1%') }} color="#1f7a8c" />
                                </TouchableOpacity>
                                <View style={{}}>
                                    <Text style={{ fontSize: hp('1.5%'), fontWeight: 'bold', color: '#1f7a8c', marginBottom: hp('-5%'), marginTop: hp('8%'), marginLeft: wp('5%') }}>توضیحات</Text>
                                    <TouchableOpacity activeOpacity={1}>
                                        <Textarea rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                                            borderColor={'#EDF2F4'}
                                            onChangeText={props.handleChange('description')}
                                            onBlur={props.handleBlur('description')}
                                            value={props.values.description}
                                            placeholder={'توضیحات کوییز ...'} placeholderTextColor='gray' fontSize={hp('1.6.5%')} style={styles.item2}>

                                        </Textarea>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ fontSize: hp('1.2%'), marginLeft: wp('5%'), marginTop: hp('1%'), color: '#FC4A68' }}>{props.touched.description && props.errors.description}</Text>
                                <Text style={{ fontSize: hp('1.5%'), fontWeight: 'bold', color: '#1f7a8c', marginBottom: hp('1%'), marginLeft: wp('5%'), marginTop: hp("3%") }}>سوالات:</Text>



                                <FieldArray validateOnChange={true} name={"questions"}>
                                    {({ push, pop, touched, errors }) => (
                                        <FlatList
                                            //بعدا لیست هدر بالایی ها
                                            // ListHeaderComponent={()=>(

                                            // )}
                                            name={"questions"}
                                            scrollEnabled={false}
                                            keyExtractor={(item) => {
                                                return (item.id)
                                                //   undefined
                                                //   questionss[numofquestion-1].id
                                            }}
                                            data={questionss}
                                            renderItem={({ item }) => {
                                                //  console.log(item.id + " ITEM IDDDDDDDDDDDDDDDDDD")
                                                // console.log(questionss[numofquestion-1].id+"  ID BA QUESTION")
                                                // const [values,setvalues]=useState("1")
                                                return (<>

                                                    <Createquizeachquestion setshowallerr={setshowallerror} showallerr={showallerror} touched={touched} pr={props} error={errors} itemidd={item.id}></Createquizeachquestion>
                                                    {/* //  propp={propss} */}
                                                </>)
                                            }}
                                            ListFooterComponent={() => (
                                                <View style={{ flexDirection: "row", marginBottom: hp("10%") }}>
                                                    <TouchableOpacity
                                                        onPress={async () => {
                                                            if (itemid + 1 <= 15) {
                                                                push({ question_text: "", a_text: "", b_text: "", c_text: "", d_text: "", key: "1" });
                                                                //props.errors.push(validationSchema);

                                                                // for(var i=numofquestion-1;i>=0;i--){
                                                                //     console.log(props.values.questions[i].question+" QQQQ");
                                                                //     console.log(props.values.questions[i].a+" aaaaa");
                                                                //     console.log(props.values.questions[i].b+" bbbbb");
                                                                //     console.log(props.values.questions[i].c+" ccccc");
                                                                //     console.log(props.values.questions[i].d+" ddddd");
                                                                //     console.log(props.values.questions[i].key+" key");
                                                                // }
                                                                //console.log(props.values.questions[0]+" VALUESSSS")
                                                                //console.log(props.values.questions[1]+" VALUESSSS")
                                                                //toye groups mygroups avali javab nemidad :\
                                                                console.log(props.error + "   PROP ERRORS")

                                                                // if(props.errors===null){
                                                                await setitemid(itemid + 1);
                                                                //   await setquestionss(questionss=>[...questionss,...{id:numofquestion,name:"اینجا سوم"}])
                                                                await setquestionss(questionss.concat({ id: itemid + 1, name: "ad;fk" }));
                                                                //    await setvalues(values.concat(numofquestion.toString()));
                                                                //  await setnumofquestion(numofquestion + 1);
                                                                // if (getIn(props.values, `questions[${itemid}].question`) === "") {
                                                                //     await props.handleChange(`questions[${itemid}].question`)(" ")
                                                                //     // await props.handleChange(`questions[${i}].question`)()
                                                                // }
                                                                // else if (getIn(props.values, `questions[${itemid}].a`) === "") {
                                                                //     await props.handleChange(`questions[${itemid}].a`)(" ")
                                                                //     // await props.handleChange(`questions[${i}].question`)()
                                                                // }
                                                                // else if (getIn(props.values, `questions[${itemid}].b`) === "") {
                                                                //     await props.handleChange(`questions[${itemid}].b`)(" ")
                                                                //     // await props.handleChange(`questions[${i}].question`)()
                                                                // }
                                                                // else if (getIn(props.values, `questions[${itemid}].c`) === "") {
                                                                //     await props.handleChange(`questions[${itemid}].c`)(" ")
                                                                //     // await props.handleChange(`questions[${i}].question`)()
                                                                // }
                                                                // else if (getIn(props.values, `questions[${itemid}].d`) === "") {
                                                                //     await props.handleChange(`questions[${itemid}].d`)(" ")
                                                                //     // await props.handleChange(`questions[${i}].question`)()
                                                                // }


                                                                // if(props.errors===undefined){
                                                                //     setstillhaveerror(false);

                                                                // }
                                                                // else{

                                                                // }
                                                                // if(getIn(props.touched, `questions[${itemid}].question`)===false ){
                                                                // await props.setFieldTouched(`questions[${itemid}].question`, true)
                                                                // }
                                                                // else if(getIn(props.touched, `questions[${itemid}].a`)===false ){
                                                                // await props.setFieldTouched(`questions[${itemid}].a`, true)
                                                                // }
                                                                // else if(getIn(props.touched, `questions[${itemid}].b`)===false ){
                                                                // await props.setFieldTouched(`questions[${itemid}].b`, true)
                                                                // }
                                                                // else if(getIn(props.touched, `questions[${itemid}].c`)===false ){
                                                                // await props.setFieldTouched(`questions[${itemid}].c`, true)
                                                                // }
                                                                // else if(getIn(props.touched, `questions[${itemid}].d`)===false ){
                                                                // await props.setFieldTouched(`questions[${itemid}].d`, true)
                                                                // }
                                                                //  console.log(getIn(props.values, `questions[${itemid}].question`) + " question" + itemid)

                                                                //      // await setvalues(values.concat(numofquestion));
                                                                //   await setquestions(questions.concat({question:"",a:"",b:"",c:"",d:"",key:""}))
                                                                //console.log(questionss);
                                                                // }
                                                            }
                                                            else {
                                                                new Promise(async (resolve, refect) => {

                                                                    await setmaxnumquestion(true);

                                                                    await setTimeout(async () => { await setmaxnumquestion(false); }, 4000)
                                                                    // .then( resolve())
                                                                    //  await setminnumquestion(false);


                                                                })
                                                                    .then(console.log("then!"))
                                                            }
                                                        }}
                                                        style={{ marginTop: hp("0%"), right: wp("-5.5%"), backgroundColor: "white", width: wp("23%"), marginBottom: hp("-1%") }}>
                                                        <Text style={{ color: "#1f7a8c", fontWeight: "bold", fontSize: hp("1.5.5%") }}>اضافه کردن سوال</Text>
                                                    </TouchableOpacity>
                                                    <Text style={{ marginTop: hp("0%"), alignSelf: "flex-start", marginLeft: wp("7%"), color: "#1f7a8c", fontWeight: "bold", fontSize: hp("1.5.5%") }}>/</Text>
                                                    {/* margint top in manfi kharab mishe ax 2.4 kharab va gheib mishe be balayi margin bottom dadam ke dorost beshe*/}
                                                    {/* gahi  yeki ro ke mizani oon yeki ro migire ... */}
                                                    <TouchableOpacity
                                                        onPress={async () => {
                                                            if (itemid > 2) {
                                                                pop();
                                                                for (var i = numofquestion - 1; i >= 0; i--) {
                                                                    console.log(props.values[i]);
                                                                }
                                                                await setitemid(itemid - 1);
                                                                //  console.log(questionss);
                                                                //  console.log(questionss.pop());
                                                                // console.log(questionss);
                                                                const temp = await questionss.pop();
                                                                console.log(temp);
                                                                //await  setquestionss(temp);
                                                                //  console.log(questionss[numofquestion-1].id+"id");
                                                                //inex nan
                                                                //await setquestionss(await questionss.pop())

                                                                await setnumofquestion(numofquestion - 1);
                                                            }
                                                            else {
                                                                new Promise(async (resolve, refect) => {
                                                                    await setminnumquestion(true);
                                                                    await setTimeout(async () => { await setminnumquestion(false); }, 5000)
                                                                    // .then( resolve())
                                                                    //  await setminnumquestion(false);


                                                                })
                                                                    .then(console.log("then!"))



                                                                //   return(<Text>پیاین سوالا</Text>)
                                                                //setminnumquestion(true);
                                                            }
                                                        }}
                                                        style={{ marginTop: hp("0.1%"), marginLeft: wp("2%"), backgroundColor: "white" }}>
                                                        <Text style={{ color: "#1f7a8c", fontSize: hp("1.5.5%"), fontWeight: "bold" }}>حذف کردن سوال</Text>
                                                    </TouchableOpacity>
                                                    {minnumquestion === true ?
                                                        <View style={{
                                                            backgroundColor: "#FEEBEC",
                                                            borderRadius: 10,
                                                            height: hp('4%'),
                                                            elevation: 300,
                                                            marginTop: hp("5.5%"),
                                                            right: hp("25%"),
                                                            width: wp("55.5%"),
                                                            marginBottom: hp("0%")
                                                            // alignSelf: "flex-end",
                                                        }}>

                                                            <Text style={{
                                                                color: "#f94144", fontSize: hp("1.3%"), fontWeight: "bold",
                                                                marginBottom: 0, top: hp("1%"),
                                                                alignSelf: "center",
                                                                // alignSelf: "flex-end", right: hp("25%"),
                                                                position: "relative"
                                                            }}>هر کوییز حداقل باید یک سوال داشته باشد</Text>
                                                        </View>
                                                        : null}
                                                    {maxnumquestion === true ?
                                                        <View style={{
                                                            backgroundColor: "#FEEBEC",
                                                            borderRadius: 10,
                                                            height: hp('4%'),
                                                            elevation: 300,
                                                            marginTop: hp("5.5%"),
                                                            right: hp("25%"),
                                                            width: wp("58%"),
                                                            marginBottom: hp("0%")
                                                        }}>

                                                            <Text style={{
                                                                color: "#f94144", fontSize: hp("1.3%"), fontWeight: "bold",
                                                                marginBottom: 0, top: hp("1%"),
                                                                alignSelf: "center",
                                                                // alignSelf: "flex-end", right: hp("25%"),
                                                                position: "relative"
                                                            }}>هر کوییز حداکثر میتواند بیست سوال داشته باشد.</Text>
                                                        </View>
                                                        : null}

                                                    {minnumquestion === false && maxnumquestion === false ?
                                                        <Button type={"submit"} bordered rounded style={styles.button}
                                                            //har taghiri chap vali onpress error ke function nist
                                                            //onPress={console.log(JSON.stringify(props.errors.questions))&console.log("button pressed!")}
                                                            onPress={
                                                                () => {

                                                                    props.handleSubmit()
                                                                    if (props.error === undefined) {

                                                                    }
                                                                    else {
                                                                        setstillhaveerror(false);
                                                                    }
                                                                }}
                                                        //async (resolve, reject) => {

                                                        // await setshowallerror(true);
                                                        // //new Promise(async()=>{
                                                        // console.log("toye subimtttttttttttttttttttttt")
                                                        // console.log(itemid + " item iddhfhgj")
                                                        // console.log(lasttouch + "lasttouch")
                                                        // await props.setFieldTouched("title", true)
                                                        // // await props.setFieldTouched("description", true)
                                                        // //  for (var i = lasttouch + 1; i <= itemid; i++) {


                                                        // // await props.setFieldTouched(`questions[${itemid}].question`, true)
                                                        // // await props.setFieldTouched(`questions[${itemid}].a`, true)
                                                        // // await props.setFieldTouched(`questions[${itemid}].b`, true)
                                                        // // await props.setFieldTouched(`questions[${itemid}].c`, true)
                                                        // // await props.setFieldTouched(`questions[${itemid}].d`, true)
                                                        // console.log(getIn(props.values, `questions[${itemid}].question`) + " question" + itemid)
                                                        // if (getIn(props.values, `questions[${itemid}].question`) === undefined) {
                                                        //     await props.handleChange(`questions[${itemid}].question`)("  ")
                                                        //     // await props.handleChange(`questions[${i}].question`)()
                                                        // }
                                                        // if (getIn(props.values, `questions[${itemid}].a`) === undefined) {
                                                        //     await props.handleChange(`questions[${itemid}].a`)("  ")
                                                        //     // await props.handleChange(`questions[${i}].question`)()
                                                        // }
                                                        // if (getIn(props.values, `questions[${itemid}].b`) === undefined) {
                                                        //     await props.handleChange(`questions[${itemid}].b`)("  ")
                                                        //     // await props.handleChange(`questions[${i}].question`)()
                                                        // }
                                                        // if (getIn(props.values, `questions[${itemid}].c`) === undefined) {
                                                        //     await props.handleChange(`questions[${itemid}].c`)("  ")
                                                        //     // await props.handleChange(`questions[${i}].question`)()
                                                        // }
                                                        // if (getIn(props.values, `questions[${itemid}].d`) === undefined) {
                                                        //     await props.handleChange(`questions[${itemid}].d`)("  ")
                                                        //     // await props.handleChange(`questions[${i}].question`)()
                                                        // }
                                                        // }
                                                        //setlasttouch(itemid)

                                                        // resolve()
                                                        // }).then(()=>{
                                                        //     console.log("pressed then")

                                                        // })

                                                        // setTimeout(() => {
                                                        //     console.log('ON SUBMITTTTTTTTTTTTTT')
                                                        //     const formdata = new FormData();
                                                        //     console.log(props.values+"    All values for submiting")
                                                        //     console.log("\n"+props.errors)
                                                        //     formdata.append('title', values.title)
                                                        //     formdata.append('summary', values.description)
                                                        //     if (picture.uri === '../../assets/tea.jpg') {
                                                        //     }
                                                        //     else
                                                        //         formdata.append('quiz_photo', picture)

                                                        //     console.log(formdata.data + 'formdata')
                                                        // }, 5000)
                                                        // setshowallerror(true)
                                                        //setTimeout(()=>setshowallerror(false),5000)

                                                        >
                                                            <Text style={{ color: '#E1E5F2', fontSize: hp('1.8%'), fontWeight: 'bold', left: wp('11%'), width: wp('40%') }}>ساخت کوییز</Text>
                                                        </Button> : null}

                                                    {/* <Modal transparent={true} StatusBar={{ backgroundColor: 'blue' }} style={{position:"relative"}} visible={minnumquestion} animationType='fade' >
                                                {/* <StatusBar backgroundColor='#BFDBF7' style='light' /> */}
                                                    {/* <View style={styles.centeredView}>
                                                    <View style={styles.modalView}>
                                                        <Text style={{
                                                            color: "#f94144", fontSize: hp("1.3%"), fontWeight: "bold",
                                                            marginBottom: 0, top: hp("1%"), alignSelf: "center"
                                                            // alignSelf: "flex-end", right: hp("25%"), position: "relative"
                                                        }}>هر کوییز حداقل باید یک سوال داشته باشد</Text>
                                                    </View>
                                                </View>
                                            </Modal> :) */}





                                                    {/* <Modal transparent={true} StatusBar={{ backgroundColor: 'blue' }} style={{ bottom: 100, margin: 40 }} visible={maxnumquestion} animationType='fade' >
                                            {/* <StatusBar backgroundColor='#BFDBF7' style='light' /> */}
                                                    {/* <View style={styles.centeredView}>
                                                <View style={styles.modalView}>
                                                    <Text style={{
                                                        color: "#f94144", fontSize: hp("1.3%"), fontWeight: "bold",
                                                        marginBottom: 0, top: hp("1%"),
                                                        // alignSelf: "center",
                                                        //  alignSelf: "flex-end", right: hp("25%"), position: "relative"
                                                    }}>هر کوییز حداکثر میتواند بیست سوال داشته باشد.</Text>
                                                </View>
                                            </View>
                                        </Modal> */}



                                                </View>)}
                                        >

                                        </FlatList>
                                    )}
                                </FieldArray>


                                {/* <TouchableOpacity style={{marginTop:hp("-2.5%"),fontWeight:"bold",fontSize:hp("1.5.5%")
                                ,marginLeft:wp("29%"),color:"#1f7a8c",fontWeight:"bold",marginBottom:hp("10%")}}>
                                <Text style={{fontSize:hp("1.5.5%"),color:"#1f7a8c",
                                // ,height:20,width:30
                                }}>حذف کردن سوال</Text>
                                </TouchableOpacity> */}


                            </View>
                        </View>
                        /* </Form> */

                    )}




                </Formik>
            </ScrollView >
        </View >

        // <View style={styles.container}>
        //   <View style={{ marginLeft: wp('2%') }}>
        //     <Text style={{ position: 'absolute', marginTop: 300 }}>a;ldjf;slkfjd;lksjf</Text>
        //     <Text style={{ position: 'absolute', marginTop: 350 }}>a;ldjf;slkfjd;lksjf</Text>
        //     <Text style={{ position: 'absolute', marginTop: 450 }}>a;ldjf;slkfjd;lksjf</Text>
        //    <View style={{ height: hp('2%') }}></View>
        //   </View>
        // </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //   position:'absolute',
        //   marginTop:-100,
        //backgroundColor: '#F2F5F7',
        //   height:1000,
        backgroundColor: "white",
        flex: 1,
    },
    button: {
        //  position:'absolute',
        marginTop: hp('8%'),
        marginBottom: hp("8%"),
        // alignSelf: 'center',
        width: wp('41%'),
        right: wp("26.4%"),
        backgroundColor: '#1f7a8c',
        borderColor: '#BFDBF7',
        // marginLeft:wp('18%'),
        borderRadius: 50

    },
    centeredView: {
        position: "relative",
        height: hp('40%'),
        width: wp("55.5%"),
        marginLeft: wp("5%"),
        marginTop: hp('84.9%'),
    },
    modalView: {
        // margin: 10,
        backgroundColor: "#FEEBEC",
        //    borderTopLeftRadius:10,
        //    borderTopRightRadius:10,
        // padding: 35,
        borderRadius: 10,
        height: hp('4%'),
        elevation: 300
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
    }, item2: {
        // marginLeft:wp('-2%'),
        // marginRight:wp('-1%'),
        backgroundColor: "white",
        elevation: 5,
        marginHorizontal: wp("5%"),
        marginTop: hp('6%'),
        fontSize: hp('2.5%'),
        marginBottom: hp("1%")
    },
    item: {
        marginLeft: wp('37%'),
        marginRight: wp('9%'),
        height: wp('9.5%'),
        borderColor: "lightblue",
        borderWidth: hp("0.1%"),
        backgroundColor: "#f2f5f7",

        elevation: 7
    },
    Input: {
        left: wp('8%'),
        fontSize: hp('1.5%'),
        fontWeight: 'bold',
        marginRight: wp('11%'),
        position: 'absolute',
        height: wp('9.5%'),
        width: wp('43.5%'),
        //  backgroundColor:"#F3F8F9"
    },
    avatar: {
        height: hp('14%'),
        marginTop: hp('-1.5%'),
        width: wp('28%'),
        marginLeft: wp('-1%'),
        borderRadius: 20,
        position: 'absolute'
    },
});
export default Createquiz;
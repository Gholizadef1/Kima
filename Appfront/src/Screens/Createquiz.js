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
import { FastField, Formik, formik, Form, FieldArray } from 'formik';
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

            formdata.append('photo', newfile)

            if (data.cancelled === false) {
                const back = {
                    photo: data
                }
                const backk = JSON.stringify(back);
                console.log(props.values.photo + 'formik photo1')
                props.values.photo = data.uri
                //baraye in ke rerender beshe va photo formik form taghir kone

                props.handleChange('photo')
                setpicture(newfile)

                console.log(picture + '  PICTURE')
                // change(data.uri)
                console.log(props.values.photo + 'formik photo2')
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
    const [questions, setquestions] = useState([{ id: 1, name: "اول" }])
    const [numofquestion, setnumofquestion] = useState(2)
    const [minnumquestion, setminnumquestion] = useState(false);
    const [maxnumquestion, setmaxnumquestion] = useState(false);
    const [picture, setpicture] = useState({ uri: '../../assets/tea.jpg', name: '', type: '' });
    //  const [soalha,setsoalha]=[{question:"",a:"",b:"",c:"",d:"",correct:""}];
    return (
        <View style={styles.container}>
            <ScrollView>

                {/* <TouchableOpacity style={{ position: 'absolute', alignSelf: 'flex-end', top: hp('1%'), right: hp('1%'), height: hp('5%'), width: wp('8%'), backgroundColor: 'white', position: 'absolute' }} onPress={() => setmodalopen(false)}>
                <AntDesign style={{ position: 'absolute', alignSelf: 'flex-end', top: hp('1%'), right: hp('1%') }} onPress={() => setmodalopen(false)}
                    name="close" size={23} color="#D75A5A" />
            </TouchableOpacity> */}

                <Formik style={{ borderStyle: 'dashed', justifyContent: 'space-around' }}
                    initialValues={{
                        Username: '', Discription: '', photo: require('../../assets/tea.jpg'), soalha: [{ question: "", a: "", b: "", c: "", d: "", correct: "1" }]
                        // soal:soalha 
                    }}
                    // validationSchema={userschema}
                    onSubmit={async (values, actions) => {
                        console.log('ON SUBMIT')
                        const formdata = new FormData();
                        formdata.append('title', values.Username)
                        formdata.append('summary', values.Discription)
                        if (picture.uri === '../../assets/tea.jpg') {
                        }
                        else
                            formdata.append('photo', picture)

                        console.log(formdata.data + 'formdata')
                    }}
                >
                    {(props) => (
                        //<Form> 
                        <View style={{ marginTop: hp('5%') }}>
                            <View style={{ borderColor: 'blue' }}>


                                {/* // {props.values.photo === require('../../assets/quizicon.png') ?  */}
                                {/* bedoone view nemishod in barr */}
                                {props.values.photo === require('../../assets/tea.jpg') ? <TouchableOpacity style={{
                                    height: hp('14%'),
                                    marginTop: hp('0%'),
                                    width: wp('28%'),
                                    marginLeft: wp('5%'),
                                    borderRadius: 100,
                                    // position: 'absolute',
                                    borderColor: 'blue',
                                    backgroundColor: "lightgreen"
                                }}
                                    onPress={() => { pickfromgallery(props) }}>
                                    <ImageBackground borderRadius={100}

                                        source={props.values.photo}

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
                                    onPress={() => { pickfromgallery(props, props.handleChange) }}>
                                        <ImageBackground borderRadius={100}
                                            source={{ uri: `${props.values.photo}` }}
                                            onChangeItem={props.handleChange('photo')}
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

                                <Text style={{ fontSize: hp('1.5%'), fontWeight: 'bold', color: '#1f7a8c', marginBottom: hp('1%'), marginLeft: wp('38%'), marginTop: hp("-11.3%") }}>نام کوییز</Text>
                                <Item style={styles.item} rounded >
                                    {/* <Label style={{fontWeight:'bold'}}>نام گروه</Label> */}

                                    <Input style={styles.Input} autoCapitalize='words' autoCorrect={true}
                                        onChangeText={props.handleChange('Username')}
                                        onBlur={props.handleBlur('Username')}
                                        value={props.values.Username}
                                        placeholder={'نام کوییز ...'} placeholderTextColor='gray' >
                                    </Input>

                                    <Text style={{ fontSize: hp('1.2%'), marginLeft: wp('-3.5%'), marginTop: hp('7%'), color: 'red' }}>{props.touched.Username && props.errors.Username}</Text>
                                </Item>
                                <Image source={require("../../assets/quizicon.png")} style={{ height: hp("3.5%"), width: wp("7%"), position: 'absolute', marginTop: hp("6.6%"), marginLeft: wp("38%") }}></Image>


                                <TouchableOpacity onPress={() => { pickfromgallery(props, props.handleChange) }} style={{ backgroundColor: '#EDF2F4', elevation: 1, height: hp('4.2%'), width: wp('8.5%'), top: hp('8%'), left: wp('-3%'), position: 'absolute', borderRadius: 100 }}>
                                    <EvilIcons onPress={() => { pickfromgallery(props, props.handleChange) }} name="camera" size={25} style={{ alignSelf: 'center', top: hp('1%') }} color="#1f7a8c" />
                                </TouchableOpacity>
                                <View>
                                    <Text style={{ fontSize: hp('1.5%'), fontWeight: 'bold', color: '#1f7a8c', marginBottom: hp('-5%'), marginTop: hp('8%'), marginLeft: wp('5%') }}>توضیحات</Text>
                                    <TouchableOpacity>
                                        <Textarea rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                                            borderColor={'#EDF2F4'}
                                            onChangeText={props.handleChange('Discription')}
                                            onBlur={props.handleBlur('Discription')}
                                            value={props.values.Discription}
                                            placeholder={'توضیحات کوییز ...'} placeholderTextColor='gray' fontSize={hp('1.6.5%')} style={styles.item2}>

                                        </Textarea>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ fontSize: hp('1.5%'), fontWeight: 'bold', color: '#1f7a8c', marginBottom: hp('1%'), marginLeft: wp('5%'), marginTop: hp("3%") }}>سوالات:</Text>



                                <FieldArray name={"soalha"}>
                                {({push,pop})=>(
                                    <FlatList
                                        //بعدا لیست هدر بالایی ها
                                        // ListHeaderComponent={()=>(

                                        // )}
                                        name={"soalha"}
                                        scrollEnabled={false}
                                        keyExtractor={(item) => {
                                            return (item.id)
                                            //   undefined
                                            //   questions[numofquestion-1].id
                                        }}
                                        data={questions}
                                        renderItem={({ item }) => {
                                          //  console.log(item.id + " ITEM IDDDDDDDDDDDDDDDDDD")
                                            // console.log(questions[numofquestion-1].id+"  ID BA QUESTION")
                                            // const [values,setvalues]=useState("1")
                                            return (<>
                                                <Text style={{ fontSize: 14, color: "green", width: 100, height: 20, position: "absolute", marginTop: 100 }}>{item.id}</Text>
                                                <Createquizeachquestion pr={props} itemidd={item.id}></Createquizeachquestion>
                                                     {/* //  propp={propss} */}
                                            </>)
                                        }}
                                        ListFooterComponent={() => (<View style={{ flexDirection: "row", marginBottom: hp("10%") }}>
                                            <TouchableOpacity
                                                onPress={async () => {
                                                    if (numofquestion <= 20) {
                                                        push({ question: "", a: "", b: "", c: "", d: "", correct: "1" });
                                                        for(var i=numofquestion-1;i>=0;i--){
                                                            console.log(props.values.soalha[i].question+" QQQQ");
                                                            console.log(props.values.soalha[i].a+" aaaaa");
                                                            console.log(props.values.soalha[i].b+" bbbbb");
                                                            console.log(props.values.soalha[i].c+" ccccc");
                                                            console.log(props.values.soalha[i].d+" ddddd");
                                                            console.log(props.values.soalha[i].correct+" correct");
                                                        }
                                                        //console.log(props.values.soalha[0]+" VALUESSSS")
                                                        //console.log(props.values.soalha[1]+" VALUESSSS")
                                                        //toye groups mygroups avali javab nemidad :\
                                                        await setitemid(itemid + 1);
                                                        //   await setquestions(questions=>[...questions,...{id:numofquestion,name:"اینجا سوم"}])
                                                        await setquestions(questions.concat({ id: numofquestion, name: "ad;fk" }));
                                                        //    await setvalues(values.concat(numofquestion.toString()));
                                                        await setnumofquestion(numofquestion + 1);
                                                        //      // await setvalues(values.concat(numofquestion));
                                                        //   await setsoalha(soalha.concat({question:"",a:"",b:"",c:"",d:"",correct:""}))
                                                        //console.log(questions);
                                                    }
                                                    else {
                                                        new Promise(async (resolve, refect) => {
                                                            await setmaxnumquestion(true);

                                                            await setTimeout(async () => { await setmaxnumquestion(false); }, 5000)
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
                                                    if (numofquestion > 2) {
                                                        pop();
                                                        for(var i=numofquestion-1;i>=0;i--){
                                                            console.log(props.values[i]);
                                                        }
                                                        await setitemid(itemid - 1);
                                                        //  console.log(questions);
                                                        //  console.log(questions.pop());
                                                        // console.log(questions);
                                                        const temp = await questions.pop();
                                                        console.log(temp);
                                                        //await  setquestions(temp);
                                                        //  console.log(questions[numofquestion-1].id+"id");
                                                        //inex nan
                                                        //await setquestions(await questions.pop())

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
                                                style={{ marginTop: hp("0%"), marginLeft: wp("2%"), backgroundColor: "white" }}>
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


                                            {minnumquestion === false && maxnumquestion === false ? <Button bordered rounded style={styles.button}
                                                onPress={props.handleSubmit}
                                            >
                                                <Text style={{ color: '#E1E5F2', fontSize: hp('1.8%'), fontWeight: 'bold', left: wp('11%'), width: wp('40%') }}>ساخت کوییز</Text>
                                            </Button> : null}
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
                    //</Form>
                    )}
                    


                </Formik>
            </ScrollView>
        </View>

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
        //   backgroundColor:'white',
        //   height:1000,
        flex: 1,
        backgroundColor: '#fff',
    },
    button: {
        //  position:'absolute',
        marginTop: hp('8%'),
        marginBottom: hp("-4%"),
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

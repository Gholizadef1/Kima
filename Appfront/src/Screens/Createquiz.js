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
import { Formik, formik } from 'formik';
import * as yup from 'yup';
import * as permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { EvilIcons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
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
    return (
        <View style={styles.container}>

            {/* <TouchableOpacity style={{ position: 'absolute', alignSelf: 'flex-end', top: hp('1%'), right: hp('1%'), height: hp('5%'), width: wp('8%'), backgroundColor: 'white', position: 'absolute' }} onPress={() => setmodalopen(false)}>
                <AntDesign style={{ position: 'absolute', alignSelf: 'flex-end', top: hp('1%'), right: hp('1%') }} onPress={() => setmodalopen(false)}
                    name="close" size={23} color="#D75A5A" />
            </TouchableOpacity> */}

            <Formik style={{ borderStyle: 'dashed', justifyContent: 'space-around' }}
                initialValues={{ Username: '', Discription: '', photo: require('../../assets/quiz2.jpg') }}
                // validationSchema={userschema}
                onSubmit={async (values, actions) => {
                    console.log('ON SUBMIT')
                    const formdata = new FormData();
                    formdata.append('title', values.Username)
                    formdata.append('summary', values.Discription)
                    if (picture.uri === '../../assets/quiz2.jpg') {
                    }
                    else
                        formdata.append('photo', picture)

                    console.log(formdata.data + 'formdata')
                }}
            >
                {(props) => (

                    <View style={{ marginTop: hp('5%') }}>
                        <View style={{ borderColor: 'blue' }}>
                            <ScrollView>

                                {/* // {props.values.photo === require('../../assets/quizicon.png') ?  */}
                                {/* bedoone view nemishod in barr */}
                                {props.values.photo === require('../../assets/quiz2.jpg') ? <TouchableOpacity style={{
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

                                </TouchableOpacity> : <TouchableOpacity style={styles.avatar}
                                    onPress={() => { pickfromgallery(props, props.handleChange) }}>
                                        <ImageBackground borderRadius={100}
                                            source={{ uri: `${props.values.photo}` }}
                                            onChangeItem={props.handleChange('photo')}
                                            style={styles.avatar}
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
                                <TouchableOpacity>
                                    <Textarea rowSpan={hp('0.9.1%')} bordered borderRadius={20}
                                        borderColor={'lightblue'}
                                        elevation={0}
                                        onChangeText={props.handleChange('Discription')}
                                        onBlur={props.handleBlur('Discription')}
                                        value={props.values.Discription}
                                        placeholder={'سوال اول ...'} placeholderTextColor='gray' fontSize={hp('1.6.5%')} style={{
                                            marginTop: hp("0%"), marginHorizontal: wp("5%"), height: hp("8%"),backgroundColor:"white"
                                        }}>

                                    </Textarea>

                                </TouchableOpacity>
                                <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                                   
                                        {/* <Text>First</Text> */}
                                        <View style={{marginTop:hp("3%"),marginHorizontal:wp("5%"),borderColor:"lightgray",backgroundColor:"white",borderRadius:20,borderWidth:hp("0.1%")}}>
                                        <TouchableOpacity>
                                        
                                        <Item rounded style={{marginLeft:wp("14%"),borderColor:"white"}}>
                                    <Input rounded rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                                        borderColor={'white'}
                                        onChangeText={props.handleChange('Discription')}
                                        onBlur={props.handleBlur('Discription')}
                                        value={props.values.Discription}
                                        placeholder={'گزینه اول ...'} placeholderTextColor='gray' fontSize={hp('1%')} style={{
                                            marginTop: hp("0%"),marginLeft:wp("1%"), height: hp("4%"),fontSize:hp("1.4%")
                                        }}>
                                     {/* <RadioButton value="5" /> */}
                                    </Input>
                                   
                                    </Item>
                                    </TouchableOpacity>
                                    <View style={{position:'absolute',marginTop:hp("0%"),marginLeft:wp("0%"),width:wp("15%"),borderRadius:20,height:hp("4%"),backgroundColor:"#EDF2F4"}}>
                                    <RadioButton color={"#1f7a8c"} value="1" />
                                    </View>
                                    </View>
                                    <View style={{marginTop:hp("3%"),marginHorizontal:wp("5%"),borderColor:"lightgray",backgroundColor:"white",borderRadius:20,borderWidth:hp("0.1%")}}>
                                        <TouchableOpacity>
                                        
                                        <Item rounded style={{marginLeft:wp("14%"),borderColor:"white"}}>
                                    <Input rounded rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                                        borderColor={'white'}
                                        onChangeText={props.handleChange('Discription')}
                                        onBlur={props.handleBlur('Discription')}
                                        value={props.values.Discription}
                                        placeholder={'گزینه دوم ...'} placeholderTextColor='gray' fontSize={hp('1%')} style={{
                                            marginTop: hp("0%"),marginLeft:wp("1%"), height: hp("4%"),fontSize:hp("1.4%")
                                        }}>
                                     {/* <RadioButton value="5" /> */}
                                    </Input>
                                   
                                    </Item>
                                    </TouchableOpacity>
                                    <View style={{position:'absolute',marginTop:hp("0%"),marginLeft:wp("0%"),width:wp("15%"),borderRadius:20,height:hp("4%"),backgroundColor:"#EDF2F4"}}>
                                    <RadioButton color={"#1f7a8c"} value="2" />
                                    </View>
                                    </View>
                                    <View style={{marginTop:hp("3%"),marginHorizontal:wp("5%"),borderColor:"lightgray",backgroundColor:"white",borderRadius:20,borderWidth:hp("0.1%")}}>
                                        <TouchableOpacity>
                                        
                                        <Item rounded style={{marginLeft:wp("14%"),borderColor:"white"}}>
                                    <Input rounded rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                                        borderColor={'white'}
                                        onChangeText={props.handleChange('Discription')}
                                        onBlur={props.handleBlur('Discription')}
                                        value={props.values.Discription}
                                        placeholder={'گزینه سوم ...'} placeholderTextColor='gray' fontSize={hp('1%')} style={{
                                            marginTop: hp("0%"),marginLeft:wp("1%"), height: hp("4%"),fontSize:hp("1.4%")
                                        }}>
                                     {/* <RadioButton value="5" /> */}
                                    </Input>
                                   
                                    </Item>
                                    </TouchableOpacity>
                                    <View style={{position:'absolute',marginTop:hp("0%"),marginLeft:wp("0%"),width:wp("15%"),borderRadius:20,height:hp("4%"),backgroundColor:"#EDF2F4"}}>
                                    <RadioButton color={"#1f7a8c"} value="3" />
                                    </View>
                                    </View>
                                    <View style={{marginTop:hp("3%"),marginHorizontal:wp("5%"),borderColor:"lightgray",backgroundColor:"white",borderRadius:20,borderWidth:hp("0.1%")}}>
                                        <TouchableOpacity>
                                        
                                        <Item rounded style={{marginLeft:wp("14%"),borderColor:"white"}}>
                                    <Input rounded rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                                        borderColor={'white'}
                                        onChangeText={props.handleChange('Discription')}
                                        onBlur={props.handleBlur('Discription')}
                                        value={props.values.Discription}
                                        placeholder={'گزینه چهارم ...'} placeholderTextColor='gray' fontSize={hp('1%')} style={{
                                            marginTop: hp("0%"),marginLeft:wp("1%"), height: hp("4%"),fontSize:hp("1.4%")
                                        }}>
                                     {/* <RadioButton value="5" /> */}
                                    </Input>
                                   
                                    </Item>
                                    </TouchableOpacity>
                                    <View style={{position:'absolute',marginTop:hp("0%"),marginLeft:wp("0%"),width:wp("15%"),borderRadius:20,height:hp("4%"),backgroundColor:"#EDF2F4"}}>
                                    <RadioButton color={"#1f7a8c"} value="4" />
                                    </View>
                                    </View>
                                </RadioButton.Group>
                                <Text>ladkjfhlksajhflkj</Text>
                                <Text>ladkjfhlksajhflkj</Text>
                                <Text>ladkjfhlksajhflkj</Text>
                                <Text>ladkjfhlksajhflkj</Text>
                            </ScrollView>
                        </View>
                    </View>
                )}


            </Formik>
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
    centeredView: {
        height: hp('40%'),
        marginTop: hp('15%'),
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 35,
        height: hp('65%'),
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
        height: wp('9.5%')
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

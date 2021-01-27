import React, { useState } from 'react';
import { StyleSheet, Text,Image, View ,Modal,ImageBackground,Alert,FlatList,ActivityIndicator,TextInput} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Item, Segment, Content,Input,Label,Textarea } from 'native-base';
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
import {Formik,formik} from 'formik';
import * as yup from 'yup';
// import { Button } from 'react-native-paper';
const Createquiz = () => {

    // useFocusEffect(
    //   React.useCallback(() => {   

    //   },[]))
    return (
        <View style={styles.container}>
            
                <TouchableOpacity style={{ position: 'absolute', alignSelf: 'flex-end', top: hp('1%'), right: hp('1%'), height: hp('5%'), width: wp('8%'), backgroundColor: 'white', position: 'absolute' }} onPress={() => setmodalopen(false)}>
                    <AntDesign style={{ position: 'absolute', alignSelf: 'flex-end', top: hp('1%'), right: hp('1%') }} onPress={() => setmodalopen(false)}
                        name="close" size={23} color="#D75A5A" />
                </TouchableOpacity>
             
                <Formik style={{ borderStyle: 'dashed', justifyContent: 'space-around' }}
                    initialValues={{ Username: '', Discription: '', photo: require('../../assets/group.jpg') }}
                    // validationSchema={userschema}
                    onSubmit={async (values, actions) => {
                        console.log('ON SUBMIT')
                        const formdata = new FormData();
                        formdata.append('title', values.Username)
                        formdata.append('summary', values.Discription)
                        if (picture.uri === '../../assets/group.jpg') {      
                        }
                        else
                            formdata.append('photo', picture)
                       
                        console.log(formdata.data + 'formdata')
                    }}
                >
                    {(props) => (
                        <View style={{ marginTop: hp('5%') }}>
                            <View style={{ borderColor: 'blue' }}>
                              

                                <Text style={{ fontSize: hp('1.5%'), fontWeight: 'bold', color: '#1f7a8c', marginBottom: hp('1%'), marginLeft: wp('33%') }}>نام کوییز</Text>
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
                                <Image source={require("../../assets/quizicon.png")} style={{height:hp("3.5%"),width:wp("7%"),position:'absolute',marginTop:hp("3.8%"),marginLeft:wp("33%")}}></Image>

                            </View>
                            <View>
                                <Text style={{ fontSize: hp('1.5%'), fontWeight: 'bold', color: '#1f7a8c', marginBottom: hp('-5%'), marginTop: hp('5%'), marginLeft: wp('3%') }}>توضیحات</Text>
                                <TouchableOpacity>
                                    <Textarea rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                                        borderColor={'lightgray'}
                                        onChangeText={props.handleChange('Discription')}
                                        onBlur={props.handleBlur('Discription')}
                                        value={props.values.Discription}
                                        placeholder={'توضیحات کوییز ...'} placeholderTextColor='gray' fontSize={hp('1.6.5%')} style={styles.item2}>

                                    </Textarea>
                                </TouchableOpacity>
                            </View>
                        
                        </View>
                    )}

                </Formik>
            </View>
    
        // <View style={styles.container}>
        //   <View style={{ marginLeft: wp('2%') }}>
        //     <Text style={{position:'absolute',marginTop:300}}>a;ldjf;slkfjd;lksjf</Text>
        //     <Text style={{position:'absolute',marginTop:350}}>a;ldjf;slkfjd;lksjf</Text>
        //     <Text style={{position:'absolute',marginTop:450}}>a;ldjf;slkfjd;lksjf</Text>
        //    <View style={{height:hp('2%')}}></View>
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
         height:hp('40%'),
        marginTop:hp('15%'),
      },
      modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 35,
         height:hp('65%'),
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
    }, item2:{
        // marginLeft:wp('-2%'),
        // marginRight:wp('-1%'),
        marginHorizontal:wp("3%"),
        marginTop:hp('6%'),
        fontSize:hp('2.5%'),
      },
      item:{
        marginLeft:wp('31%'),
        marginRight:wp('5%'),
        height:wp('9.5%')       
      },
      Input:{
        left:wp('8%'),
        fontSize:hp('1.5%'),
        fontWeight:'bold',
        marginRight:wp('10%'),
        position:'absolute',
        height:wp('9.5%'),
         width:wp('31.5%')
      }, 
      avatar: {
        height: hp('14%'),
        marginTop:hp('-1.5%'),
        width: wp('28%'),
        marginLeft:wp('-1%'),
        borderRadius: 20,
        position:'absolute'
      },
});
export default Createquiz;

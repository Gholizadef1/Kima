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
const Createquizeachquestion = (prop) => {
    const [value, setValue] = React.useState("1");
    return (<View style={{marginBottom:hp("1.5%")}}>
        <TouchableOpacity>
            <Textarea rowSpan={hp('0.9.1%')} bordered borderRadius={20}
                borderColor={'lightblue'}
                elevation={0}
                onChangeText={prop.pr.handleChange('Discription')}
                onBlur={prop.pr.handleBlur('Discription')}
                value={prop.pr.values.Discription}
                placeholder={'سوال '+prop.itemidd+" ... " } placeholderTextColor='gray' fontSize={hp('1.6.5%')} style={{
                    marginTop: hp("0%"), marginHorizontal: wp("5%"), height: hp("8%"), backgroundColor: "white"
                }}>

            </Textarea>

        </TouchableOpacity>
        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>

            {/* <Text>First</Text> */}
            <View style={{ marginTop: hp("3%"), marginRight: wp("12%"), marginHorizontal: wp("5%"), borderColor: "lightgray", backgroundColor: "white", borderRadius: 20, borderWidth: hp("0.1%") }}>
                <TouchableOpacity>

                    <Item rounded style={{ marginLeft: wp("14%"), borderColor: "white", backgroundColor: "white" }}>
                        <Input rounded rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                            borderColor={'white'}
                            onChangeText={prop.pr.handleChange('Discription')}
                            onBlur={prop.pr.handleBlur('Discription')}
                            value={prop.pr.values.Discription}
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
            <View style={{ marginTop: hp("3%"), marginRight: wp("12%"), marginHorizontal: wp("5%"), borderColor: "lightgray", backgroundColor: "white", borderRadius: 20, borderWidth: hp("0.1%") }}>
                <TouchableOpacity>

                    <Item rounded style={{ marginLeft: wp("14%"), borderColor: "white" }}>
                        <Input rounded rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                            borderColor={'white'}
                            onChangeText={prop.pr.handleChange('Discription')}
                            onBlur={prop.pr.handleBlur('Discription')}
                            value={prop.pr.values.Discription}
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
            <View style={{ marginTop: hp("3%"), marginHorizontal: wp("5%"), marginRight: wp("12%"), borderColor: "lightgray", backgroundColor: "white", borderRadius: 20, borderWidth: hp("0.1%") }}>
                <TouchableOpacity>

                    <Item rounded style={{ marginLeft: wp("14%"), borderColor: "white" }}>
                        <Input rounded rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                            borderColor={'white'}
                            onChangeText={prop.pr.handleChange('Discription')}
                            onBlur={prop.pr.handleBlur('Discription')}
                            value={prop.pr.values.Discription}
                            placeholder={'گزینه سوم ...'} placeholderTextColor='gray' fontSize={hp('1%')} style={{
                                marginTop: hp("0%"), marginLeft: wp("1%"), height: hp("4%"), fontSize: hp("1.4%")
                            }}>
                            {/* <RadioButton value="5" /> */}
                        </Input>

                    </Item>
                </TouchableOpacity>
                <View style={{ position: 'absolute', marginTop: hp("0%"), marginLeft: wp("0%"), width: wp("15%"), borderRadius: 20, height: hp("4%"), backgroundColor: "#EDF2F4" }}>
                    <RadioButton color={"#1f7a8c"} value="3" />
                </View>
            </View>
            <View style={{ marginTop: hp("3%"), marginBottom: hp("5%"), marginRight: wp("12%"), marginHorizontal: wp("5%"), borderColor: "lightgray", backgroundColor: "white", borderRadius: 20, borderWidth: hp("0.1%") }}>
                <TouchableOpacity>

                    <Item rounded style={{ marginLeft: wp("14%"), borderColor: "white" }}>
                        <Input rounded rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                            borderColor={'white'}
                            onChangeText={prop.pr.handleChange('Discription')}
                            onBlur={prop.pr.handleBlur('Discription')}
                            value={prop.pr.values.Discription}
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
        </RadioButton.Group>
    </View>
    )
}
export default Createquizeachquestion;
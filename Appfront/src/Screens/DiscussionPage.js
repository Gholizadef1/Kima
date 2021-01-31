import React, { useState, useEffect, useDebugValue } from 'react';
import { StyleSheet, Text, View, Modal, ImageBackground, Image, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Card, List, ListItem, Thumbnail, Item, Input, Textarea } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Formik, formik } from 'formik';
import * as yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';

const userschema = yup.object({

    Description: yup.string()
        .required(" متن شما نمیتواند خالی باشد")

})

const DiscussionPage = (prop) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [username, setusername] = useState(null);
    const [loading, setloading] = useState(true)
    const [refreshchats, setrefreshchats] = useState(false)
    const [picture, setpicture] = useState(null);
    const [chats, setChats] = useState();
    const discussionid = prop.route.params.id;
    const groupid = prop.route.params.id2;

    useEffect(() => {
        getChats()
        getUsername()
    }, []);

    const getUsername = async () => {
        const id = await AsyncStorage.getItem('id');
        const response = axiosinst.get('/user/' + id)
            .then(function (response) {
                console.log('USERNAME' + response.data.username)
                setusername(response.data.username)
            })
    };

    const getChats = async () => {

        axiosinst.get('/group/' + groupid + '/discussion/' + discussionid + '/chat', {
            "headers": {
                "content-type": "application/json",
                "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
            }
        })
            .then(function (response) {

                console.log('DATEE' + response.data.chats[0].send_time)

                //   console.log('CHATT'+response.data.chats[0].chat_text)
                //   console.log('USERR'+response.data.chats[0].user.username)
                setChats(response.data.chats)
                setloading(false)
                console.log('CHATT' + chats[0].user.username)
            })

            .catch(async function (error) {
                console.log(error);
                console.log(error.code + 'ERROR CODE')
            });
    }
    //   console.log('CHATT'+chats.chat_text)
    //   console.log('USERR'+chats.user.username)

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator animating color={'gray'} size={"large"}></ActivityIndicator>
            </View>
        );
    }
    else {
        return (
            <View style={styles.container}>
                <View>
                    <Modal transparent={true} StatusBar={{ backgroundColor: 'blue' }} style={{ bottom: 100, margin: 20, position: 'absolute' }} visible={modalVisible} animationType='fade' >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TouchableOpacity style={{ position: 'absolute', alignSelf: 'flex-end', top: hp('1%'), right: hp('1%'), height: hp('5%'), width: wp('8%'), backgroundColor: 'white', position: 'absolute' }} onPress={() => setModalVisible(false)}>
                                    <AntDesign style={{ position: 'absolute', alignSelf: 'flex-end', top: hp('1%'), right: hp('1%') }} onPress={() => setModalVisible(false)}
                                        name="close" size={23} color="#D75A5A" />
                                </TouchableOpacity>
                                <Formik style={{ borderStyle: 'dashed', justifyContent: 'space-around' }}
                                    initialValues={{ Description: '' }}
                                    validationSchema={userschema}

                                    onSubmit={async (values, actions) => {
                                        console.log('ON SUBMIT')
                                        const formdata = new FormData();
                                        formdata.append('chat_text', values.Description)

                                        const response = await axiosinst.post('/group/' + groupid + '/discussion/' + discussionid + '/chat', formdata, {
                                            headers: {
                                                "Content-Type": "application/json",
                                                "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
                                            }
                                        }
                                        )
                                            .then(function (response) {
                                                console.log(response)
                                                Alert.alert('', ' پیام شما ارسال شد', [
                                                    {
                                                        text: 'فهمیدم', style: 'default', onPress: () => console.log('alert closed')
                                                    }
                                                ], { cancelable: false }, { style: { height: 50 } })
                                                getChats();
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
                                        <View style={{ marginTop: hp('5%') }}>
                                            <View style={{ borderColor: 'blue' }}>
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold', color: '#1f7a8c', marginBottom: hp('-5%'), marginTop: hp('5%'), marginLeft: wp('1%') }}>متن خود را وارد کنید</Text>
                                                <TouchableOpacity>
                                                    <Textarea rowSpan={hp('1%')} bordered borderRadius={8}
                                                        borderColor={'lightgray'}
                                                        onChangeText={props.handleChange('Description')}
                                                        onBlur={props.handleBlur('Description')}
                                                        value={props.values.Description}
                                                        placeholder={' پیام شما ...'} placeholderTextColor='gray' fontSize={hp('1.8%')} style={styles.item2}>
                                                    </Textarea>
                                                </TouchableOpacity>
                                                <Text style={{ fontSize: hp('1.2%'), marginTop: hp('0.5%'), color: 'red' }}>{props.touched.Description && props.errors.Description}</Text>
                                            </View>
                                            <Button bordered rounded style={styles.button}
                                                onPress={props.handleSubmit}
                                            >
                                                <Text style={{ color: '#E1E5F2', fontSize: hp('1.8%'), fontWeight: 'bold', left: wp('11%'), width: wp('40%') }}> ارسال پیام</Text>
                                            </Button>
                                        </View>
                                    )}
                                </Formik>
                            </View>
                        </View>
                    </Modal>
                </View>

                <ScrollView>
                    <Header style={{ backgroundColor: '#1F7A8C', height: hp('15%'), width: wp('100%') }} />
                    <Title style={{ fontSize: 24, fontWeight: 'bold', color: '#E1E5F2', marginTop: hp('-8%'), marginLeft: 10, marginBottom: hp('3%') }}>{prop.route.params.title}</Title>
                    <FlatList
                        style={{ marginBottom: hp('5%') }}
                        showsVerticalScrollIndicator={true}
                        onEndReached={() => {
                            //            console.log('-----AKHAR LIST')
                        }}
                        onEndReachedThreshold={0.5}
                        keyExtractor={(item) => item.id}
                        refreshing={refreshchats}
                        onRefresh={async () => {
                            console.log('refresh')
                        }}
                        data={chats}
                        renderItem={({ item }) => <>
                            {username != item.user.username ?
                                <View style={{}}>
                                    {picture != 'http://699170b6d987.ngrok.io/media/default.png' ? <Avatar.Image style={styles.avatar} size={90}
                                        source={{ uri: item.user.profile_photo }}
                                    ></Avatar.Image> : <Avatar.Image style={{}} size={10}
                                        source={require('../../assets/group.jpg')}
                                    ></Avatar.Image>}
                                    <Card style={styles.cardChat}>
                                        <Text style={{ alignSelf: 'flex-start', fontSize: 14, marginLeft: wp('38%'), marginTop: hp('0.5%') }}>{item.user.username}</Text>
                                        <Text style={{ color: '#a9a9a9', marginLeft: wp('4%'), marginTop: hp('0.5%'), marginBottom: hp('6%') }}>{item.chat_text}</Text>
                                    </Card>
                                </View>
                                : <View style={{}}>
                                    {picture != 'http://699170b6d987.ngrok.io/media/default.png' ? <Avatar.Image style={styles.avatar2} size={90}
                                        source={{ uri: item.user.profile_photo }}
                                    ></Avatar.Image> : <Avatar.Image style={{}} size={10}
                                        source={require('../../assets/group.jpg')}
                                    ></Avatar.Image>}
                                    <Card style={styles.cardChat2}>
                                        <Text style={{ alignSelf: 'flex-start', fontSize: 14, marginLeft: wp('38%'), marginTop: hp('0.5%') }}>{item.user.username}</Text>
                                        <Text style={{ color: '#a9a9a9', marginLeft: wp('4%'), marginTop: hp('0.5%'), marginBottom: hp('6%') }}>{item.chat_text}</Text>
                                    </Card>
                                </View>}
                        </>
                        }
                    >
                    </FlatList>
                    <Button onPress={() => setModalVisible(true)} style={{
                        marginTop: hp('57%'),
                        width: 180, borderRadius: 20, marginLeft: wp('28%')
                        , backgroundColor: '#1F7A8C'
                    }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', marginLeft: wp('16%') }}> ارسال پیام </Text>
                    </Button>
                </ScrollView>



                {/* <TouchableOpacity>
                    <MaterialIcons name="send" size={24} color="black" style={{}} />
                </TouchableOpacity> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        marginLeft: wp('2%'),
        top: hp('3%'),
        width: wp('14%'),
        height: hp('8%'),
        marginTop: hp('5%')
    },
    avatar2: {
        marginLeft: wp('82%'),
        top:hp('3%'),
        width: wp('14%'),
        height: hp('8%'),
        marginTop: hp('5%')
    },

    centeredView: {
        height: hp('40%'),
        marginTop: hp('15%'),
    },
    button: {
        marginTop: hp('1%'),
        alignSelf: 'center',
        width: wp('41%'),
        backgroundColor: '#1f7a8c',
        borderColor: '#BFDBF7',
        borderRadius: 50

    },
    modalView: {
        margin: 13,
        marginTop: 20,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 15,
        height: hp('65%'),
        elevation: 300
    },
    item2: {
        marginLeft: wp('-2%'),
        marginRight: wp('-1%'),
        marginTop: hp('6%'),
        fontSize: hp('2.5%')
    },
    item: {
        marginLeft: wp('-2%'),
        marginRight: wp('45%'),
        height: wp('9.5%')
    },
    cardChat: {
        width: wp('50%'),
        marginLeft: wp('20%'),
        marginTop: hp('-5%'),
        top: hp('-5%'),
        marginBottom: hp('-5%'),
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#EDF2F4',

    },
    cardChat2: {
        width: wp('50%'),
        marginLeft: wp('27%'),
        marginTop: hp('-5%'),
        top: hp('-5%'),
        marginBottom: hp('-4%'),
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: '#EDF2F4',

    }
})
export default DiscussionPage;
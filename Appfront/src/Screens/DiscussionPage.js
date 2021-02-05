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
    const [chatsPage, setChatsPage] = useState(1);
    const [chatAgain, setchatAgain] = useState(0);
    const [theend, settheend] = useState(false)
    const [chatsCount, setChatsCount] = useState();
    const [counter, setCounter] = useState();



    useEffect(() => {
        getUsername()
    }, []);

    const getUsername = async () => {
        const id = await AsyncStorage.getItem('id');
        const response = axiosinst.get('/user/' + id)
            .then(function (response) {
                setusername(response.data.username)
            })
    };
    useEffect(() => {
        const getChats = async () => {
            axiosinst.get('/group/' + groupid + '/discussion/' + discussionid + '/chat?page=' + chatsPage, {
                "headers": {
                    "content-type": "a`pplication/json",
                    "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
                }
            })
                .then(function (response) {
                    setChats(response.data.chats)
                    setChatsCount(response.data.count)
                    setloading(false)
                })

                .catch(async function (error) {
                    console.log(error);
                    console.log(error.code + 'ERROR CODE')
                });
        }
        getChats();
    }, [chatsPage, chatAgain, groupid, discussionid]);

    const handleLoadMore = async () => {

        if (chatsPage < chatsCount) {
                setChatsPage(chatsPage + 1)
                getChats(chatsPage)
                setchatAgain(0)
        }
        else {
            settheend(true)
        }
    };


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
                                                setchatAgain(chatAgain + 1)
                                                getChats();

                                            })
                                            .catch(function (error) {
                                                {
                                                    console.log(error)
                                                    Alert.alert('', '  مشکلی پیش اومده لطفا دوباره امتحان کن ', [{
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
                    <Header style={{ backgroundColor: '#EDF2F4', height: hp('13%'), width: wp('100%'), borderEndColor: '#EDF2F4' }} />
                    <Title style={{ fontSize: 22, fontWeight: 'bold', color: '#1F7A8C', marginTop: hp('-7%'), marginLeft: 10, marginBottom: hp('3%') }}>{prop.route.params.title}</Title>
                    <FlatList
                        style={{ marginBottom: hp('5%') }}
                        removeClippedSubviews={true}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        data={chats}
                        refreshing={refreshchats}
                        onEndReached={() => handleLoadMore()}
                        onEndReachedThreshold={0.7}
                        ListFooterComponent={(theend === false ? <View style={styles.loader}><ActivityIndicator animating color={'gray'} size={"large"}></ActivityIndicator></View> :
                            <View style={styles.loader}><Text style={{ color: 'gray', alignSelf: 'center' }}>پیام دیگری وجود ندارد</Text></View>)}
                        style={{ marginBottom: hp('15.5%') }}
                        onRefresh={async () => {
                            await setrefreshchats(true)

                            setChatsPage(chatsPage + 1)

                        }}
                        renderItem={({ item }) => <>
                            {username === item.user.username ?
                                <View style={{}}>
                                    {item.user.profile_photo != '/media/default.png' ? <Avatar.Image
                                        source={{ uri: "http://c4e2a698ddac.ngrok.io" + item.user.profile_photo }}
                                    ></Avatar.Image> : <Avatar.Image size={55} style={styles.avatar}
                                        source={require('../../assets/group.jpg')}
                                    ></Avatar.Image>}
                                    <Card style={styles.cardChat}>
                                        <Text style={{ alignSelf: 'flex-start', fontSize: 14, marginLeft: wp('38%'), marginTop: hp('0.5%'), color: '#a9a9a9' }}>{item.user.username}</Text>
                                        <Text style={{ marginLeft: wp('4%'), marginTop: hp('0.5%'), marginBottom: hp('6%'),color:'black' }}>{item.chat_text}</Text>
                                        <Text style={{ fontSize: 12, color: '#a9a9a9', marginRight: '3%', marginBottom: hp('1%') }}>{item.send_time.toString().split('T')[0]}</Text>
                                        <TouchableOpacity onPress={async () => {
                                            await Alert.alert(
                                                'از حذف این پیام اطمینان دارید؟',
                                                '',
                                                [
                                                    {
                                                        text: 'انصراف',
                                                        onPress: () => console.log('Cancel Pressed'),
                                                        style: 'default'
                                                    },
                                                    {
                                                        text: 'حذف', onPress: async () => {
                                                            axiosinst.delete("group/" + groupid + '/discussion/' + discussionid + '/chat/' + item.id, {
                                                                "headers":
                                                                {
                                                                    "Content-Type": "application/json",
                                                                    "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
                                                                }
                                                            })
                                                                .then(async function (response) {
                                                                    Alert.alert('', 'پیام شما حذف شد ', [
                                                                        {
                                                                            text: 'فهمیدم', style: 'default', onPress: () => console.log('alert closed')
                                                                        }
                                                                    ], { cancelable: false }, { style: { height: hp('40%') } })
                                                                    setchatAgain(chatAgain - 1)
                                                                    getChats();
                                                                })
                                                                .catch(function (error) {
                                                                    console.log(error);
                                                                    console.log('delete error ||||||||||||')

                                                                })
                                                        }
                                                    }
                                                ],
                                                { cancelable: false }
                                            );
                                        }}>
                                            <AntDesign name="delete" size={20} color="#1F7A8C" style={{ marginRight: wp('43%'), marginBottom: hp('1%'), marginTop: hp('-3%') }} />
                                        </TouchableOpacity>
                                    </Card>
                                </View>
                                : <View style={{}}>
                                    {item.user.profile_photo != '/media/default.png' ? <Avatar.Image
                                        source={{ uri: "http://c4e2a698ddac.ngrok.io" + item.user.profile_photo }}
                                    ></Avatar.Image> : <Avatar.Image size={55} style={styles.avatar2}
                                        source={require('../../assets/group.jpg')}
                                    ></Avatar.Image>}
                                    <Card style={styles.cardChat2}>
                                        <Text style={{ alignSelf: 'flex-start', fontSize: 14, marginLeft: wp('38%'), marginTop: hp('0.5%'), color: '#a9a9a9' }}>{item.user.username}</Text>
                                        <Text style={{ color: 'black', marginLeft: wp('5%'), marginRight: wp('3%'), marginTop: hp('0.5%'), marginBottom: hp('6%') }}>{item.chat_text}</Text>
                                        <Text style={{ fontSize: 12, color: '#a9a9a9', marginRight: '3%' }}>{item.send_time.toString().split('T')[0]}</Text>
                                    </Card>
                                </View>}
                        </>
                        }
                    >
                    </FlatList>

                    {chats.length === 0 ?
                        <Text style={{ marginLeft: wp('18%'), marginTop: hp('20%'), fontSize: 15, color: '#1F7A8C' }}>در این بحث تابحال صحبتی صورت نگرفته ...</Text> : null}

                    <Button onPress={() => setModalVisible(true)} style={{
                        marginTop: hp('30%'),
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
        top: hp('10%'),
        marginTop: hp('-1%')
    },
    avatar2: {
        marginLeft: wp('82%'),
        top: hp('5%'),
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
        marginTop: hp('1%'),
        top: hp('-8%'),
        marginBottom: hp('-5%'),
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#EDF2F4',

    },
    cardChat2: {
        width: wp('50%'),
        marginLeft: wp('28.5%'),
        marginTop: hp('-7%'),
        top: hp('-5%'),
        marginBottom: hp('-4%'),
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: '#EDF2F4',

    }
})
export default DiscussionPage;
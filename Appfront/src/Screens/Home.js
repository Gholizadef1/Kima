import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TouchableOpacity, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Container, Header, Left, Body, Right, Title, CardItem, Card } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axiosinst from '../api/axiosinst';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Allhomepageresults from "./Allhomepageresults";


const Home = ({ navigation }) => {

    const [image, setImage] = useState([])
    const [best, setbest] = useState([])
    const [mostdis, setmostdis] = useState([])
    const [loading1, setloading1] = useState(true)
    const [loading2, setloading2] = useState(true)
    const [loading3, setloading3] = useState(true)

    useFocusEffect(
        React.useCallback(() => {
            getImageFromAPI()
            getbestsFromAPI()
            getmostFromAPI();
        }, [])
    )


    function getImageFromAPI() {
        axiosinst.get('/book')
            .then(function (response) {
                setImage(response.data)
                setloading1(false)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    function getbestsFromAPI() {
        axiosinst.get('/book?filter=rate')
            .then(function (response) {
                setbest(response.data)
                setloading2(false)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    function getmostFromAPI() {
        axiosinst.get('/book?filter=comment')
            .then(function (response) {
                setmostdis(response.data)
                setloading3(false)
            })
            .catch(function (error) {
                console.log(error)
            })
    }


    if (!image) {
        return null
    }

    if (loading1 === false && loading2 === false && loading3 === false) {
        return (
            <Container style={styles.frame}>
                <ScrollView>
                    <Header style={{ backgroundColor: '#1F7A8C', marginTop: hp('4.5%') }} />
                    <Title style={{ fontSize: hp('3%'), fontWeight: 'bold', color: '#E1E5F2', marginTop: hp('-6.1%'), marginLeft: wp('2.5%') }}>کیما</Title>
                    <ScrollView>
                        <View style={{ padding: hp('-2%'), marginRight: wp('2%') }}>
                        </View>
                        <View>

                            <Text style={{
                                fontSize: hp('2.5%'), fontWeight: 'bold', color: '#1F7A8C',
                                marginTop: hp('5%'), marginLeft: wp('2%'),marginBottom:hp("-0.5%"), fontWeight: 'bold'
                            }}>کتاب های پیشنهادی</Text>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                data={image}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ paddingVertical: hp('3'), paddingLeft: wp('2.5%') }}>
                                            <TouchableOpacity onPress={() => navigation.navigate('Showbookview', { id: item.id })}>
                                                <Card style={{ backgroundColor: '#1F7A8C', borderRadius: 10 }}>
                                                    <CardItem cardBody>
                                                        <Image source={{ uri: item.imgurl }} style={{
                                                            width: 120,
                                                            height: 180, borderRadius: 10
                                                        }} />
                                                    </CardItem>
                                                </Card>
                                                <CardItem>
                                                    <Text style={styles.ImageText}>{item.title}</Text>
                                                </CardItem>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                                }
                            />
                        </View>
                    </ScrollView>


                    <ScrollView>
                        <View style={{ padding: hp('-2%'), marginRight: wp('2%'),marginTop:hp("-1.3%") }}>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: hp('2.5%'), fontWeight: 'bold', color: '#1F7A8C',
                                marginTop: hp('5%'), marginLeft: wp('2%'), fontWeight: 'bold',marginBottom:hp("-0.5%")
                            }}>کتاب های برتر</Text>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                data={best}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ paddingVertical: hp('3'), paddingLeft: wp('2.5%') }}>
                                            <TouchableOpacity onPress={() => navigation.navigate('Showbookview', { id: item.id })}>
                                                <Card style={{ backgroundColor: '#1F7A8C', borderRadius: 10 }}>
                                                    <CardItem cardBody>
                                                        <Image source={{ uri: item.imgurl }} style={{
                                                            width: 120,
                                                            height: 180, borderRadius: 10
                                                        }} />
                                                    </CardItem>
                                                </Card>
                                                <CardItem>
                                                    <Text style={styles.ImageText}>{item.title}</Text>
                                                </CardItem>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                                }
                            />
                        </View>
                    </ScrollView>

                    <ScrollView>
                        <View style={{ padding: hp('-2%'), marginRight: wp('2%'),marginTop:hp("-1.3%") }}>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: hp('2.5%'), fontWeight: 'bold', color: '#1F7A8C',
                                marginTop: hp('5%'), marginLeft: wp('2%'), fontWeight: 'bold',marginBottom:hp("-0.5%")
                            }}>پربحث ترین کتاب ها</Text>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                data={mostdis}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ paddingVertical: hp('3'), paddingLeft: wp('2.5%') }}>
                                            <TouchableOpacity onPress={() => navigation.navigate('Showbookview', { id: item.id })}>
                                                <Card style={{ backgroundColor: '#1F7A8C', borderRadius: 10 }}>
                                                    <CardItem cardBody>
                                                        <Image source={{ uri: item.imgurl }} style={{
                                                            width: 120,
                                                            height: 180, borderRadius: 10
                                                        }} />
                                                    </CardItem>
                                                </Card>
                                                <CardItem>
                                                    <Text style={styles.ImageText}>{item.title}</Text>
                                                </CardItem>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                                }
                            />
                        </View>
                    </ScrollView>
                    <AntDesign
                        onPress={() => {
                            navigation.navigate("allhomeresults")
                            console.log("onpress")
                        }}
                        name="arrowleft" style={{ marginTop: hp("15.5%"), position: "absolute", alignSelf: "flex-end", right: wp("4%") }} size={hp("3%")} color="#1f7a8c" />

                    {/* <AntDesign
                        onPress={() => {
                            navigation.navigate("alltopbooksresults")
                            console.log("onpress")
                        }}
                        name="arrowleft" style={{ marginTop: hp("60.7%"), position: "absolute", alignSelf: "flex-end", right: wp("4%") }} size={hp("3%")} color="#1f7a8c" />


                    <AntDesign
                        onPress={() => {
                            navigation.navigate("allhomeresults")
                            console.log("onpress")
                        }}
                        name="arrowleft" style={{ marginTop: hp("18.7%"), position: "absolute", alignSelf: "flex-end", right: wp("4%") }} size={hp("3%")} color="#1f7a8c" />
 */}

                </ScrollView>


                <StatusBar backgroundColor='#BFDBF7' style='light' />
            </Container>
        );
    }
    else {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
             <StatusBar backgroundColor='#BFDBF7' style='light' />
                <ActivityIndicator animating color={'gray'} size={"large"}></ActivityIndicator>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ImageText: {
        position: 'absolute',
        color: '#1F7A8C',
        top: hp('0.5%'),
        fontWeight: 'bold',
        right: wp('9%'),
        left: wp('5%'),
        height: hp('20%')


    },
    frame: {
        color: '#1F7A8C',
        flex:1
    }
});
export default Home;


import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Image, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Container, Header, Title, Form, Item, Input, Button, Icon } from 'native-base';
//searchbar
import { StatusBar } from 'expo-status-bar';
//import Searchbar from '../components/Searchbar';
import { Searchbar } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Authorresult from './Authorresult';
import Bookresult from './Bookresult';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { sub } from 'react-native-reanimated';
import axiosinst from '../api/axiosinst';
import ResultsList from '../components/ResultsList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Search = ({ navigation }) => {
  const [searchterm, setsearchterm] = useState('');
  const searching = (term) => setsearchterm(term);
  //console.log({navigation})
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  // const [start,setStart]=useState(false);
  const [authors, setAuthors] = useState([]);
  const [titles, setTitles] = useState([]);
  const [authorloading, setauthorloading] = useState(false);
  const [titleloading, settitleloading] = useState(false);
  // const [errormessage,setErrormessage]=useState('');
  const [authorcount, setauthorcount] = useState();
  const [titlecount, settitlecount] = useState();
  // let sumbit =false;
  const serchitem = '';
  // if(term===undefined)
  // setStart(false)
  const searchapi = async (searchTerm) => {

    console.log(searchTerm + "  SEARCHTERMAPI")
    try {
      const response = await axiosinst.get('books' + "?search=" + searchTerm + "&search-fields=title")
      // params:{
      //    // page:1,
      //     search:searchTerm,
      //     //nemidonam chetori ham title va ham author ro behesh bedam
      //     search_fields:'author',


      // }
      // })
      console.log(JSON.stringify(response.data));
      setResults(response.data.results);

    }
    catch (err) {
      console.log(err);
      Alert.alert('', 'مشکلی پیش اومده لطفا دوباره امتحان کن', [{


        text: 'فهمیدم', onPress: () => console.log('alert closed'), style: 'default'
      }], { cancelable: false }, { style: { height: 50 } })
    }
  }

  const searchauthorapi = async (searchTerm) => {
    setauthorloading(true);
    console.log(searchTerm + "  SEARCHTERMAUTHORAPI")
    try {

      const response = await axiosinst.get('books' + "?search=" + searchTerm + "&search-fields=author")
      //     params:{
      //       //  page:1,
      //         search:searchTerm,
      //         search_fields:'author',


      //     }
      // })
      console.log(JSON.stringify(response.data.results));
      await setAuthors(response.data.results);
      // if(authors===response.data.results){
      setauthorloading(false);
      setauthorcount(response.data.count);
      //}
    }
    catch (err) {
      console.log(err);
      Alert.alert('', 'مشکلی پیش اومده لطفا دوباره امتحان کن', [{


        text: 'فهمیدم', onPress: () => console.log('alert closed'), style: 'default'
      }], { cancelable: false }, { style: { height: 50 } })
    }
  }

  const searchtitleapi = async (searchTerm) => {
    settitleloading(true);
    console.log(searchTerm + "  SEARCHTERMAPITITLE")

    try {
      const response = await axiosinst.get('books' + "?search=" + searchTerm + "&search-fields=title")
      //     params:{
      //        // page:1,
      //         search:searchTerm,
      //         search_fields:'title',



      //     }
      // })
      console.log(JSON.stringify(response.data.results) + "title resultssssss");
      // console.log("\n d;aklfj;lksjf;lksjfl;k+\n"+response.data.results);
      await setTitles(response.data.results);
      //   if(titles===response.data.results){
      settitleloading(false);
      settitlecount(response.data.count);
      // }
    }
    catch (err) {
      console.log(err);
      Alert.alert('', 'مشکلی پیش اومده لطفا دوباره امتحان کن', [{


        text: 'فهمیدم', onPress: () => console.log('alert closed'), style: 'default'
      }], { cancelable: false }, { style: { height: 50 } })
    }
  }
  const [exitsearch, setExitsearch] = useState([]);
  // useFocusEffect(
  //     React.useCallback(() => {
  //         searchapi('')&&
  //         searchauthorapi('ف')&&
  //         searchtitleapi('نا')  
  //     }, [navigation]))
  useEffect(() => {
    searchapi('') &&
      searchauthorapi('') &&
      searchtitleapi('')
  }, [])
  //mikhastam inja start bashe vali warning midad va nafahmidam chera

  return (


    <View style={{ backgroundColor: 'white', flex: 1 }}>

      {/* <Searchbar style={{}} term={term} onTermChange={(newterm)=>setTerm(newterm)} onTermsubmit={async()=>{
           // searchapi(term)&&
            await searchauthorapi(term)& await searchtitleapi(term)&console.log(term)}}/> */}
      <Searchbar
        placeholder="Search"
        onChangeText={searching}

        underlineColorAndroid={'#F1F3F9'}
        value={searchterm}

        onEndEditing={() => {
          searchauthorapi(searchterm) & searchtitleapi(searchterm) & console.log(searchterm)
        }}
        onIconPress={(name) => {
          console.log("icon pressed")
          searchauthorapi(searchterm) & searchtitleapi(searchterm) & console.log(searchterm)

        }}

        borderTopLeftRadius={hp('20%')}
        borderTopRightRadius={20}
        borderBottomRightRadius={20}
        borderBottomLeftRadius={20}
        placeholder={'نام کتاب نویسنده ...'}
        style={{
          borderTopLeftRadius: hp('5%'),
          marginTop: hp('6.5%'),

          // alignSelf:'center',
          marginLeft: wp('4%'),
          borderTopRightRadius: hp('5%'),
          borderBottomRightRadius: hp('5%'),
          borderBottomLeftRadius: hp('5%'),

          backgroundColor: '#F1F3F9', height: hp('5%'), width: wp('92%'), marginBottom: hp('0.5%')
        }}
        //     clearIcon={<Feather name="cancle" size={24} color="#1f7a8c" style={{left:wp('0%'),marginRight:wp('1%'),

        // }} />}
        iconColor={"#1f7a8c"}
      // icon={"canle"}
      // icon={ <Feather name="search" size={24} color="#1f7a8c" style={{height:30,width:30,alignSelf:"flex-start"}}  />}
      />
      {/* <AntDesign name="close" size={24}  color="black" style={{marginLeft:10,position:'absolute',marginTop:10}} /> */}
      {authorcount != undefined && titlecount != undefined ? <Text style={{ marginTop: hp("13.5%"), alignSelf: "flex-start",position:"absolute" ,marginLeft: hp('2%'),fontSize:hp("1.4%"), color: "gray" }}>با اطلاعات شما {authorcount + titlecount} کتاب پیدا شد</Text> : null}
      {/* //{searchapi!=[]&&searchauthorapi!=[]&&searchtitleapi!=[]? */}
      <View style={{marginTop:hp("4%")}}></View>
      <ScrollView style={{}}>


        {authorloading === false ? <ResultsList
          navigation={navigation}
          listresult={authors}
          showtitle={true}
          countt={authorcount}
          numofcolums={0}
          loadmore={false}
          horizantall={true}
          stylee={{}} title="جستجو بر اساس نویسنده"></ResultsList> : <ActivityIndicator style={{ height: hp("39%") }} size={"small"} color={"gray"} ></ActivityIndicator>}
        <Image
          source={require('../../assets/line3.png')}
          style={{ marginTop: hp("2.5%"), marginHorizontal: wp("2%"), width: wp("96%"), height: 1 }}
        ></Image>
      
        {titleloading === false ? <ResultsList
          navigation={navigation}
          listresult={titles}
          countt={titlecount}
          showtitle={true}
          numofcolums={0}
          loadmore={false}
          horizantall={true}
          stylee={{}} title="جستجو بر اساس نام کتاب"></ResultsList> : <ActivityIndicator style={{ height: hp("33%") }} size={"small"} color={"gray"} ></ActivityIndicator>}

        {/* <TouchableOpacity style={{ backgroundColor: "lightgreen", height: hp("7%"), position: "absolute", width: wp("10%"), marginBottom: hp("0%"), marginTop: hp("3.7%"), right: wp("4%"), alignSelf: "flex-end" }}>
        </TouchableOpacity> */}
        {authorcount != 0 ? <AntDesign
          onPress={() => navigation.navigate("allsearchresults", { title: "جستجوی " +`" ${searchterm} "`,searchmode:"author" ,searchterm:searchterm})}
          name="arrowleft" style={{ marginTop: hp("3.7%"), position: "absolute", alignSelf: "flex-end", right: wp("4%") }} size={hp("3%")} color="#1f7a8c" /> : null}
            {titlecount != 0 ? <AntDesign
              onPress={() => navigation.navigate("allsearchresults",  { title: "جستجوی " +`" ${searchterm} "`,searchmode:"title",searchterm:searchterm })}
             name="arrowleft" style={{ marginTop: hp("45.5%"), position: "absolute", alignSelf: "flex-end", right: wp("4%") }} size={hp("3%")} color="#1f7a8c" /> : null}

      </ScrollView>
      {/* <ActivityIndicator size={"large"} color={"gray"} ></ActivityIndicator>} */}
      {/* {errormessage?<Text style={{position:'absolute',marginTop:50}}>{errormessage}</Text>:null} */}
      {/* <Image
         source={require('../../assets/kima6.jpeg')}
         style={{width:100,height:100,marginTop:700,marginLeft:40,position:'absolute'}}
         >
             
         </Image>
         <Text style={{marginHorizontal:50,marginTop:750,width:220,marginLeft:130,position:'absolute',fontWeight:'bold',fontSize:14}} >با کیما کتاب مورد علاقه ات را پیدا کن</Text> */}
    </View>



  );
}


const styles = StyleSheet.create({
  //    background:{
  //        backgroundColor:'white',
  //        height:1000
  //    }
});
export default Search;

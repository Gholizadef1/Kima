
import React , {useState , useEffect} from 'react';
import { StyleSheet, Text, View , Image , ImageBackground , ScrollView , 
TouchableOpacity , FlatList , TextInput} from 'react-native';
import {Feather} from '@expo/vector-icons';
import { Container, Header, Left, Body, Right, Title, CardItem, Card } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axiosinst from '../api/axiosinst';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import ResultsList from "../components/ResultsList";
import { ActivityIndicator } from 'react-native-paper';

const Allsearchresults = (prop) => { 
    const [authorcount, setauthorcount] = useState();
    const [authorloading, setauthorloading] = useState(false);
    const [authors, setAuthors] = useState([]);
    const searchauthorapi = async (searchTerm) => {
        setauthorloading(true);
        console.log(searchTerm + "  SEARCHTERMAUTHORAPI")
        try {
    
          const response = await axiosinst.get('books' + "?search=" + searchTerm + "&search-fields="+prop.route.params.searchmode)
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
          Alert.alert('oops', ' حتما اشتباهی شده دوباره امتحان کن :)', [{
    
    
            Title: 'فهمیدم', onPress: () => console.log('alert closed')
          }])
        }
      }
      useEffect(() => {
          searchauthorapi('')
      }, [])
    return(      
        <View style={{ backgroundColor: 'white', flex: 1 }}>

        {/* <Searchbar style={{}} term={term} onTermChange={(newterm)=>setTerm(newterm)} onTermsubmit={async()=>{
             // searchapi(term)&&
              await searchauthorapi(term)& await searchtitleapi(term)&console.log(term)}}/> */}
      
        {/* <AntDesign name="close" size={24}  color="black" style={{marginLeft:10,position:'absolute',marginTop:10}} /> */}
        {authorcount != undefined? <Text style={{ marginTop: hp("2.5%"), alignSelf: "flex-start", marginLeft: hp('2%'), color: "gray" }}>با اطلاعات شما {authorcount } کتاب پیدا شدند</Text> : null}
        {/* //{searchapi!=[]&&searchauthorapi!=[]&&searchtitleapi!=[]? */}
        <ScrollView style={{marginTop:hp("1.5%")}}>
  
  
          {authorloading === false ? <ResultsList
            navigation={prop.navigation}
            listresult={authors}
            countt={authorcount}
            numofcolums={3}
            horizantall={false}
            showtitle={false}
            stylee={{}} title="جستجو بر اساس نویسنده"></ResultsList> : <ActivityIndicator style={{ height: hp("39%") }} size={"small"} color={"gray"} ></ActivityIndicator>}
            </ScrollView>
         </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
   
  });
  export default Allsearchresults;





                    
            

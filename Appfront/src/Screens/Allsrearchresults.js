
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
      <View><Text>All search results</Text></View>
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





                    
            


import React , {useState , useEffect} from 'react';
import { StyleSheet, Text, View , Image , ImageBackground , ScrollView , 
TouchableOpacity , FlatList , TextInput,Alert} from 'react-native';
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
    const [refresh,setrefresh]=useState(false);
    const [onend,setonend]=useState(false);
    const[next,setnext]=useState();
    const[page,setpage]=useState(1);
    const searchauthorapi = async (searchTerm,page) => {
       // setAuthors([]);
       setpage(page);
        setauthorloading(true);
        //console.log(searchTerm + "  SEARCHTERMAUTHORAPI")
        try {
    
          const response = await axiosinst.get('books' + "?search=" + searchTerm + "&search-fields="+prop.route.params.searchmode+"&page="+page)
          //     params:{
          //       //  page:1,
          //         search:searchTerm,
          //         search_fields:'author',
    
    
          //     }
          // })
          setnext(response.data.next)
         // console.log(JSON.stringify(response.data.results));
        //if(authors===undefined)
        // await setAuthors(response.data.results)
         //else
          if(page===1){
              console.log("alan")
              await setAuthors(response.data.results)
          }
          else{
          await setAuthors(authors=>[...authors,...response.data.results])
          }
        
        // authors.concat(response.data.results)
         // await setAuthors(response.data.results);
          // if(authors===response.data.results){
          setauthorloading(false);
          setauthorcount(response.data.count);
          console.log(JSON.stringify(authors)+"   AUTHORS")
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
          setpage(1);
          if(page===1){
          searchauthorapi(prop.route.params.searchterm,1)
          }
      }, [])
      const handleloadmore=async()=>{
      
          await searchauthorapi(prop.route.params.searchterm,page+1);
         // await setpage(page+1);
        //   console.log("load more!")
          
      }
    return(      
        <View style={{ backgroundColor: 'white', flex: 1 }}>

        {/* <Searchbar style={{}} term={term} onTermChange={(newterm)=>setTerm(newterm)} onTermsubmit={async()=>{
             // searchapi(term)&&
              await searchauthorapi(term)& await searchtitleapi(term)&console.log(term)}}/> */}
      
        {/* <AntDesign name="close" size={24}  color="black" style={{marginLeft:10,position:'absolute',marginTop:10}} /> */}
        {authorcount != []? <Text style={{ marginTop: hp("2.5%"), alignSelf: "flex-start", marginLeft: hp('2%'), color: "gray" }}>با اطلاعات شما {authorcount } کتاب پیدا شدند</Text> : null}
        {/* //{searchapi!=[]&&searchauthorapi!=[]&&searchtitleapi!=[]? */}
        <View style={{marginTop:hp("1.5%"),marginBottom:hp("1.5%"),flex:1}}>
  
  
          {/* {authorloading === false ? */}
           <ResultsList
            navigation={prop.navigation}
            listresult={authors}
            countt={authorcount}
            numofcolums={3}
            horizantall={false}
            loadmore={true}
            onend={handleloadmore}
            onrefreshh={setrefresh}
            showtitle={false}
            next={next}
            
            stylee={{}} title="جستجو بر اساس نویسنده"></ResultsList> 
            {authorloading===true? <ActivityIndicator style={{ height: hp("50%") }} size={"small"} color={"gray"} ></ActivityIndicator>:null}
            </View>
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





                    
            

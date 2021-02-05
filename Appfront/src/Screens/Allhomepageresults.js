
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
    const searchauthorapi = async (page) => {
       // setAuthors([]);
       
        setauthorloading(true);
        await setpage(page);
        //console.log(searchTerm + "  SEARCHTERMAUTHORAPI")
        try {
    
          const response = await axiosinst.get('/books?page='+page)
          
        
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
          Alert.alert('', 'مشکلی پیش اومده لطفا دوباره امتحان کن', [{


            text: 'فهمیدم', onPress: () => console.log('alert closed'), style: 'default'
            }], { cancelable: false }, { style: { height: 50 } })
        }
      }
     
      useEffect(() => {
         // setpage(1);
        //   if(page===1){
        //   searchauthorapi(prop.route.params.searchterm,1)
        //   }
        searchauthorapi(1);
      }, [])
      const handleloadmore=async()=>{
        //  await setpage(page+1);
          await setauthorloading(true);
      
          await searchauthorapi(page+1);
         // await setpage(page+1);
        //   console.log("load more!")
          
      }
    return(      
        <View style={{ backgroundColor: 'white', flex: 1 }}>

        {/* <Searchbar style={{}} term={term} onTermChange={(newterm)=>setTerm(newterm)} onTermsubmit={async()=>{
             // searchapi(term)&&
              await searchauthorapi(term)& await searchtitleapi(term)&console.log(term)}}/> */}
      
        {/* <AntDesign name="close" size={24}  color="black" style={{marginLeft:10,position:'absolute',marginTop:10}} /> */}
      
        {/* //{searchapi!=[]&&searchauthorapi!=[]&&searchtitleapi!=[]? */}
        <View style={{marginTop:hp("0%"),marginBottom:hp("0%"),flex:1}}>
  
  
          {/* {authorloading === false ? */}
           <ResultsList
            navigation={prop.navigation}
            listresult={authors}
            countt={authorcount}
            numofcolums={3}
            horizantall={false}
            page={page}
            loadmore={true}
            onend={handleloadmore}
            onrefreshh={setrefresh}
            showtitle={false}
            next={next}
            authorloading={authorloading}
            
            stylee={{}} ></ResultsList> 
            {authorloading===true? <ActivityIndicator style={{ height: hp("10%") }} size={"small"} color={"gray"} ></ActivityIndicator>:null}
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





                    
            

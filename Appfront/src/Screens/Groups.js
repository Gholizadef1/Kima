import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal,FlatList,ActivityIndicator } from 'react-native';
//  import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content,SearchBar } from 'native-base';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { useFocusEffect } from '@react-navigation/native';
// import axiosinst from '../api/axiosinst';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons'; 
// import { SearchBar } from 'react-native-elements';
import Eachgroup from './Eachgroup';
const Groups = () => {

  const [modalopen, setmodalopen] = useState(false)
  const [selectedValue, setselectedValue] = useState('none')
  const [information, setinformation] = useState([]);
  const [search, setsearch] = useState([])
  const [refresh,setrefresh]=useState(false);

  const [theend,settheend]=useState(false);
  return (

    <View style={styles.container}>
      {/* <SearchBar
          style={{backgroundColor:'#F1F3F9',height:hp('4.5%'),width:wp('50%')}}
          searchIcon={ <Feather name="search" size={24} color="#1f7a8c" style={{left:wp('2.5%'),marginRight:wp('1%')}} />}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          borderBottomRightRadius={20}
          borderBottomLeftRadius={20}
          placeholder={'نام گروه ...'}
          placeholderTextColor={'gray'}
          inputStyle={{color:'black',fontSize:hp('1.7%')}}
          containerStyle={{backgroundColor:'white',borderTopColor:'white',borderBottomColor:'white'}}
          inputContainerStyle={{backgroundColor:'#F1F3F9',height:hp('5%'),marginTop:hp('1%'),marginBottom:hp('-1%'),borderRadius:20}}
          cancelIcon={<AntDesign style={{}}
         name="close" size={30} color="gray" />}
        // placeholder="نام گروه ..."
        onChangeText={console.log('taghirkarde')}
        value={search}
      /> */}
      {/* <Modal visible={modalopen} animationType='slide'>
        <AntDesign onPress={()=>setmodalopen(false)}
         name="close" size={24} color="black" />
        <Text>Hi im in modall :)))))</Text>
        </Modal>
        <View style={{position:'absolute', justifyContent:'center',height:hp('7%'),width:wp('14%'),borderRadius:1000,backgroundColor:'#1f7a8c',elevation:5,marginTop:hp('77%'),marginLeft:wp('78%')}}>
        <Feather style={styles.plus} onPress={()=>setmodalopen(true)}
         name="plus" size={32} color="#EDF2F4" /> */}

      {/* </View> */}


      <View style={{ marginLeft: wp('2%') }}>

        {(information.length >= 0) ? <DropDownPicker
          items={[
            { label: 'معروف ترین گروه ها', value: 'none' },
            { label: 'جدید ترین گروه ها', value: 'like' },
          ]}
          defaultValue={selectedValue}
          containerStyle={{ height: 40, width: 220, marginBottom: hp('2%') }}
          style={{

            borderColor: '#1f7a8c', backgroundColor: '#fafafa', marginTop: hp('2%'), width: wp('50%'), marginBottom: hp('-5%'), position: 'absolute', borderTopLeftRadius: 30, borderTopRightRadius: 30,
            borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginLeft: wp('3%')
          }}
          itemStyle={{

            justifyContent: 'flex-start'
          }}
          dropDownStyle={{
            backgroundColor: '#fafafa',
            borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginTop: hp('2%'), marginLeft: wp('3%'), width: wp('50%'), position: 'absolute', marginBottom: hp('10%')
          }}
          onChangeItem={async (item) => {

            if (item.value === 'none') {
              console.log(item.value + 'VALUE')
              console.log('to none')
              await setlikeotime('/comment-filter-time')

            }
            else if (item.value === 'like') {
              console.log('tolike')
              console.log(item.value + 'VALUE')
              await setlikeotime('/comment-filter-like')

            }



          }}

        /> : null}
        <Eachgroup></Eachgroup>
        <Eachgroup></Eachgroup>
        <Eachgroup></Eachgroup>
        <Eachgroup></Eachgroup>


        {(information.length >= 0) ?

          <FlatList
            ListFooterComponent={(theend === false ? <View style={styles.loader}><ActivityIndicator animating color={'gray'} size={"large"}></ActivityIndicator></View> : <View style={styles.loader}><Text style={{ color: 'gray', alignSelf: 'center' }}>نقل قول دیگری وجود ندارد</Text></View>)}
            style={{ marginBottom: hp('18%') }}
            showsVerticalScrollIndicator={false}
            onEndReached={() => handleLoadMore()}
            onEndReachedThreshold={0}
            keyExtractor={(item) => item.id}
            refreshing={refresh}
            onRefresh={async () => {
              await setrefresh(true)

              response(1)

            }}

            data={information}
            onEndReachedThreshold={0.5}

            renderItem={({ item }) => (<><Quotecrad name={item.account.username}

              date={item.sendtime.toString().split('T')[0]} lastinfo={finfo} heartnumber={item.Likes} DELETE={callbackFunction} RESPONSE={response} page={setpage} INFO={setfinfo} IDD={IDD} quoteid={item.id} id={item.account.id} height={hp('42.5%')} picture={`http://a32f717e71fe.ngrok.io${item.account.profile_photo}`} naghlghol={item.quote_text} ></Quotecrad>



            </>
            )}
          // extraData={finfo}
          >
          </FlatList> : <Text style={{ color: 'gray', alignSelf: 'center', marginTop: hp('30%'), fontWeight: 'bold' }}>نقل قولی وجود ندارد</Text>}

      </View>
      {/* <Text>
                Groups
            </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
  },
  plus: {

    alignSelf: 'center',
    justifyContent: 'center'

  }
});
export default Groups;
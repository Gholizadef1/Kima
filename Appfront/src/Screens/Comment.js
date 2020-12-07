import React from 'react';
import { StyleSheet, Text, View ,Image,ScrollView} from 'react-native';
import Commentcard from './Commentcard';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {Container,Header,Title,Form,Item,Input,Button, Icon,CheckBox,Body, ActionSheet} from 'native-base';

const Groups = () => {
    const bs = React.createRef()
         const fall=new Animated.Value(1);
         const renderHeader=()=>{
            console.log('header')
            return(
          
            
              <View style={{backgroundColor:'white',flex:1
              }}
              
              >
              <View style={{}}>
                  <View style={{}}>
                  {/* <Image
               source={require('../../assets/line3.png')}
               style={{width:300,height:3}}
               ></Image> */}
                  <Image
               source={require('../../assets/line3.png')}
               style={{width:100,height:5,marginLeft:155}}
               ></Image>
                  <Text style={{marginLeft:150,width:100,fontWeight:'bold',color:'#1F7A8C',marginTop:15,fontSize:16 }}>انتخاب عکس</Text>
                  </View>
              </View>
      
              </View>
              )
          }
         const renderInner=()=>{
            return(
              // console.log('inner');
            <View style={{backgroundColor:'gray'}}>
      
               <Image
               source={require('../../assets/bottomsheet.jpeg')}
               style={{width:420,height:300,position:'absolute'}}
               ></Image>
      
               <Button
               bordered rounded style={styles.button}
              
              onPress={async()=>await pickfromcamera()}
              style={{marginLeft:86,marginTop:50,borderColor:'#BFDBF7',backgroundColor:'#1F7A8C',borderRadius:15}}
              >
      
               <Text style={{color:'white', fontSize:15,fontWeight:'bold', alignItems:'center',marginHorizontal:84}
               }>گرفتن عکس</Text>
              </Button>
      
              <Button
               bordered rounded style={styles.button}
              onPress={async()=>await pickfromgallery()}
              style={{marginLeft:86,marginTop:30,borderColor:'#BFDBF7',backgroundColor:'#1F7A8C',borderRadius:15}}
              >
      
               <Text style={{color:'white', fontSize:15,fontWeight:'bold', alignItems:'center',marginHorizontal:72}
               }>انتخاب از گالری</Text>
              </Button>
            
              </View>
            )
          }
    return(
        <View style={styles.container}>
        <ScrollView>
           <Commentcard></Commentcard>
           <Commentcard></Commentcard>
           <Commentcard></Commentcard>
           <Commentcard></Commentcard>
   
      
           </ScrollView>
           
           <BottomSheet
             snapPoints={[380, 0, 0]}
            ref={bs}
            initialSnap={1}
            callbackNode={fall}
            enabledGestureInteraction={true}
            enabledContentTapInteraction={false}
            renderContent={renderInner}
            renderHeader={renderHeader}            
               // style={{position:'absolute',height:200,width:250,marginTop:400}}
            backgroundColor={'white'}
        
       />

       <View style={{position:'absolute',marginTop:'175%',width:'100%'}}>

       <Button style={styles.addcomment}>

       <Text style={styles.nazar}>نظر شما چیست؟</Text>

       </Button>

       </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop:38
    }, 
    addcomment:{
    
        width:'70%',
        marginHorizontal:'15%',
        
        borderRadius:17,
        backgroundColor:'#1F7A8C'
    },
    nazar:{
        marginLeft:'33%',
        fontWeight:'bold',
        color:'#ffff'
    }
  });
  export default Groups;
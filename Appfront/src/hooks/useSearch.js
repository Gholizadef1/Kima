import{useEffect , useState} from 'react';
import axiosinst from '../api/axiosinst';



export default()=>{
    const [term,setTerm]=useState('');
    const [results,setResults]=useState([]);
    const [submit,setSubmit]=useState(false);

    const serchitem='';
    const searchapi=async searchTerm=>{
        try{
        const response = await axiosinst.get('books',{
            params:{
                search:searchTerm,
                search_fields:'author',
               
            }
        })
        setResults(response.data.results);
    }
    catch(err){
        console.log('error');
        //  setErrormessage('سیمامون به هم گیر کرده صبر داشته باش :)')
        Alert.alert('oops',' حتما اشتباهی شده دوباره امتحان کن :)',[{
            

                Title:'فهمیدم',onPress:()=>console.log('alert closed')
                }])
    }
    }

    useEffect(()=>{
        const tempresponse=searchapi('')
        .then(
        
        console.log(tempresponse)
        )
        
     
     
        
    },[])
    return[searchapi,results]
}
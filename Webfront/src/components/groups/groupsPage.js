import React, {useEffect, useState} from "react";
import axios from 'axios';
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    // Redirect,
    // Link,
    // useRouteMatch,
    // useParams,
    withRouter
  } from "react-router-dom";
  import {GoSearch} from 'react-icons/go';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Cookies from 'js-cookie';
import Snackbar from '@material-ui/core/Snackbar';



function GroupsPage (props){
  const [groups,setGroups] = useState([]);
  const [filterBase,setFilterBase]= useState("popular");
  

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/group')
      .then(response=>{
        console.log(response);
        setGroups(response.data);
      })
      .catch(error=>{
        console.log(error);
      });


    // if(filterBase==="popular"){
    //   axios.get('http://127.0.0.1:8000/api/group')
    //   .then(response=>{
    //     console.log(response);
    //     setGroups(response.data);
    //   })
    //   .catch(error=>{
    //     console.log(error);
    //   })
    // }
    // else if (filterBase==="new"){
    //   axios.get()
    //   .then(response=>{
    //     console.log(response);
    //     setGroups(response.data);
    //   })
    //   .catch(error=>{
    //     console.log(error);
    //   })
    // }
    // else console.log(filterBase);
  },[filterBase])


  const handleChangeList =(e) =>{
    setFilterBase(e.target.value);
    console.log(e.target.value);
  }

  const [openCreateGroup, setOpenCreateGroup] = useState(false);

  const handleClickOpenCreateGroup = () => {
    setOpenCreateGroup(true);
  };

  const handleCloseCreateGroup = () => {
    setOpenCreateGroup(false);
    setNewGroup({
      picture: "fae8d917da344e6eb3b832a4b706ff49..jpg",
      name : "",
      description :""
     // backError : ""
    }); 
  };

  const [newGroup,setNewGroup] = useState({
    picture: "fae8d917da344e6eb3b832a4b706ff49..jpg",
    name : "",
    description :""
   // backError : ""
  })

  const handleChange = (e) => {
    const {id , value} = e.target   
    setNewGroup(prevState => ({
        ...prevState,
        [id] : value
    }))
}

const handleCreateGroupSubmit =(e) =>{
  e.preventDefault();
  // setNewGroup(prevState => ({
  //     ...prevState,
  //     backError : ""
  // })); 

  var formdata = new FormData()
  formdata.append('title',newGroup.name)
  formdata.append('summary',newGroup.description)
  formdata.append('photo',state.file)

  // const payload={
  //       "title":newGroup.name,
  //       "summary":newGroup.description,
  //       "photo":state.file
  //       //formdata
  // }

  //const back= JSON.stringify(payload)
  axios.post('http://127.0.0.1:8000/api/group',formdata,
  {
    headers:{
   "Content-Type":"application/json",
   "Authorization":"Token "+Cookies.get("userToken")}
    }
  )
  .then(response=>{
    console.log(response);

    if(response.status === 200){
      setMassage('گروه با موفقیت ساخته شد')
      setOpenSnack(true);
      handleCloseCreateGroup();

    }
  })
  .catch(error=>{
    console.log(error);
    setMassage("گروه از قبل وجود دارد")
    setOpenSnack(true);
  });
}

const [state , setState]=useState(
  {
      navigate:false,
      file:null
  }
)
const uploadedImage = React.useRef(null);
const imageUploader = React.useRef(null);
const handleImageUpload = e => {
  setState({file:e.target.files[0]});
  const [file] = e.target.files;
  if (file) {
    const reader = new FileReader();
    const { current } = uploadedImage;
    current.file = file;
    reader.onload = e => {
      //current.src = e.target.result;
      setNewGroup(prevState => ({
        ...prevState,
        picture : e.target.result
    }));

    };
    reader.readAsDataURL(file);
  }
};

const [massage, setMassage]= useState(<br></br>);
const[openSnack,setOpenSnack]=useState(false);
const handleCloseSnack = (event, reason) => {
  if (reason === 'clickaway') {
  return;
  }
  setOpenSnack(false);
  };

  const [searchWord,setSearchWord]=useState("");

  const handleChangeSearchWord = (e) => {
    const {value} = e.target   
    setSearchWord(value);
  };

  const handleGoSearchGroup = ( ) => {
    console.log( searchWord);
    axios.get('http://127.0.0.1:8000/api/group')
      .then(response=>{
        console.log(response);
        setGroups(response.data);
      })
      .catch(error=>{
        console.log(error);
      });
  }


    return(
        <div className="container-fluid rTOl px-md-5">
            <div className="d-flex  my-4 flex-wrap mx-md-5 px-md-4">
              <div className="d-flex ml-auto">
                <div variant="gray" className="btn" onClick={handleGoSearchGroup} >
                  <GoSearch size="30" color="black"/>
                </div>
                <input className=" shadow form-control rounded-pill px-4 text-right "
                 type="title" name="group" placeholder="جستجوی گروه... " 
                 value={searchWord}
                 onChange={handleChangeSearchWord}/>  
                <div variant="gray" className="btn">
                </div>
              </div>
              <div className="rounded-pill mx-md-4 mx-2">
                <select className="form-control rounded-pill shadow" onClick={handleChangeList} >
                  <option value="popular">محبوب‌ترین گروه ها</option>
                  <option value="new">جدیدترین گروه ها</option>
                  <option value="mine">گروه‌های من</option>
                </select>
              </div>
              <div>
                <div className="btn btn-dark rounded-pill  shadow" onClick={handleClickOpenCreateGroup}>
                  گروه جدید
                </div>
                <Dialog open={openCreateGroup} onClose={handleCloseCreateGroup} aria-labelledby="form-dialog-title" style={{direction:"rtl",textAlign:"right"}}>
                  <DialogTitle id="form-dialog-title">ساخت گروه جدید</DialogTitle>
                  <DialogContent >
                    

                  <input class="form-control" 
                type="file" accept="image/*" 
                onChange={handleImageUpload} 
                ref={imageUploader} 

                style={{ display: "none",color:"white" }} />

                <img src={newGroup.picture} ref={uploadedImage} alt=" انتخاب عکس" className="rounded-lg mx-auto d-block text-center"/>
                <div className="btn mr-5 mt-n4" onClick={() => imageUploader.current.click()}>
                  <svg className=""  style={{width:30,height:30}} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14.09C14.03,20.67 14,20.34 14,20C14,19.32 14.12,18.64 14.35,18H5L8.5,13.5L11,16.5L14.5,12L16.73,14.97C17.7,14.34 18.84,14 20,14C20.34,14 20.67,14.03 21,14.09V5C21,3.89 20.1,3 19,3H5M19,16V19H16V21H19V24H21V21H24V19H21V16H19Z" />
                  </svg>
                </div>

                  <form >
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      value={newGroup.name}
                      label="نام گروه"
                      type="title"
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"

                    />
                    <TextField
                      margin="dense"
                      id="description"
                      value={newGroup.description}
                      label="توضیحات"
                      type="description"
                      onChange={handleChange}
                      fullWidth
                      multiline
                      variant="outlined"
                    />
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseCreateGroup} color="black">
                      انصراف
                    </Button>
                    <Button onClick={handleCreateGroupSubmit} color="black">
                      ثبت
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>

            <div className="my-3">
              <hr></hr>
            </div>

            <div className="mx-md-5 px-md-5"  >
               

                {groups.message === "No!" ? (
                 

                 <p >گروهی برای نمایش وجود ندارد</p>

                ) : (
                  <div class="row row-cols-1 row-cols-md-4 row-cols-sm-2" style={{textAlign:'right'}}>

                {groups.map ((current) => (
                  

                  <div class="col mb-4">
                    <div class="card h-100 shadow-lg ">
                      <img src={`http://127.0.0.1:8000${current.group_photo}`} class="card-img-top shadow-sm " alt={current.title}/>
                      <div class="card-body">
                        <h5 class="card-title">{current.title}</h5>
                        <p class="card-text">{current.summary}</p>
                        <div className="d-flex align-items-center">
                            <svg style={{width:24,height:24}} className="mx-1" viewBox="0 0 24 24">
                                <path fill="#00BCD4" d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                            </svg>
                            <h6 class="card-subtitle mt-1 text-muted">{current.members_count+1}عضو</h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  


               ))}
                </div>

                   )}
            </div>
            <Snackbar
          anchorOrigin={{ vertical:'bottom', horizontal:'center'}}
          open={openSnack}
          autoHideDuration={3000}
          onClose={handleCloseSnack}
          message={massage}
          />
        </div>


    )



} 

export default withRouter(GroupsPage);

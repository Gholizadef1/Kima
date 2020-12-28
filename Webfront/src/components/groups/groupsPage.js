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
  };

  const [newGroup,setNewGroup] = useState({
    picture: "",
    name : "",
    description :"",
    backError : ""
  })

  const handleChange = (e) => {
    const {id , value} = e.target   
    setNewGroup(prevState => ({
        ...prevState,
        [id] : value
    }))
}

const handleCreateGroup =(e) =>{
  e.preventDefault();
  setNewGroup(prevState => ({
      ...prevState,
      backError : ""
  })); 

  //var formdata = new FormData()
  //formdata.append('profile_photo',state.file)

  const payload={
        "name":newGroup.name,
        "d":newGroup.description,
        "p":state.file
  }

  const back= JSON.stringify(payload)
  axios.put('http://127.0.0.1:8000/api/group',back,
  {
    headers:{
   "Content-Type":"application/json",
   "Authorization":"Token "+Cookies.get("userToken")}
    }
  )
  .then(response=>{
    console.log(response);

    if(response.status === 200){
      console.log(response.status);
      setNewGroup(prevState => ({
          ...prevState,
          backError : 'گروه با موفقیت ساخته شد'
      }))}
  })
  .catch(error=>{
    console.log(error);
    setNewGroup(prevState => ({
      ...prevState,
      backError : "گروه از قبل وجود دارد"
  }));
  });
}

const [state , setState]=useState(
  {
      navigate:false,
      file:""
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


    return(
        <div className="container-fluid rTOl px-md-5">
            <div className="d-flex  my-4 flex-wrap mx-md-5">
              <div className="d-flex ml-auto">
                <div variant="gray" className="btn">
                  <GoSearch size="30" color="black"/>
                </div>
                <input className=" shadow form-control rounded-pill px-4 text-right " type="text" name="group" placeholder="نام گروه" />  
                <div variant="gray" className="btn">
                </div>
              </div>
              <div className="rounded-pill mx-md-4 mx-2">
                <select className="form-control rounded-pill shadow" onChange={handleChangeList} >
                  <option value="popular">محبوب‌ترین گروه ها</option>
                  <option value="new">جدیدترین گروه ها</option>
                  <option value="mine">گروه‌های من</option>
                </select>
              </div>
              <div>
                <div className="btn btn-secondary rounded-pill  shadow" onClick={handleClickOpenCreateGroup}>
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

                <img src={newGroup.picture} ref={uploadedImage} alt=" انتخاب عکس" className="rounded-circle img-fluid"
                onClick={() => imageUploader.current.click()} 
                style={{
                  width: 120,
                  height: 120,
                  marginLeft:180,
                  marginTop:-5,
                  display: "block"}}/>

                  <form >
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      value={newGroup.name}
                      label="نام گروه"
                      type="name"
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
                    <Button onClick={handleCreateGroup} color="black">
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
                <div class="row row-cols-1 row-cols-md-3 row-cols-sm-2" style={{textAlign:'right'}}>

                {groups.message === "No!" ? (
                 

                 <p >گروهی برای نمایش وجود ندارد</p>

                ) : (
                  <div>

                {groups.map ((current) => (
                  

                  <div class="col mb-4 ">
                    <div class="card h-100 shadow-lg">
                      <img src={`http://127.0.0.1:8000${current.x}`} class="card-img-top shadow-sm" alt={current.title}/>
                      <div class="card-body">
                        <h5 class="card-title">{current.title}</h5>
                        <p class="card-text">{current.x}</p>
                        <div className="d-flex align-items-center">
                            <svg style={{width:24,height:24}} className="mx-1" viewBox="0 0 24 24">
                                <path fill="#00BCD4" d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                            </svg>
                            <h6 class="card-subtitle mt-1 text-muted">{current.x}عضو</h6>
                        </div>
                      </div>
                    </div>
                  </div>


               ))}
                </div>

                   )}


                </div>
            </div>
        </div>


    )



} 

export default withRouter(GroupsPage);

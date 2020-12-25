import React, {CuseState,useEffect} from "react";
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    useRouteMatch,
    useParams,
    withRouter
  } from "react-router-dom";
  import {GoSearch} from 'react-icons/go';

function GroupsPage (props){


    return(
        <div className="container-fluid rTOl">
            <div>
                <div className="d-flex col-6 mx-md-5 my-5">
                  <div variant="gray" className="mr-md-5 btn">
                    <GoSearch size="30" color="black" />
                  </div>
                  <input className="form-control rounded-pill px-4 text-right " type="text" name="group" placeholder="نام گروه" />  
                  <div variant="gray" className="mr-md-5 btn">
                  </div>
                </div>
            </div>

            <div>


            </div>

            <div className=""  >
                <div class="row row-cols-1 row-cols-md-4 row-cols-sm-2" style={{textAlign:'right'}}>
                  <div class="col mb-4 ">
                    <div class="card h-100 shadow-lg">
                      <img src="index12.jpeg" class="card-img-top shadow-sm" alt="..."/>
                      <div class="card-body">
                        <h5 class="card-title">اسم گروه</h5>
                        <p class="card-text">توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات للل توضیحات توضیحات </p>
                        <div className="d-flex align-items-center">
                            <svg style={{width:24,height:24}} className="mx-1" viewBox="0 0 24 24">
                                <path fill="#00BCD4" d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                            </svg>
                            <h6 class="card-subtitle mt-1 text-muted">۱۱۱ عضو</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col mb-4 ">
                    <div class="card h-100 shadow-lg">
                      <img src="index12.jpeg" class="card-img-top shadow-sm" alt="..."/>
                      <div class="card-body">
                        <h5 class="card-title">اسم گروه</h5>
                        <p class="card-text">توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات للل توضیحات توضیحات </p>
                        <div className="d-flex align-items-center">
                            <svg style={{width:24,height:24}} className="mx-1" viewBox="0 0 24 24">
                                <path fill="#00BCD4" d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                            </svg>
                            <h6 class="card-subtitle mt-1 text-muted">۱۱۱ عضو</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col mb-4 ">
                    <div class="card h-100 shadow-lg">
                      <img src="index12.jpeg" class="card-img-top shadow-sm" alt="..."/>
                      <div class="card-body">
                        <h5 class="card-title">اسم گروه</h5>
                        <p class="card-text">توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات للل توضیحات توضیحات </p>
                        <div className="d-flex align-items-center">
                            <svg style={{width:24,height:24}} className="mx-1" viewBox="0 0 24 24">
                                <path fill="#00BCD4" d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                            </svg>
                            <h6 class="card-subtitle mt-1 text-muted">۱۱۱ عضو</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col mb-4 ">
                    <div class="card h-100 shadow-lg">
                      <img src="index12.jpeg" class="card-img-top shadow-sm" alt="..."/>
                      <div class="card-body">
                        <h5 class="card-title">اسم گروه</h5>
                        <p class="card-text">توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات للل توضیحات توضیحات </p>
                        <div className="d-flex align-items-center">
                            <svg style={{width:24,height:24}} className="mx-1" viewBox="0 0 24 24">
                                <path fill="#00BCD4" d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                            </svg>
                            <h6 class="card-subtitle mt-1 text-muted">۱۱۱ عضو</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col mb-4 ">
                    <div class="card h-100 shadow-lg">
                      <img src="index12.jpeg" class="card-img-top shadow-sm" alt="..."/>
                      <div class="card-body">
                        <h5 class="card-title">اسم گروه</h5>
                        <p class="card-text">توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات للل توضیحات توضیحات </p>
                        <div className="d-flex align-items-center">
                            <svg style={{width:24,height:24}} className="mx-1" viewBox="0 0 24 24">
                                <path fill="#00BCD4" d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                            </svg>
                            <h6 class="card-subtitle mt-1 text-muted">۱۱۱ عضو</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col mb-4 ">
                    <div class="card h-100 shadow-lg">
                      <img src="index12.jpeg" class="card-img-top shadow-sm" alt="..."/>
                      <div class="card-body">
                        <h5 class="card-title">اسم گروه</h5>
                        <p class="card-text">توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات للل توضیحات توضیحات </p>
                        <div className="d-flex align-items-center">
                            <svg style={{width:24,height:24}} className="mx-1" viewBox="0 0 24 24">
                                <path fill="#00BCD4" d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                            </svg>
                            <h6 class="card-subtitle mt-1 text-muted">۱۱۱ عضو</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col mb-4 ">
                    <div class="card h-100 shadow-lg">
                      <img src="index12.jpeg" class="card-img-top shadow-sm" alt="..."/>
                      <div class="card-body">
                        <h5 class="card-title">اسم گروه</h5>
                        <p class="card-text">توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات للل توضیحات توضیحات </p>
                        <div className="d-flex align-items-center">
                            <svg style={{width:24,height:24}} className="mx-1" viewBox="0 0 24 24">
                                <path fill="#00BCD4" d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                            </svg>
                            <h6 class="card-subtitle mt-1 text-muted">۱۱۱ عضو</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col mb-4 ">
                    <div class="card h-100 shadow-lg">
                      <img src="index12.jpeg" class="card-img-top shadow-sm" alt="..."/>
                      <div class="card-body">
                        <h5 class="card-title">اسم گروه</h5>
                        <p class="card-text">توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات للل توضیحات توضیحات </p>
                        <div className="d-flex align-items-center">
                            <svg style={{width:24,height:24}} className="mx-1" viewBox="0 0 24 24">
                                <path fill="#00BCD4" d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                            </svg>
                            <h6 class="card-subtitle mt-1 text-muted">۱۱۱ عضو</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col mb-4 ">
                    <div class="card h-100 shadow-lg">
                      <img src="index12.jpeg" class="card-img-top shadow-sm" alt="..."/>
                      <div class="card-body">
                        <h5 class="card-title">اسم گروه</h5>
                        <p class="card-text">توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات توضیحات للل توضیحات توضیحات </p>
                        <div className="d-flex align-items-center">
                            <svg style={{width:24,height:24}} className="mx-1" viewBox="0 0 24 24">
                                <path fill="#00BCD4" d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                            </svg>
                            <h6 class="card-subtitle mt-1 text-muted">۱۱۱ عضو</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
            </div>
        </div>


    )



} 

export default withRouter(GroupsPage);

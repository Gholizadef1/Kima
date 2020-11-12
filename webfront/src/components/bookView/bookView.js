import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";

function BookView(props) {
    const [state , setState]=useState({
        image : "",
        summary : "",
    })
}


export default withRouter(BookView);
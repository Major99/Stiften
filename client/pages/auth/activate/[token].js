import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import Layout from '../../../components/layout/index';
import jwt from 'jsonwebtoken';
import { Button } from 'antd';
import axios from 'axios';
import styles from "../../../styles/signup.module.css";
import Link from 'next/link'
import {useRouter} from 'next/router'


const Activate = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        show: true
    });
    
    let { name, token, show } = values;

    const router=useRouter();
    token=router.query.token;
    useEffect(() => {
        if(token!=undefined){
            let { name } = jwt.decode(token);
            console.log(name);
        }
        
        if (token) {
            setValues({ ...values, name, token });
        }
    }, [token]);


    const clickSubmit = event => {
        event.preventDefault();
        axios({
            method: 'POST',
            url: `http://localhost:8000/api/account-activation`,
            data: { token }
        })
            .then(response => {
                console.log('ACCOUNT ACTIVATION', response);
                setValues({ ...values, show: false });
                toast.success(response.data.message);
            })
            .catch(error => {
                console.log('ACCOUNT ACTIVATION ERROR', error.response.data.error);
                toast.error(error.response.data.error);
            });
    };

    const activationLink = () => (
        <div className=" ">
            <h1 className=" ">Hey {name}</h1>
            <Button className="mb-3" onClick={clickSubmit} primary type="primary">
                Activate Account
            </Button>
        </div>
    );

    // const router=useRouter();
    // let token=router.query.token;
    // console.log(token)

    return (
        <Layout>
        <ToastContainer />
        <div className="container text-center mt-5">
          <div className='row col justify-content-center'>
             <div className='col-md-5 card pt-4'>
             {activationLink()}
            </div>
          </div>
        </div>
        </Layout>
    );
};

export default Activate;
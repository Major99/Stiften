import { ToastContainer, toast } from 'react-toastify';
import { authenticate, isAuth } from '../helpers';
import { TextField } from '@material-ui/core';
import Facebook from '../social/facebook';
import Layout from '../../../components/layout/index';
import React, { useState } from 'react';
import Google from '../social/google';
import { Button } from 'antd';
import axios from 'axios';
import Link from 'next/link'

import styles from "../../../styles/signin.module.css";
import router from 'next/router';
import { useRouter } from 'next/router'



const Signin = ({ history }) => {
    const router = useRouter()
    const { signin } = router.query

    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const { email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const informParent = response => {
        authenticate(response, () => {
            isAuth() && isAuth().role === 'admin' ? router.push('/core/admin') : router.push('/core/private');
        });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'POST',
            url: `http://localhost:8000/api/signin`,
            data: { email, password }
        })
            .then(response => {
                console.log('SIGNIN SUCCESS', response);
                // save the response (user, token) localstorage/cookie
                authenticate(response, () => {
                    setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                    // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
                    isAuth() && isAuth().role === 'admin' ? router.push('/core/admin') : router.push('/core/private');
                });
            })
            .catch(error => {
                console.log('SIGNIN ERROR', error.response.data);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const signinForm = () => (
        <form>

            <TextField id="Email"
                        label="Email"
                        variant="outlined"
                        onChange={handleChange('email')}
                        value={email}
                        fullWidth={true}
                        className="mb-4 mt-3"
                        size="small"
                        />

            <TextField id="Password"
                        label="Password"
                        variant="outlined"
                        onChange={handleChange('password')}
                        value={password}
                        type="password"
                        fullWidth={true}
                        className="mb-5"
                        size="small"
                        />

                <Button className={styles.loginaccount} onClick={clickSubmit} primary type="primary">
                    {buttonText}
                </Button>
        </form>
    );

    return (
        <Layout>
          <ToastContainer />
          {isAuth() ? router.push('/') : null}
            <div className={styles.body}>
                <div className="container text-center ">
                <div className='row col justify-content-center'>
                    <div className='col-md-5 pt-4'>
                    <div className={styles.card}>
                        <h1 className={styles.signintitle}>Sign In</h1>
                        <div className='row col justify-content-center pb-4 pt-4'>
                            <div className='col-md-6 '>
                                <Google informParent={informParent} />
                            </div>
                            <div className='col-md-6'>
                                <Facebook informParent={informParent} />
                            </div>
                        </div>

                        {signinForm()}
                        
                        <Link href="/auth/forgot/forgot" className="forgot ml-2 mb-2">
                            <a className={styles.forgot}>Forgot Password</a>
                        </Link>
                        
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </Layout>
    );
};

export default Signin;
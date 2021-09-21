import { isAuth, getCookie, signout, updateUser } from '../auth/helpers.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Layout from '../../components/layout';
import axios from 'axios';


import { Button } from 'antd';

const Private = ({ history }) => {
    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const token = getCookie('token');
    const curr_id=isAuth()._id
    useEffect(() => {
        console.log(curr_id)
        loadProfile(curr_id);
    }, [token,curr_id]);
    

    const loadProfile = (curr_id) => {
        axios({
            method: 'GET',
            url: `http://localhost:8000/api/user/${curr_id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('PRIVATE PROFILE UPDATE', response);
                const { role, name, email } = response.data;
                setValues({ ...values, role, name, email });
            })
            .catch(error => {
                console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
                if (error.response.status === 401) {
                    signout(() => {
                        router.push('/');
                    });
                }
            });
    };

    const { role, name, email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `http://localhost:8000/api/user/update`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { name, password }
        })
            .then(response => {
                console.log('PRIVATE PROFILE UPDATE SUCCESS', response);
                updateUser(response, () => {
                    setValues({ ...values, buttonText: 'Submitted' });
                    toast.success('Profile updated successfully');
                });
            })
            .catch(error => {
                console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const updateForm = () => (
        <form>

                <TextField id="role"
                variant="outlined"
                label="Role"
                fullWidth={true}
                value={role}
                className="mb-2 mt-2"
                size="small"
                disabled
                />

                <TextField id="name"
                label="Name"
                variant="outlined"
                fullWidth={true}
                onChange={handleChange('name')}
                value={name}
                className="mb-2 mt-2"
                size="small"
                />

                <TextField id="email"
                label="Email"
                variant="outlined"
                fullWidth={true}
                value={email}
                className="mb-2 mt-2"
                size="small"
                disabled
                />

                <TextField id="password"
                variant="outlined"
                label="Change password"
                fullWidth={true}
                className="mb-2 mt-2"
                size="small"
                type="password"
                onChange={handleChange('password')}
                value={password}
                />


                <Button className="mb-3" onClick={clickSubmit} primary type="primary">
                    {buttonText}
                </Button>

        </form>
    );

    return (
        <Layout>
          <ToastContainer />
          <div className="container text-center mt-5">
            <div className='row col justify-content-center'>
               <div className='col-md-5 card pt-4'>
                <h1 className=" ">Private</h1>
                <p className=" ">Profile update</p>
                {updateForm()}
            </div>
          </div>
        </div>
        </Layout>
    );
};

export default Private;
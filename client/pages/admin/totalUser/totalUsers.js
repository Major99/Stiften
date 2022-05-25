import React, { useState, useEffect } from 'react';
import { isAuth, getCookie, signout, updateUser } from '../../auth/helpers.js';

import axios from 'axios';
import { Table, Tag, Space } from 'antd';

import Layout from '../../../components/layout';

const convertDate =(date) =>{
    return new Date(date).getDate()+"/"+(new Date(date).getMonth()+1)+"/"+new Date(date).getFullYear()+" "+new Date(date).getHours()+":"+new Date(date).getMinutes()+":"+new Date(date).getSeconds()
}

const columns = [
    {
    title: 'User Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
    },
    {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: text => <a>{text}</a>,
    },
    {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: text => <a>{text}</a>,
    },
    {
    title: 'Time Account Created',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: text=> <p>{convertDate(text)}</p>,
    defaultSortOrder: ['ascend'],
    },
];
const totalUsers = ()=>{
    
    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit',
        data:null,
    });
    const { role, name, email, password, buttonText,data } = values;

    const token = getCookie('token');

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = () => {
        axios({
            method: 'GET',
            url: `http://localhost:8000/api/user/all/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('USERS LIST UPDATE', response);
                console.log(response.data);
                setValues({data:response.data})
            })
            .catch(error => {
                console.log('USERS LIST UPDATE ERROR', error.response.data.error);
            });
    };



    return(
        <Layout>
            <h1>Users List</h1>
            <Table columns={columns} dataSource={data} />
        </Layout>
    )

}
export default totalUsers;

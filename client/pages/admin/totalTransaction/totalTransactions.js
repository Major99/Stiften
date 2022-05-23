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
    title: 'Donor Name',
    dataIndex: 'userId',
    key: 'userId',
    render: text => <a>{text}</a>,
    },
    {
    title: 'Organisation Name',
    dataIndex: 'orgId',
    key: 'orgId',
    render: text => <a>{text}</a>,
    },
    {
    title: 'Amount',
    dataIndex: 'order_amount',
    key: 'order_amount',
    render: text => <a>₹{text}</a>,
    },
    {
    title: 'Order ID',
    dataIndex: 'order_id',
    key: 'order_id',
    },
    {
    title: 'Time',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: text=> <p>{convertDate(text)}</p>,
    defaultSortOrder: ['ascend'],
    },
];
const totalTransactions = ()=>{
    
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
            url: `http://localhost:8000/api/order/all/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('PRIVATE PROFILE UPDATE', response);
                console.log(response.data);
                setValues({data:response.data})
            })
            .catch(error => {
                console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
            });
    };



    return(
        <Layout>
            <h1>Transactions List</h1>
            <Table columns={columns} dataSource={data} />
        </Layout>
    )

}
export default totalTransactions;

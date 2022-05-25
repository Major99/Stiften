import React, {useState, useEffect} from 'react';
import { isAuth, getCookie, signout, updateUser } from '../../auth/helpers.js';
import CreateOrgs from '../../../components/admin/createOrgs';
import styles from "../../../styles/organisationlist.module.css";
import { Table, Tag, Space,Modal } from 'antd';
import axios from 'axios';
import Layout from '../../../components/layout';

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
    title: 'Number',
    dataIndex: 'number',
    key: 'number',
    render: text => <a>{text}</a>,
    },
    {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
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

const organisations = ()=>{
    
    const [values, setValues] = useState({
        name: '',
        email: '',
        number: '',
        address:'',
        buttonText: 'Submit',
        data:null,
    });
    const { name, email, number, address, buttonText,data } = values;

    const token = getCookie('token');

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = () => {
        axios({
            method: 'GET',
            url: `http://localhost:8000/api/organisation/all`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('ORGANISATION LIST UPDATE', response);
                console.log(response.data);
                setValues({data:response.data})
            })
            .catch(error => {
                console.log('ORGANISATION LIST UPDATE ERROR', error.response.data.error);
            });
    };

    return(
        <>
            <Layout>
                <CreateOrgs/>

                <h1>Organisation List</h1>
                <Table columns={columns} dataSource={data} />
            </Layout>
        </>
    )
}

export default organisations;
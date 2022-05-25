import React, {useState} from "react";

import axios from 'axios';
import { Modal, Button, Form, Input, InputNumber } from 'antd';

const CreateOrgs = () =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const handleSubmit = async (e) => {
        axios({
            method: 'POST',
            url: `http://localhost:8000/api/organisation/create`,
            data: { e }
        })
            .then(response =>{
                console.log('check1')
            })
            .catch(error=>{
                console.log('check error')
            })
    };
    
    const handleCancel = () => {
        setVisible(false)
        form.resetFields()
    };
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };
    const [org, setOrg] = React.useState({
        name: "",
        rating: "",
        number: "",
        location: "",
        description: "",
        social: "",
        gmap: "",
        website: "",
        gmap: "",
        email: "",
        isLoading: false,
    });
    const handleChange = (type) => async (e) => {
        switch (type) {
            case "name":
                setOrg({ ...org, name: e.target.value });
                break;
            case "rating":
                setOrg({ ...org, rating: e.target.value });
                break;
            case "number":
                setOrg({ ...org, number: e.target.value });
                break;
            case "location":
                setOrg({ ...org, location: e.target.value });
                break;
            case "description":
                setOrg({ ...org, description: e.target.value });
                break;
            case "social":
                setOrg({ ...org, social: e.target.value });
                break;
            case "address":
                setOrg({ ...org, address: e.target.value });
                break;
            case "gmap":
                setOrg({ ...org, gmap: e.target.value });
                break;
            case "website":
                setOrg({ ...org, website: e.target.value });
                break;
            case "email":
                setOrg({ ...org, email: e.target.value });
                break;
            default:
        }
    };

    return(
        <>
            <Button type="primary" onClick={() => setModalVisible(true)}>
                Add Organisation
            </Button>
            <Modal
                title="Details of Organisation"
                centered
                visible={modalVisible}
                onOk={()=>{
                    handleSubmit(org)
                    setModalVisible(false)
                }}
                onCancel={() => setModalVisible(false)}
            >
                
                <Form {...layout} name="nest-messages"  validateMessages={validateMessages}>
                    <Form.Item
                        name={['organisation', 'name']}
                        label="Name"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input onChange={handleChange("name")}/>
                    </Form.Item>
                    <Form.Item
                        name={['organisation', 'email']}
                        label="Email"
                        rules={[
                        {
                            type: 'email',
                        },
                        ]}
                    >
                        <Input  onChange={handleChange("email")}/>
                    </Form.Item>
                    <Form.Item
                        name={['organisation', 'rating']}
                        label="Rating"
                    >
                        <Input onChange={handleChange("rating")}/>
                    </Form.Item>
                    <Form.Item
                        name={['organisation', 'number']}
                        label="Number"
                    >
                        <Input placeholder="XXXXXXXXXX" onChange={handleChange("number")} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name={['organisation', 'location']} 
                    label="Location">
                        <Input placeholder='' onChange={handleChange("location")}/>
                    </Form.Item>
                    <Form.Item name={['organisation', 'social']} 
                    label="Social">
                        <Input  onChange={handleChange("social")}/>
                    </Form.Item>
                    <Form.Item name={['organisation', 'address']} 
                    label="address">
                        <Input  onChange={handleChange("address")}/>
                    </Form.Item>
                    <Form.Item name={['organisation', 'gmap']} 
                    label="gmap">
                        <Input  onChange={handleChange("gmap")}/>
                    </Form.Item>
                    <Form.Item name={['organisation', 'website']} 
                    label="Website">
                        <Input  onChange={handleChange("website")}/>
                    </Form.Item>
                    <Form.Item name={['organisation', 'description']} 
                    label="Description">
                        <Input.TextArea  onChange={handleChange("description")}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default CreateOrgs;
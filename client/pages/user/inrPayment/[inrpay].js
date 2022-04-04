import React, {useState} from 'react';
import { useCallback } from "react";
import { createOrder, orderVerify } from '../../actions/order';
import { isAuth,getCookie } from '../../actions/auth';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout';
import styles from '../../../styles/inrpay.module.css';
import { TextField } from '@material-ui/core';
import { Button } from 'antd';

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}


const inr = ()=>{
    const router = useRouter()
    const { inrpay } = router.query

	const [name, setName] = useState('Aman');
	const [amountC, setAmountC] = useState(1234)
    const token = getCookie('token');
    const [orderID, setOrderID]= useState();
    const [payStatus, setPayStatus]=useState();

    
    const [values, setValues] = useState({
        amount: '',
        buttonText: 'Pay in INR'
    });

    const { amount, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    
    const getdetails = (organizations) =>{
        for(var i=0; i<=organizations.length; i+=1){
            if(organizations[i].name===pay){
                return i;
            }
        }
        return null;
    }

    const generateOrder = event => {
        const order = {
                    orgId: 'Org1',
                    order_amount: amountC,
                    userId: name }
       
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        createOrder(order,token)
            .then(res => {
                console.log(res)
                setOrderID(res.order_id)
                setPayStatus(true)
            })
            .catch(err => console.log(err))
        }
    


    const paymentHandler = async() => {
		const resi = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        
		if (!resi) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}
        const options = {
        key: 'rzp_test_Zd5zdtFpzQk07Q',
        amount: amountC,
        currency: 'INR',
        name: 'Payments',
        order_id: orderID,
   
        handler(response) {
          const fuck = {
            order_id:response.razorpay_order_id,
            payment_id:response.razorpay_payment_id,
            razorpay_signature:response.razorpay_signature,
            userId: name
          }
         orderVerify(fuck,token)
           .then((res) =>  onOrderverification(res))
           .catch(err => console.log(err))
          }
        }
        const razorpay = new window.Razorpay(options);
        razorpay.open()
    }
    
    const onOrderverification = (res) => {
    if(res.payment ===0){
        return;
    }
    if(res.payment ===1){
        console.log('All set')
    }
    return;
    }
    
    if(payStatus){
        paymentHandler()
        setPayStatus(false)
    }
	// async function displayRazorpay() {
	// 	const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

	// 	if (!res) {
	// 		alert('Razorpay SDK failed to load. Are you online?')
	// 		return
	// 	}

	// 	const data = await fetch('http://localhost:8080/razorpay', { method: 'POST' }).then((t) =>
	// 		t.json()
	// 	)
        

	// 	console.log(data)

	// 	const options = {
	// 		key: 'rzp_test_lPB0YcjLsp92NS',
	// 		currency: data.currency,
	// 		amount: data.amount.toString(),
	// 		order_id: data.id,
	// 		name: 'Donation',
	// 		description: 'Thank you for nothing. Please give us some money',
	// 		image: '/client/public/logo_bg3.png',
	// 		handler: function (response) {
	// 			alert(response.razorpay_payment_id)
	// 			alert(response.razorpay_order_id)
	// 			alert(response.razorpay_signature)
	// 		},
	// 		prefill: {
	// 			name,
	// 			email: 'sdfdsjfh2@ndsfdf.com',
	// 			phone_number: '9899999999'
	// 		}
	// 	}
	// 	const paymentObject = new window.Razorpay(options)
	// 	paymentObject.open()
	// }
    
    const paymentForm = () => (
        <form>

            <TextField id="Amount to donate"
                        label="Amount to donate"
                        variant="outlined"
                        onChange={handleChange('amount')}
                        value={amount}
                        fullWidth={true}
                        className="mb-4 mt-3"
                        size="small"
                        />


                <Button onClick={generateOrder} className={styles.button} primary type="primary">
                    {buttonText}
                </Button>
                <Button onClick={generateOrder} className={styles.button} primary type="primary">
                    {buttonText} anonymously
                </Button>
                
        </form>
    );
  
    return(
        <Layout>
            <div className={styles.body}>
                
                <h1 className={styles.heading}>You're going to pay for {inrpay}</h1>
                    <div className={styles.formbody}>
                        {paymentForm()}
                    </div>
            </div>
        </Layout>
    )
}

export default inr;
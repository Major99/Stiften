import React, { useState } from 'react';
import { ethers } from "ethers";
import { useRouter } from 'next/router';
import Layout from '../../../components/layout';
import styles from '../../../styles/ethpay.module.css';
import { TextField } from '@material-ui/core';
import { Button } from 'antd';


const ethPayment = () => {
    const router = useRouter()
    const { ethpay } = router.query

    const [error, setError] = useState();
    const [txs, setTxs] = useState();
    const [address, setAddress] = useState('0xf1317fCE01f290d44b8987C88fcdEBF69a372896');
    

    const [values, setValues] = useState({
        amount: '',
        buttonText: 'Pay in ethereum'
    });

    const { amount, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        startPayment({
            setError,
            setTxs,
            ether: values.amount,
            addr: address
        });
        return
    };
    
    const startPayment = async ({ setError, setTxs, ether, addr }) => {
        try {
            if (!window.ethereum)
                throw new Error("No crypto wallet found. Please install it.");

            await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            ethers.utils.getAddress(addr);
            const tx = await signer.sendTransaction({
                to: addr,
                value: ethers.utils.parseEther(ether)
            });
            setValues({ ...values, amount: '', buttonText: 'Payment Done' });
            console.log({ ether, addr });
            console.log("tx", tx.hash);
            setTxs(tx.hash)
        } catch (err) {
            setError(err.message);
        }
    };
    
    // const clickSubmit = event => {
    //     event.preventDefault();
    //     setValues({ ...values, buttonText: 'Submitting' });
    //     axios({
    //         method: 'POST',
    //         url: `http://localhost:8000/api/signin`,
    //         data: { email, password }
    //     })
    //         .then(response => {
    //             console.log('SIGNIN SUCCESS', response);
    //             // save the response (user, token) localstorage/cookie
    //             authenticate(response, () => {
    //                 setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
    //                 // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
    //                 isAuth() && isAuth().role === 'admin' ? router.push('/core/admin') : router.push('/core/private');
    //             });
    //         })
    //         .catch(error => {
    //             console.log('SIGNIN ERROR', error.response.data);
    //             setValues({ ...values, buttonText: 'Submit' });
    //             toast.error(error.response.data.error);
    //         });
    // };


    const getdetails = (organizations) =>{
        for(var i=0; i<=organizations.length; i+=1){
            if(organizations[i].name===pay){
                return i;
            }
        }
        return null;
    }

    
    const paymentForm = () => (
        <form>

            <TextField id="Amount to donate in ether"
                        label="Amount to donate in ether"
                        variant="outlined"
                        onChange={handleChange('amount')}
                        value={amount}
                        fullWidth={true}
                        className="mb-4 mt-3"
                        size="small"
                        />


                <Button onClick={handleSubmit} className={styles.button} primary type="primary">
                    {buttonText}
                </Button>
                <Button onClick={handleSubmit} className={styles.button} primary type="primary">
                    {buttonText} anonymously
                </Button>
                
        </form>
    );

    return ( 
        <Layout>
            <div className={styles.body}>
                
            <h1 className={styles.heading}>You're going to pay for {ethpay}</h1>
                <div className={styles.formbody}>
                    {paymentForm()}
                </div>

                <h1>{txs}</h1>
                <h1>{error}</h1>
            </div>
        </Layout>
    );
}
 
export default ethPayment;
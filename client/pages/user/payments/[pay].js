
import React, { useState } from 'react';
import styles from "../../../styles/paymentspage.module.css";
import router from 'next/router';
import Layout from '../../../components/layout';
import { organisations as organizations } from '../list';
import Link from 'next/link'
import { useRouter } from 'next/router'

const Paymentspage=()=>{
    const router = useRouter()
    const { pay } = router.query
    
    const getdetails = (organizations) =>{
        for(var i=0; i<=organizations.length; i+=1){
            if(organizations[i].name===pay){
                return i;
            }
        }
        return null;
    }

    return(
        
        <Layout>
            <div className={styles.body}>
                <h1 className={styles.heading}>You're going to pay for {organizations[getdetails(organizations)].name}</h1>
                <Link href="/user/inrPayment" className="forgot ml-2 mb-2">
                            <a className={styles.button}>Pay in Indian Currency</a>
                </Link>
                <Link href="/user/ethPayment" className="forgot ml-2 mb-2">
                            <a className={styles.button}>Pay in Ethereum</a>
                </Link>
            </div>
        </Layout>
    )
}
export default Paymentspage;
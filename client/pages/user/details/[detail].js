
import React, { useState } from 'react';
import styles from "../../../styles/organisationdetail.module.css";
import router from 'next/router';
import Layout from '../../../components/layout';
import Link from 'next/link'
import { organisations as organizations } from '../list';
import { useRouter } from 'next/router'


const User=()=>{
    const router = useRouter()
    const { detail } = router.query
    
    const getdetails = (organizations) =>{
        for(var i=0; i<=organizations.length; i+=1){
            if(organizations[i].name===detail){
                return i;
            }
        }
        return null;
    }

    return(
        
        <Layout>
            <div className={styles.body}>
                <div className={styles.descp}>
                <h1 className={styles.heading}>{detail}</h1>
                
                <h5 className={styles.heading}>Description: </h5>
                <p>{organizations[getdetails(organizations)].description}</p>
                <h5 className={styles.heading}> Google Rating: </h5>
                <p>{organizations[getdetails(organizations)].rating}</p>
                <h5 className={styles.heading}>Contact Number:  </h5>
                <p>{organizations[getdetails(organizations)].number}</p>
                <h5 className={styles.heading}>Address:  </h5>
                <p>{organizations[getdetails(organizations)].address}</p>
                <h5 className={styles.heading}> Social Media: </h5>
                <p>{organizations[getdetails(organizations)].social}</p>
                <h5 className={styles.heading}> Website: </h5>
                <p>{organizations[getdetails(organizations)].website}</p>
                </div>

                <div className={styles.payment}>
                    <h3 className={styles.heading}>If you like to donate to this organisation click down below ---</h3>
                    <Link href={`/user/inrPayment/${organizations[getdetails(organizations)].name}`} className="forgot ml-2 mb-2">
                                <a className={styles.button}>Donate in Indian Currency</a>
                    </Link>
                    <Link href={`/user/ethPayment/${organizations[getdetails(organizations)].name}`} className="forgot ml-2 mb-2">
                                <a className={styles.button}>Donate in Ethereum</a>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}
export default User;
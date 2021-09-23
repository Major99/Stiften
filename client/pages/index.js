import 'react-toastify/dist/ReactToastify.min.css';
import React from 'react'
import Link from 'next/link'
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { Button } from 'antd';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


const Home = ()=>{

  return(
    <>
    <Layout>
      {/* <h1>Home</h1>
      <p>Note that Web3 is not loaded for this page.</p>
      <div><Link href='/dapp'><a>My Dapp</a></Link></div>
      <div><Link href='/accounts'><a>My Accounts</a></Link></div> */}
      <section className={styles.section1}>
        <div className={styles.section1content}>
          <h1 className={styles.contentheader}>Charity Is An Act Of A Soft Heart.</h1>
          <p className={styles.contentpara}>Cupidatate aute doloree Lorem ex aliqua. Ipsum aute voluptate pariatur laboris sit Lorem commodo adipisicing sunt veniam est. Pariatur labore quis quis aute reprehenderit reprehenderit adipisicing dolore deserunt nulla reprehenderit.</p>
          <button className={styles.buttonMember}>Become A Member Now <ArrowForwardIcon/></button>
          
        </div>
        <div 
          className={styles.pic1}>
          <img src='/poverty_1.jpg'
          alt='poverty pic'
          className={styles.pic11}
          />
        </div>
      </section>

      <section className={styles.section2}>
        <h1>section2</h1>
        
      </section>

      <section className={styles.section3}>
        <h1>section3</h1>
      </section>
    </Layout>
    </>
  );

};

export default Home;
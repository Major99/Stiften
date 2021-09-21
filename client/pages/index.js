import 'react-toastify/dist/ReactToastify.min.css';
import React from 'react'
import Link from 'next/link'
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";

// export default () =>
//   <div >
//     <h1>Home</h1>
//     <p>Note that Web3 is not loaded for this page.</p>
//     <div><Link href='/dapp'><a>My Dapp</a></Link></div>
//     <div><Link href='/accounts'><a>My Accounts</a></Link></div>

//   </div>

const Home = ()=>{

  return(
    <>
    <Layout>
      <h1>Home</h1>
      <p>Note that Web3 is not loaded for this page.</p>
      <div><Link href='/dapp'><a>My Dapp</a></Link></div>
      <div><Link href='/accounts'><a>My Accounts</a></Link></div>
    </Layout>
    </>
  );

};

export default Home;
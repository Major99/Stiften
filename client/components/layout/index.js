import Header from '../Header';
import Footer from '../Footer';
import styles from '../../styles/Layout.module.css';
import { isAuth, signout } from '../../pages/auth/helpers';
import React, { Fragment, useState } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import cookie from 'js-cookie';
import MenuIcon from '@material-ui/icons/menu';
import CloseIcon from '@material-ui/icons/Close';


const Layout = ({ children, match, history }) => {
    const [clicked, setClicked]= useState(false);

    const handleClick=()=> {
        setClicked(!clicked);
    }
    

    const nav = () => (
        <>
            <div className={styles.menuicon} onClick={handleClick}>
                {clicked ? (
                    <CloseIcon color='white'/>
                ) : (
                    <MenuIcon color='white'/>
                )}
            </div>
            <ul className={clicked? styles.navlinkactive : styles.navlink}>
                
                    <Link href="/">
                        <a className={styles.navlinksdetail}>
                        Home
                        </a>
                    </Link>
                

                {!isAuth() && (
                    <Fragment>
                            <Link href="/auth/signin/signin" >
                            <a className={styles.navlinksdetail}>
                                Sign In
                            </a>
                            </Link>

                            <Link href="/auth/signup/signup" >
                            <a className={styles.navlinksdetail}>
                                Get started
                                </a>
                            </Link>
                    </Fragment>
                )}

                {isAuth() && isAuth().role === 'admin' && (
                    <Fragment>
                        <Link className={styles.navlinksdetail}  href="/user/organisationlist">
                            <a className={styles.navlinksdetail}>
                                Organizations
                            </a>
                        </Link>
                        <Link className={styles.navlinksdetail}  href="/admin/totalTransaction/totalTransactions">
                            <a className={styles.navlinksdetail}>
                                Transactions
                            </a>
                        </Link>
                        <Link className={styles.navlinksdetail}  href="/admin/totalUser/totalUsers">
                            <a className={styles.navlinksdetail}>
                                Users
                            </a>
                        </Link>
                        <Link className={styles.navlinksdetail}  href="/core/admin">
                            <a className={styles.navlinksdetail}>
                                {isAuth().name}
                            </a>
                        </Link>
                    </Fragment>
                )}

                {isAuth() && isAuth().role === 'subscriber' && (
                    <Fragment>
                        <Link className={styles.navlinksdetail}  href="/user/organisationlist">
                            <a className={styles.navlinksdetail}>
                                Organizations
                            </a>
                        </Link>
                        <Link className={styles.navlinksdetail}  href="/user/transaction/transactions">
                            <a className={styles.navlinksdetail}>
                                Transactions
                            </a>
                        </Link>
                        <Link className={styles.navlinksdetail}  href="/accounts">
                            <a className={styles.navlinksdetail}>
                                Detials
                            </a>
                        </Link>
                        <Link className={styles.navlinksdetail}  href="/core/private">
                            <a className={styles.navlinksdetail}>
                                {isAuth().name}
                            </a>
                        </Link>
                    </Fragment>
                )}

                {isAuth() && isAuth().role === 'organisation' && (
                                    <Fragment>
                                        <Link className={styles.navlinksdetail}  href="/user/organisationlist">
                                            <a className={styles.navlinksdetail}>
                                                Volunteer
                                            </a>
                                        </Link>
                                        <Link className={styles.navlinksdetail}  href="/user/transaction/transactions">
                                            <a className={styles.navlinksdetail}>
                                                Transactions
                                            </a>
                                        </Link>
                                        <Link className={styles.navlinksdetail}  href="/core/private">
                                            <a className={styles.navlinksdetail}>
                                                Transactions
                                            </a>
                                        </Link>
                                        <Link className={styles.navlinksdetail}  href="/core/private">
                                            <a className={styles.navlinksdetail}>
                                                {isAuth().name}
                                            </a>
                                        </Link>
                                    </Fragment>
                                )}

                {isAuth() && (

                            <div 
                            className={styles.navlinksdetail}
                            onClick={() => {
                                signout();
                            }} >
                            Sign out
                            </div>

                )}
            </ul>
        </>
    );

    return (
        <Fragment>
            
            <Header>
                {nav()}
            </Header>
            <div className=" ">{children}</div>
            <Footer></Footer>
        </Fragment>
    );
};

export default Layout;
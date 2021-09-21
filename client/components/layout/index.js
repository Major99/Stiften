import Header from '../Header';
import Footer from '../Footer';
import styles from '../../styles/Layout.module.css';
import { isAuth, signout } from '../../pages/auth/helpers';
import React, { Fragment } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import cookie from 'js-cookie';


const Layout = ({ children, match, history }) => {


    const nav = () => (
        <ul className="container text-center pt-2">
            <Button ghost>
                <Link href="/" className="mr-2 ml-2" >
                    Home
                </Link>
            </Button>

            {!isAuth() && (
                <Fragment>
                    <Button ghost>
                        <Link href="/auth/signin/signin" className="mr-2 ml-2" >
                            Sign In
                        </Link>
                    </Button>

                    <Button   ghost>
                        <Link href="/auth/signup/signup" className="mr-2 ml-2" >
                            Get started
                        </Link>
                    </Button>

                </Fragment>
            )}

            {isAuth() && isAuth().role === 'admin' && (
                <Button ghost>
                    <Link className="mr-2 ml-2"  href="/core/admin">
                        {isAuth().name}
                    </Link>
                </Button>
            )}

            {isAuth() && isAuth().role === 'subscriber' && (
                <Button ghost>
                    <Link className="mr-2 ml-2"  href="/core/private">
                        {isAuth().name}
                    </Link>
                </Button>
            )}

            {isAuth() && (

                    <Button
                        className="mr-2 ml-2"
                        onClick={() => {
                            signout();
                        }}
                        type="primary"
                        danger
                    >
                        Sign out
                    </Button>

            )}
        </ul>
    );

    return (
        <Fragment>
            {nav()}
            <div className=" ">{children}</div>
        </Fragment>
    );
};

export default Layout;
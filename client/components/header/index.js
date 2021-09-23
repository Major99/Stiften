import { useEffect, useState } from "react";
import styles from "../../styles/Header.module.css";
import { Grid, GridListTile } from "@material-ui/core";

const Header = ({children}) => {

    return (
        <nav className={styles.nav}>
            <div className={styles.navlogo}>
                <div className={styles.navbarLogo}>
                    <img src="/logo_bg3.png" 
                    className={styles.logo} 
                    alt="Stiften_logo"/>
                </div>
                <h1 className={styles.navtext}>STIFTEN</h1>
            </div>
            {children}
        </nav>
    );
};

export default Header;
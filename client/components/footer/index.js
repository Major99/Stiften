import styles from '../../styles/Footer.module.css';
import { withRouter } from 'next/router';

const Footer = ({ router }) => {
    if(router.pathname === '/'){
        return <div className={styles.footerhome}>
        <footer>
        <div className={styles.footer}>
        <section>
        <h3>Stiften</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </section>
        <section>
        <h3>LINKS</h3>
        <a href="#">Home</a>
        <a href="#">About Us</a>
        <a href="#">Blog</a>
        <a href="#">Contact Us</a>
        </section>
        <section>
        <h3>OTHER</h3>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Cookie Policy</a>
        </section>
        <section>
        <h3>ANY QUESTIONS?</h3>
        <a href="emailto:support@websitename.com"><span><i class="fa fa-envelope"></i></span><span>support@websitename.com</span></a>
        <a href="tel:xxxxxxxxx"><span><i class="fa fa-phone"></i></span><span>(+x)-xxx-xxxx-xxxxx</span></a>
        </section>
        </div>
        </footer>
        <div className={styles.subfooter}>
        Copyright ©2021 All rights reserved | website name
        </div>
                </div>
    }else {
        return <div >
        <footer>
        <div className={styles.footer}>
        <section>
        <h3>Stiften</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </section>
        <section>
        <h3>LINKS</h3>
        <a href="#">Home</a>
        <a href="#">About Us</a>
        <a href="#">Blog</a>
        <a href="#">Contact Us</a>
        </section>
        <section>
        <h3>OTHER</h3>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Cookie Policy</a>
        </section>
        <section>
        <h3>ANY QUESTIONS?</h3>
        <a href="emailto:support@websitename.com"><span><i class="fa fa-envelope"></i></span><span>support@websitename.com</span></a>
        <a href="tel:xxxxxxxxx"><span><i class="fa fa-phone"></i></span><span>(+x)-xxx-xxxx-xxxxx</span></a>
        </section>
        </div>
        </footer>
        <div className={styles.subfooter}>
        Copyright ©2021 All rights reserved | Stiften
        </div>
                </div>
    }
}

export default withRouter(Footer);
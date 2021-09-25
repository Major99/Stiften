import 'react-toastify/dist/ReactToastify.min.css';
import React from 'react'
import Link from 'next/link'
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Button, Divider, Card } from 'antd';

const Home = ()=>{

  const icon=(imgname,header,para)=>(
    <div className={styles.iconsec}>
          <>
          <img src={imgname}
          alt='donation pic 1'
          className={styles.icons2}/>
          </>
          <div className={styles.iconContent}>
            <h3 className={styles.section2header}>{header}</h3>
            <p>{para}</p>
          </div>
    </div>
  )
  const { Meta } = Card;

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
        {icon('/donation(1).png','985+','Donations Received')}
        {icon('/donation.png','₹10 L','Money Donated')}
        {icon('/campaign.png','12+','Active Campaign')}
        {icon('/heart.png','₹60 L','Charity in last year')}
      </section>

      <section className={styles.section3}>
        <div className={styles.campaignSec}>
          <div className={styles.campaignsecleft}>
            <h1 className={styles.campaignheader}>Support Your Community</h1>
            <p className={styles.campaignpara}>Officia sint adipidsicing officia consectetur aliquip cupidatat amet voluptate irure ullamco velit ut. Exercitation laborum occaecat exercitation sint nulla dolor dolore in nostrud.</p>
            <div className={styles.cards}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="/campaign1.png" />}
                className={styles.card}
              >
                <Meta title="Covid-19" />
              </Card>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="/campaign2.png" />}
                className={styles.card}
              >
                <Meta title="Dog Food" />
              </Card>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="/campaign4.png" />}
                className={styles.card}
              >
                <Meta title="Water Supply" />
              </Card>
            </div>
          </div>
          <div className={styles.campaignsecright}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="/campaign3.png" />}
              className={styles.card}
            >
              <Meta title="Food Bank" />
            </Card>
            
            <Link href='/'><a className={styles.allcamplink}><u>View All Campaigns</u></a></Link>
          </div>
        </div>

        <hr/>
        <div className={styles.about}>
          <div className={styles.aboutpicbg}>
            <img 
            src='/about.png'
            alt='about pic'
            className={styles.aboutpic}/>
          </div>
          <div className={styles.aboutcontent}>
            <h1 className={styles.aboutheader}>About Us</h1>
            <p className={styles.aboutpara}>Do adipisicing tempor Lorem ex aliquip veniam cupidatat ut sit. Do mollit occaecat dolore in commodo et id laborum voluptate. Sit ipsum magna commodo nulla consequat ex commodo anim sit irure aliquip. Occaecat Lorem eu fugiat proident nostrud labore. Anim velit sunt cupidatat ut elit sit.</p>
          </div>
        </div>

      <hr/>
        <div className={styles.teamSec}>
      <h1>TeamSec</h1>
        </div>

      <hr/>
        <div className={styles.testimonialSec}>
      <h1>testimoial sec</h1>
        </div>
      </section>

      <section className={styles.section4}>
        <h1>
          section4
        </h1>
      </section>
    </Layout>
    </>
  );

};

export default Home;
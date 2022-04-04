
import React, { useState,Component } from 'react';
import { Table, Tag, Space,Modal } from 'antd';
import {organisations} from './list.js';
import styles from "../../styles/organisationlist.module.css";
import router from 'next/router';
import Layout from '../../components/layout';
import Link from 'next/link'

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};
function onScriptt(pos) {
    var crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
}

function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}



function deg2rad(deg) {
return deg * (Math.PI/180)
}

const organisationlist = () =>{
    
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //     originLat: 0,
    //     originLng: 0,
    //     destLat: 0,
    //     destLng: 0,
    //     distance: 0
    //     };
    // this.onScriptLoad = this.onScriptLoad.bind(this);
    // }

    // onScriptLoad() {
    //     let coordsArray = [
    //         { lat: 41.0082, lng: 28.9784 },
    //         { lat: 41.1082, lng: 28.9784 }
    //     ];
    //     this.setState({
    //         originLat: 41,
    //         originLng: 42,
    //         destLat: 43,
    //         destLng: 44,
    //         distance:22
    //     });
    //     console.log(1)
    //     console.log(this.state.destLat)

//     let service = new google.maps.DistanceMatrixService();
//     service.getDistanceMatrix(
//       {
//         origins: [{ lat: this.state.originLat, lng: this.state.originLng }],
//         destinations: [{ lat: this.state.destLat, lng: this.state.destLng }],
//         travelMode: "DRIVING"
//       },
//       (response, status) => {
//         if (status !== "OK") {
//           alert("Error was: " + status);
//         } else {
//           this.setState({
//             distance: response.rows[0].elements[0].distance.text
//           });
//         }
//       }
//     );
       


//    }

    // componentDidMount() {
    // if (navigator.geolocation) {
    //     navigator.permissions
    //         .query({ name: "geolocation" })
    //         .then(function (result) {
    //             if (result.state === "granted") {
    //             console.log(result.state);
    //             //If granted then you can directly call your function here
    //             navigator.geolocation.getCurrentPosition((position)=>{
    //                 this.setState({
    //                     originLat:position.coords.latitude,
    //                     originLng:position.coords.longitude
    //                 })
    //             });
    //             } else if (result.state === "prompt") {
    //             navigator.geolocation.getCurrentPosition(onScriptt, errors, options);
    //             } else if (result.state === "denied") {
    //             //If denied then you have to show instructions to enable location
    //             }
    //             result.onchange = function () {
    //             console.log(result.state);
    //             };
    //         });
    //     } else {
    //         alert("Please allow us to get your location to show organisation on the basis of your location.");
    //     }
    // }

    // render() {

    const [originLat, setOriginLat] = useState(null);
    const [originLng, setOriginLng] = useState(null);
    const [destLat, setDestLat] = useState(null);
    const [destLng, setDestLng] = useState(null);
    const [status, setStatus] = useState(null);
    const [distanceStatus, setDistanceStatus] = useState('false');
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [modalText, setModalText] = React.useState('Tap Allow to Know your location for personalized search.');
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    
  const showModal = () => {
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


    const getDistanceFromLatLonInKm= (lat1,lon1,lat2,lon2) =>{

        setDistanceStatus('true');
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d.toFixed(1);
    }

    const getLocation = () => {
        if( typeof window !== 'undefined' ){
        if (!navigator.geolocation) {
          setStatus('Geolocation is not supported by your browser');
        } else {
          setStatus('Locating...');
          navigator.geolocation.getCurrentPosition((position) => {
            setStatus(null);
            setOriginLat(position.coords.latitude);
            setOriginLng(position.coords.longitude);
            setModalText('The modal will be closed after two seconds');
            setConfirmLoading(true);
            setTimeout(() => {
              setIsModalVisible(false);
              setConfirmLoading(false);
            }, 2000);
          }, () => {
            setStatus('Unable to retrieve your location');
          });
        }}
      }
    
      
        const columnstopic = [
            {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            },
            {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            },
            {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            },
            {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
            },
            {
                title: 'Distance',
                dataIndex:'loc',
                key: 'loc',
                defaultSortOrder: 'descend',
                render: loc=>(
                    <>
                            <p>{getDistanceFromLatLonInKm(originLat,originLng,loc[0],loc[1])}</p>
                    </>
                )},
                {
                    title: 'Details',
                    dataIndex:'name',
                    key: 'name',
                    render: (name) => (
                        
                        <>
                        <Link href={`/user/details/${name}`} passHref>
                                    <a className={styles.button1}>Details</a>
                        </Link>
                        <Link href={`/user/payments/${name}`} passHref>
                                    <a className={styles.button2}>Donation</a>
                        </Link>
                        </>
                    ),
                },
        ];

        return (
            <Layout>
                <div className={styles.body}>
                    <h1 className={styles.heading}>Organisations Lists</h1>
                    
                    <Modal title="Gettting Location" visible={isModalVisible} onOk={getLocation} onCancel={handleCancel} confirmLoading={confirmLoading}>
                        {modalText}
                    </Modal>
                        <Table 
                        columns={columnstopic} 
                        dataSource={organisations} 
                        className={styles.tableCss}
                        bordered
                        />


                    
                </div>
            </Layout>
        );
    }
//}

export default organisationlist;
import React, { useState, useEffect } from 'react'
import './css/dashboard.css'
import UserShowProfile from './UserShowProfile'
import UserUpdateprofile from './UserUpdateprofile'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { auth, db } from '../../firebase/firebase'
import { ref, child, get, getDatabase } from "firebase/database";
import { set, update, push } from "firebase/database";
import { Pagination } from 'antd';
import { Redirect, useHistory } from 'react-router-dom'
import {LoadingOutlined } from '@ant-design/icons';

import ListProfile from './ListProfile'
export default function Dashboard() {


    const [Profiles, setPfrofiles] = useState([])
    const [showProfiles, setshowPfrofiles] = useState([])
    const [size, setSize] = useState(0)
    const [state , setSate] = useState(false) ; 

    const [userPhoto, setUserphoto] = useState({})
    const [tabFlag, setTabflag] = useState(false);
    const [divine, setDivine] = useState(true);

    const stateProfile = useSelector((state) => state)
    const dispatch = useDispatch();

    useEffect(() => {
        fetchUsers();
    }, []);


    const history = useHistory();

     const onLike = () =>{
        setDivine( true) 
        console.log('kj' , divine)
     }
    function compare(a, b) {
        if (a.likes < b.likes) {
            return -1;
        }
        if (a.likes > b.likes) {
            return 1;
        }
        return 0;
    }


    const fetchUsers = () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/`)).then((snapshot) => {
            if (snapshot.exists()) {
                const snapOfdata = snapshot.val();
                let usersArray = [];

                for (var prop in snapOfdata) {
                    let newObj = snapOfdata[prop];
                    newObj['userId'] = prop;
                    usersArray.push(newObj)
                }
                usersArray.sort(compare);
                usersArray.reverse();

                console.log('final', usersArray);
                setSize((usersArray.length+2)/3 ) ; 
                setshowPfrofiles(usersArray.slice(0 , 3)) ; 
                setPfrofiles(usersArray);

            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const setPhotoHelper = (data) => {
        setUserphoto(data)
    }

    const handleChange = () => {
        setTabflag(true);
    }
    const handleChange1 = () => {
        setTabflag(false);
    }


    const handlePageClick = (pageNumber) => {
        console.log('clicked' , pageNumber);
        let page = (pageNumber-1)*3 ; 
        setshowPfrofiles(Profiles.slice(page , page+3)) ;
    }



    return (
        <div>
            
            <header className="fixed-header" role="banner">
                <div className="container-fluid">

                    <div className="site-title col-xs-3">
                        <h1> Welcome to Plug ,{userPhoto.username} </h1>
                    </div>

                    <div className="top-components col-xs-3 pull-right">
                    </div>
                </div>
            </header>

            <menu id="user" className="dynamicMenu">

                <div className="user-profile">
                    <div className="profile-pic">
                        <img src={userPhoto.profile_picture} alt="username here" />
                    </div>

                    <div className="user-info">
                        <div className="username">
                            <p><strong>{userPhoto.username}</strong> </p>
                        </div>
                        <ul className="profile-menu">
                            <li><a href="/directory"><span className="glyphicon glyphicon-list-alt" title="Directory Phonebook"></span></a></li>
                            <li><a href="/help?topic=index"><span className="glyphicon glyphicon-question-sign" title="Help"></span></a></li>
                            <li><a href="#"><span className="glyphicon glyphicon-cog" title="Settings"></span></a></li>
                            <li><a href="/login"><span className="glyphicon glyphicon-log-out" title="Log Out / End Session"></span></a></li>
                        </ul>
                    </div>
                </div>

                <ul className="admin-menu">
                    <li> <a href="#"> Link Examples </a></li>
                </ul>
            </menu>

            <main>

                <section>
                    {

                        tabFlag === true ? <UserUpdateprofile original={userPhoto} handleChange1={handleChange1} /> :
                            <UserShowProfile helper={setPhotoHelper} handleChange={handleChange} />
                    }
                   {
                     state === true  ? <div className="loader"> serggggggggggggggggg <LoadingOutlined/></div>:""
                   }
                    <div className="row">
                        {
                            showProfiles.map((data, ind) => {
                                const id = localStorage.getItem('userid');
                                if (id === data.userId) return ""
                                return (
                                    <ListProfile data={data} cng = {onLike} />
                                )
                            })
                        }

                    </div>




                </section>
                <Pagination defaultCurrent={1} total={70}
                size="large"
                // showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                onChange={(e)=>handlePageClick(e)} 
                showSizeChanger={false}
                />
            </main>
        </div>
    )
}

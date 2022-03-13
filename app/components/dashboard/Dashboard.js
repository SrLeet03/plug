import React, { useState, useEffect } from 'react'
import './css/dashboard.css'
import UserShowProfile from './UserShowProfile'
import UserUpdateprofile from './UserUpdateprofile'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { auth, db } from '../../firebase/firebase'
import { ref, child, get, getDatabase } from "firebase/database";
import { set, update, push } from "firebase/database";
import ListProfile from './ListProfile'
export default function Dashboard() {


    const [Profiles, setPfrofiles] = useState([])
    const [userPhoto, setUserphoto] = useState({})
    const [tabFlag, setTabflag] = useState(false);

    const stateProfile = useSelector((state) => state)
    const dispatch = useDispatch();

    useEffect(() => {
        fetchUsers();

    }, []);

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




    return (
        <div>
            <header class="fixed-header" role="banner">
                <div class="container-fluid">

                    <div class="site-title col-xs-3">
                        <h1> Welcome to Plug ,{userPhoto.username} </h1>
                    </div>

                    <div class="top-components col-xs-3 pull-right">
                    </div>
                </div>
            </header>

            <menu id="user" class="dynamicMenu">

                <div class="user-profile">
                    <div class="profile-pic">
                        <img src={userPhoto.profile_picture} alt="username here" />
                    </div>

                    <div class="user-info">
                        <div class="username">
                            <p><strong>{userPhoto.username}</strong> </p>
                        </div>
                        <ul class="profile-menu">
                            <li><a href="/directory"><span class="glyphicon glyphicon-list-alt" title="Directory Phonebook"></span></a></li>
                            <li><a href="/help?topic=index"><span class="glyphicon glyphicon-question-sign" title="Help"></span></a></li>
                            <li><a href="#"><span class="glyphicon glyphicon-cog" title="Settings"></span></a></li>
                            <li><a href="/login"><span class="glyphicon glyphicon-log-out" title="Log Out / End Session"></span></a></li>
                        </ul>
                    </div>
                </div>

                <ul class="admin-menu">
                    <li> <a href="#"> Link Examples </a></li>
                </ul>
            </menu>

            <main>

                <section>
                    {

                        tabFlag === true ? <UserUpdateprofile original={userPhoto} handleChange1={handleChange1} /> :
                            <UserShowProfile helper={setPhotoHelper} handleChange={handleChange} />
                    }
                    <div class="row">
                        {
                            Profiles.map((data, ind) => {
                                const id = localStorage.getItem('userid');
                                if (id === data.userId) return ""
                                return (
                                    <ListProfile data={data} />
                                )
                            })
                        }

                    </div>




                </section>

            </main>
        </div>
    )
}

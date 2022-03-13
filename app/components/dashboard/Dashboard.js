import React, { useState, useEffect } from 'react'
import './css/dashboard.css'
import UserShowProfile from './UserShowProfile'
import UserUpdateprofile from './UserUpdateprofile'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { auth, db } from '../../firebase/firebase'
import { ref, child, get, getDatabase } from "firebase/database";
import {  set , update  , push } from "firebase/database";

export default function Dashboard() {


    const [Profiles, setPfrofiles] = useState([])
    const [userPhoto , setUserphoto] = useState({})
    const [tabFlag , setTabflag]  = useState(false) ; 

    const stateProfile = useSelector((state) => state)
    const dispatch = useDispatch();

    useEffect(() => {
        fetchUsers();
        
    }, []);


    const fetchUsers = () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log("No data snap" , snapshot);
                const snapOfdata = snapshot.val() ; 
                let usersArray = [] ; 

                for (var prop in snapOfdata) {
                   console.log("No data available" , snapOfdata[prop]);
                   usersArray.push(snapOfdata[prop])
                }  
                setPfrofiles(usersArray) ; 
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const setPhotoHelper = (data) =>{
         setUserphoto(data)
    }

    const handleChange = () =>{
        setTabflag(true);
    }
    const handleChange1 = () =>{
        setTabflag(false);
    }

    const handleLikeChange = (data) =>{
        
        // const userId = localStorage.getItem('userid')
        
        
        // const postData = {
        //     username: data.username,
        //     profile_picture : data.profile_picture,
        //     status:data.status,
        //     likes : data.likes+1,
        //     disLikes:data.disLikes,
        //     email : data.email
        //  };
        
        //   // Get a key for a new Post.
        //   const newPostKey = push(child(ref(db), 'posts')).key;
        
        //   // Write the new post's data simultaneously in the posts list and the user's post list.
        //   const updates = {};
        //   updates['/users/' + userId] = postData;
        
        //   try{
        //     update(ref(db), updates);
        //   }catch{
        //     console.log('error')
        //   }


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
                   
                     tabFlag === true ?    <UserUpdateprofile original = {userPhoto} handleChange1={handleChange1}/> : 
                     <UserShowProfile helper = {setPhotoHelper} handleChange={handleChange}/>
                    }
                    <div class="row">
                        {
                            Profiles.map((data, ind) => {
                                console.log('data . data' , data)
                                return (
                                    <div class="col-md-4">
                                        <div class="card-content">
                                            <div class="card-img">
                                                <img src={data.profile_picture} alt="" />
                                            </div>
                                            <div class="card-desc">
                                                <h3>{data.username}</h3>
                                                <p>{data.status}</p>
                                                <button onClick={handleLikeChange(data)} class="btn-card">Like</button>{' '}
                                                <button class="btn-card">DisLike</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>




                </section>

            </main>
        </div>
    )
}
